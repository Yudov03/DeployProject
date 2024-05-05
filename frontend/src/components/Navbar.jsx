
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import {Link, useLocation} from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AxiosInstance from './AxiosInstance';

// const drawerWidth = 240;

// export default function Navbar(props) {
//   const {content} = props
//   const location = useLocation()
//   const path = location.pathname    
//   const navigate = useNavigate()
//   const logoutUser = () =>{
//     AxiosInstance.post(`logoutall/`,{})
//     .then( () => {
//        localStorage.removeItem("Token")
//        navigate('/')
//     }

//     )
//  }
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Clipped drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//       <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>

//               <ListItem key={1} disablePadding>
//                 <ListItemButton component={Link} to="/home" selected={"/home" === path}>
//                   <ListItemIcon>
//                         <HomeIcon /> 
//                   </ListItemIcon>
//                   <ListItemText primary={"Home"} />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem key={2} disablePadding>
//               <ListItemButton component={Link} to="/about" selected={"/about" === path}>
//                   <ListItemIcon>
//                         <InfoIcon /> 
//                   </ListItemIcon>
//                   <ListItemText primary={"About"} />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem key={3} disablePadding>
//               <ListItemButton onClick={logoutUser}>
//                   <ListItemIcon>
//                         <LogoutIcon/> 
//                   </ListItemIcon>
//                   <ListItemText primary={"Logout"} />
//                 </ListItemButton>
//               </ListItem>

//           </List>

//         </Box>
//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       <Toolbar />
//             {content}
//       </Box>
//     </Box>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import '../App.css'; // Ensure you have the necessary styles defined here
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'
import AxiosInstance from './AxiosInstance';

