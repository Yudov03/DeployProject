import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Sort from '../Sort/Sort';
import { toast } from "react-toastify";

export default function ReadDevice() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Biến trung gian để lưu trữ lịch sử maintain và repair cho thiết bị hiện tại
        let deviceHistory = [];

        // Lấy thông tin của thiết bị
        AxiosInstance.get(`device/${id}/`)
            .then(res => {
                setData(res.data);
                const deviceName = res.data.name;

                // Sau khi lấy dữ liệu của thiết bị, tiếp tục lấy lịch sử
                AxiosInstance.get(`maintainandrepair/`)
                    .then(res => {
                        // Lọc lịch sử cho thiết bị hiện tại bằng cách so sánh tên
                        deviceHistory = res.data.filter(item => item.name === deviceName);
                        setHistory(deviceHistory);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [id]);

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
            const filtered = history.filter(item => item.detail.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredData(filtered);
        }
    };

    const [sortedData, setSortedData] = useState([]);
    const [sortDirections, setSortDirections] = useState({
        desc: null,
        date: null,
        type: null,
    });
    const [typeSort, setTypeSort] = useState(null)
    const handleSortChange = (type) => {
        const isAscending = sortDirections[type] === 'asc';

        const sorted = [...history].sort((a, b) => {
            if (type === 'date') {
                return isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            } else if (type === 'type') {
                return isAscending ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
            } else if (type === 'desc') {
                return isAscending ? a.detail.localeCompare(b.detail) : b.detail.localeCompare(a.detail);
            }
            return 0; // Default sorting
        });

        setSortedData(sorted);
        setSortDirections(prevState => ({
            ...prevState,
            [type]: isAscending ? 'desc' : 'asc'
        }));
    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Would you like to Delete?");
        if (confirmDelete) {
            try {
                await AxiosInstance.delete(`maintainandrepair/${id}/`);
                toast.success('Deleted Success!');
                // Cập nhật dữ liệu sau khi xóa
                setHistory(prevData => prevData.filter(item => item.id !== id));
                setFilteredData(prevFilteredData => prevFilteredData.filter(item => item.id !== id));
                setSortedData(prevFilteredData => prevFilteredData.filter(item => item.id !== id));
                // Nếu cần cập nhật các biến state khác, hãy thêm ở đây
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
    };


    // Dữ liệu và logic cho pagination
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 2; // Số lượng dữ liệu trên mỗi trang
    const totalData = filteredData.length > 0 ? filteredData.length : sortedData.length > 0 ? sortedData.length : history.length;

    // Tính toán vị trí của dữ liệu trên trang hiện tại
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.length > 0 ? filteredData.slice(indexOfFirstData, indexOfLastData) : sortedData.length > 0 ? sortedData.slice(indexOfFirstData, indexOfLastData) : history.slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // console.log(sortedData)
    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>EQUIPMENT INVENTORY</h3>
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
                                <svg width="150" height="150" className="p-1 border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="medical-equipment"><path fill="#d8d8ff" d="M11.441 13.604a1 1 0 0 1-.707-.293L7.198 9.772a1 1 0 0 1 0-1.414l6.363-6.363a.997.997 0 0 1 .39-.242l2.121-.707a1 1 0 0 1 1.024.242l2.122 2.121a1 1 0 0 1 .241 1.024l-.708 2.122a.991.991 0 0 1-.241.39l-6.362 6.366a1 1 0 0 1-.707.293Zm6.362-7.366Z"></path><path fill="#b2b1ff" d="m7.198 9.772-1.416 1.415a1 1 0 0 0 0 1.415l2.122 2.12a1 1 0 0 0 1.414 0l1.414-1.413Z"></path><path fill="#6563ff" d="M8 18.005H4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2Z"></path><path fill="#b2b1ff" d="M20 23.005H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z"></path><path fill="#d8d8ff" d="M14.816 21.005a2.965 2.965 0 0 0 .184-1 3 3 0 0 0-6 0 2.965 2.965 0 0 0 .184 1Z"></path><path fill="#b2b1ff" d="m17.873 7.583-1.415 1.415A5.955 5.955 0 0 1 18 13.005a6.048 6.048 0 0 1-3.455 5.431 2.971 2.971 0 0 1 .455 1.57 2.645 2.645 0 0 1-.04.407A8.044 8.044 0 0 0 20 13.005a7.945 7.945 0 0 0-2.127-5.422zM9.42 18.499a7.036 7.036 0 0 1-1.095-.56.983.983 0 0 1-.326.066H5.326a8.873 8.873 0 0 0 3.72 2.472A2.69 2.69 0 0 1 9 20.005a2.966 2.966 0 0 1 .42-1.506z"></path></svg>
                            </div>
                            <div className="d-flex justify-content-center border border-1 border-primary w-100">
                                <div className="d-flex flex-column w-100 ms-2" >
                                    <div className="d-flex justify-content-between px-4 pt-4">
                                        <h5 style={{ textTransform: 'uppercase' }} className="text-align-center">{data.name}</h5>
                                        <h6>{data.available ? <div style={{ color: 'green' }}>Available</div> : <div style={{ color: 'red' }}>Unavailable</div>}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center px-4 pt-4">
                                        <div className="" style={{ fontWeight: 500 }}>{data.description === "N" ? <div>Status: Normal</div> : <div>{data.description === "W" ? <div>Status: Working</div> : <div>{data.description === "D" ? "Status: Damaged" : "Status: Maintaining"}</div>}</div>}</div>
                                        <div className="">
                                            <Link to={`/device/update/${id}`} style={{ width: 75 }} className="btn btn-sm btn-primary">Edit</Link>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center" >
                        <div className="w-75 border border-1 border-primary" >
                            <div className="d-flex justify-content-center mt-3">
                                <div style={{ fontWeight: 'bold' }}>DESCRIPTION</div>
                            </div>
                            <div className="p-3">
                                {data.status}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className=" w-75">
                            <div className="d-flex justify-content-between align-items-center mt-5">
                                <h5 className="mx-2">Maintain  and repair history</h5>
                                <i className="bi bi-gear me-2" style={{ fontSize: '1.9rem' }}></i>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top border-primary">
                                <div className="d-flex flex-grow-1  align-items-center "><Search onSearchChange={handleSearchChange} searchData={history} /></div>
                                <Link to={`/maintainandrepair/add`} state={{ name: data.name }} className='btn btn-success me-2 '> + New</Link>
                            </div>


                            {filteredData.length > 0 ? (
                                <table className="table table-hover table-striped align-middle">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Detail</th>
                                            <th>User Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((d, i) => (
                                            <tr key={i}>
                                                <td style={{ width: 110 }}>{d.date}</td>
                                                <td style={{ width: 110 }}>{d.type === "M" ? "Maintain" : "Repair"}</td>
                                                <td style={{ width: 420 }}>
                                                    <div className="form-control" style={{ minHeight: '50px' }}>
                                                        {d.detail}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link to={`update/${d.id}`} className="btn btn-sm btn-primary me-2"><i className="bi bi-pencil-square"></i></Link>
                                                    <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                searchValue && filteredData.length === 0 ? (
                                    <table className="table table-hover table-striped align-middle">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 110 }}>Date</th>
                                                <th style={{ width: 110 }}>Type</th>
                                                <th style={{ width: 420 }}>Detail</th>
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
                                                {/* <th>Picture</th> */}
                                                <th>Date <Sort handleSortChange={handleSortChange} type="date" sortDirection={sortDirections.date} /></th>
                                                <th>Type <Sort handleSortChange={handleSortChange} type="type" sortDirection={sortDirections.type} /></th>
                                                <th>Detail <Sort handleSortChange={handleSortChange} type="desc" sortDirection={sortDirections.desc} /></th>
                                                <th style={{ paddingBottom: 14 }}>User Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentData.map((d, i) => (
                                                <tr key={i}>
                                                    <td style={{ width: 110 }}>{d.date}</td>
                                                    <td style={{ width: 110 }}>{d.type === "M" ? "Maintain" : "Repair"}</td>
                                                    <td style={{ width: 420 }}>
                                                        <div className="form-control" id="detaiiid" style={{ minHeight: '50px' }}>
                                                            {d.detail}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Link to={`/maintainandrepair/update/${d.id}`} className="btn btn-sm btn-primary me-2"><i className="bi bi-pencil-square"></i></Link>
                                                        <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ))
                            }
                            {searchValue && filteredData.length === 0 || history.length === 0 ? "" :
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

                </div>
            </div>
        </>
    )
}
