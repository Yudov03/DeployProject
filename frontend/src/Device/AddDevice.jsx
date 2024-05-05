import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance";
import { toast } from "react-toastify";

export default function AddDevice() {

    const [values, setValues] = useState({
        name: '',
        status: '',
        available: false,
        description: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await AxiosInstance.post(`device/`, values);
            console.log(res);
            if (res.status === 201) {
                toast.success('Added Success');
                setValues({
                    name: '',
                    status: '',
                    available: false,
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

    }



    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

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
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ paddingTop: 20 }}>
                <div className="w-75 rounded bg-white border shadow " style={{ minHeight: 400 }}>
                    <div className="d-flex justify-content-between p-2 align-items-center border-bottom">
                        <div className="mx-3">
                            <button type="button" className="btn btn-light" onClick={handleBackButton}>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </div>
                        <div className=" mx-3">
                            <h4>Add Medical Equipment</h4>
                        </div>
                        <div className="me-3"><i className="bi bi-plus-square" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>
                    <div className="d-flex justify-content-center m-4" >

                        <div className="mx-5" style={{ width: 600 }}>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-4">
                                        <svg width="150" height="150" className="p-1 border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="medical-equipment"><path fill="#d8d8ff" d="M11.441 13.604a1 1 0 0 1-.707-.293L7.198 9.772a1 1 0 0 1 0-1.414l6.363-6.363a.997.997 0 0 1 .39-.242l2.121-.707a1 1 0 0 1 1.024.242l2.122 2.121a1 1 0 0 1 .241 1.024l-.708 2.122a.991.991 0 0 1-.241.39l-6.362 6.366a1 1 0 0 1-.707.293Zm6.362-7.366Z"></path><path fill="#b2b1ff" d="m7.198 9.772-1.416 1.415a1 1 0 0 0 0 1.415l2.122 2.12a1 1 0 0 0 1.414 0l1.414-1.413Z"></path><path fill="#6563ff" d="M8 18.005H4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2Z"></path><path fill="#b2b1ff" d="M20 23.005H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z"></path><path fill="#d8d8ff" d="M14.816 21.005a2.965 2.965 0 0 0 .184-1 3 3 0 0 0-6 0 2.965 2.965 0 0 0 .184 1Z"></path><path fill="#b2b1ff" d="m17.873 7.583-1.415 1.415A5.955 5.955 0 0 1 18 13.005a6.048 6.048 0 0 1-3.455 5.431 2.971 2.971 0 0 1 .455 1.57 2.645 2.645 0 0 1-.04.407A8.044 8.044 0 0 0 20 13.005a7.945 7.945 0 0 0-2.127-5.422zM9.42 18.499a7.036 7.036 0 0 1-1.095-.56.983.983 0 0 1-.326.066H5.326a8.873 8.873 0 0 0 3.72 2.472A2.69 2.69 0 0 1 9 20.005a2.966 2.966 0 0 1 .42-1.506z"></path></svg>
                                    </div>
                                    <div className="col-8">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="nameid">Name:</label>
                                        <input type="text" className="form-control" id="nameid" placeholder="Enter name of equipment" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
                                        <div className="row mt-3">
                                            <div className="col-5">
                                                <label style={{ fontWeight: 'bold' }} htmlFor="availableid">Available:</label>
                                                <div className="form-check form-switch ms-2">
                                                    < input className="form-check-input" type="checkbox" role="switch" id="availableid" checked={values.available} onClick={e => setValues({ ...values, available: !values.available })} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-7 ">
                                                <label style={{ fontWeight: 'bold' }} htmlFor="descriptionid">Status:</label>
                                                {values.available ? (
                                                    <select className="form-control" id="descriptionid" value={values.description} onChange={(event) => setValues({ ...values, description: event.target.value })}>
                                                        <option value="" disabled>Choose status</option>
                                                        <option value="N">Normal</option>
                                                    </select>
                                                ) : (
                                                    <select className="form-control" id="descriptionid" value={values.description} onChange={(event) => setValues({ ...values, description: event.target.value })}>
                                                        <option value="" disabled>Choose status</option>
                                                        <option value="W">Working</option>
                                                        <option value="M">Maintaining</option>
                                                        <option value="D">Damaged</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="statusid">Description:</label>
                                        <textarea style={{ height: 100 }} id="statusid" type="text" className="form-control" placeholder="Enter description" value={values.status} onChange={e => setValues({ ...values, status: e.target.value })} />
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