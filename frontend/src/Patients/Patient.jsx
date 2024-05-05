import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";


function Patient() {

    const [patients, setData] = useState([])
    useEffect(() => {
        AxiosInstance.get(`patients/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to Delete?");
        if (confirm) {
            AxiosInstance.delete(`patients/${id}`)
                .then(res => {
                    location.reload()
                })
                .catch(err => console.log(err));
        }

    }

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (searchValue) => {
        setSearchValue(searchValue.trim());
        if (!searchValue.trim()) {
            setFilteredData([]);
        } else {
            const filtered = patients.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredData(filtered);
        }
    };

    const [sortedData, setSortedData] = useState([]);
    const [sortDirections, setSortDirections] = useState({
        name: null,
        gender: null,
        dayofbirth: null,
        phone: null
    });
    const [typeSort, setTypeSort] = useState(null)
    const handleSortChange = (type) => {
        const isAscending = sortDirections[type] === 'asc';

        const sorted = [...patients].sort((a, b) => {
            if (type === 'name') {
                return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (type === 'gender') {
                return isAscending ? a.gender.localeCompare(b.gender) : b.gender.localeCompare(a.gender);
            } else if (type === 'dayofbirth') {
                return isAscending ? new Date(a.dayofbirth) - new Date(b.dayofbirth) : new Date(b.dayofbirth) - new Date(a.dayofbirth);
            } else if (type === 'phone') {
                return isAscending ? a.phone.localeCompare(b.phone) : b.phone.localeCompare(a.phone);
            }
            return 0; // Default sorting
        });

        setSortedData(sorted);

        // Update the sort direction for the current column
        setSortDirections(prevState => ({
            ...prevState,
            [type]: isAscending ? 'desc' : 'asc'
        }));
    }

    // Dữ liệu và logic cho pagination
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 4; // Số lượng dữ liệu trên mỗi trang
    const totalData = filteredData.length > 0 ? filteredData.length : sortedData.length > 0 ? sortedData.length : patients.length;

    // Tính toán vị trí của dữ liệu trên trang hiện tại
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.length > 0 ? filteredData.slice(indexOfFirstData, indexOfLastData) : sortedData.length > 0 ? sortedData.slice(indexOfFirstData, indexOfLastData) : patients.slice(indexOfFirstData, indexOfLastData);

    // Logic để thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
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
                <div className="w-75 rounded bg-white border shadow " style={{  }}>
                    <div className="d-flex justify-content-end mt-3 align-items-end border-bottom">
                        <div className="flex-grow-1 mx-3">
                            <h5>Patient List</h5>
                        </div>
                        <Link to="/patient/add" className='btn btn-success me-5 py-1 mb-3 '> + New Patient </Link>
                        <div className="mb-2 me-3"><i className="bi bi-people" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>
                    <div className="d-flex flex-grow-1 align-items-center mx-3">
                        <Search onSearchChange={handleSearchChange} searchData={patients} />
                    </div>
                    <div className="mx-3" style={{  }}>
                    {filteredData.length > 0 ? (
                        <table className="table table-hover table-striped align-middle">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date of birth</th>
                                    <th>Gender</th>
                                    <th>Mail</th>
                                    <th>Phone</th>
                                    <th>User Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((d, i) => (
                                    <tr key={i}>
                                        <td style={{ width: 180, textTransform: 'uppercase', fontWeight: 500 }}>{d.name}</td>
                                        <td style={{ width: 170 }}>{d.dayofbirth}</td>
                                        <td style={{ width: 120 }}>{d.gender === 'M' ? "Male" :<div>{d.gender==='F'?"Female":"Other"}</div> }</td>
                                        <td style={{ width: 260 }}>{d.mail}</td>
                                        <td style={{ width: 130 }}>{d.phone}</td>
                                        <td>
                                            <Link to={`read/${d.id}`} className='btn btn-sm btn-info me-2'><i className="bi bi-info-square"></i></Link>
                                            <Link to={`update/${d.id}`} className="btn btn-sm btn-primary me-2"><i className="bi bi-pencil-square"></i></Link>
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
                                    <th style={{ width: 180 }}>Name</th>
                                    <th style={{ width: 170 }}>Date of birth</th>
                                    <th style={{ width: 120 }}>Gender</th>
                                    <th style={{ width: 260 }}>Mail</th>
                                    <th style={{ width: 130 }}>Phone</th>
                                    <th>User Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td  colSpan="10">No results found</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-hover table-striped align-middle">
                            <thead>
                                <tr>
                                    <th>Name <Sort handleSortChange={handleSortChange} type="name" sortDirection={sortDirections.name} /></th>
                                    <th>Date of birth <Sort handleSortChange={handleSortChange} type="dayofbirth" sortDirection={sortDirections.dayofbirth} /></th>
                                    <th>Gender <Sort handleSortChange={handleSortChange} type="gender" sortDirection={sortDirections.gender} /></th>
                                    <th>Mail <Sort handleSortChange={handleSortChange} type="mail" sortDirection={sortDirections.mail} /></th>
                                    <th>Phone <Sort handleSortChange={handleSortChange} type="phone" sortDirection={sortDirections.phone} /></th>
                                    <th style={{ paddingBottom: 14 }}>User Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((d, i) => (
                                    <tr key={i}>
                                        <td style={{ width: 180, textTransform: 'uppercase', fontWeight: 500}}>{d.name}</td>
                                        <td style={{ width: 170 }}>{d.dayofbirth}</td>
                                        <td style={{ width: 120 }}>{d.gender === 'M' ? "Male" :<div>{d.gender==='F'?"Female":"Other"}</div> }</td>
                                        <td style={{ width: 260 }}>{d.mail}</td>
                                        <td style={{ width: 130 }}>{d.phone}</td>
                                        <td>
                                            <Link to={`read/${d.id}`} className='btn btn-sm btn-info me-2'><i className="bi bi-info-square"></i></Link>
                                            <Link to={`update/${d.id}`} className="btn btn-sm btn-primary me-2"><i className="bi bi-pencil-square"></i></Link>
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
                            <nav aria-label="Page navigation example">
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
            </div>
        </>
    )
}

export default Patient;
