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
import PendingTasks from './pages/pendingTasks';
import CompletedTasksPage from './pages/CompletedTasksPage';
import OngoingTasksPage from './pages/OngoingTasksPage';
import { useEffect } from 'react';
import CalendarPage from './pages/CalendarPage';

const App = () => {

  useEffect(() => {
    const url = new URL(window.location);
    const paramsToRemove = ["key", "code", "state", "scope", "authuser"]; // common OAuth params

    let changed = false;
    paramsToRemove.forEach(param => {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        changed = true;
      }
    });

    if (changed) {
      window.history.replaceState({}, document.title, url.toString());
    }
  }, []);

  const { currentUser} = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/create-account" element={<CreateAccountPage/>}/>
        <Route path="/logIn" element={<LogInPage/>}/>
        <Route path="/forgotPassword" element={<ForgotPassWordPage/>}/>
        <Route path="edit-task/:id" element={ currentUser ? <EditTaskPage/> : <Navigate to="/logIn"/>}/>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
            <Route path="/seeAllTasks" element={<ProtectedRoute><AllTaskListPage/></ProtectedRoute>}/>
            <Route path="/task/:id" element={<ProtectedRoute><TaskDetailsPage/></ProtectedRoute>}/>
            <Route path="/newTaskForm" element={currentUser ? <AddNewTaskPage/> : <Navigate to="/logIn"/>}/>   
            <Route path="/pending-tasks" element={<ProtectedRoute><PendingTasks/></ProtectedRoute>}/>
            <Route path="/completed-tasks" element={<ProtectedRoute><CompletedTasksPage/></ProtectedRoute>}/>
            <Route path="/ongoing-tasks" element={<ProtectedRoute><OngoingTasksPage/></ProtectedRoute>}/>
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage/></ProtectedRoute>}/>
         </Route>
         <Route path="*" element={<NotFoundPage/>}/>
    </Route>)
  )

  return (
     <RouterProvider router={router}/>
  )
}

export default App