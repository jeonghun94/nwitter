import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/protected-router';
import Layout from './components/Layout/layout';
import TweetDetail from './pages/tweet/detail';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import CreateAccount from './pages/create-account';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '/tweet/:id',
        element: <TweetDetail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
]);

export default router;
