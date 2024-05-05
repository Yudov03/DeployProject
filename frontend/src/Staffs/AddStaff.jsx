import React from "react";
import { useState } from "react";
import AxiosInstance from "../components/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
export default function AddStaff() {
    const location = useLocation();
    const { type } = location.state ? location.state : { type: null };
    const position = type === null ? '' : type;

    const [values, setValues] = useState({
        name: '',
        mail: '',
        specialty: '',
        certificate: '',
        phone: '',
        dayofbirth: '',
        gender: '',
        address: '',
        academicrank: '',
        specialtylevel: '',
        position: position === "Doctor" ? 'D' : position === "Nurse" ? 'N' : position === "Other" ? 'O' : '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await AxiosInstance.post(`staffs/`, values)
            console.log(res);
            if (res.status === 201) {
                toast.success('Added Success');
                setValues({
                    name: '',
                    mail: '',
                    specialty: '',
                    certificate: '',
                    phone: '',
                    dayofbirth: '',
                    gender: '',
                    address: '',
                    position: '',
                    academicrank: '',
                    specialtylevel: '',
                });
                addEventsForSelectedDays(event);
                setValueDoctor({ title: '', start: '', end: '' });
                setTimeStart('');
                setTimeEnd('');
                setWorkWeek(2);
            } else if (res.status === 400) {
                toast.error('Please fill full');
            } else {
                toast.error('An error occurred');
            }
        } catch (error) {
            console.log(error);
            toast.error(`${error}, Please try again!`);
        }
    };

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    };

    // add schedule nếu là add doctor
    const [valueDoctor, setValueDoctor] = useState({ title: '', start: '', end: '' });
    const [selectedDays, setSelectedDays] = useState([
        { day: 'Monday', checked: false, timeStart: '', timeEnd: '' },
        { day: 'Tuesday', checked: false, timeStart: '', timeEnd: '' },
        { day: 'Wednesday', checked: false, timeStart: '', timeEnd: '' },
        { day: 'Thursday', checked: false, timeStart: '', timeEnd: '' },
        { day: 'Friday', checked: false, timeStart: '', timeEnd: '' },
        { day: 'Saturday', checked: false, timeStart: '', timeEnd: '' },
        { day: 'Sunday', checked: false, timeStart: '', timeEnd: '' }
    ]);
    const [showTimeInputs, setShowTimeInputs] = useState(false); // Thêm state để kiểm soát việc hiển thị trường thời gian

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const handleDayChange = (index) => {
        setSelectedDays(prevState => {
            const newSelectedDays = [...prevState];
            newSelectedDays[index] = { ...newSelectedDays[index], checked: !newSelectedDays[index].checked };
            return newSelectedDays;
        });
        setShowTimeInputs(true); // Hiển thị trường thời gian khi một ngày được chọn
    };

    const [workWeek, setWorkWeek] = useState(5);
    const addEventsForSelectedDays = (event) => {
        event.preventDefault();
        // if (!selectedDays.some(day => day.checked) && type === 'Doctor') {
        //     alert('Please select at least one day');
        //     return;
        // }
        const today = moment();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        selectedDays.forEach((selectedDay) => {
            if (selectedDay.checked) {
                const dayIndex = daysOfWeek.indexOf(selectedDay.day);
                if (dayIndex !== -1) {
                    for (let i = 0; i < workWeek; i++) {
                        const eventStartDate = today.clone().startOf('week').add(i, 'weeks').add(dayIndex, 'days');
                        const eventEndDate = eventStartDate.clone();

                        const startTime = moment(selectedDay.timeStart, 'HH:mm');
                        const endTime = moment(selectedDay.timeEnd, 'HH:mm');

                        eventStartDate.set({ hour: startTime.hours(), minute: startTime.minutes() });
                        eventEndDate.set({ hour: endTime.hours(), minute: endTime.minutes() });

                        const newData = {
                            name: values.name,
                            date: eventStartDate.format('YYYY-MM-DD'),
                            start: eventStartDate.format('HH:mm:ss'),
                            end: eventEndDate.format('HH:mm:ss'),
                        };

                        AxiosInstance.post('schedule/', newData)
                            .then(res => {
                                console.log(res);
                            })
                            .catch(err => console.log(err));
                    }
                }
            }
        });

        setValueDoctor({ title: '', start: '', end: '' });
        setSelectedDays(selectedDays.map(day => ({ ...day, checked: false })));
        setShowTimeInputs(false); // Ẩn trường thời gian sau khi đã submit
    };

    // console.log(values)
    // console.log(valueDoctor)
    // console.log(type)

    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                    <div className="flex-grow-1">
                        <h3>HEALTHCARE STAFF </h3>
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
                            <h4>Add {position === "Doctor" || position === "Nurse" ? position : 'Staff'}</h4>
                        </div>
                        <div className="me-3"><i className="bi bi-plus-square" style={{ fontSize: '1.9rem' }}></i></div>
                    </div>
                    <div className="d-flex justify-content-center m-4" >

                        <div className="mx-5" style={{ width: 600 }}>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-4">
                                        <svg width="150" height="150" className="p-1 border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="doctor"><path fill="#6563ff" d="M17.998 8.064 6.003 8.11l-.277-3.325A3 3 0 0 1 8.17 1.482l.789-.143a17.031 17.031 0 0 1 6.086 0l.786.143a3 3 0 0 1 2.443 3.302Z"></path><path fill="#d8d8ff" d="M6.009 8.109a5.994 5.994 0 0 0 11.984-.045Z"></path><path fill="#6563ff" d="m17.198 13.385-4.49 4.49a1 1 0 0 1-1.415 0l-4.491-4.49a9.945 9.945 0 0 0-4.736 7.44 1 1 0 0 0 .994 1.108h17.88a1 1 0 0 0 .994-1.108 9.945 9.945 0 0 0-4.736-7.44Z"></path><path fill="#b2b1ff" d="M15.69 12.654a6.012 6.012 0 0 1-7.381 0 10.004 10.004 0 0 0-1.507.73l4.491 4.492a1 1 0 0 0 1.414 0l4.491-4.491a10.005 10.005 0 0 0-1.507-.731Z"></path></svg>
                                    </div>
                                    <div className="col-8">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="nameid">Name:</label>
                                        <input type="text" className="form-control" id="nameid" placeholder={type === 'Doctor' ? 'Enter Doctor Name' : type === 'Nurse' ? 'Enter Nurse Name' : 'Enter Staff Name'} value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label style={{ fontWeight: 'bold' }} htmlFor="dobid">Date of birth:</label>
                                                <input type="date" className="form-control" id="dobid" placeholder="Enter Date of birth" value={values.dayofbirth} onChange={e => setValues({ ...values, dayofbirth: e.target.value })} />
                                            </div>
                                            <div className="col-6">
                                                <label style={{ fontWeight: 'bold' }} htmlFor="genderid">Gender:</label>
                                                <select className="form-control" id="genderid" value={values.gender} onChange={(event) => setValues({ ...values, gender: event.target.value })}>
                                                    <option value="" disabled>Choose gender</option>
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                    <option value="O">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="phoneid">Phone:</label>
                                        <input type="text" className="form-control" id="phoneid" placeholder="Enter phone number" value={values.phone} onChange={e => setValues({ ...values, phone: e.target.value })} />
                                    </div>
                                    <div className="col-6">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="emailid">Mail:</label>
                                        <input type="email" className="form-control" id="emailid" placeholder="Enter mail" value={values.mail} onChange={e => setValues({ ...values, mail: e.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="basicurl" className="form-label">Address: </label>
                                        <textarea className="form-control" id="basicurl" aria-label="With textarea" placeholder="Enter address" value={values.address} onChange={e => setValues({ ...values, address: e.target.value })}></textarea>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="specialtyid">Specialty:</label>
                                        <input type="text" className="form-control" id="specialtyid" placeholder="Enter specialty" value={values.specialty} onChange={e => setValues({ ...values, specialty: e.target.value })} />
                                    </div>
                                    <div className="col-6 mt-3">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="specialtylevelid">Specialty level:</label>
                                        <select className="form-control" id="specialtylevelid" value={values.specialtylevel} onChange={(event) => setValues({ ...values, specialtylevel: event.target.value })}>
                                            <option value="" disabled>Choose specialty level</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>

                                    <div className="col-6 mt-3">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="academic_degreeid">Academic degree:</label>
                                        <select className="form-control" id="academic_degreeid" value={values.certificate} onChange={(event) => setValues({ ...values, certificate: event.target.value })}>
                                            <option value="" disabled>Choose academic degree</option>
                                            <option value="D">Doctor</option>
                                            <option value="M">Master</option>
                                            <option value="P">Ph.D</option>
                                            <option value="N">No</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="academicrankid">Academic rank:</label>
                                        <select className="form-control" id="academicrankid" value={values.academicrank} onChange={(event) => setValues({ ...values, academicrank: event.target.value })}>
                                            <option value="" disabled>Choose academic rank</option>
                                            <option value="A">Associate Professor</option>
                                            <option value="P">Profressor</option>
                                            <option value="N">No</option>
                                        </select>
                                    </div>
                                    {type === null &&
                                        <div className="">
                                            <label htmlFor="Positonid">Position:</label>
                                            <select className="form-control" id="Positonid" value={values.position} onChange={(event) => setValues({ ...values, position: event.target.value })}>
                                                <option value="" disabled>Choose position</option>
                                                <option value="D">Doctor</option>
                                                <option value="N">Nurse</option>
                                                <option value="O">Other</option>
                                            </select>
                                        </div>
                                    }
                                    {type === "Doctor" || values.position === "D" ?
                                        <>
                                            <div>
                                                <label className="mt-2" style={{ fontWeight: 'bold' }}>Work schedule:</label>
                                                {selectedDays.map((day, index) => (
                                                    <div key={index} className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={day.day}
                                                            checked={day.checked}
                                                            onChange={() => handleDayChange(index)}
                                                        />
                                                        <label className="form-check-label" htmlFor={day.day}>
                                                            {day.day}
                                                        </label>
                                                        {day.checked && showTimeInputs && ( // Hiển thị trường thời gian chỉ khi checkbox được chọn và khi showTimeInputs là true
                                                            <div className='row'>
                                                                <div className='col'>
                                                                    <label>Working from</label>
                                                                    <input type="time" className="form-control" value={day.timeStart} onChange={(event) => setSelectedDays(prevState => {
                                                                        const newSelectedDays = [...prevState];
                                                                        newSelectedDays[index] = { ...newSelectedDays[index], timeStart: event.target.value };
                                                                        return newSelectedDays;
                                                                    })} />
                                                                </div>
                                                                <div className='col'>
                                                                    <label>To</label>
                                                                    <input type="time" className="form-control" value={day.timeEnd} onChange={(event) => setSelectedDays(prevState => {
                                                                        const newSelectedDays = [...prevState];
                                                                        newSelectedDays[index] = { ...newSelectedDays[index], timeEnd: event.target.value };
                                                                        return newSelectedDays;
                                                                    })} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* <div>
                                                    <div className="d-flex">
                                                        <label>Select day:</label>
                                                        <div>
                                                            {selectedDays.map((d, index) => (
                                                                <div key={index} className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id={d.day}
                                                                        checked={d.checked}
                                                                        onChange={() => handleDayChange(index)}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={d.day}>
                                                                        {d.day}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div> */}
                                            {/* <div className='row'>
                                                    <div className='col'>
                                                        <label>Working from</label>
                                                        <input type="time" className="form-control" value={timeStart} onChange={(event) => setTimeStart(event.target.value)} />
                                                    </div>
                                                    <div className='col'>
                                                        <label>To</label>
                                                        <input type="time" className="form-control" value={timeEnd} onChange={(event) => setTimeEnd(event.target.value)} />
                                                    </div>
                                                </div> */}
                                        </>
                                        :
                                        ""
                                    }
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