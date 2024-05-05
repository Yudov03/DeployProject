import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance";
import { toast } from "react-toastify";

export default function UpdateMaintainAndRepair() {
    // const location = useLocation();
    // const { detail } = location.state || { detail: null };
    // // const [data, setData] = useState(detail);
    const [values, setValues] = useState({
        name: '',
        date: '',
        detail: '',
        type: '',
    });
    const { id } = useParams();
    useEffect(() => {
        AxiosInstance.get(`maintainandrepair/${id}/`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    // console.log(values);
    // console.log('put id: ', id);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await AxiosInstance.put(`maintainandrepair/${id}/`, values)
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
        // AxiosInstance.put(`maintainandrepair/${id}/`, values)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));
    };
    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>MAINTAIN AND REPAIR HISTORY</h3>
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
                            <h4>Edit Information</h4>
                        </div>
                        <div className="me-3"><i className="bi bi-pencil-square" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>
                    <div className="d-flex justify-content-center mt-4" >
                        <div className="mx-5" style={{ width: 600 }}>
                            <form onSubmit={handleSubmit}>
                                
                                <div className="row">
                                    <div className="col-4">
                                        <svg width="150" height="150" className="p-1 border border-1 border-primary" fillRule="evenodd" clipRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 1707 1707" id="gear"><defs><linearGradient id="a" x1="-38.181" x2="1744.84" y1="110.402" y2="1596.26" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#08b6ff"></stop><stop offset=".012" stopColor="#2790ff"></stop><stop offset=".259" stopColor="#47c7ff"></stop><stop offset=".478" stopColor="#4cc9ff"></stop><stop offset=".8" stopColor="#4a9eff"></stop><stop offset=".929" stopColor="#466aff"></stop><stop offset="1" stopColor="#466aff"></stop></linearGradient></defs><path fill="url(#a)" d="M592 1642c-8,0 -15,-1 -23,-4l-190 -66c-37,-12 -56,-52 -44,-89l31 -89c-26,-20 -51,-42 -73,-66l-86 42c-34,17 -77,2 -93,-32l-89 -182c-8,-16 -9,-35 -3,-53 6,-18 19,-32 36,-40l85 -42c-5,-32 -7,-65 -6,-98l-90 -31c-17,-6 -32,-19 -40,-35 -8,-17 -9,-36 -3,-54l66 -191c6,-17 18,-32 35,-40 17,-8 36,-9 54,-3l90 31c19,-26 41,-51 65,-74l-42 -85c-17,-35 -2,-77 32,-94l182 -88c17,-8 36,-9 53,-3 18,6 32,19 40,35l42 86c32,-5 65,-7 98,-6l31 -90c13,-36 53,-56 89,-43l139 50c-14,38 -22,79 -24,121 -4,103 34,205 104,281 36,39 59,87 68,139 -20,1 -37,13 -45,30 -36,-175 -192,-306 -377,-306 -212,0 -385,173 -385,385 0,212 173,385 385,385 198,0 361,-150 383,-342 8,11 21,19 35,20l0 23c0,27 23,50 50,50l9 0c19,42 62,72 111,72l88 0 -41 118c-6,17 -19,31 -36,40 -17,8 -36,9 -53,3l-90 -31c-20,26 -42,51 -65,74l41 85c17,35 3,77 -32,94l-181 88c-17,8 -36,9 -54,3 -18,-6 -32,-19 -40,-35l-42 -86c-32,5 -65,7 -98,6l-31 90c-6,18 -18,32 -35,40 -10,5 -20,7 -31,7zm795 -529l-95 0c-43,0 -79,-31 -87,-73l-33 0c-9,0 -16,-7 -16,-16l0 -23 368 0 0 23c0,9 -8,16 -17,16l-33 0c-7,42 -44,73 -87,73zm165 -145l-425 0c-9,0 -17,-7 -17,-17l0 -72c0,-9 8,-17 17,-17l425 0c10,0 17,8 17,17l0 72c0,10 -7,17 -17,17zm-393 -139c-9,-61 -35,-117 -77,-162 -64,-70 -98,-161 -94,-257 3,-93 42,-179 109,-244 67,-65 155,-101 247,-101l3 0c198,0 360,161 360,359 0,89 -33,175 -93,241 -43,47 -70,104 -79,164l-376 0zm-66 -386c-8,0 -16,-6 -17,-14 -2,-15 -3,-30 -3,-44 3,-56 26,-109 67,-148 40,-39 93,-61 149,-61 0,0 1,0 1,0 9,0 16,7 16,16 0,9 -7,17 -16,17 -99,1 -179,78 -183,177 -1,13 0,25 2,37 2,9 -5,18 -14,19 -1,1 -2,1 -2,1z"></path></svg>
                                    </div>
                                    <div className="col-8 mt-2">
                                        <div className="d-flex justify-content-center">
                                            <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{values.name}</h5>
                                        </div>
                                        <div className="row mt-3">
                                        <div className="col-6">
                                            <label style={{ fontWeight: 'bold' }} htmlFor="dateid">Date:</label>
                                            <input type="date" className="form-control" id="dateid" placeholder={`${values.date}`} value={values.date} onChange={e => setValues({ ...values, date: e.target.value })} />
                                        </div>
                                        <div className="col-6">
                                            <label style={{ fontWeight: 'bold' }} htmlFor="typeid">Type:</label>
                                            <select className="form-control" id="typeid" value={values.type} onChange={(event) => setValues({ ...values, type: event.target.value })}>
                                                <option value="" disabled>Choose</option>
                                                <option value="M">Maintain</option>
                                                <option value="R">Repair</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="basicurl" className="form-label">Description: </label>
                                    <textarea style={{ height: 100 }} className="form-control" id="basicurl" aria-label="With textarea" placeholder={`${values.detail}`} value={values.detail} onChange={e => setValues({ ...values, detail: e.target.value })}></textarea>
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