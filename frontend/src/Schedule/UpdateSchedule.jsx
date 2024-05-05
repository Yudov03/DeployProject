import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance";
import { toast } from "react-toastify";
export default function UpdateSchedule() {
    const { id } = useParams();
    const [values, setValues] = useState({
        name: '',
        date: '',
        start: '',
        end: '',
    })
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        AxiosInstance.get(`schedule/${id}/`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
        AxiosInstance.get(`staffs/`)
            .then(res => {
                const doctors = res.data.filter(staff => staff.position === "D");
                setDoctor(doctors);
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await AxiosInstance.put(`schedule/${id}/`, values)
            console.log(res);
            if (res.status === 200) {
                toast.success('Updated Success');
            } else if (res.status === 400) {
                toast.error('Please fill full');
            } else {
                toast.error('An error occurred');
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error}, Please try again!`);
        }
        // AxiosInstance.put(`schedule/${id}/`, values)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>SCHEDULE</h3>
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
                                        <svg width="150" height="150" className="p-1 border border-1 border-primary" viewBox="0 0 512 512"><path fill="#9bc9ff" fillRule="evenodd" d="M426.787 82.753c8.585-14.869 27.711-19.988 42.585-11.419l12.217 7.038c7.214 4.156 12.352 10.907 14.508 18.944 2.148 8.004 1.056 16.478-3.088 23.655L316.288 427.055l-66.223-38.206L426.787 82.753zM14.872 145.16h366.65l16.785-29.095h-11.973c-7.32 0-13.265-5.957-13.265-13.274V72.2h-58.19v30.59c0 7.294-5.97 13.274-13.264 13.274h-18.397c-7.32 0-13.265-5.957-13.265-13.274V72.2h-58.19v30.59c0 7.317-5.945 13.274-13.265 13.274h-18.397c-7.32 0-13.265-5.957-13.265-13.274V72.2h-58.19v30.59c0 7.323-5.999 13.274-13.312 13.274h-18.35c-7.32 0-13.264-5.957-13.264-13.274V72.2H47.929c-18.253 0-33.057 14.857-33.057 33.1v39.86zm117.625 56.69v61.558H70.958V201.85h61.539zm0 69.554v61.558H70.958v-61.558h61.539zm0 69.559v61.558H70.958v-61.558h61.539zm264.461 45.34v58.977l64.221-64.251h-58.948a5.28 5.28 0 0 0-5.273 5.274z" clipRule="evenodd"></path><path fill="#57a4ff" fillRule="evenodd" d="M489.545 118.97 314.823 421.592l-59.294-34.208L430.251 84.753c7.5-12.982 24.152-17.444 37.124-9.953l12.217 7.038c6.274 3.618 10.755 9.481 12.642 16.514 1.886 7.028.896 14.354-2.689 20.618zM386.759 328.962h20.001v-34.591l-20.001 34.591zm76.087 32.699V197.185l-40.095 69.474v70.304c0 4.42-3.585 8-8.019 8h-37.218l-52.832 91.559a8.282 8.282 0 0 1-2.925 2.929l-12.972 7.481h68.775c2.594 0 5.047-.293 7.359-.858v-59.771c0-9.524 7.783-17.274 17.312-17.274h59.766c.566-2.316.849-4.769.849-7.368zm-61.888 73.959 50.568-50.591h-49.294c-.708 0-1.274.58-1.274 1.274v49.317zm-148.353-31.458v56.718l49.152-28.359-49.152-28.359zm58.35-144.754 26.227-45.435v-8.123h-53.586v53.558h27.359zm-27.359 15.996v31.336l18.114-31.336h-18.114zm-139.108 69.559h53.587v53.558h-53.587v-53.558zm-69.53 0h53.539v53.558H74.958v-53.558zm0-69.559h53.539v53.558H74.958v-53.558zm53.539-15.996H74.958V205.85h53.539v53.558zm69.578 0h-53.587V205.85h53.587v53.558zm15.991 0h53.539V205.85h-53.539v53.558zm-15.991 69.554h-53.587v-53.558h53.587v53.558zm15.991-53.558v53.558h53.539v-53.558h-53.539zm23.632 110.899 23.869-41.341h-47.501v53.558h22.548v-8.222a7.97 7.97 0 0 1 1.084-3.995zM47.929 446.932h188.685v-32.411H66.939c-4.387 0-7.972-3.58-7.972-8V197.85c0-4.415 3.585-8 7.972-8h284.159l18.869-32.689H18.872v260.672c0 16.052 13.019 29.099 29.057 29.099zm0-370.732c-16.038 0-29.057 13.057-29.057 29.1v35.859h360.34l12.17-21.095h-5.047c-9.529 0-17.265-7.75-17.265-17.274V76.2h-50.19v26.59c0 9.524-7.783 17.274-17.264 17.274h-18.397c-9.529 0-17.265-7.75-17.265-17.274V76.2h-50.19v26.59c0 9.524-7.736 17.274-17.265 17.274h-18.397c-9.529 0-17.265-7.75-17.265-17.274V76.2h-50.19v26.59c0 9.524-7.783 17.274-17.312 17.274h-18.35c-9.528 0-17.264-7.75-17.264-17.274V76.2H47.929zm27.784-29.666a1.28 1.28 0 0 1 1.274-1.274h18.35c.708 0 1.321.585 1.321 1.274v56.256c0 .688-.613 1.274-1.321 1.274h-18.35a1.28 1.28 0 0 1-1.274-1.274V46.534zm103.116 0a1.28 1.28 0 0 1 1.274-1.274H198.5c.661 0 1.227.585 1.227 1.274v56.256c0 .688-.566 1.274-1.227 1.274h-18.397a1.28 1.28 0 0 1-1.274-1.274V46.534zm103.116 0v56.256c0 .688.566 1.274 1.274 1.274h18.397c.66 0 1.274-.585 1.274-1.274V46.534c0-.689-.613-1.274-1.274-1.274h-18.397a1.282 1.282 0 0 0-1.274 1.274zm103.116 0v56.256c0 .688.566 1.274 1.274 1.274h14.293l5.377-9.274V46.534c0-.689-.613-1.274-1.274-1.274h-18.397a1.282 1.282 0 0 0-1.273 1.274zM507.659 94.21c-2.972-11.161-10.095-20.472-20.095-26.227l-12.17-7.038c-13.302-7.694-29.104-7.444-41.793-.741h-11.604v-13.67c0-9.524-7.736-17.274-17.265-17.274h-18.397c-9.529 0-17.265 7.75-17.265 17.274v13.67h-50.19v-13.67c0-9.524-7.783-17.274-17.264-17.274h-18.397c-9.529 0-17.265 7.75-17.265 17.274v13.67h-50.19v-13.67c0-9.524-7.736-17.274-17.265-17.274h-18.397c-9.529 0-17.265 7.75-17.265 17.274v13.67h-50.19v-13.67c0-9.524-7.783-17.274-17.312-17.274h-18.35c-9.528 0-17.264 7.75-17.264 17.274v13.67H47.929c-24.859 0-45.096 20.227-45.096 45.096v312.532c0 24.869 20.237 45.1 45.096 45.1h188.685v11.807c0 2.863 1.509 5.5 4.01 6.93a7.886 7.886 0 0 0 3.962 1.071 7.926 7.926 0 0 0 4.01-1.071l32.454-18.736h96.512c12.406 0 23.161-4.444 31.888-13.213l56.181-56.167c8.774-8.764 13.208-19.491 13.208-31.893V169.472l24.529-42.501c5.753-9.968 7.31-21.6 4.291-32.761z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="col-8">
                                        <label className="" style={{ fontWeight: 'bold' }} >Doctor:</label>
                                        <div className="d-flex align-items-center">
                                            <select className="form-control" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}>
                                                {doctor.map((pat, index) => (<option key={index} value={pat.name}>{pat.name}</option>))}
                                            </select>
                                        </div>
                                        <label className="mt-3" style={{ fontWeight: 'bold' }} >Date:</label>
                                        <div className="d-flex align-items-center">
                                            <input type="date" className="form-control" value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })}></input>
                                        </div>

                                    </div>
                                </div>
                                <div className="row mt-3">

                                    <div className="col-6">
                                        <label style={{ fontWeight: 'bold' }} >Start time: </label>
                                        <div className="d-flex align-items-center">
                                            <input type="time" className="form-control" value={values.start} onChange={(e) => setValues({ ...values, start: e.target.value })}></input>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label style={{ fontWeight: 'bold' }} >End time: </label>
                                        <div className="d-flex align-items-center">
                                            <input type="time" className="form-control" value={values.end} onChange={(e) => setValues({ ...values, end: e.target.value })}></input>
                                        </div>
                                    </div>
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