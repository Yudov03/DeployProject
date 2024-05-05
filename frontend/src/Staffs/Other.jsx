import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";
import { toast } from "react-toastify";

export default function Other() {

    const [otherData, setData] = useState([]);
    useEffect(() => {
        AxiosInstance.get(`staffs/`)
            .then(res => {
                const filtered = res.data.filter(otherData => otherData.position === 'O');
                setData(filtered);
            })
            .catch(err => {
                console.error('Error fetching other staff data:', err);
                toast.error('Error fetching other staff data. Please try again later.');
            });
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Would you like to delete?");
        if (confirmDelete) {
            AxiosInstance.delete(`staffs/${id}/`)
                .then(() => {
                    setData(prevData => prevData.filter(item => item.id !== id));
                    setFilteredData(prevFilteredData => prevFilteredData.filter(item => item.id !== id));
                    setSortedData(prevFilteredData => prevFilteredData.filter(item => item.id !== id));
                    toast.success('Other staff member deleted successfully.');
                    if (currentData.length === 1 && currentPage !== 1) {
                        paginate(currentPage - 1); // Chuyển đến trang trước nếu currentData rỗng và không phải là trang đầu tiên
                    } else if (currentData.length === 1 && currentPage === 1) {
                        paginate(1); // Nếu currentData rỗng và đang ở trang đầu tiên, vẫn paginate trang đầu tiên
                    }
                })
                .catch(err => {
                    console.error('Error deleting other staff member:', err);
                    toast.error('Error deleting other staff member. Please try again later.');
                });
        }
    };

    const [sortedData, setSortedData] = useState([]);
    const [sortDirections, setSortDirections] = useState({
        name: null,
        mail: null,
        dayofbirth: null,
        phone: null,
    });

    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (searchValue) => {
        setSearchValue(searchValue.trim());
        if (!searchValue.trim()) {
            setFilteredData([]);
        } else {
            const filtered = otherData.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredData(filtered);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSortChange = (type) => {
        const isAscending = sortDirections[type] === 'asc';
        const sorted = [...otherData].sort((a, b) => {
            if (type === 'name') {
                return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (type === 'mail') {
                return isAscending ? a.mail.localeCompare(b.mail) : b.mail.localeCompare(a.mail);
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
        console.log(sorted)
    }

    // Dữ liệu và logic cho pagination
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 3; // Số lượng dữ liệu trên mỗi trang
    const totalData = filteredData.length > 0 ? filteredData.length : sortedData.length > 0 ? sortedData.length : otherData.length;

    // Tính toán vị trí của dữ liệu trên trang hiện tại
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.length > 0 ? filteredData.slice(indexOfFirstData, indexOfLastData) : sortedData.length > 0 ? sortedData.slice(indexOfFirstData, indexOfLastData) : otherData.slice(indexOfFirstData, indexOfLastData);


    return (
        <>
            <div style={{}}>
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-grow-1 align-items-center mx-3">
                        <Search onSearchChange={handleSearchChange} searchData={otherData} />
                    </div>
                    <Link to="/staff/add" state={{ type: "Other" }} className='btn btn-success me-5 py-1 mb-3 mt-3'> + New Other Staff </Link>
                    <div className="mb-2 me-3 mt-2">
                        <svg style={{ width: 30, height: 30 }} className="" ><path d="M19.542,16.027A7,7,0,0,0,23,10V5a3,3,0,0,0-3-3H12A3,3,0,0,0,9,5v5a7,7,0,0,0,3.458,6.027A9,9,0,0,0,4,25v3a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V25A9,9,0,0,0,19.542,16.027ZM12,4h8a1,1,0,0,1,1,1V8H11V5A1,1,0,0,1,12,4Zm-1,6H21a5,5,0,0,1-10,0Zm0,12a1,1,0,1,1-1,1A1,1,0,0,1,11,22ZM6,28V25a7,7,0,0,1,4-6.315v1.5a3,3,0,1,0,2,0v-2.1A7.026,7.026,0,0,1,13,18h6v1.142A4,4,0,0,0,16,23v2a1,1,0,0,0,1,1h1a1,1,0,0,0,0-2V23a2,2,0,0,1,4,0v1a1,1,0,0,0,0,2h1a1,1,0,0,0,1-1V23a4,4,0,0,0-3-3.858V18.3A7.009,7.009,0,0,1,26,25v3Z"></path></svg>
                    </div>
                </div>

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
                                    <td style={{ width: 145, textTransform: 'uppercase', fontWeight: 500 }}>{d.name}</td>
                                    <td style={{ width: 170 }}>{d.dayofbirth}</td>
                                    <td style={{ width: 130 }}>{d.gender === 'M' ? "Male" : <div>{d.gender === 'F' ? "Female" : "Other"}</div>}</td>
                                    <td style={{ width: 260 }}>{d.mail}</td>
                                    <td style={{ width: 150 }}>{d.phone}</td>
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
                                <th style={{ width: 145 }}>Name</th>
                                <th style={{ width: 170 }}>Date of birth</th>
                                <th style={{ width: 130 }}>Gender</th>
                                <th style={{ width: 260 }}>Mail</th>
                                <th style={{ width: 150 }}>Phone</th>
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
                                    <td style={{ width: 145, textTransform: 'uppercase', fontWeight: 500 }}>{d.name}</td>
                                    <td style={{ width: 170 }}>{d.dayofbirth}</td>
                                    <td style={{ width: 130 }}>{d.gender === 'M' ? "Male" : <div>{d.gender === 'F' ? "Female" : "Other"}</div>}</td>
                                    <td style={{ width: 260 }}>{d.mail}</td>
                                    <td style={{ width: 150 }}>{d.phone}</td>
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
        </>
    )
}