export default function Navbar(props) {
    const locate = useLocation().pathname;
    const [myData, setMyData] = useState();
    const GetData = () => {
        AxiosInstance.get(`users/`).then((res) => {
            setMyData(res.data);
            console.log(res.data);
        });
    };
    useEffect(() => {
        GetData();
    }, []);

    const { content } = props;
    const navigate = useNavigate();
    const [isNavVisible, setNavVisible] = useState(false);
    const toggleNavVisible = () => {
        setNavVisible(!isNavVisible);
    };

    const [isMouseEnterNavIcon, setIsMouseEnterNavIcon] = useState(false);
    const handleMouseEnterNavIcon = (bar) => {
        if (bar === true) {
            setIsMouseEnterNavIcon(true);
        }
    }

    const handleMouseLeaveNavIcon = () => {
        setIsMouseEnterNavIcon(false);
    }
    const [navWidth, setNavWidth] = useState(750);
    const navRef = useRef(null);

    useEffect(() => {
        if (navRef.current) {
            setNavWidth(navRef.current.offsetWidth);
        }
    }, [isMouseEnterNavIcon]);

    const navIconStyle = isMouseEnterNavIcon ? { position: 'fixed', top: '0px', height: '100%', } : { position: 'fixed', top: '0px', height: '100%', width: '60px' };

    const [activeIcon, setActiveIcon] = useState(null);
    const handleMouseEnterIcon = (columnName) => {
        setActiveIcon(columnName);
    };

    const [selectedItem, setSelectedItem] = useState(null);
    const [activeColumn, setActiveColumn] = useState(null);
    const handleClick = (itemName) => {
        setSelectedItem(selectedItem === itemName ? null : itemName);
    };
    const handleMouseEnter = (columnName) => {
        setActiveColumn(columnName);
    };

    const handleLogout = () => {
        AxiosInstance.post(`logoutall/`, {}).then(() => {
            localStorage.removeItem("Token");
            navigate('/');
        });
    };

    useEffect(() => {
        setSelectedItem(null);
    }, [locate]);

    const isPathMatching = (pattern) => {
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(locate);
    };
    return (
        <div>
            <div className='d-flex flex-column flex-shrink-0 p-3 bg-light shadow' style={navIconStyle} onMouseEnter={() => handleMouseEnterNavIcon(true)} onMouseLeave={handleMouseLeaveNavIcon} >
                {/* <button className={`btn btn-lg`} style={{}} >
                    <i className="bi bi-arrow-bar-right" style={{ fontSize: '1rem' }}></i>
                </button> */}
                <div className='col'>

                <div
                        className="row"
                        style={{
                            borderColor: 'rgba(0, 126, 255, 0.18)',
                            color: 'blue',
                            fontWeight: 'bold'
                        }}
                        onMouseEnter={() => handleMouseEnterIcon(null)}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                    >
                        <span className="d-inline-flex align-items-center mt-2 mb-1">
                            <svg style={{width: 30, height: 30, paddingTop:3, paddingLeft:2}}><path fill="#C4E6FF" fillRule="evenodd" d="M18 18C18 18.5523 17.5523 19 17 19H16V21H8V19H1V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V9.60005C23 8.62111 22.5224 7.70373 21.7204 7.14235L18 4.54004V18Z" clipRule="evenodd"></path><path fill="#024493" fillRule="evenodd" d="M12 1C11.3985 1 10.796 1.18081 10.2796 1.5423L2.27961 7.1423C1.47764 7.70369 1 8.62106 1 9.6V20C1 21.6568 2.34315 23 4 23H20C21.6569 23 23 21.6568 23 20V9.6C23 8.62106 22.5224 7.70369 21.7204 7.1423L13.7204 1.5423C13.204 1.18081 12.6015 1 12 1ZM21 9.6C21 9.27369 20.8408 8.9679 20.5735 8.78077L12.5735 3.18077C12.4012 3.06021 12.2011 3 12 3C11.7989 3 11.5988 3.06021 11.4265 3.18077L3.42654 8.78077C3.15921 8.9679 3 9.27369 3 9.6V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V9.6Z" clipRule="evenodd"></path><path fill="#1E93FF" fillRule="evenodd" d="M12.5 7C12.7761 7 13 7.22386 13 7.5V9H14.5C14.7761 9 15 9.22386 15 9.5V10.5C15 10.7761 14.7761 11 14.5 11H13V12.5C13 12.7761 12.7761 13 12.5 13H11.5C11.2239 13 11 12.7761 11 12.5V11H9.5C9.22386 11 9 10.7761 9 10.5V9.5C9 9.22386 9.22386 9 9.5 9H11V7.5C11 7.22386 11.2239 7 11.5 7H12.5ZM11 15C9.34315 15 8 16.3431 8 18V22C8 22.5523 8.44772 23 9 23H15C15.5523 23 16 22.5523 16 22V18C16 16.3431 14.6569 15 13 15H11ZM10 18C10 17.4477 10.4477 17 11 17H13C13.5523 17 14 17.4477 14 18V21H10V18Z" clipRule="evenodd"></path></svg>
                            {isMouseEnterNavIcon && <div style={{fontSize: 20}} className="ms-2">BK CLINIC</div>}
                        </span>
                    </div>
                    <hr />
                    <div
                        className={`row py-1 ${activeIcon === 'house' ? 'shadow' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'home' || locate === "/home" ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'home' || locate === "/home" ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px'
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('house')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/home'), handleClick('home') }}
                    >

                        <span className="d-inline-flex align-items-center">
                            <i className="bi bi-house" style={{ fontSize: '1.5rem' }}></i>
                            {isMouseEnterNavIcon && <div className="ms-3">Home</div>}
                        </span>
                    </div>

                    <div
                        className={`row py-1 ${activeIcon === 'clipboard-data' ? 'shadow' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'clipboard-data' || locate === "/dashboard" ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'clipboard-data' || locate === "/dashboard" ? '3px solid rgba(0, 110, 255, 0.76)' : 'none',
                            borderLeftRadius: '3px'
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('clipboard-data')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/dashboard'), handleClick('clipboard-data') }}
                    >
                        <span className="d-inline-flex align-items-center mt-1 mb-1">
                            <svg viewBox="0 0 19 19"><path fill="#444" d="M16 10.1C16 5.7 12.4 2 8 2s-8 3.7-8 8.1c0 1.4.3 2.9.9 3.9h4.9c.5.6 1.3 1 2.2 1s1.7-.4 2.2-1h4.9c.6-1 .9-2.5.9-3.9zM14 7v1l-4.1 3.5c0 .1.1.3.1.5 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.3 0 .6.1.8.2L13 7h1zm-4-3h1v1h-1V4zM5 4h1v1H5V4zm-3 8H1v-1h1v1zm1-4H2V7h1v1zm12 4h-1v-1h1v1z"></path><path fill="#444" d="M9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
                            {isMouseEnterNavIcon && <div className="ms-3">Dashboard</div>}
                        </span>
                    </div>
                    <div className={`row py-1 ${activeIcon === 'calendar-week' ? 'shadow' : ''}`} style={{
                        backgroundColor: selectedItem === 'calendar-week' || locate === "/schedule" || locate === "/schedule/add" || isPathMatching("/schedule/read/\\d+") || isPathMatching("/schedule/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : '',
                        borderLeft: selectedItem === 'calendar-week' || locate === "/schedule" || locate === "/schedule/add" || isPathMatching("/schedule/read/\\d+") || isPathMatching("/schedule/update/\\d+") ? '3px solid rgba(0, 110, 255, 0.76)' : 'none',
                        borderLeftRadius: '3px'
                    }}
                        onMouseEnter={() => handleMouseEnterIcon('calendar-week')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/schedule'), handleClick('calendar-week') }}>
                        <span className="d-inline-flex align-items-center">
                            <i className="bi bi-calendar-week" style={{ fontSize: '1.5rem' }}></i>
                            {isMouseEnterNavIcon && <div className="ms-3">Schedule</div>}
                        </span>
                    </div>
                    <div
                        className={`row py-1 ${activeIcon === 'clipboard2-plus' ? 'shadow' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'clipboard2-plus' || locate === "/appointment" || locate === "/appointment/add" || isPathMatching("/appointment/read/\\d+") || isPathMatching("/appointment/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'clipboard2-plus' || locate === "/appointment" || locate === "/appointment/add" || isPathMatching("/appointment/read/\\d+") || isPathMatching("/appointment/update/\\d+") ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px'
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('clipboard2-plus')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/appointment'), handleClick('clipboard2-plus') }}
                    >
                        <span className="d-inline-flex align-items-center">
                            <i className="bi bi-clipboard-data" style={{ fontSize: '1.5rem' }}></i>
                            {isMouseEnterNavIcon && <div className="ms-3">Appointments</div>}
                        </span>
                    </div>
                    <div
                        className={`row py-1 ${activeIcon === 'people' ? 'shadow' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'people' || locate === "/staff" || locate === "/staff/add" || isPathMatching("/staff/read/\\d+") || isPathMatching("/staff/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'people' || locate === "/staff" || locate === "/staff/add" || isPathMatching("/staff/read/\\d+") || isPathMatching("/staff/update/\\d+") ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px'
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('people')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/staff'), handleClick('people') }}
                    >
                        <span className="d-inline-flex align-items-center pt-1 pb-1">
                            <svg viewBox="0 0 32 32" ><path d="M19.542,16.027A7,7,0,0,0,23,10V5a3,3,0,0,0-3-3H12A3,3,0,0,0,9,5v5a7,7,0,0,0,3.458,6.027A9,9,0,0,0,4,25v3a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V25A9,9,0,0,0,19.542,16.027ZM12,4h8a1,1,0,0,1,1,1V8H11V5A1,1,0,0,1,12,4Zm-1,6H21a5,5,0,0,1-10,0Zm0,12a1,1,0,1,1-1,1A1,1,0,0,1,11,22ZM6,28V25a7,7,0,0,1,4-6.315v1.5a3,3,0,1,0,2,0v-2.1A7.026,7.026,0,0,1,13,18h6v1.142A4,4,0,0,0,16,23v2a1,1,0,0,0,1,1h1a1,1,0,0,0,0-2V23a2,2,0,0,1,4,0v1a1,1,0,0,0,0,2h1a1,1,0,0,0,1-1V23a4,4,0,0,0-3-3.858V18.3A7.009,7.009,0,0,1,26,25v3Z"></path></svg>
                            {isMouseEnterNavIcon && <div className="ms-3">Staffs</div>}
                        </span>
                    </div>
                    <div
                        className={`row py-1 ${activeIcon === 'calendar2-day' ? 'shadow' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'calendar2-day' || locate === "/patient" || locate === "/patient/add" || isPathMatching("/patient/read/\\d+") || isPathMatching("/patient/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'calendar2-day' || locate === "/patient" || locate === "/patient/add" || isPathMatching("/patient/read/\\d+") || isPathMatching("/patient/update/\\d+") ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px'
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('calendar2-day')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/patient'), handleClick('calendar2-day') }}
                    >
                        <span className="d-inline-flex align-items-center">
                            <i className="bi bi-people" style={{ fontSize: '1.5rem' }}></i>
                            {isMouseEnterNavIcon && <div className="ms-3">Patients</div>}
                        </span>
                    </div>
                    <div
                        className={`row py-1 ${activeIcon === 'capsule' ? 'shadow' : ''} ${selectedItem === 'capsule' || locate === "/medicine" || locate === "/medicine/add" || isPathMatching("/medicine/read/\\d+") || isPathMatching("/medicine/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'capsule' || locate === "/medicine" || locate === "/medicine/add" || isPathMatching("/medicine/read/\\d+") || isPathMatching("/medicine/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'capsule' || locate === "/medicine" || locate === "/medicine/add" || isPathMatching("/medicine/read/\\d+") || isPathMatching("/medicine/update/\\d+") ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px',
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('capsule')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/medicine'), handleClick('capsule') }}
                    >
                        <span className="d-inline-flex align-items-center">
                            <i className="bi bi-capsule" style={{ fontSize: '1.5rem' }}></i>
                            {isMouseEnterNavIcon && <div className="ms-3">Medicines</div>}
                        </span>
                    </div>
                    <div
                        className={` row py-1 ${activeIcon === 'heart-pulse' ? 'shadow' : ''} ${selectedItem === 'heart-pulse' || locate === "/device" || locate === "/device/add" || isPathMatching("/device/read/\\d+") || isPathMatching("/device/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : ''}`}
                        onMouseEnter={() => handleMouseEnterIcon('heart-pulse')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { navigate('/device'), handleClick('heart-pulse') }}
                        style={{
                            backgroundColor: selectedItem === 'heart-pulse' || locate === "/device" || locate === "/device/add" || isPathMatching("/device/read/\\d+") || isPathMatching("/device/update/\\d+") ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === 'heart-pulse' || locate === "/device" || locate === "/device/add" || isPathMatching("/device/read/\\d+") || isPathMatching("/device/update/\\d+") ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px',
                        }}
                    >
                        <span className="d-inline-flex align-items-center mt-1 mb-1">
                        <svg viewBox="0 0 23 23"><path d="M19.5,8C18.1,8,17,9.1,17,10.5c0,1.2,0.9,2.2,2,2.4v2.6c0,3-2.5,5.5-5.5,5.5c-3,0-5.5-2.5-5.5-5.5v-1.8l3.3-2.6c1.1-0.9,1.7-2.1,1.7-3.5V2.5c0,0,0,0,0,0C13,2.2,12.8,2,12.5,2h-2C10.2,2,10,2.2,10,2.5S10.2,3,10.5,3H12v4.6c0,1.1-0.5,2.1-1.3,2.7l-3.2,2.5l-3.2-2.5C3.5,9.6,3,8.6,3,7.6V3h1.5C4.8,3,5,2.8,5,2.5S4.8,2,4.5,2h-2c0,0,0,0,0,0C2.2,2,2,2.2,2,2.5v5.1c0,1.4,0.6,2.7,1.7,3.5L7,13.7v1.8c0,3.6,2.9,6.5,6.5,6.5c3.6,0,6.5-2.9,6.5-6.5v-2.6c1.1-0.2,2-1.2,2-2.4C22,9.1,20.9,8,19.5,8z M19.5,12c-0.8,0-1.5-0.7-1.5-1.5S18.7,9,19.5,9c0.8,0,1.5,0.7,1.5,1.5C21,11.3,20.3,12,19.5,12z"></path></svg>
                            {isMouseEnterNavIcon && <div className="ms-3">Equipments</div>}
                        </span>
                    </div>
                    <div
                        className={` row py-1 ${activeIcon === 'logout' ? 'shadow' : ''}`}
                        style={{
                            backgroundColor: selectedItem === 'logout' || locate === "" ? 'rgba(0, 126, 255, 0.18)' : '',
                            borderLeft: selectedItem === '' || locate === "" ? '3px solid rgba(0, 126, 255, 0.76)' : 'none',
                            borderLeftRadius: '5px',
                            width: 163,
                            position: 'absolute',
                            bottom: 10,
                        }}
                        onMouseEnter={() => handleMouseEnterIcon('logout')}
                        onMouseLeave={() => handleMouseEnterIcon(null)}
                        onClick={() => { handleLogout(), handleClick('logout') }}
                    >
                        <span className="d-inline-flex align-items-center">
                            <i className="bi-box-arrow-in-left" style={{ fontSize: '1.5rem' }}></i>
                            {isMouseEnterNavIcon && <div className="ms-3">Logout</div>}
                        </span>
                    </div>
                </div>
            </div>
            <div className={`d-flex flex-column flex-shrink-0 p-3 bg-light shadow ${isNavVisible ? '' : 'd-none'} rounded position-fixed vh-100`} style={{ top: '0px', left: '0px' }}>
                {/* <button className={`btn btn-sm float-start`} onClick={() => toggleNavVisible()} >
                        <i className="bi bi-arrow-bar-left" style={{ fontSize: '1rem' }}></i>
                    </button> */}
                <div onClick={() => toggleNavVisible()}>
                    <div className='row-3'>
                        <div className='col'>
                            <i className="bi bi-arrow-bar-left"></i>
                        </div>
                        <div className='col'>
                            <span className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none fs-4`}> Hospital </span>
                        </div>

                    </div>
                    <div>Xin chào,</div>
                    <div style={{ maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <p className='text-break'>{myData ? myData.email : ""}</p>
                    </div>
                    <hr />
                </div>

                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <NavLink to="/home" className={`nav-link  ${selectedItem === 'home' ? 'bg-secondary text-dark' : 'text-dark bg-light'}`} onMouseEnter={() => handleMouseEnter('home')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('home')} > Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dashboard" className={`nav-link ${selectedItem === 'Dashboard' ? 'bg-secondary text-dark' : 'text-dark bg-light'} ${activeColumn === 'Dashboard' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Dashboard')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('Dashboard')}> Dashboard </NavLink>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link text-dark ${selectedItem === 'Patient' ? 'bg-secondary text-white' : ''} ${activeColumn === 'Patient' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Patient')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('Patient')}> Patient </button>
                        {selectedItem === 'Patient' && (
                            <ul className="list-group mt-2">
                                <li className="list-group-item border-0 bg-light"><NavLink to="/patient" className="dropdown-item">+ List Patient</NavLink></li>
                                <li className="list-group-item border-0 bg-light"><NavLink to="/patient/add" className="dropdown-item">+ Add Patient</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link text-dark ${selectedItem === 'Staff' ? 'bg-secondary text-white' : ''} ${activeColumn === 'Staff' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Staff')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('Staff')}> Staff </button>
                        {selectedItem === 'Staff' && (
                            <ul className="list-group mt-2">
                                <li className="list-group-item border-0 bg-light"><NavLink to="/staff" className="dropdown-item">+ List Staff</NavLink></li>
                                <li className="list-group-item border-0 bg-light"><NavLink to="/staff/add" className="dropdown-item">+ Add Staff</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link text-dark ${selectedItem === 'Medicine' ? 'bg-secondary text-white' : ''} ${activeColumn === 'Medicine' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Medicine')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('Medicine')}> Medicine </button>
                        {selectedItem === 'Medicine' && (
                            <ul className="list-group mt-2">
                                <li className="list-group-item border-0 bg-light"><NavLink to="/medicine" className="dropdown-item">+ List Medicine</NavLink></li>
                                <li className="list-group-item border-0 bg-light"><NavLink to="/medicine/add" className="dropdown-item">+ Add Medicine</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link text-dark ${selectedItem === 'Device' ? 'bg-secondary text-white' : ''} ${activeColumn === 'Device' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Device')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('Device')}> Device </button>
                        {selectedItem === 'Device' && (
                            <ul className="list-group mt-2">
                                <li className="list-group-item border-0 bg-light"><NavLink to="/device" className="dropdown-item">+ List Device</NavLink></li>
                                <li className="list-group-item border-0 bg-light"><NavLink to="/device/add" className="dropdown-item">+ Add Device</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link text-dark ${selectedItem === 'Appointment' ? 'bg-secondary text-white' : ''} ${activeColumn === 'Appointment' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Appointment')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleClick('Appointment')}> Appointment </button>
                        {selectedItem === 'Appointment' && (
                            <ul className="list-group mt-2">
                                <li className="list-group-item border-0 bg-light"><NavLink to="/appointment" className="dropdown-item">+ List Atment</NavLink></li>
                                <li className="list-group-item border-0 bg-light"><NavLink to="/appointment/add" className="dropdown-item">+ Add Atment</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <button className={`nav-link text-dark ${selectedItem === 'Logout' ? 'bg-secondary text-white' : ''} ${activeColumn === 'Logout' ? 'shadow' : ''}`} onMouseEnter={() => handleMouseEnter('Logout')} onMouseLeave={() => setActiveColumn(null)} onClick={() => handleLogout()}> Logout </button>
                </ul>
            </div>
            {content}
        </div >
    );
}