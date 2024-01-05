import React, { lazy, Suspense } from 'react';
import './app.scss';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blogs, Create, Login } from './views';
import Register from './views/register';
import AuthenticatedBlogs from './components/AutheticatedBlogs';
import AuthenticatedCreate from './components/AuthenticatedCreate';

const Nomatch = lazy(() => import('./views/nomatch'));

function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<div className="loading" />}>
        <ToastContainer autoClose={3000} className="toast-container" />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/article' element={<AuthenticatedBlogs />} />
          <Route path='/create' element={<AuthenticatedCreate />} />
          <Route path="*" element={<Nomatch />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
