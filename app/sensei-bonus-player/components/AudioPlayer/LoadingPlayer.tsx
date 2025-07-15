import styled from "@emotion/styled";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 400px;
  background: linear-gradient(
    132deg,
    rgba(219, 218, 219, 1) 0%,
    rgba(190, 190, 190, 1) 47%,
    rgba(170, 170, 171, 1) 81%,
    rgba(158, 159, 159, 1) 100%
  );
  border-radius: 20px;
  box-shadow:
    18px 26px 23px -5px rgba(0, 0, 0, 0.1),
    inset 2px 2px 0px 0px #edecec,
    inset -2px -2px 0px 0px #666767;
`;

const LoadingText = styled.div`
  color: #646866;
  font-family: monospace;
  font-size: 14px;
  text-align: center;
`;

const LoadingPlayer = () => {
  return (
    <LoadingContainer>
      <LoadingText>Loading Audio Player...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingPlayer;
