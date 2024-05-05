import React, { useState, useEffect } from "react";
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function DashboardStatistics() {
    const navigate = useNavigate();

    const [countStaff, setCountStaff] = useState([]);
    const [countPatient, setCountPatient] = useState([]);
    const [countMedicine, setCountMedicine] = useState([]);
    const [countDevice, setCountDevice] = useState([]);
    // const [countSchedule, setCountSchedule] = useState([]);
    const [activeColumn, setActiveColumn] = useState(null); // Step 1: New state to track active column

    useEffect(() => {
        AxiosInstance.get(`staffs/`)
            .then(res => setCountStaff(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        AxiosInstance.get(`patients/`)
            .then(res => setCountPatient(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        AxiosInstance.get(`medicines/`)
            .then(res => setCountMedicine(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        AxiosInstance.get(`device/`)
            .then(res => setCountDevice(res.data))
            .catch(err => console.log(err));
    }, []);

    // useEffect(() => {
    //     axios.get("http://localhost:3000/doctor")
    //         .then(res => setCountSchedule(res.data))
    //         .catch(err => console.log(err));
    // }, []);

    // Step 2: Function to update active column
    const handleMouseEnter = (columnName) => {
        setActiveColumn(columnName);
    };

    const today = new Date();
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);
    let countDoctorWork = 0;
    countStaff.forEach(doctor => {
        if (doctor.workDay && doctor.workDay.includes(weekday)) {
            countDoctorWork++;
        }
    });

    return (
        <div className="bg-white rounded border shadow">
            <div className="container-fluid px-4 mt-2 fw-bold text-center">
                <h5>Activity Overview</h5>
                <div className="row py-2 ">
                    <div className={`col-md rounded  border border-3 ${activeColumn === 'staffs' ? 'shadow' : ''}  py-3`} style={{ backgroundColor: 'rgba(0, 110, 255, 0.43)' }} onMouseEnter={() => handleMouseEnter('staffs')} onClick={() => navigate('/staff')}>
                        <i className="bi bi-people" style={{ fontSize: '1.5rem' }}></i>
                        <br></br>
                        {countStaff.length}
                        <h6>Staff</h6>
                    </div>
                    <div className={`col-md rounded offset-1 border border-3 ${activeColumn === 'patients' ? 'shadow' : ''} py-3`} style={{ backgroundColor: 'rgba(0, 255, 0, 0.35)' }} onMouseEnter={() => handleMouseEnter('patients')} onClick={() => navigate('/patient')}>
                        <i className="bi bi-people" style={{ fontSize: '1.5rem' }}></i>
                        <br></br>
                        {countPatient.length}
                        <h6>Patient</h6>
                    </div>
                </div>
                <div className="row py-2 ">
                    <div className={`col-md rounded border border-3 ${activeColumn === 'medicines' ? 'shadow' : ''} py-3`} style={{ backgroundColor: 'rgba(255, 255, 0, 0.35)' }} onMouseEnter={() => handleMouseEnter('medicines')} onClick={() => navigate('/medicine')}>
                        <i className="bi bi-capsule" style={{ fontSize: '1.5rem' }}></i>
                        <br></br>
                        {countMedicine.length}
                        <h6>Medicine</h6>
                    </div>
                    <div className={`col-md rounded offset-1 border border-3 ${activeColumn === 'device' ? 'shadow' : ''} py-3`} style={{ backgroundColor: 'rgba(0, 0, 255, 0.35)' }} onMouseEnter={() => handleMouseEnter('device')} onClick={() => navigate('/device')}>
                        <i className="bi bi-heart-pulse" style={{ fontSize: '1.5rem' }}></i>
                        <br></br>
                        {countDevice.length}
                        <h6>Device</h6>
                    </div>
                </div>
            </div>
        </div>

    );
}