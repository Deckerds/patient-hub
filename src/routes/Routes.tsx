import { createBrowserRouter } from 'react-router-dom';
import Welcome from '../pages/Auth/Welcome';
import AuthLayout from '../components/AuthLayout';
import Login from '../pages/Auth/Login';
import PrivateRoute from './PrivateRoute';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Users/Users';
import Patients from '../pages/Patients/Patients';
import PatientImages from '../pages/PatientImages/PatientImages';
import AddImage from '../pages/PatientImages/AddImage';
import PatientDiagnoses from '../pages/PatientDiagnoses/PatientDiagnoses';
import CreateDiagnose from '../pages/PatientDiagnoses/CreateDiagnose';
import CreatePatient from '../pages/Patients/CreatePatient';
import UpdatePatient from '../pages/Patients/UpdatePatient';
import UpdateImage from '../pages/PatientImages/UpdateImage';
import UpdateDiagnose from '../pages/PatientDiagnoses/UpdateDiagnose';
import CreateUser from '../pages/Users/CreateUser';
import UpdateUser from '../pages/Users/UpdateUser';
import AdminRoute from './AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Welcome /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/users',
    element: (
      <AdminRoute
        element={
          <AdminLayout>
            <Users />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <Patients />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/create',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <CreatePatient />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/update/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <UpdatePatient />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/images/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <PatientImages />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/addImages/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <AddImage />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/updateImages/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <UpdateImage />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/diagnoses/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <PatientDiagnoses />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/createDiagnose/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <CreateDiagnose />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/patients/updateDiagnose/:id',
    element: (
      <PrivateRoute
        element={
          <AdminLayout>
            <UpdateDiagnose />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/users/create',
    element: (
      <AdminRoute
        element={
          <AdminLayout>
            <CreateUser />
          </AdminLayout>
        }
      />
    ),
  },
  {
    path: '/users/update/:id',
    element: (
      <AdminRoute
        element={
          <AdminLayout>
            <UpdateUser />
          </AdminLayout>
        }
      />
    ),
  },
]);
