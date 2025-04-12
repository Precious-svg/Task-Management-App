import React from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import AllTaskListPage from './pages/AllTaskListPage';
import TaskProvider from "./Context/TaskContext";
import WelcomePage from './pages/WelcomePage';
import CreateAccountPage from './pages/CreateAccountPage';
import LogInPage from './pages/LogInPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import AddNewTaskPage from './pages/AddNewTaskPage';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="/welcome" element={<WelcomePage/>}/>
    <Route path="/create-account" element={<CreateAccountPage/>}/>
    <Route path="/logIn" element={<LogInPage/>}/>
    <Route path="/seeAllTasks" element={<AllTaskListPage/>}/>
    <Route path="/task/:id" element={<TaskDetailsPage/>}/>
    <Route path="newTaskForm" element={<AddNewTaskPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route>)
)

const App = () => {
  return (
    <TaskProvider>
       <RouterProvider router={router}/>
    </TaskProvider>
  )
}

export default App