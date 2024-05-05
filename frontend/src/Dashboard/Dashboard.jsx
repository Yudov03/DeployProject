
import React, { useState, useEffect } from 'react';
import DashboardStatistics from './DashboardStatistics';
// import Appointment from '../Appointment/Appointment';
import AxiosInstance from '../components/AxiosInstance';

import { WeeklyAppointmentChart, EntityCountChart, SatisfactionAndBillingChart, Satisfaction } from './DashboardChart';



export default function Dashboard() {
    const [data, setData] = useState([]);
    const [countStaff, setCountStaff] = useState([]);
    const [countPatient, setCountPatient] = useState([]);
    const [countMedicine, setCountMedicine] = useState([]);
    const [countDevice, setCountDevice] = useState([]);
    const [countSchedule, setCountSchedule] = useState([]);
    useEffect(() => {
        // Define an array of Axios requests
        const requests = [
            AxiosInstance.get(`appointments/`),
            AxiosInstance.get(`staffs/`),
            AxiosInstance.get(`device/`),
            AxiosInstance.get(`patients/`),
            AxiosInstance.get(`medicines/`),
            AxiosInstance.get(`schedule/`)
        ];

        // Execute all requests in parallel
        Promise.all(requests)
            .then(responses => {
                // Extract data from responses
                const [
                    appointmentsResponse,
                    staffsResponse,
                    devicesResponse,
                    patientsResponse,
                    medicinesResponse,
                    scheduleResponse
                ] = responses;

                // Set state for each data
                setData(appointmentsResponse.data);
                setCountStaff(staffsResponse.data);
                setCountDevice(devicesResponse.data);
                setCountPatient(patientsResponse.data);
                setCountMedicine(medicinesResponse.data);
                setCountSchedule(scheduleResponse.data);

                console.log("Data fetched successfully!");
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);


    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>BK CLINIC</h3>
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
                <div className="w-75 rounded bg-white border shadow  pb-2" style={{}}>
                    <div className="d-flex justify-content-center mt-3 align-items-end ">
                        <svg className='mb-1 me-2' style={{ height: 35, }} viewBox="0 0 19 19"><path fill="#444" d="M16 10.1C16 5.7 12.4 2 8 2s-8 3.7-8 8.1c0 1.4.3 2.9.9 3.9h4.9c.5.6 1.3 1 2.2 1s1.7-.4 2.2-1h4.9c.6-1 .9-2.5.9-3.9zM14 7v1l-4.1 3.5c0 .1.1.3.1.5 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.3 0 .6.1.8.2L13 7h1zm-4-3h1v1h-1V4zM5 4h1v1H5V4zm-3 8H1v-1h1v1zm1-4H2V7h1v1zm12 4h-1v-1h1v1z"></path><path fill="#444" d="M9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
                        <h3>Dashboard</h3>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='w-75'>
                    <div className='row mx-auto'>
                        <div className='col-5 mb-4'>
                            <DashboardStatistics />
                        </div>
                        <div className='col-7 border bg-white shadow rounded-3  mb-4'>
                            <EntityCountChart
                                countStaff={countStaff}
                                countPatient={countPatient}
                                countDevice={countDevice}
                                countMedicine={countMedicine}
                            />
                        </div>
                        <div className="col-6">
                            <div className="border bg-white shadow rounded-3 p-4">
                                <SatisfactionAndBillingChart data={data} />
                            </div>
                        </div>
                        <div className="col-6 shadow rounded-3 bg-white p-4 mb-4" >
                            <Satisfaction data={data} />
                        </div>
                        <div className="col-12 w-100 shadow rounded-3 bg-white p-4 mb-5">
                            <WeeklyAppointmentChart data={data} />
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
