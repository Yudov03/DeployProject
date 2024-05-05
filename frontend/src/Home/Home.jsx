import AxiosInstance from '../components/AxiosInstance'
import { React, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { NavLink } from 'reactstrap'

const Home = () => {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`users/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    return (
        <div>
            {loading ? <p>Loading data...</p> :
                <div className=''>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                        <div className="w-75 mx-auto border bg-white shadow rounded-3 d-flex justify-content-between" style={{ height: '10vh' }}>
                            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                                <h3 style={{color: 'blue', fontWeight: 'bold'}}>Welcome to BK Clinic, Jonitha Cathrine ! {myData.username}</h3>
                            </div>
                        </div>
                    </div>


                    <section className="banner_part">
                        <div className="container mt-5">
                            <div className="row align-items-center">
                                <div className="col">
                                    <div className="banner_text">
                                        <div className="banner_text_iner">
                                            <h5>We are BK Clinic</h5>
                                            <h1>Best Hospital Management</h1>
                                            <p>This website provided tools to analyze, create, display list, and manage hospital as well  </p>
                                            <br></br>
                                            <div className="row align-items-center">
                                                <div className="col  text-center">
                                                    <img className='w-50' src="https://cdn3.iconfinder.com/data/icons/diversity-avatars/64/doctor-woman-white-256.png" alt="" />
                                                    <br></br>
                                                    <h5>Staffs</h5>
                                                </div>
                                                <div className="col  text-center">
                                                    <img className='w-50' src="https://cdn0.iconfinder.com/data/icons/insurance-line-color/512/Outpatient_Department-256.png" alt="" />
                                                    <h5>Patients</h5>
                                                </div>
                                                <div className="col text-center">
                                                    <img className='w-50' src="https://cdn3.iconfinder.com/data/icons/object-emoji/50/Pills-256.png" alt="" />
                                                    <h5>Medicines</h5>
                                                </div>
                                                <div className="col text-center">
                                                    <img className='w-50' src="https://cdn1.iconfinder.com/data/icons/medical-filled-outline-4/64/blood_pressure-heart-healthcare-medical-256.png" alt="" />
                                                    <h5>Devices</h5>
                                                </div>
                                            </div>
                                            <br></br>
                                            <button className='btn btn-primary'>
                                                <NavLink href="/dashboard" className="">Go to dashboard</NavLink>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="https://preview.colorlib.com/theme/medico/img/banner_img.png.webp" className="d-block w-100 h-100" alt="slide 1" />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="https://preview.colorlib.com/theme/medico/img/top_service.png.webp" className="d-block w-100 h-100" alt="slide 2" />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="https://preview.colorlib.com/theme/medico/img/service.png.webp" className="d-block w-100 h-100" alt="slide 3" />
                                            </div>
                                        </div>
                                        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button> */}
                                    </div>
                                    {/* <div className="banner_img">
                                        <img src="https://preview.colorlib.com/theme/medico/img/banner_img.png.webp" alt="" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            }
        </div>
    )
}

export default Home