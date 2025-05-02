import React from 'react'
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import AllTaskListPage from './pages/AllTaskListPage';
import { useAuth } from './Context/AuthContext';
import WelcomePage from './pages/WelcomePage';
import CreateAccountPage from './pages/CreateAccountPage';
import LogInPage from './pages/LogInPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import AddNewTaskPage from './pages/AddNewTaskPage';
import { Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassWordPage from './pages/ForgotPassWordPage';
import EditTaskPage from './pages/EditTaskPage';

const App = () => {
  const { currentUser} = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/create-account" element={<CreateAccountPage/>}/>
        <Route path="/logIn" element={<LogInPage/>}/>
        <Route path="/forgotPassword" element={<ForgotPassWordPage/>}/>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
            <Route path="/seeAllTasks" element={<ProtectedRoute><AllTaskListPage/></ProtectedRoute>}/>
            <Route path="/task/:id" element={<ProtectedRoute><TaskDetailsPage/></ProtectedRoute>}/>
            <Route path="newTaskForm" element={currentUser ? <AddNewTaskPage/> : <Navigate to="/logIn"/>}/>
            <Route path="edit-task/:id" element={ currentUser ? <EditTaskPage/> : <Navigate to="/logIn"/>}/>
         </Route>
         <Route path="*" element={<NotFoundPage/>}/>
    </Route>)
  )

  return (
     <RouterProvider router={router}/>
  )
}

export default App