import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Schedule from '../Schedule/Schedule';
import { Link } from "react-router-dom";
import Appointment from "../Appointment/Appointment";

function ReadPatient() { // Ensure props are received here
    const [data, setData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        AxiosInstance.get(`patients/${id}/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]); // Added id as a dependency

    const navigate = useNavigate(); // Use useNavigate hook
    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3 ">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>PATIENT</h3>
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
                                <svg width="150" height="150" className="p-1 border border-1 border-primary" viewBox="0 0 64 64" id="patient"><path fill="#68c7d3" d="M53 61H11l.43-1.5A17.23 17.23 0 0 1 28 47a4 4 0 0 0 8 0 17.23 17.23 0 0 1 16.57 12.5Z"></path><path fill="#d1e6e9" d="M36 40.42V47a4 4 0 0 1-8 0v-6.58a14.08 14.08 0 0 0 8 0Z"></path><path fill="#30acc2" d="M48 13v9a10.2 10.2 0 0 1-2-.2 10 10 0 0 1-8-9.8v-.53a18.71 18.71 0 0 1-3.57 5A18.92 18.92 0 0 1 21 22h-5v-7A12 12 0 0 1 28 3h10a10 10 0 0 1 10 10Z"></path><path fill="#d1e6e9" d="M46 21.8V27a14 14 0 0 1-20.56 12.37 5 5 0 0 1-6.44-7.3c-.14-.35-.26-.71-.37-1.07a13.92 13.92 0 0 1-.63-4v-5h3a18.92 18.92 0 0 0 13.43-5.57 18.71 18.71 0 0 0 3.57-5V12a10 10 0 0 0 8 9.8Z"></path><path fill="#d1e6e9" d="M18.58 31H17.5a4.31 4.31 0 0 1-1-.12 4.49 4.49 0 0 1-2.16-7.56A4.51 4.51 0 0 1 17.5 22h.5v5a13.92 13.92 0 0 0 .58 4zM51 26.5a4.46 4.46 0 0 1-1.32 3.18 4.41 4.41 0 0 1-2.16 1.2 4.31 4.31 0 0 1-1 .12h-1.1a13.92 13.92 0 0 0 .58-4v-5h.5a4.38 4.38 0 0 1 1.5.26 4.49 4.49 0 0 1 3 4.24z"></path><path fill="#a1d8df" d="M15 38h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm0 5a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l1.5-1.5a1 1 0 0 1 1.42 1.42l-1.5 1.5A1 1 0 0 1 15 43zm5 2a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1z"></path><path fill="#03426d" d="m13 58.12-.06.17a4.81 4.81 0 0 0-.2.53c-.12.31-.22.63-.31 1l-.06.23-.37 1.22a1 1 0 0 1-1 .73.83.83 0 0 1-.22 0 1 1 0 0 1-.38-.2 1.14 1.14 0 0 1-.15-.16 1 1 0 0 1-.16-.87l.43-1.5c.15-.53.33-1 .52-1.56 0-.1.07-.19.11-.29a.39.39 0 0 1 .06-.11 1 1 0 0 1 1.79.88zm40.8 3.48a1.14 1.14 0 0 1-.15.16 1 1 0 0 1-.38.2h-.05A.83.83 0 0 1 53 62a1 1 0 0 1-1-.73L51.67 60l-.06-.23c-.06-.21-.13-.42-.2-.63a14.79 14.79 0 0 0-.7-1.77c-.11-.25-.23-.48-.36-.72a15.91 15.91 0 0 0-4.57-5.37.91.91 0 0 0-.16-.11 14.36 14.36 0 0 0-2-1.24c-.23-.12-.46-.24-.7-.35-.46-.22-.92-.41-1.39-.58l-.53-.2c-.52-.17-1-.31-1.59-.43h-.17a16 16 0 0 0-1.71-.26h-.6A5 5 0 0 1 32 52a5.08 5.08 0 0 1-1.36-.19l-.21-.07-.31-.11a1.87 1.87 0 0 1-.32-.15l-.22-.11a4.58 4.58 0 0 1-1.06-.79h-.05l-.12-.13-.12-.13L28 50l-.17-.24a4.93 4.93 0 0 1-.72-1.76c-.31 0-.61 0-.91.08s-.61.08-.91.13-.47.08-.7.14l-.31.07-.53.13-.38.11c-.4.12-.79.26-1.19.41l-.57.23-.57.26-.7.35a14.36 14.36 0 0 0-2 1.24 15.64 15.64 0 0 0-3.61 3.65 1 1 0 0 1-1.7-1 .33.33 0 0 1 .07-.13 3.37 3.37 0 0 1 .29-.37 13.2 13.2 0 0 1 1.42-1.67 17.1 17.1 0 0 1 3.36-2.76l.62-.38c.21-.12.42-.24.64-.35s.38-.2.58-.29l.19-.09.53-.25c.51-.22 1-.42 1.57-.59l.46-.15a19 19 0 0 1 2-.47c.3-.06.61-.1.91-.14h.32c.22 0 .45 0 .67-.06h.52L28 46a1 1 0 0 1 1 1 2.84 2.84 0 0 0 .05.51 3 3 0 0 0 .83 1.61 3.79 3.79 0 0 0 .38.32l.33.2a2.57 2.57 0 0 0 .52.21 2.34 2.34 0 0 0 .38.09A2.15 2.15 0 0 0 32 50a3 3 0 0 0 3-3 1 1 0 0 1 1-1 17.8 17.8 0 0 1 2.2.14c.21 0 .43 0 .64.09.51.08 1 .18 1.53.31l.69.18a18.81 18.81 0 0 1 4.72 2.14l.57.38.63.44.42.34.09.07c.34.28.66.56 1 .86a17.06 17.06 0 0 1 3.71 4.9c.08.15.16.3.23.45s.25.54.37.81a18.32 18.32 0 0 1 .75 2.12l.43 1.5a1 1 0 0 1-.18.87z"></path><path fill="#03426d" d="M32 52a5 5 0 0 1-5-5v-6.58a1 1 0 0 1 .4-.8 1 1 0 0 1 .89-.16 13 13 0 0 0 7.42 0 1 1 0 0 1 .89.16 1 1 0 0 1 .4.8V47a5 5 0 0 1-5 5zm-3-10.3V47a3 3 0 0 0 6 0v-5.3a15.15 15.15 0 0 1-6 0zM48 23a11 11 0 0 1-10.7-8.42 20.06 20.06 0 0 1-2.16 2.56A19.83 19.83 0 0 1 21 23h-5a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v2h4a17.81 17.81 0 0 0 12.72-5.28A17.33 17.33 0 0 0 37.1 11a1 1 0 0 1 1.9.44V12a9 9 0 0 0 7.2 8.82c.26.05.53.09.8.12V13a9 9 0 0 0-9-9H28a11 11 0 0 0-10.11 6.65 1 1 0 0 1-1.84-.8A13 13 0 0 1 28 2h10a10.8 10.8 0 0 1 2.2.22A11 11 0 0 1 49 13v9a1 1 0 0 1-1 1z"></path><path fill="#03426d" d="M16 16a1 1 0 0 1-1-1 9.58 9.58 0 0 1 .06-1.12 1 1 0 1 1 2 .24A8.51 8.51 0 0 0 17 15a1 1 0 0 1-1 1zm16 26a15.09 15.09 0 0 1-4.29-.62 15.83 15.83 0 0 1-2.28-.89A6.12 6.12 0 0 1 23 41a6 6 0 0 1-6-6 5.94 5.94 0 0 1 .84-3.06c-.08-.21-.15-.43-.22-.65A15.09 15.09 0 0 1 17 27v-5a1 1 0 0 1 1-1h3a17.81 17.81 0 0 0 12.72-5.28A17.33 17.33 0 0 0 37.1 11a1 1 0 0 1 1.9.44V12a9 9 0 0 0 7.2 8.82 1 1 0 0 1 .8 1V27a14.88 14.88 0 0 1-3 9 1 1 0 0 1-1.6-1.2A13 13 0 0 0 45 27v-4.42a10.87 10.87 0 0 1-4.78-2.8 11 11 0 0 1-2.92-5.2 20.06 20.06 0 0 1-2.16 2.56A19.83 19.83 0 0 1 21 23h-2v4a12.81 12.81 0 0 0 .54 3.71c.1.33.21.66.34 1a1 1 0 0 1-.12 1A3.92 3.92 0 0 0 19 35a4 4 0 0 0 4 4 4.08 4.08 0 0 0 2-.5 1 1 0 0 1 .95 0 12.38 12.38 0 0 0 2.38 1 13 13 0 0 0 7.42 0 12.74 12.74 0 0 0 4.09-2.07A1 1 0 0 1 41 39a14.87 14.87 0 0 1-4.71 2.39A15.09 15.09 0 0 1 32 42z"></path><path fill="#03426d" d="M18.58 32H17.5a5.51 5.51 0 0 1-5.5-5.5 5.51 5.51 0 0 1 5.5-5.5h.5a1 1 0 0 1 1 1v5a12.81 12.81 0 0 0 .54 3.71 1 1 0 0 1-.16.89 1 1 0 0 1-.8.4zM17 23a3.4 3.4 0 0 0-2 1 3.45 3.45 0 0 0-1 2.48A3.5 3.5 0 0 0 17.3 30a14.87 14.87 0 0 1-.3-3zm29.5 9h-1.08a1 1 0 0 1-.8-.4 1 1 0 0 1-.16-.89A12.81 12.81 0 0 0 45 27v-5a1 1 0 0 1 1-1h.5a5.51 5.51 0 0 1 5.5 5.5 5.51 5.51 0 0 1-5.5 5.5zm.5-9v4a14.87 14.87 0 0 1-.3 3 3.4 3.4 0 0 0 2.3-1 3.45 3.45 0 0 0 1-2.48A3.5 3.5 0 0 0 47 23z"></path><path fill="#a1d8df" d="M15 38h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm0 5a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l1.5-1.5a1 1 0 0 1 1.42 1.42l-1.5 1.5A1 1 0 0 1 15 43zm5 2a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm8-9.5a1 1 0 0 1-1-1 3.5 3.5 0 0 0-3.5-3.5 1 1 0 0 1 0-2 5.51 5.51 0 0 1 5.5 5.5 1 1 0 0 1-1 1z"></path><path fill="#03426d" d="m13 58.12-.06.17a4.81 4.81 0 0 0-.2.53c-.12.31-.22.63-.31 1l-.06.23-.37 1.22a1 1 0 0 1-1 .73.83.83 0 0 1-.22 0 1 1 0 0 1-.38-.2 1.14 1.14 0 0 1-.15-.16 1 1 0 0 1-.16-.87l.43-1.5c.15-.53.33-1 .52-1.56.06-.14.11-.27.17-.4a1 1 0 0 1 1.79.88zm40.8 3.48a1.14 1.14 0 0 1-.15.16 1 1 0 0 1-.38.2h-.05A.83.83 0 0 1 53 62a1 1 0 0 1-1-.73L51.67 60l-.06-.23c-.06-.21-.12-.42-.2-.63a14.79 14.79 0 0 0-.7-1.77c-.11-.25-.23-.48-.36-.72s-.38-.65-.58-1c-.08-.14-.17-.29-.26-.42s-.33-.48-.5-.71l-.12-.15c-.21-.28-.42-.54-.65-.8s-.39-.44-.6-.65-.41-.42-.63-.62-.64-.57-1-.83l-.42-.33a17.46 17.46 0 0 0-2-1.24c-.23-.12-.46-.24-.7-.35-.46-.22-.92-.41-1.39-.58l-.5-.17a14.33 14.33 0 0 0-1.59-.43h-.17a16 16 0 0 0-1.71-.26h-.6A5 5 0 0 1 32 52a5.08 5.08 0 0 1-1.36-.19l-.21-.07-.31-.11a1.87 1.87 0 0 1-.32-.15l-.22-.11a4.58 4.58 0 0 1-1.06-.79l-.17-.17-.12-.13L28 50l-.17-.24a4.93 4.93 0 0 1-.72-1.76c-.31 0-.61 0-.91.08s-.61.08-.91.13l-.7.14-.31.07-.53.13-.38.11c-.4.12-.79.26-1.19.41l-.57.23-.57.26-.7.35a17.46 17.46 0 0 0-2 1.24 15.64 15.64 0 0 0-3.61 3.65 1 1 0 0 1-1.7-1 5.74 5.74 0 0 1 .36-.5 17.39 17.39 0 0 1 1.42-1.67 18.92 18.92 0 0 1 3.36-2.76l.62-.38c.21-.12.42-.24.64-.35s.38-.2.58-.29l.19-.09.53-.25c.51-.22 1-.42 1.57-.59l.46-.15a19 19 0 0 1 2-.47c.3-.06.61-.1.91-.14h.32c.22 0 .45 0 .67-.06h.52L28 46a1 1 0 0 1 1 1 2.84 2.84 0 0 0 .05.51 3 3 0 0 0 .83 1.61 3.9 3.9 0 0 0 .38.33l.33.2a2.57 2.57 0 0 0 .52.21 2.34 2.34 0 0 0 .38.09A2.15 2.15 0 0 0 32 50a3 3 0 0 0 3-3 1 1 0 0 1 1-1 17.8 17.8 0 0 1 2.2.14c.21 0 .43 0 .64.09.51.08 1 .18 1.53.31l.69.18a18.81 18.81 0 0 1 4.72 2.14l.57.38q.54.38 1 .78l.09.07c.34.28.66.56 1 .86a18.27 18.27 0 0 1 3.71 4.9c.08.15.16.3.23.45s.25.54.37.81a18.32 18.32 0 0 1 .75 2.12l.43 1.5a1 1 0 0 1-.13.87z"></path></svg>
                            </div>
                            <div className="d-flex justify-content-center border border-1 border-primary w-100">
                                <div className="d-flex flex-column w-100 ms-2" >
                                    <div className="d-flex justify-content-center mt-2">
                                        <h5 style={{ textTransform: 'uppercase' }}>{data.name}</h5>
                                    </div>
                                    <div className="row">

                                        <div className="col-10">
                                            <div>Day of birth: {data.dayofbirth}</div>
                                            <div className="d-flex">Gender: {data.gender === 'M' ? "Male" : <div className="ms-1">{data.gender === 'F' ? "Female" : "Other"}</div>}</div>
                                            <div>Address: {data.address}</div>
                                        </div>
                                        <div className="col-2 mx-auto mt-4 mb-4">
                                            <Link to={`/patient/update/${id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center" >
                        <div className="w-75 border border-1 border-primary" >
                            <div className="d-flex justify-content-center mt-3">
                                <div style={{ fontWeight: 'bold' }}>CONTACT</div>
                            </div>
                            <div className="row p-2">
                                <div className="col-6">Phone: {data.phone}</div>
                                <div className="col-6">Mail: {data.mail}</div>
                            </div>

                            <br />

                        </div>

                    </div>
                </div>
            </div>
            <Appointment read="readPatient" name={data.name} />
        </>
    );
}
export default ReadPatient;