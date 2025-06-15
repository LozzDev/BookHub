import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import BookDetails from '../pages/BookDetails';
import BookUpload from '../pages/BookUpload';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'; // 👈 importar nuevo componente
import MyBooks from '../pages/MyBooks';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/book-details/:id',
    element: (
      <PrivateRoute>
        <BookDetails />
      </PrivateRoute>
    ),
  },
  {
    path: '/book-upload',
    element: (
      <PrivateRoute>
        <BookUpload />
      </PrivateRoute>
    ),
  },
    {
    path: '/my-books',
    element: (
      <PrivateRoute>
        <MyBooks />
      </PrivateRoute>
    ),
  },

]);

export default Router;
