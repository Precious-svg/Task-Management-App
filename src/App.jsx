import React from 'react'
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import AllTaskListPage from './pages/AllTaskListPage';
import TaskProvider from "./Context/TaskContext";
import { useAuth } from './Context/AuthContext';
import AuthProvider from './Context/AuthContext';
import WelcomePage from './pages/WelcomePage';
import CreateAccountPage from './pages/CreateAccountPage';
import LogInPage from './pages/LogInPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import AddNewTaskPage from './pages/AddNewTaskPage';



const App = () => {
  // const { currentUser } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/create-account" element={<CreateAccountPage/>}/>
        <Route path="/logIn" element={<LogInPage/>}/>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/seeAllTasks" element={<AllTaskListPage/>}/>
            <Route path="/task/:id" element={<TaskDetailsPage/>}/>
            <Route path="newTaskForm" element={<AddNewTaskPage/>}/>
         </Route>
         <Route path="*" element={<NotFoundPage/>}/>
    </Route>)
  )

  return (
     <RouterProvider router={router}/>
  )
}

export default App