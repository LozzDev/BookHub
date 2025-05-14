import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import BookDetails from '../pages/BookDetails';
import BookUpload from '../pages/BookUpload';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';


const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/book-details',
    element: <BookDetails />,
  },
  {
    path: '/book-upload',
    element: <BookUpload />,
  },
  
]);

export default Router;