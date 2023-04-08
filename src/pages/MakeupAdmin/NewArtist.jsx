import { useEffect, useState } from "react";
import moment from 'moment'

export default function NewArtist() {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [breakStartTime, setBreakStartTime] = useState('');
    const [breakEndTime, setBreakEndTime] = useState('');
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('');
    const [minDate, setMinDate] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem("token");
    
    useEffect(()=>{
        async function fetchLocations(){
            try{
                const response = await fetch(`/api/maps`);
                if(!response.ok){
                    throw new Error("Failed to fetch locations");
                }
                const data = await response.json();
                setLocations(data)
            } catch(error){
                console.error("Error fetching location:" , error)
            }}
            fetchLocations()
    }, [])

    useEffect(() => {
        const today = moment().format("YYYY-MM-DD");
        setMinDate(today);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
          name,
          workingSchedule: { startDate, endDate},
          workingHours: { startTime, endTime },
          breakTime: { startTime: breakStartTime, endTime: breakEndTime},
          location: { id: selectedLocation },
        };
        try {
            const response = await fetch('/api/makeupartist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
              throw new Error('Failed to create makeup artist');
            }
            const newMakeupArtist = await response.json();
            console.log('New makeup artist created:', newMakeupArtist);
            setSuccessMessage("Makeup artist successfully created!");
        } catch (error) {
            console.error('Error creating makeup artist:', error);
        }
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
          case 'workingHours.startTime':
            setStartTime(value);
            break;
          case 'workingHours.endTime':
            setEndTime(value);
            break;
          case 'breakTime.startTime':
            setBreakStartTime(value);
            break;
          case 'breakTime.endTime':
            setBreakEndTime(value);
            break;
          default:
            break;
        }
    };
    
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

  return (
    <div>
        <h1>Create a new makeup artist!</h1>
        <form onSubmit={handleSubmit}>
        {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

                <label htmlFor="workingSchedule.startDate">Start Date: </label>
                <input type="date" id="startDate" onChange={(event) => setStartDate(event.target.value)} placeholder="YYYY-MM-DD" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" min={minDate} value={moment(startDate).format('YYYY-MM-DD')} />

                <label htmlFor="workingSchedule.endDate">End Date:</label>
                <input type="date" id="endDate" placeholder="YYYY-MM-DD" onChange={(event) => setEndDate(event.target.value)} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" min={minDate} value={moment(endDate).format('YYYY-MM-DD')}/>

                <label htmlFor="workingHours.startTime">Start Time:</label>
                <input type="time" name="workingHours.startTime" onChange={handleInputChange} placeholder="HH:MM" pattern="^([01]\d|2[0-3]):([0-5]\d)$" />

                <label htmlFor="workingHours.endTime">End Time:</label>
                <input type="time" name="workingHours.endTime" placeholder="HH:MM" onChange={handleInputChange}  pattern="^([01]\d|2[0-3]):([0-5]\d)$"  />

                <label htmlFor="breakTime.startTime">Break Start Time:</label>
                <input type="time" name="breakTime.startTime" placeholder="HH:MM" onChange={handleInputChange}   pattern="^([01]\d|2[0-3]):([0-5]\d)$" />

                <label htmlFor="breakTime.endTime">Break End Time:</label>
                <input type="time" name="breakTime.endTime" placeholder="HH:MM" onChange={handleInputChange}  pattern="^([01]\d|2[0-3]):([0-5]\d)$" /> 

                <label htmlFor="location">Location:</label>
                <select name="location" value={selectedLocation} onChange={handleLocationChange}>
                <option value="">--Please Select Location--</option>
                {locations.map((location) => (
                    <option key={location.id} value={location._id}>
                    {location.name}
                    </option>
                ))}
                </select>
                <button type="submit">Create</button>
        </form>
    </div>
  )
}
