import React from 'react'
import { Link } from 'react-router-dom'


const SideBar = ({item}) => {
  return (
    <>
      <li key={item.id}>
        <Link to={item.link}>{item.icon}{item.name}</Link>
      </li>
    </>
  )
}

export default SideBar