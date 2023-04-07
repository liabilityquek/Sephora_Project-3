import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Edit() {
    const {id} = useParams()
    const [makeupArtists, setMakeupArtists]= useState()
    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        console.log(makeupArtists);
    }, [makeupArtists]);

    useEffect(()=>{
        async function fetchMakeupArtists(){
            try{
                const response = await fetch(`/api/makeupartist/edit/${id}`);
                if(!response.ok){
                    throw new Error("Failed to fetch appointments");
                }
                const data = await response.json();
                setMakeupArtists(data);
            } catch (error){
                console.error("Error fetching appointments:" , error)
        }}
        fetchMakeupArtists()
    },[id])

    const isDateValid = (date) => {
        const currentDate = new Date();
        const enteredDate = new Date(date);
        return enteredDate >= currentDate;
    };

    const handleInputChange = (event) => {
        if (event && event.target) {
        const { name, value } = event.target;

        setMakeupArtists(prevState => ({
          ...prevState,
          [name]: value
        }));
        if (name === "workingSchedule.startDate" && !isDateValid(value)) {
            setValidationError("Please enter a valid future date.");
          } else {
            setValidationError(null);
          }
    }};

    const isBreakTimeValid = () => {
        if (!makeupArtists || !makeupArtists.breakTime) {
            return false;
        }
        const { workingHours, breakTime } = makeupArtists;
        const workingStartTime = new Date(`2000-01-01T${workingHours.startTime}`);
        const workingEndTime = new Date(`2000-01-01T${workingHours.endTime}`);
        const breakStartTime = new Date(`2000-01-01T${breakTime.startTime}`);
        const breakEndTime = new Date(`2000-01-01T${breakTime.endTime}`);
      
        return (
          breakStartTime >= workingStartTime &&
          breakStartTime <= workingEndTime &&
          breakEndTime >= workingStartTime &&
          breakEndTime <= workingEndTime &&
          breakStartTime < breakEndTime
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            if (!isDateValid(makeupArtists.workingSchedule.startDate) || !isDateValid(makeupArtists.workingSchedule.endDate)) {
                throw new Error("Invalid date range");
            }

          const response = await fetch(`/api/makeupartist/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(makeupArtists)
          });
          if (!response.ok) {
            throw new Error("Failed to update makeup artist");
          }
          console.log('Makeup artist updated successfully!');
        } catch (error) {
          console.error("Error updating makeup artist:", error)
        }
    };


   return (
    <>
    {makeupArtists &&
        <div>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" onChange={handleInputChange} value={makeupArtists.name}/>

                    <label htmlFor="workingSchedule.startDate">Start Date: </label>
                    <input type="text" name="workingSchedule.startDate" onChange={handleInputChange} placeholder="YYYY-MM-DD" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" /> {validationError && <p style={{ color: "red" }}>{validationError}</p>}

                    <label htmlFor="workingSchedule.endDate">End Date:</label>
                    <input type="text" name="workingSchedule.endDate" placeholder="YYYY-MM-DD" onChange={handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />

                    <label htmlFor="workingHours.startTime">Start Time:</label>
                    <input type="text" name="workingHours.startTime" onChange={handleInputChange} placeholder="HH:MM" pattern="^([01]\d|2[0-3]):([0-5]\d)$" />

                    <label htmlFor="workingHours.endTime">End Time:</label>
                    <input type="text" name="workingHours.endTime" placeholder="HH:MM" onChange={handleInputChange}  pattern="^([01]\d|2[0-3]):([0-5]\d)$" />

                    <label htmlFor="breakTime.startTime">Break Start Time:</label>
                    <input type="text" name="breakTime.startTime" placeholder="HH:MM" onChange={handleInputChange}   pattern="^([01]\d|2[0-3]):([0-5]\d)$"/>

                    <label htmlFor="breakTime.endTime">Break End Time:</label>
                    <input type="text" name="breakTime.endTime" placeholder="HH:MM" onChange={handleInputChange}  pattern="^([01]\d|2[0-3]):([0-5]\d)$"/> 

                    <label htmlFor="location.id.name">Location Name:</label>
                    <input type="text" name="location.id.name" onChange={handleInputChange} />

                    <button type="submit" disabled={!isBreakTimeValid()}>Submit</button>
            </form>
        </div>
    }
    </>
    )
}
