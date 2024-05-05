import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance";
import moment from "moment";
import { toast } from "react-toastify";

export default function AddMedicine() {

    const [values, setValues] = useState({
        name: '',
        exp: '',
        imp: '',
        expiry: '',
        description: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await AxiosInstance.post(`medicines/`, values)
            console.log(res);
            if (res.status === 201) {
                toast.success('Added Success');
                setValues({
                    name: '',
                    exp: '',
                    imp: '',
                    expiry: '',
                    description: '',
                });
            } else if (res.status === 400) {
                toast.error('Please fill full');
            } else {
                toast.error('An error occurred');
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error}, Please try again!`);
        }
        // AxiosInstance.post(`medicines/`, values)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));
        // setValues({
        //     name: '',
        //     exp: '',
        //     imp: '',
        //     expiry: '',
        //     description: '',
        // });
    };

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
            <div className="d-flex flex-column align-items-center justify-content-center mb-5" style={{ paddingTop: 20 }}>
                <div className="w-75 rounded bg-white border shadow " style={{ minHeight: 400 }}>
                    <div className="d-flex justify-content-between p-2 align-items-center border-bottom">
                        <div className="mx-3">
                            <button type="button" className="btn btn-light" onClick={handleBackButton}>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </div>
                        <div className=" mx-3">
                            <h4>Add Medicine</h4>
                        </div>
                        <div className="me-3"><i className="bi bi-plus-square" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>
                    <div className="d-flex justify-content-center mt-4" >
                        <div className="mx-5" style={{ width: 600 }}>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-4">
                                        <svg width="150" height="150" className="p-1 border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="medicine"><g><path fill="#78b9eb" d="M8 10h14v6H8zM27 30v18H3V30zm-7 11v-4h-3v-3h-4v3h-3v4h3v3h4v-3zm39 2v4h-6v-4a3 3 0 0 1 6 0zm-15 5a3 3 0 0 1 0 6h-4v-6z"></path><circle cx="41" cy="36" r="6" fill="#78b9eb"></circle><circle cx="55" cy="22" r="5.996" fill="#78b9eb"></circle><path fill="#006df0" d="M44 47h-8a4 4 0 0 0 0 8h8a4 4 0 0 0 0-8zm-5 6h-3a2 2 0 0 1 0-4h3zm5 0h-3v-4h3a2 2 0 0 1 0 4zm12-14a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0v-8a4 4 0 0 0-4-4zm2 12a2 2 0 0 1-4 0v-3h4zm0-5h-4v-3a2 2 0 0 1 4 0zM41 29a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5z"></path><path fill="#006df0" d="M37 35h8v2h-8zM59.949 26.95A7 7 0 1 0 55 29a6.957 6.957 0 0 0 4.949-2.05zM50 22a4.966 4.966 0 0 1 .829-2.757l1.343 1.343 1.414-1.414-1.343-1.343a5 5 0 0 1 6.928 6.928L55 20.586 53.586 22l4.171 4.171A5 5 0 0 1 50 22zm-25.63 1.21-1.19-.34A3.009 3.009 0 0 1 21 19.98V17h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v2.98a3.009 3.009 0 0 1-2.18 2.89l-1.19.34A5.022 5.022 0 0 0 2 28.02V52a3.009 3.009 0 0 0 3 3h20a3.009 3.009 0 0 0 3-3V28.02a5.022 5.022 0 0 0-3.63-4.81zM9 11h12v4H9zm17 41a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3h22zm0-5H4V31h22zm0-18H4v-.98a3.009 3.009 0 0 1 2.18-2.89l1.19-.34A5.022 5.022 0 0 0 11 19.98V17h8v2.98a5.022 5.022 0 0 0 3.63 4.81l1.19.34A3.009 3.009 0 0 1 26 28.02z"></path><path fill="#006df0" d="M10 42h2v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Zm1-4h2a1 1 0 0 0 1-1v-2h2v2a1 1 0 0 0 1 1h2v2h-2a1 1 0 0 0-1 1v2h-2v-2a1 1 0 0 0-1-1h-2Z"></path></g></svg>
                                    </div>
                                    <div className="col-8">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }} htmlFor="nameid">Name:</label>
                                            <input type="text" className="form-control" id="nameid" placeholder="Enter name of medicine" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
                                        </div>
                                        <div className="col mt-3">
                                            <label style={{ fontWeight: 'bold' }} htmlFor="expiryid">Expired Day:</label>
                                            <input type="date" className="form-control" id="expiryid" value={values.expiry} onChange={e => setValues({ ...values, expiry: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="impid">Import Day:</label>
                                        <input type="date" className="form-control" id="impid" value={values.imp} onChange={e => setValues({ ...values, imp: e.target.value })} />
                                    </div>
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="expid">Export Day:</label>
                                        <input type="date" className="form-control" id="expid" value={values.exp} onChange={e => setValues({ ...values, exp: e.target.value })} />
                                    </div>
                                </div>
                                <div className="mt-3 ">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="basicurll" className="form-label">Description: </label>
                                    <textarea style={{ height: 150 }} id="basicurll" className="form-control" aria-label="With textarea" placeholder="Enter description" value={values.description} onChange={e => setValues({ ...values, description: e.target.value })}></textarea>
                                </div>
                                <div className="d-grid gap-2 col-3 mx-auto mt-4 mb-4">
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

