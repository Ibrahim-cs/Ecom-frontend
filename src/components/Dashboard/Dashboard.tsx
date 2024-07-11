import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarWrapper = styled.div`
  width: 25%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: #f7fafc; /* Equivalent to bg-gray-100 */
`;

const Title = styled.h2`
  font-size: 1.5rem; /* Equivalent to text-2xl */
  font-weight: bold;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 1rem; /* Equivalent to gap-4 */
  margin-top: 1rem;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    /* Equivalent to sm:grid-cols-2 */
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    /* Equivalent to lg:grid-cols-3 */
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
`;

const CardTitle = styled.h3`
  font-size: 1.125rem; /* Equivalent to text-lg */
  font-weight: bold;
`;

const Dashboard: React.FC = () => {
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <ContentWrapper>
        <Header />
        <Main>
          <Title>Dashboard Content</Title>
          <CardGrid>
            <Card>
              <CardTitle>Card 1</CardTitle>
              <p>Content for card 1</p>
            </Card>
            <Card>
              <CardTitle>Card 2</CardTitle>
              <p>Content for card 2</p>
            </Card>
            <Card>
              <CardTitle>Card 3</CardTitle>
              <p>Content for card 3</p>
            </Card>
          </CardGrid>
        </Main>
      </ContentWrapper>
    </Container>
  );
};

export default Dashboard;
