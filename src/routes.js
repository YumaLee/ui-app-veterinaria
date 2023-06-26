import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Home from './pages/Home';
import UserRegisterPage from './pages/UserRegisterPage';
import AdminManageVetPage from './pages/AdminManageVetPage';
import Details from './pages/DetailsVet';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'home',
      element: <Home />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/blog" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'admin_vet', element: <AdminManageVetPage /> },
        {
          path: 'home',
          element: <Home />, index: true
        },
      ],
    },
    {
      path: 'registration',
      element: <UserRegisterPage />
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'blog',
      element: <BlogPage />,
    },
    {
      path: 'details',
      element: <Details />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);

  return routes;
}
