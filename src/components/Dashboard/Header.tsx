import React from "react";
import styled from "styled-components";
import { authProvider } from "../../auth";
import { useFetcher } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  font-size: 1.25rem; /* Equivalent to text-xl */
  font-weight: bold;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Equivalent to space-x-4 */
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  color: white;
  background-color: #4299e1; /* Equivalent to bg-blue-500 */
  border-radius: 0.25rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2b6cb0; /* Equivalent to hover:bg-blue-600 */
  }

  &:disabled {
    background-color: #90cdf4; /* Optional: Lighter blue when disabled */
    cursor: not-allowed;
  }
`;

const Header: React.FC = () => {
  let fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;

  return (
    <HeaderContainer>
      <Title>My Dashboard</Title>
      <UserContainer>
        <span>Welcome, {authProvider.email}</span>
        <fetcher.Form method="post" action="/logout">
          <LogoutButton type="submit" disabled={isLoggingOut}>
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </LogoutButton>
        </fetcher.Form>
      </UserContainer>
    </HeaderContainer>
  );
};

export default Header;
