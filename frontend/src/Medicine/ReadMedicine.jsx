import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ReadMedicine() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        AxiosInstance.get(`medicines/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>MEDICINE INVENTORY</h3>
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
                <div className="w-75 rounded bg-white border shadow " style={{minHeight: 400}}>
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
                            <svg width="150" height="150" className="p-1 border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="medicine"><g><path fill="#78b9eb" d="M8 10h14v6H8zM27 30v18H3V30zm-7 11v-4h-3v-3h-4v3h-3v4h3v3h4v-3zm39 2v4h-6v-4a3 3 0 0 1 6 0zm-15 5a3 3 0 0 1 0 6h-4v-6z"></path><circle cx="41" cy="36" r="6" fill="#78b9eb"></circle><circle cx="55" cy="22" r="5.996" fill="#78b9eb"></circle><path fill="#006df0" d="M44 47h-8a4 4 0 0 0 0 8h8a4 4 0 0 0 0-8zm-5 6h-3a2 2 0 0 1 0-4h3zm5 0h-3v-4h3a2 2 0 0 1 0 4zm12-14a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0v-8a4 4 0 0 0-4-4zm2 12a2 2 0 0 1-4 0v-3h4zm0-5h-4v-3a2 2 0 0 1 4 0zM41 29a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5z"></path><path fill="#006df0" d="M37 35h8v2h-8zM59.949 26.95A7 7 0 1 0 55 29a6.957 6.957 0 0 0 4.949-2.05zM50 22a4.966 4.966 0 0 1 .829-2.757l1.343 1.343 1.414-1.414-1.343-1.343a5 5 0 0 1 6.928 6.928L55 20.586 53.586 22l4.171 4.171A5 5 0 0 1 50 22zm-25.63 1.21-1.19-.34A3.009 3.009 0 0 1 21 19.98V17h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v2.98a3.009 3.009 0 0 1-2.18 2.89l-1.19.34A5.022 5.022 0 0 0 2 28.02V52a3.009 3.009 0 0 0 3 3h20a3.009 3.009 0 0 0 3-3V28.02a5.022 5.022 0 0 0-3.63-4.81zM9 11h12v4H9zm17 41a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3h22zm0-5H4V31h22zm0-18H4v-.98a3.009 3.009 0 0 1 2.18-2.89l1.19-.34A5.022 5.022 0 0 0 11 19.98V17h8v2.98a5.022 5.022 0 0 0 3.63 4.81l1.19.34A3.009 3.009 0 0 1 26 28.02z"></path><path fill="#006df0" d="M10 42h2v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Zm1-4h2a1 1 0 0 0 1-1v-2h2v2a1 1 0 0 0 1 1h2v2h-2a1 1 0 0 0-1 1v2h-2v-2a1 1 0 0 0-1-1h-2Z"></path></g></svg>
                        </div>
                        <div className="d-flex justify-content-center border border-1 border-primary w-100">
                            <div className="d-flex flex-column w-100 ms-2" >
                                <div className="d-flex justify-content-center mt-2">
                                    <h5  style={{textTransform: 'uppercase'}}>DR. {data.name}</h5>
                                </div>
                                <div className="row mt-2 ms-2">
                                    <div className="col-3">
                                        <div>Expired day</div>
                                        <div>Import day</div>
                                        <div>Export day</div>
                                    </div>
                                    <div className="col-2">
                                        <div>:</div>
                                        <div>:</div>
                                        <div>:</div>
                                    </div>
                                    <div className="col-6">
                                        <div>{data.expiry}</div>
                                        <div>{data.imp}</div>
                                        <div>{data.exp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div className=" d-flex justify-content-center" >
                        <div className="w-75 border border-1 border-primary" >
                            <div className="d-flex justify-content-center mt-3">
                                <div style={{ fontWeight: 'bold'}}>DESCRIPTION</div>
                            </div>
                            <div className="p-3">
                                {data.description}
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-3 mx-auto mt-4 mb-4">
                        <Link to={`/medicine/update/${id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                    </div>
                </div>
            </div>
        </>
    )
}