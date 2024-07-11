import React from "react";
import styled from "styled-components";
import { Form } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc; /* Equivalent to bg-gray-100 */
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 28rem; /* Equivalent to max-w-md */
  padding: 2rem;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Equivalent to space-y-6 */
`;

const Title = styled.h2`
  font-size: 1.5rem; /* Equivalent to text-2xl */
  font-weight: bold;
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Equivalent to space-y-4 */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem; /* Equivalent to mb-2 */
  font-size: 0.875rem; /* Equivalent to text-sm */
  font-weight: medium;
  color: #4a5568; /* Equivalent to text-gray-600 */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem; /* Equivalent to px-3 py-2 */
  border: 1px solid #e2e8f0; /* Equivalent to border */
  border-radius: 0.25rem;
  outline: none;
  transition: box-shadow 0.3s;

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); /* Equivalent to focus:ring focus:ring-blue-200 */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem; /* Equivalent to px-4 py-2 */
  color: white;
  background-color: #4299e1; /* Equivalent to bg-blue-500 */
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  outline: none;

  &:hover {
    background-color: #2b6cb0; /* Equivalent to hover:bg-blue-600 */
  }

  &:focus {
    background-color: #2b6cb0; /* Equivalent to focus:bg-blue-600 */
  }
`;

const SigninForm: React.FC = () => {
  return (
    <Container>
      <FormContainer>
        <Title>Sign In</Title>
        <StyledForm method="post" replace>
          <input type="hidden" name="redirectTo" value="/protected" />
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" name="password" required />
          </div>
          <SubmitButton type="submit">Sign In</SubmitButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

export default SigninForm;
