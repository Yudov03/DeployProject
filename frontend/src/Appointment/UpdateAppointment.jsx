import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance";
import { toast } from "react-toastify";
export default function UpdateAppointment() {
    const { id } = useParams();
    const [values, setValues] = useState({
        time: '',
        date: '',
        doctorname: '',
        patientname: '',
        feestatus: '',
        completed: '',
        rate: '',
        diagnosis: '',
    })

    useEffect(() => {
        AxiosInstance.get(`appointments/${id}/`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));

        AxiosInstance.get(`staffs/`)
            .then(res => {
                const doctors = res.data.filter(staff => staff.position === "D");
                setDoctor(doctors);
                // setStaff(res.data);
            })
            .catch(err => console.log(err));
        AxiosInstance.get(`patients/`)
            .then(res => setPatient(res.data))
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await AxiosInstance.put(`appointments/${id}/`, values)
            console.log(res);
            if (res.status === 200) {
                toast.success('Updated Success');
                // setValues({
                //     time: '',
                //     date: '',
                //     doctorname: '',
                //     patientname: '',
                //     feestatus: false,
                //     completed: false,
                // });
            } else if (res.status === 400) {
                toast.error('Please fill full');
            } else {
                toast.error('An error occurred');
            }
            // .catch(err => console.log(err));
        } catch (error) {
            console.log(error);
            toast.error(`${error}, Please try again!`);
        }

        // AxiosInstance.put(`appointments/${id}/`, values)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));
    }

    const [doctor, setDoctor] = useState([]);
    const [patient, setPatient] = useState([]);

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>APPOINMENT</h3>
                    </div>
                    <div className="p-2">
                        <svg width="50" height="50" className="p-1 rounded-circle border border-1 border-primary" viewBox="0 0 48 48" ><path fill="#42c3cf" d="M31.64,27.72a13.94,13.94,0,0,1-15.28,0A18,18,0,0,0,6.05,42.94a1,1,0,0,0,.27.75,1,1,0,0,0,.73.31H41a1,1,0,0,0,.73-.31,1,1,0,0,0,.27-.75A18,18,0,0,0,31.64,27.72Z"></path><circle cx="24" cy="16" r="12" fill="#42c3cf"></circle></svg>
                    </div>
                    <div className="p-2">
                        <h6 className="">Jonitha Cathrine</h6>
                        <span>admin</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ paddingTop: 20 }}>
                <div className="w-75 rounded bg-white border shadow " style={{ minHeight: 400 }}>
                    <div className="d-flex justify-content-between p-2 align-items-center border-bottom">
                        <div className="mx-3">
                            <button type="button" className="btn btn-light" onClick={handleBackButton}>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </div>
                        <div className=" mx-3">
                            <h4>Edit Information</h4>
                        </div>
                        <div className="me-3"><i className="bi bi-pencil-square" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>
                    <div className="d-flex justify-content-center m-4" >
                        <div className="mx-5" style={{ width: 600 }}>
                            <form onSubmit={handleUpdate}>
                                <div className="row">
                                    <div className="col-4">
                                        <svg width="150" height="150" className="p-1 border border-1 border-primary" viewBox="0 0 512 512"><path fill="#fff" d="M490.475 154.554v253.31c0 18.662-15.14 33.803-33.803 33.803H55.328c-18.662 0-33.803-15.14-33.803-33.803v-253.31h468.95z"></path><path fill="#fff" d="M232.074 345.962h47.852v47.852h-47.852zM184.222 298.11h47.852v47.852h-47.852zM375.63 298.11h47.852v47.852H375.63zM279.926 298.11h47.852v47.852h-47.852z"></path><path fill="#a4c2f7" d="M490.475 102.223v52.331H21.525v-52.331c0-18.662 15.14-33.803 33.803-33.803h401.345c18.662 0 33.802 15.14 33.802 33.803z"></path><circle cx="423.482" cy="479.948" r="9.57" fill="#418cfe"></circle><path fill="#a4c2f7" d="M375.63 250.258h47.852v47.852H375.63z"></path><path fill="#fff" d="M423.482 168.909c0 13.217-10.709 23.926-23.926 23.926s-23.926-10.709-23.926-23.926v-28.175c0-17.16 17.946-31.074 36.406-20.95 6.562 3.878 11.446 11.571 11.446 20.414v28.711z"></path><path fill="#418cfe" d="M409.127 20.568c7.924 0 14.356 6.431 14.356 14.356s-6.431 14.356-14.356 14.356-14.356-6.431-14.356-14.356 6.431-14.356 14.356-14.356z"></path><path fill="#a4c2f7" d="M327.778 298.11h47.852v47.852h-47.852z"></path><path fill="#fff" d="M327.778 250.258h47.852v47.852h-47.852zM279.926 250.258h47.852v47.852h-47.852zM327.778 168.909c0 13.217-10.709 23.926-23.926 23.926s-23.926-10.709-23.926-23.926v-28.175c0-20.911 25.214-33.089 40.846-17.456a23.899 23.899 0 0 1 7.006 16.92v28.711z"></path><circle cx="279.926" cy="20.568" r="9.57" fill="#418cfe"></circle><path fill="#a4c2f7" d="M232.074 298.11h47.852v47.852h-47.852z"></path><path fill="#fff" d="M232.074 250.258h47.852v47.852h-47.852zM184.222 345.962h47.852v47.852h-47.852z"></path><path fill="#fff" d="M184.222 250.258h47.852v47.852h-47.852zM232.074 168.909c0 13.217-10.709 23.926-23.926 23.926s-23.926-10.709-23.926-23.926v-28.175c0-20.908 25.223-33.08 40.846-17.456a23.899 23.899 0 0 1 7.006 16.92v28.711zM136.37 345.962h47.852v47.852H136.37zM136.37 298.11h47.852v47.852H136.37z"></path><path fill="#418cfe" d="M170.747 472.291c7.924 0 14.356 6.431 14.356 14.356 0 7.924-6.431 14.356-14.356 14.356-7.934 0-14.356-6.431-14.356-14.356 0-7.924 6.422-14.356 14.356-14.356z"></path><path fill="#a4c2f7" d="M88.518 345.962h47.852v47.852H88.518z"></path><path fill="#fff" d="M88.518 298.11h47.852v47.852H88.518zM136.37 168.909c0 13.217-10.709 23.926-23.926 23.926s-23.926-10.709-23.926-23.926v-28.175c0-12.422 9.427-23.036 21.476-24.338 13.567-1.454 26.376 9.229 26.376 23.802v28.711z"></path><circle cx="117.229" cy="39.709" r="9.57" fill="#418cfe"></circle><circle cx="50.236" cy="470.377" r="9.57" fill="#418cfe"></circle><path fill="#418cfe" d="M184.222 307.68a9.57 9.57 0 0 1-9.57-9.57v-47.852a9.57 9.57 0 0 1 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57 9.57 9.57 0 0 1-9.57 9.57h-38.282v38.282a9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M232.074 307.68a9.57 9.57 0 0 1-9.57-9.57v-47.852a9.57 9.57 0 0 1 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57a9.57 9.57 0 0 1-9.57 9.57h-38.282v38.282a9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M279.926 307.68c-5.285 0-9.57-4.285-9.57-9.57v-47.852a9.57 9.57 0 0 1 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57a9.57 9.57 0 0 1-9.57 9.57h-38.282v38.282c0 5.285-4.285 9.57-9.57 9.57z"></path><path fill="#418cfe" d="M327.778 307.68c-5.285 0-9.57-4.285-9.57-9.57v-47.852a9.57 9.57 0 0 1 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57a9.57 9.57 0 0 1-9.57 9.57h-38.282v38.282c0 5.285-4.285 9.57-9.57 9.57z"></path><path fill="#418cfe" d="M423.482 307.68c-5.285 0-9.57-4.285-9.57-9.57v-38.282h-28.711v38.282c0 5.285-4.285 9.57-9.57 9.57s-9.57-4.285-9.57-9.57v-47.852a9.57 9.57 0 0 1 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57v47.852c0 5.285-4.286 9.57-9.571 9.57zM88.518 355.532a9.57 9.57 0 0 1-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57c0 5.285-4.285 9.57-9.57 9.57H98.088v38.282a9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M136.37 355.532a9.57 9.57 0 0 1-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57c0 5.285-4.285 9.57-9.57 9.57H145.94v38.282a9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M184.222 355.532a9.57 9.57 0 0 1-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57c0 5.285-4.285 9.57-9.57 9.57h-38.282v38.282a9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M232.074 355.532a9.57 9.57 0 0 1-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57s-4.285 9.57-9.57 9.57h-38.282v38.282a9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M327.778 355.532h-47.852c-5.285 0-9.57-4.285-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57s-4.285 9.57-9.57 9.57h-38.282v28.711h38.282c5.285 0 9.57 4.285 9.57 9.57 0 5.286-4.285 9.571-9.57 9.571z"></path><path fill="#418cfe" d="M375.63 355.532h-47.852c-5.285 0-9.57-4.285-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57s-4.285 9.57-9.57 9.57h-38.282v28.711h38.282c5.285 0 9.57 4.285 9.57 9.57.001 5.286-4.285 9.571-9.57 9.571z"></path><path fill="#418cfe" d="M423.482 355.532H375.63c-5.285 0-9.57-4.285-9.57-9.57V298.11c0-5.285 4.285-9.57 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57v47.852c.001 5.285-4.285 9.57-9.57 9.57zm-38.281-19.141h28.711V307.68h-28.711v28.711zM136.37 403.384H88.518a9.57 9.57 0 0 1-9.57-9.57v-47.852c0-5.285 4.285-9.57 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57c0 5.285-4.285 9.57-9.57 9.57H98.088v28.711h38.282c5.286 0 9.57 4.285 9.57 9.57s-4.284 9.571-9.57 9.571z"></path><path fill="#418cfe" d="M184.222 403.384H136.37a9.57 9.57 0 0 1-9.57-9.57v-47.852c0-5.285 4.285-9.57 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57c0 5.285-4.285 9.57-9.57 9.57H145.94v28.711h38.282c5.286 0 9.57 4.285 9.57 9.57s-4.284 9.571-9.57 9.571z"></path><path fill="#418cfe" d="M232.074 403.384h-47.852a9.57 9.57 0 0 1-9.57-9.57v-47.852c0-5.285 4.285-9.57 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57c0 5.285-4.285 9.57-9.57 9.57h-38.282v28.711h38.282c5.286 0 9.57 4.285 9.57 9.57s-4.284 9.571-9.57 9.571z"></path><path fill="#418cfe" d="M279.926 403.384h-47.852a9.57 9.57 0 0 1-9.57-9.57v-47.852c0-5.285 4.285-9.57 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57v47.852c0 5.285-4.285 9.57-9.57 9.57zm-38.282-19.141h28.711v-28.711h-28.711v28.711z"></path><path fill="#418cfe" d="M456.672 451.236H55.327c-23.916 0-43.373-19.458-43.373-43.373V154.554a9.57 9.57 0 0 1 9.57-9.57 9.57 9.57 0 0 1 9.57 9.57v253.309c0 13.362 10.87 24.233 24.232 24.233h401.345c13.362 0 24.233-10.87 24.233-24.233V154.554a9.57 9.57 0 0 1 9.57-9.57c5.285 0 9.57 4.285 9.57 9.57v253.309c.001 23.916-19.456 43.373-43.372 43.373z"></path><path fill="#418cfe" d="M490.475 164.124h-66.993c-5.285 0-9.57-4.285-9.57-9.57a9.57 9.57 0 0 1 9.57-9.57h57.422v-42.761c0-13.362-10.87-24.232-24.233-24.232H55.327c-13.362 0-24.232 10.87-24.232 24.232v42.761h57.422a9.57 9.57 0 0 1 9.57 9.57 9.57 9.57 0 0 1-9.57 9.57H21.525a9.57 9.57 0 0 1-9.57-9.57v-52.331c0-23.916 19.457-43.373 43.373-43.373h401.345c23.916 0 43.373 19.457 43.373 43.373v52.331c-.001 5.285-4.286 9.57-9.571 9.57z"></path><path fill="#418cfe" d="M375.63 164.124h-47.852c-5.285 0-9.57-4.285-9.57-9.57a9.57 9.57 0 0 1 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57.001 5.285-4.285 9.57-9.57 9.57zm-95.704 0h-47.852a9.57 9.57 0 0 1-9.57-9.57 9.57 9.57 0 0 1 9.57-9.57h47.852c5.285 0 9.57 4.285 9.57 9.57s-4.285 9.57-9.57 9.57zm-95.704 0H136.37a9.57 9.57 0 0 1-9.57-9.57 9.57 9.57 0 0 1 9.57-9.57h47.852a9.57 9.57 0 0 1 9.57 9.57 9.57 9.57 0 0 1-9.57 9.57z"></path><path fill="#418cfe" d="M112.444 202.406c-18.47 0-33.496-15.027-33.496-33.496v-28.711c0-32.478 41.296-45.436 60.323-20.058 9.942 13.237 5.624 24.426 6.67 48.769-.001 18.469-15.027 33.496-33.497 33.496zm-14.356-62.208v28.711c0 7.916 6.44 14.356 14.356 14.356s14.356-6.44 14.356-14.356c-.687-30.734 2.78-33.455-6.76-40.892-5.129-2.596-5.356-1.822-7.003-2.161-8.405-.289-14.949 6.308-14.949 14.342zm110.06 62.208c-18.47 0-33.496-15.027-33.496-33.496v-28.711c0-32.175 41.036-45.783 60.323-20.058 9.942 13.237 5.624 24.426 6.67 48.769-.001 18.469-15.027 33.496-33.497 33.496zm-14.356-62.208v28.711c0 7.916 6.44 14.356 14.356 14.356 7.916 0 14.356-6.44 14.356-14.356-.714-31.913 3.033-34.14-7.941-41.557l-.878-.407c-3.414-1.275-4.413-.974-4.943-1.09-8.406-.288-14.95 6.309-14.95 14.343zm110.06 62.208c-18.47 0-33.496-15.027-33.496-33.496v-28.711c0-19.523 16.507-34.766 35.579-33.431 17.255.923 31.414 15.493 31.414 33.431v28.711c-.001 18.469-15.027 33.496-33.497 33.496zm-14.356-62.208v28.711c0 7.916 6.439 14.356 14.356 14.356 7.916 0 14.356-6.44 14.356-14.356-.629-28.145 2.179-32.583-4.456-39.107l-2.303-1.784c-.657-.275-2.339-1.793-6.862-2.157l-.141-.006c-8.406-.287-14.95 6.309-14.95 14.343zm110.06 62.208c-18.47 0-33.496-15.027-33.496-33.496v-28.711c0-29.555 34.986-43.998 56.058-24.761 15.198 13.797 9.87 29.231 10.935 53.472 0 18.469-15.027 33.496-33.497 33.496zm-14.355-62.208v28.711c0 7.916 6.439 14.356 14.356 14.356s14.356-6.44 14.356-14.356c-.713-31.894 3.02-34.169-7.946-41.559a282.6 282.6 0 0 0-.871-.403c-3.527-1.303-4.299-.952-4.945-1.091-8.407-.288-14.95 6.308-14.95 14.342z"></path></svg>
                                    </div>
                                    <div className="col-8">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="doctorInputid">Select Doctor:</label>
                                        <div className="d-flex align-items-center">
                                            <select className="form-control ms-2" id="doctorInputid" value={values.doctorname} onChange={(e) => setValues({ ...values, doctorname: e.target.value })}>
                                                <option value="" disabled>Select a doctor</option>
                                                {doctor.map((doc, index) => (
                                                    <option key={index} value={doc.name}>Doctor: {doc.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <label className="mt-3" style={{ fontWeight: 'bold' }} htmlFor="doctorInd">Select Patient:</label>
                                        <div className="d-flex align-items-center">
                                            <select className="form-control ms-2" id="doctorInd" value={values.patientname} onChange={(e) => setValues({ ...values, patientname: e.target.value })}>
                                                <option value="" disabled>Select a patient</option>
                                                {patient.map((pat, index) => (
                                                    <option key={index} value={pat.name}>Patient: {pat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <label style={{ fontWeight: 'bold' }}>Date:</label>
                                        <input className="form-control" type="date" value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })}></input>
                                    </div>
                                    <div className="col-4">
                                        <label style={{ fontWeight: 'bold' }}>Time:</label>
                                        <input className="form-control" type="time" value={values.time} onChange={(e) => setValues({ ...values, time: e.target.value })}></input>
                                    </div>
                                    <div className="col-2">
                                        <label style={{ fontWeight: 'bold' }}>{values.feestatus === false ? <div style={{ color: 'red' }}>Unpaid</div> : <div style={{ color: 'green' }}>Paid</div>}</label>
                                        <div className="form-check form-switch ms-2">
                                            < input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={values.feestatus} onClick={e => setValues({ ...values, feestatus: !values.feestatus })} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <label style={{ fontWeight: 'bold' }}>{values.completed === false ? <div style={{ color: 'red' }}>Uncompleted</div> : <div style={{ color: 'green' }}>Completed</div>}</label>
                                        <div className="form-check form-switch ms-2">
                                            < input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={values.completed} onClick={e => setValues({ ...values, completed: !values.completed })} readOnly />
                                        </div>
                                    </div>

                                    {values.completed ?
                                        <div className="mt-3 row">
                                            <div className="col-6">
                                                <label style={{ fontWeight: 'bold' }} htmlFor="rateid">Rate:</label>
                                                <select className="form-control" value={values.rate} id="rateid" onChange={(event) => setValues({ ...values, rate: event.target.value })}>
                                                    <option value="" disabled>Choose status</option>
                                                    <option value="E">Excellent</option>
                                                    <option value="G">Good</option>
                                                    <option value="O">Ok</option>
                                                    <option value="P">Poor</option>
                                                    <option value="T">Terrible</option>
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <label style={{ fontWeight: 'bold' }} htmlFor="name">Diagnosis:</label>
                                                <input type="text" className="form-control" placeholder="Enter diagnosis" value={values.diagnosis} onChange={e => setValues({ ...values, diagnosis: e.target.value })} />
                                            </div>
                                        </div>

                                        : ""}
                                </div>
                                <div className="d-grid gap-2 col-3 mx-auto mt-4">
                                    <button className=" btn btn-success">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}