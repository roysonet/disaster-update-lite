import React from 'react';
    import styled from 'styled-components';
    import { ClipLoader } from 'react-spinners';

    const LoadingSpinner = () => (
      <SpinnerContainer>
        <ClipLoader color="#ffffff" size={50} />
      </SpinnerContainer>
    );

    const SpinnerContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    `;

    export default LoadingSpinner;
