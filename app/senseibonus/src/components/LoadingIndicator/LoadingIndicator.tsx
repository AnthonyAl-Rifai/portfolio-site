import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Define the animation
const moveAnimation = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

// Style the line
const Line = styled.div`
  position: absolute;
  height: 5px;
  width: 40%;
  background: rgb(3,5,7);
  background: linear-gradient(90deg, rgba(3,5,7,1) 0%, rgba(230,241,249,1) 7%, rgba(230,241,249,1) 93%, rgba(3,5,7,1) 100%);
  animation: ${moveAnimation} 2s linear infinite;
`;

// Style the container
const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 10px;
  width: 100%;
  background-color: #030507;
  overflow: hidden;
  max-width: 120px;
  border-radius: 5px;
`;

// LoadingIndicator Component
const LoadingIndicator: React.FC = () => {
  return (
    <Container>
      <Line />
    </Container>
  );
}

export default LoadingIndicator;
