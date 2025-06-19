import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from '../pages/Home';
import BookDetails from '../pages/BookDetails';
import BookUpload from '../pages/BookUpload';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import MyBooks from '../pages/MyBooks';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export default function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<motion.div {...fade}><Home /></motion.div>}
        />
        <Route
          path="/register"
          element={
            <motion.div {...fade}>
              <PublicRoute>
                <Register />
              </PublicRoute>
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div {...fade}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div {...fade}>
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/book-details/:id"
          element={
            <motion.div {...fade}>
              <PrivateRoute>
                <BookDetails />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/book-upload"
          element={
            <motion.div {...fade}>
              <PrivateRoute>
                <BookUpload />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/my-books"
          element={
            <motion.div {...fade}>
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
