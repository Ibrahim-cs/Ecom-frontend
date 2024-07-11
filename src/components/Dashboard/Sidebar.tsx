import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  height: 100%;
  padding: 1rem;
  background-color: #2d3748; /* Equivalent to bg-gray-800 */
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Equivalent to space-y-4 */
`;

const Title = styled.h2`
  font-size: 1.125rem; /* Equivalent to text-lg */
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Equivalent to space-y-2 */
`;

const NavLink = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a5568; /* Equivalent to hover:bg-gray-700 */
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Title>Dashboard</Title>
      <Nav>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">Profile</NavLink>
        <NavLink href="#">Settings</NavLink>
        <NavLink href="#">Logout</NavLink>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
