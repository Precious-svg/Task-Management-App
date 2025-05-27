import React from 'react';
import { Outlet } from "react-router-dom";
import FooterNavBar from '../components/FooterNavBar';


const MainLayout = () => {
  return (
    <>
        <FooterNavBar/>
      
        <Outlet/>
    </>
  )
}

export default MainLayout