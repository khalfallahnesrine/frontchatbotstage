import React , { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import "../styles/sidebar.css"
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Profil from '../pages/profil'
import Chatbots from '../pages/chatbots'
const Sidebar=({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/Profil",
            name:"Profil",
            icon:<FaUserAlt/>
        },
        {
            path:"/Chatbots",
            name:"Chatbots",
            icon:<FaCommentAlt/>
        },
       
    ]
  return (
    <div className="container">
    <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar bg-transparent">
        <div className="top_section">
            <h1 style={{display: isOpen ? "block" : "none"}} className="logo">
            <img src={Logo} className="rounded-circle bg-outline-light logo" alt="Logo Chatbotyy"   />
            </h1>
            <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                <FaBars onClick={toggle}/>
            </div>
        </div>
        {
            menuItem.map((item, index)=>(
                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                    <div className="icon">{item.icon}</div>
                    <div style={{display: isOpen ? "block" : "none" , textDecoration : "none"}} className="text text-light">{item.name}</div>
                </NavLink>
            ))
        }
    </div>
    <main>{children}</main>
 </div>
  )
}

export default Sidebar

