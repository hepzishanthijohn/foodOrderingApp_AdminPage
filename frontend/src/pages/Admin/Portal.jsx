import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import AdminNavbar from  '../../pages/Admin/AdminNavbar/AdminNavbar'




function Portal() {
    return (
        <>
       
      
        <div className='admin'>
            
            <Sidebar/>
            <Outlet></Outlet>
            
        </div>
    
        </>
    )
}

export default Portal