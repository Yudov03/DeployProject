import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Schedule from "../Schedule/Schedule";
import { Link } from "react-router-dom";
export default function ReadStaff() { // Ensure props are received here

    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        AxiosInstance.get(`staffs/${id}/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]); // Added id as a dependency

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3 ">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>HEALTHCARE STAFF</h3>
                    </div>
                    <div className="p-2">
                        <svg width="50" height="50" className="p-1 rounded-circle border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="user"><path fill="#42c3cf" d="M31.64,27.72a13.94,13.94,0,0,1-15.28,0A18,18,0,0,0,6.05,42.94a1,1,0,0,0,.27.75,1,1,0,0,0,.73.31H41a1,1,0,0,0,.73-.31,1,1,0,0,0,.27-.75A18,18,0,0,0,31.64,27.72Z"></path><circle cx="24" cy="16" r="12" fill="#42c3cf"></circle></svg>
                    </div>
                    <div className="p-2">
                        <h6 className="">Jonitha Cathrine</h6>
                        <span>admin</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ paddingTop: 20 }}>
                <div className="w-75 rounded bg-white border shadow " style={{ minHeight: 400 }}>
                    <div className="d-flex justify-content-between p-2 align-items-center border-bottom">
                        <div className="mx-3">
                            <button type="button" className="btn btn-light" onClick={handleBackButton}>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </div>
                        <div className=" mx-3">
                            <h4>Detail Information</h4>
                        </div>
                        <div className="me-3"><i className="bi bi-info-square" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className=" w-75 d-flex mt-3 mb-3">
                            <div className="">
                                <svg width="150" height="150" className="p-1 border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="doctor"><path fill="#6563ff" d="M17.998 8.064 6.003 8.11l-.277-3.325A3 3 0 0 1 8.17 1.482l.789-.143a17.031 17.031 0 0 1 6.086 0l.786.143a3 3 0 0 1 2.443 3.302Z"></path><path fill="#d8d8ff" d="M6.009 8.109a5.994 5.994 0 0 0 11.984-.045Z"></path><path fill="#6563ff" d="m17.198 13.385-4.49 4.49a1 1 0 0 1-1.415 0l-4.491-4.49a9.945 9.945 0 0 0-4.736 7.44 1 1 0 0 0 .994 1.108h17.88a1 1 0 0 0 .994-1.108 9.945 9.945 0 0 0-4.736-7.44Z"></path><path fill="#b2b1ff" d="M15.69 12.654a6.012 6.012 0 0 1-7.381 0 10.004 10.004 0 0 0-1.507.73l4.491 4.492a1 1 0 0 0 1.414 0l4.491-4.491a10.005 10.005 0 0 0-1.507-.731Z"></path></svg>
                            </div>
                            <div className="d-flex justify-content-center border border-1 border-primary w-100">
                                <div className="d-flex flex-column w-100 ms-2" >
                                    <div className="d-flex justify-content-center mt-2">
                                        <h5 style={{ textTransform: 'uppercase' }}>{data.position==='D'?"Dr. ":""}{data.name}</h5>
                                    </div>
                                    <div className="row">

                                        <div className="col-10">
                                            <div>Day of birth: {data.dayofbirth}</div>
                                            <div className="d-flex">Gender: {data.gender === 'M' ? "Male" : <div className="ms-1">{data.gender === 'F' ? "Female" : "Other"}</div>}</div>

                                        </div>
                                        <div className="col-2">
                                            <Link to={`/staff/update/${id}`} className="btn btn-sm btn-primary w-75">Edit</Link>
                                        </div>
                                        <div>Address: {data.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center mb-4" >
                        <div className="w-75 border border-1 border-primary" >
                            <div className="d-flex justify-content-center mt-3">
                                <div style={{ fontWeight: 'bold' }}>CONTACT</div>
                            </div>
                            <div className="row p-2">
                                <div className="col-6">Phone: {data.phone}</div>
                                <div className="col-6">Mail: {data.mail}</div>
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                <div style={{ fontWeight: 'bold' }}>CERTIFICATE</div>
                            </div>
                            <div className="row p-2">
                                <div className="col-6">Specialty: {data.specialty}</div>
                                
                                {data.position==='D'?<div className="col-6">Specialty level: {data.specialtylevel}</div>:""}
                                {data.position==='D'?<div className="col-6 d-flex mt-2">Academic degree: {data.certificate === "M"?" Master": <div className="ms-1">{data.certificate==="D"?" Doctor": <div>{data.certificate==="P"?"Ph.D":"No"}</div>}</div> }</div>:""}
                                {data.position==='D'?<div className="col-6 mt-2 d-flex">Academic rank: {data.academicrank === "A" ? "Associate Professor" : <div className="ms-1">{data.academicrank==="P"?"Professor":"No"}</div> }</div>:""}
                                
                            </div>
                            <br />

                        </div>

                    </div>
                    {data.position==='D'?<div className="d-flex justify-content-center mt-5"><div className="" style={{ fontWeight: 'bold' }}>SCHEDULE</div></div>:""}
                    {data.position==='D'?<Schedule read="readStaffs" name={data.name} />:""}
                </div>
            </div>
        </>
    );
}