import { RouterProvider } from 'react-router-dom';
import { styled } from 'styled-components';
import router from './Router';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import { auth } from './firebase';
import GlobalStyles from './styles/GlobalStyles';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
