import { useParams, Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Edit from './Edit'

export default function MakeupArtist() {
    const [ appointments, setAppointments] = useState([])
    const {id} = useParams();

    useEffect(()=>{
        async function fetchAppointments(){
        try{
            const response = await fetch(`/api/makeupartist/admin/${id}`);
            if(!response.ok){
                throw new Error("Failed to fetch appointments");
            }
            const data = await response.json();
            setAppointments(data);
        } catch (error){
            console.error("Error fetching appointments:" , error)
        }}
        fetchAppointments()
    },[id])

    

    console.log(appointments)

    return (
        <>
        {appointments.length > 0 && appointments[0].makeupArtist.id.name}
        <Link to={`/makeupartist/edit/${id}`}>
            <button>Edit </button>
        </Link>
          <h2>Appointments</h2>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>
                Date: {appointment.date} | Time:{appointment.timeslot} | Customer's Information: {appointment.customerInfo.name}, {appointment.customerInfo.email}
              </li>
            ))}
          </ul>
        <Routes>
            <Route path={`/makeupartist/edit/${id}`} element={<Edit />} />
        </Routes>
        </>
    );
}