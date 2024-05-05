import AxiosInstance from "../components/AxiosInstance"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';
import CompletedAppointment from "./Completed";
import { useMemo } from "react";
import { toast } from "react-toastify";
export default function Appointment({ read, name }) {
    const isRead = read ? read : null;
    const [data, setAppointment] = useState([])
    useEffect(() => {
        AxiosInstance.get(`appointments/`)
            .then(res => setAppointment(res.data.filter(data => data.completed === false)))
            .catch(err => console.log(err));

    }, []);
    // console.log(name)
    ////////////////////////
    const AppointmentMatch = useMemo(() => {
        return data.filter(e => e.patientname === name);
    }, [data, name, read]);
    const [eventRead, setEventRead] = useState([])
    {
        isRead !== null && useEffect(() => {
            const eventsAppointmentMatch = AppointmentMatch.map(item => {
                if (read === "readPatient") {
                    return {
                        id: item.id,
                        time: item.time,
                        date: item.date,
                        patientname: item.patientname,
                        doctorname: item.doctorname,
                        feestatus: item.feestatus,
                        completed: item.completed,
                        diagnosis: item.diagnosis,
                        rate: item.rate,
                    };
                }
                return null;
            });
            setEventRead(eventsAppointmentMatch);
        }, [AppointmentMatch]);
    }
    ////////////////////





    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (searchValue) => {
        setSearchValue(searchValue.trim());
        if (!searchValue.trim()) {
            setFilteredData([]);
        } else {
            const filtered = (isRead ? eventRead : data).filter(item => item.patientname.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredData(filtered);
        }
    };
    // console.log(name)


    const [sortedData, setSortedData] = useState([]);
    const [sortDirections, setSortDirections] = useState({
        time: null,
        date: null,
        doctorname: null,
        patientname: null,
        feestatus: null,
    });

    const handleSortChange = (type) => {
        const isAscending = sortDirections[type] === 'asc';
        const sorted = [...(isRead ? eventRead : data)].sort((a, b) => {
            if (type === 'patientname') {
                return isAscending ? a.patientname.localeCompare(b.patientname) : b.patientname.localeCompare(a.patientname);
            } else if (type === 'doctorname') {
                return isAscending ? a.doctorname.localeCompare(b.doctorname) : b.doctorname.localeCompare(a.doctorname);
            } else if (type === 'date') {
                return isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            } else if (type === 'time') {
                const timeA = new Date(a.date + ' ' + a.time);
                const timeB = new Date(b.date + ' ' + b.time);
                return isAscending ? timeA - timeB : timeB - timeA;
            } else if (type === 'feestatus') {
                return isAscending ? a.feestatus - b.feestatus : b.feestatus - a.feestatus;
            }
            return 0; // Default sorting
        });
        setSortedData(sorted);
        setSortDirections(prevState => ({
            ...prevState,
            [type]: isAscending ? 'desc' : 'asc'
        }));
    }

    // Dữ liệu và logic cho pagination
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 4; // Số lượng dữ liệu trên mỗi trang
    const totalData = filteredData.length > 0 ? filteredData.length : sortedData.length > 0 ? sortedData.length : (isRead ? eventRead : data).length;

    // Tính toán vị trí của dữ liệu trên trang hiện tại
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.length > 0 ? filteredData.slice(indexOfFirstData, indexOfLastData) : sortedData.length > 0 ? sortedData.slice(indexOfFirstData, indexOfLastData) : (isRead ? eventRead : data).slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const location = useLocation();
    const currentPath = location.pathname;
    // console.log(currentData.length)

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Would you like to Delete?");
        if (confirmDelete) {
            try {
                await AxiosInstance.delete(`appointments/${id}/`)
                toast.success('Deleted Success!');
                setAppointment(prevData => prevData.filter(item => item.id !== id));
                setFilteredData(prevFilteredData => prevFilteredData.filter(item => item.id !== id));
                setSortedData(prevFilteredData => prevFilteredData.filter(item => item.id !== id));
                if (currentData.length === 1 && currentPage !== 1) {
                    paginate(currentPage - 1); // Chuyển đến trang trước nếu currentData rỗng và không phải là trang đầu tiên
                } else if (currentData.length === 1 && currentPage === 1) {
                    paginate(1); // Nếu currentData rỗng và đang ở trang đầu tiên, vẫn paginate trang đầu tiên
                }
            } catch (error) {
                console.log(error);
                toast.error('An error occurred!');
            }
        }
    }

    return (
        <>
            {
                currentPath === "/appointment" && <Header />
            }

            <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ paddingTop: 20 }}>
                <div className="w-75 rounded bg-white border shadow " style={{}}>
                    <div className="mx-3" style={{}}>
                        <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#appointment" className="nav-link active" id="appointment-tab" data-bs-toggle="tab" data-bs-target="#appointment" type="button" role="tab" aria-controls="appointment" aria-selected="true" style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>New Appointment</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#completedappointment" className="nav-link" id="completedappointment-tab" data-bs-toggle="tab" data-bs-target="#completedappointment" type="button" role="tab" aria-controls="completedappointment" aria-selected="false" style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>Completed Appointment</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="appointment" role="tabpanel" aria-labelledby="appointment-tab" tabIndex="0">
                                <div style={{}}>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-grow-1 align-items-center mx-3">
                                            <Search onSearchChange={handleSearchChange} searchData={(isRead ? eventRead : data)} />
                                        </div>
                                        <Link to="/appointment/add" state={{ namePatient: name }} className='btn btn-success me-5 py-1 mb-3 mt-3'> + New Appointment </Link>
                                        <div className="mb-2 me-3 mt-2"><i className="bi bi-clipboard-data" style={{ fontSize: '1.9rem' }}></i></div>

                                    </div>

                                    {filteredData.length > 0 ? (
                                        <table className="table table-hover table-striped align-middle">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Patient Name</th>
                                                    <th>Doctor Name</th>
                                                    <th>Fee Status </th>
                                                    <th>User Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((d, i) => (
                                                    <tr key={i}>
                                                        <td style={{ width: 120 }}>{d.date}</td>
                                                        <td style={{ width: 120 }}>{d.time}</td>
                                                        <td style={{ width: 215 }}>{d.patientname}</td>
                                                        <td style={{ width: 215 }}>{d.doctorname}</td>
                                                        <td style={{ width: 175 }}>{d.feestatus ? <div style={{ color: 'green' }}>paid</div> : <div style={{ color: 'red' }}>unpaid</div>}</td>
                                                        <td>
                                                            <Link to={(isRead ? '/appointment/read/' + d.id : `read/${d.id}`)} className='btn btn-sm btn-info me-2'><i className="bi bi-info-square"></i></Link>
                                                            <Link to={(isRead ? '/appointment/update/' + d.id : `update/${d.id}`)} className="btn btn-sm btn-primary me-2"><i className="bi bi-pencil-square"></i></Link>
                                                            <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (searchValue && filteredData.length === 0 ? (
                                        <table className="table table-hover table-striped align-middle">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 120 }}>Date</th>
                                                    <th style={{ width: 120 }}>Time</th>
                                                    <th style={{ width: 215 }}>Patient Name</th>
                                                    <th style={{ width: 215 }}>Doctor Name</th>
                                                    <th style={{ width: 175 }}>Fee Status </th>
                                                    <th>User Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan="10">No results found</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
                                        <table className="table table-hover table-striped align-middle">
                                            <thead>
                                                <tr>
                                                    <th>Date <Sort handleSortChange={handleSortChange} type="date" sortDirection={sortDirections.date} /></th>
                                                    <th>Time <Sort handleSortChange={handleSortChange} type="time" sortDirection={sortDirections.time} /></th>
                                                    <th>Patient Name <Sort handleSortChange={handleSortChange} type="patientname" sortDirection={sortDirections.patientname} /></th>
                                                    <th>Doctor Name <Sort handleSortChange={handleSortChange} type="doctorname" sortDirection={sortDirections.doctorname} /></th>
                                                    <th>Fee Status <Sort handleSortChange={handleSortChange} type="feestatus" sortDirection={sortDirections.feestatus} /></th>
                                                    <th style={{ paddingBottom: 14 }}>User Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((d, i) => (
                                                    <tr key={i}>
                                                        <td style={{ width: 120 }}>{d.date}</td>
                                                        <td style={{ width: 120 }}>{d.time}</td>
                                                        <td style={{ width: 215 }}>{d.patientname}</td>
                                                        <td style={{ width: 215 }}>{d.doctorname}</td>
                                                        <td style={{ width: 175 }}>{d.feestatus ? <div style={{ color: 'green' }}>paid</div> : <div style={{ color: 'red' }}>unpaid</div>}</td>
                                                        <td>
                                                            <Link to={(isRead ? '/appointment/read/' + d.id : `read/${d.id}`)} className='btn btn-sm btn-info me-2'><i className="bi bi-info-square"></i></Link>
                                                            <Link to={(isRead ? '/appointment/update/' + d.id : `update/${d.id}`)} className="btn btn-sm btn-primary me-2"><i className="bi bi-pencil-square"></i></Link>
                                                            <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ))}
                                </div>
                                {searchValue && filteredData.length === 0 ? "" :
                                    (currentPage !== 1 && searchValue && filteredData.length !== 0 ? paginate(1) :
                                        <nav aria-label="Page navigation nurse">
                                            <ul className="pagination mx-3 justify-content-end">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                                </li>
                                                {Array.from({ length: Math.ceil(totalData / dataPerPage) }, (_, index) => (
                                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(index + 1); }}>{index + 1}</a>
                                                    </li>
                                                ))}
                                                <li className={`page-item ${currentPage === Math.ceil(totalData / dataPerPage) ? 'disabled' : ''}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    )
                                }
                            </div>
                            <div className="tab-pane" id="completedappointment" role="tabpanel" aria-labelledby="completedappointment-tab" tabIndex="0">
                                <CompletedAppointment read={read} name={name} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}