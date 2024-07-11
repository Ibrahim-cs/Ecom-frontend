import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import styled from "styled-components";
import { authProvider } from "./auth";
import SigninForm from "./components/Signin";
import SignupForm from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

interface StyledButtonProps {
  bgColor: string;
  hoverColor: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.5rem 1rem; /* Equivalent to px-4 py-2 */
  color: white;
  border-radius: 0.25rem;
  background-color: ${(props) => props.bgColor};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return {
        user: authProvider.email || localStorage.getItem("loggedInUser"),
      };
    },
    Component: Layout,
    children: [
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: SigninForm,
      },
      {
        path: "signup",
        action: signupAction,
        loader: signupLoader,
        Component: SignupForm,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await authProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

function Layout() {
  let { user } = useRouteLoaderData("root") as { user: string | null };

  return (
    <div>
      {!user ? (
        <ul className="flex space-x-4">
          <li>
            <Link to="/login">
              <StyledButton bgColor="#4299e1" hoverColor="#2b6cb0">
                Sign In
              </StyledButton>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <StyledButton bgColor="#48bb78" hoverColor="#38a169">
                Sign Up
              </StyledButton>
            </Link>
          </li>
          <li>
            <Link to="/protected">
              <StyledButton bgColor="#9f7aea" hoverColor="#805ad5">
                Dashboard
              </StyledButton>
            </Link>
          </li>
        </ul>
      ) : null}
      <Outlet />
    </div>
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string | null;
  let password = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  } else if (!password) {
    return {
      error: "You must provide a password to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signin(email, password);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;

  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

async function signupAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string | null;
  let password = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  } else if (!password) {
    return {
      error: "You must provide a password to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signup(email, password);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid signup attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;

  return redirect(redirectTo || "/");
}

async function signupLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (!authProvider.isAuthenticated && !loggedInUser) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
