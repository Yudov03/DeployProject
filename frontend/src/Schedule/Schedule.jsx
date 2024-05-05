import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const localizer = momentLocalizer(moment);

export default function Schedule({ read, name, update }) {
    const isRead = read ? read : null;
    const [data, setData] = useState([]);
    const [eventsWork, setEventsWork] = useState([]);
    const [eventsAppointment, setEventsAppointment] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        AxiosInstance.get(`schedule/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

        AxiosInstance.get(`appointments/`)
            .then(res => setAppointments(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const eventsData = data.map(item => ({
            id: item.id,
            title: `${moment(item.date).format('MM/DD')}` + ' - ' + item.name + ' ',
            start: new Date(item.date + 'T' + item.start),
            end: new Date(item.date + 'T' + item.end),
            type: 'Schedule',
            desc: 'Work from ' + `${item.start}` + ' to ' + `${item.end}`,
        }));

        const eventsAppointments = appointments.map(item => ({
            id: item.id,
            title: `${moment(item.date).format('MM/DD')} ` + 'Appointment ',
            start: new Date(item.date + 'T' + item.time),
            end: new Date(new Date(item.date + 'T' + item.time).getTime() + 1 * 60 * 60 * 1000),
            type: 'Appointment',
            desc: 'Appointment between Doctor ' + item.doctorname + " and " + ' Patient ' + item.patientname,
        }));

        // setEvents([...eventsData, ...eventsAppointments]);
        setEventsWork([...eventsData]);
        setEventsAppointment([...eventsAppointments]);
    }, [data, appointments]);

    const handleSelectSlot = () => {
        navigate('/schedule/add');
    };


    const handleDeleteEvent = async (id, type) => {
        // event.defaultPrevented();
        try {
            if (type === 'Schedule') {
                await AxiosInstance.delete(`schedule/${id}`);
                setEventsWork(prevEvents => prevEvents.filter(event => event.id !== id));
                setEventsScheduleMatch(prevEvents => prevEvents.filter(event => event.id !== id));
            } else if (type === 'Appointment') {
                await AxiosInstance.delete(`appointments/${id}`);
                setEventsAppointment(prevEvents => prevEvents.filter(event => event.id !== id));
                setEventsAppointmentMatch(prevEvents => prevEvents.filter(event => event.id !== id));
            }
            toast.success('Event deleted successfully.');
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Error deleting event. Please try again later.');
        }
    };


    const EventComponent = ({ event }) => (
        <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={
                <Tooltip id="tooltip-top">
                    <div>
                        <strong>{event.title}</strong>
                        <div>Start:</div><p> {moment(event.start).format('YYYY/MM/DD - h:mm:ss a')}</p>
                        <div>End:</div> <p>{moment(event.end).format('YYYY/MM/DD - h:mm:ss a')}</p>
                        <p>{event.desc}</p>
                        <Link to={event.type === 'Appointment' ? { pathname: `/appointment/read/${event.id}` } : { pathname: `/schedule/read/${event.id}` }} className='btn btn-sm btn-info me-2'><i className="bi bi-info-square"></i></Link>
                        <Link to={event.type === 'Appointment' ? { pathname: `/appointment/update/${event.id}` } : { pathname: `/schedule/update/${event.id}` }} className='btn btn-sm btn-primary me-2'><i className="bi bi-pencil-square"></i></Link>
                        <button onClick={() => handleDeleteEvent(event.id, event.type)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i></button>
                    </div>
                </Tooltip>
            }
        >
            <div style={{ backgroundColor: '#3174ad', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                {event.title}
            </div>
        </OverlayTrigger>
    );

    const AppointmentMatch = useMemo(() => {
        return appointments.filter(appointment => appointment.doctorname === name);
    }, [appointments, name, read]);

    const ScheduleMatch = useMemo(() => {
        return data.filter(schedule => schedule.name === name);
    }, [appointments, name, read]);

    const AppointmentMatchRead = useMemo(() => {
        if (read === "readPatient")
            return appointments.filter(appointment => appointment.patientname === name);
        else if (read === "readStaffs")
            return data.filter(schedule => schedule.name === name);
    }, [appointments, name, read]);

    const [eventRead, setEventRead] = useState([])
    {
        isRead !== null &&

            useEffect(() => {
                const eventsAppointmentMatchRead = AppointmentMatchRead.map(item => {
                    if (read === "readPatient") {
                        return {
                            id: item.id,
                            title: `${moment(item.date).format('MM/DD')} ` + 'Appointment ',
                            start: new Date(item.date + 'T' + item.time),
                            end: new Date(new Date(item.date + 'T' + item.time).getTime() + 1 * 60 * 60 * 1000),
                            type: 'Appointment',
                            desc: 'Appointment between Doctor ' + item.doctorname + " and " + ' Patient ' + item.patientname,
                        };
                    } else if (read === "readStaffs") {
                        return {
                            id: item.id,
                            title: `${moment(item.date).format('MM/DD')}` + ' - ' + item.name + ' ',
                            start: new Date(item.date + 'T' + item.start),
                            end: new Date(item.date + 'T' + item.end),
                            type: 'Schedule',
                            desc: 'Work from ' + `${item.start}` + ' to ' + `${item.end}`,
                        };
                    }
                    return null; // Thêm return null để tránh lỗi lặp lại với các trường hợp khác
                });


                setEventRead(eventsAppointmentMatchRead);
            }, [AppointmentMatchRead]);
    }

    const [eventsAppointmentMatch, setEventsAppointmentMatch] = useState([])
    {
        isRead !== null && useEffect(() => {
            const eventAM = AppointmentMatch.map(item => ({
                id: item.id,
                title: `${moment(item.date).format('MM/DD')} ` + 'Appointment ',
                start: new Date(item.date + 'T' + item.time),
                end: new Date(new Date(item.date + 'T' + item.time).getTime() + 1 * 60 * 60 * 1000),
                type: 'Appointment',
                desc: 'Appointment between Doctor ' + item.doctorname + " and " + ' Patient ' + item.patientname,
            }));
            setEventsAppointmentMatch(eventAM);
        }, [AppointmentMatch]);
    }

    const [eventsScheduleMatch, setEventsScheduleMatch] = useState([])
    {
        isRead !== null && useEffect(() => {
            const eventSM = ScheduleMatch.map(item => ({
                id: item.id,
                title: `${moment(item.date).format('MM/DD')}` + ' - ' + item.name + ' ',
                start: new Date(item.date + 'T' + item.start),
                end: new Date(item.date + 'T' + item.end),
                type: 'Schedule',
                desc: 'Work from ' + `${item.start}` + ' to ' + `${item.end}`,
            }));
            setEventsScheduleMatch(eventSM);
        }, [ScheduleMatch]);
    }

    // console.log(eventRead)
    const [currentView, setCurrentView] = useState("Work");
    const renderCalendar = () => (
        <>
            <div className="d-flex justify-content-end mt-3 align-items-end border-bottom mb-4">
                <div className="flex-grow-1 mx-3 mb-2">
                    <select className='form-control mb-2 w-75 fw-bold' value={currentView} onChange={e => setCurrentView(e.target.value)}>
                        <option value="Work">Work schedule</option>
                        <option value="Appointment">Appointment schedule</option>
                    </select>
                </div>
                <Link to="/appointment/add" state={{ read: read, name: name }} className='btn btn-success me-5 py-1 mb-3 '> + New Appointment </Link>
                <Link to="/schedule/add" state={{ name: name }} className='btn btn-success me-5 py-1 mb-3 '> + New Schedule </Link>
                <div className="mb-2 me-3"><i className="bi bi-calendar-week" style={{ fontSize: '1.9rem' }}></i></div>
            </div>

            {currentView === "Work" ?
                <Calendar
                    localizer={localizer}
                    events={eventsWork}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '600px' }}
                    selectable
                    popup
                    // onSelectSlot={handleSelectSlot}
                    timeslots={1}
                    components={{
                        event: EventComponent
                    }}
                />
                :
                <Calendar
                    localizer={localizer}
                    events={eventsAppointment}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '600px' }}
                    selectable
                    popup
                    // onSelectSlot={handleSelectSlot}
                    timeslots={1}
                    components={{
                        event: EventComponent
                    }}
                />
            }

        </>

    );

    const renderReadCalendar = () => (
        <>
            <div className='d-flex'>
                <div className='flex-grow-1 me-5'>
                    <select className='form-control mb-2 w-75' value={currentView} onChange={e => setCurrentView(e.target.value)}>
                        <option value="Work">Work schedule</option>
                        <option value="Appointment">Appointment schedule</option>
                    </select>
                </div>
                <Link to="/appointment/add" state={{ name: name }} className='btn btn-success me-4 py-1 mb-3 '> + New Appointment </Link>
                <Link to="/schedule/add" state={{ name: name }} className='btn btn-success me-2 py-1 mb-3 '> + New Schedule </Link>
            </div>

            {currentView === "Work" ? <div> {
                eventsScheduleMatch.length === 0 ?
                    <h5 style={{ color: 'grey' }}>No available schedule!</h5> // Trả về null nếu mảng eventRead rỗng
                    :
                    <Calendar
                        localizer={localizer}
                        events={eventsScheduleMatch}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '600px' }}
                        selectable
                        popup
                        // onSelectSlot={handleSelectSlot}
                        timeslots={1}
                        components={{
                            event: EventComponent
                        }}
                    />
            }</div> : <div>{
                eventsAppointmentMatch.length === 0 ?
                    <h5 style={{ color: 'grey' }}>None of Appointment</h5> // Trả về null nếu mảng eventRead rỗng
                    :
                    <Calendar
                        localizer={localizer}
                        events={eventsAppointmentMatch}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '600px' }}
                        selectable
                        popup
                        // onSelectSlot={handleSelectSlot}
                        timeslots={1}
                        components={{
                            event: EventComponent
                        }}
                    />
            }</div>}
        </>
        // <Calendar
        //     localizer={localizer}
        //     events={eventRead}
        //     // defaultDate={new Date(moment(eventRead[0].start).format('YYYY, MM, DD'))} // Sử dụng ngày bắt đầu của cuộc họp gần nhất làm defaultView
        //     startAccessor="start"
        //     endAccessor="end"
        //     style={{ height: '600px' }}
        //     selectable
        //     popup
        //     timeslots={1}
        //     components={{
        //         event: EventComponent
        //     }}
        // />
    );


    return (
        <>
            {
                isRead === null &&
                <div className="d-flex align-items-center justify-content-center mt-3">
                    <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                        <div className="flex-grow-1">
                            <h3>SCHEDULE</h3>
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
            }

            <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ paddingTop: 20 }}>
                <div className="w-75 rounded bg-white border shadow " style={{ minHeight: 400 }}>
                    <div className="mx-3 mt-3 mb-4">
                        {isRead === null ? renderCalendar() : renderReadCalendar()}
                    </div>
                </div>
            </div>
        </>
    );
}


