import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

const token = localStorage.getItem("token");

export default function Edit() {
  const { id } = useParams();
  const [makeupArtists, setMakeupArtists] = useState();
  const [minDate, setMinDate] = useState("");
  const [locations, setLocations] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  console.log(id);

  useEffect(() => {
    console.log(makeupArtists);
  }, [makeupArtists]);

  useEffect(() => {
    async function fetchMakeupArtists() {
      try {
        const response = await fetch(`/api/makeupartist/edit/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setMakeupArtists(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchMakeupArtists();
  }, [id]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(`/api/maps`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
    fetchLocations();
  }, [id]);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    setMinDate(today);
  }, []);

  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      if (name === "location") {
        setMakeupArtists((prevState) => ({
          ...prevState,
          location: { id: value },
        }));
      } else {
        setMakeupArtists((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/makeupartist/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(makeupArtists),
      });
      if (!response.ok) {
        throw new Error("Failed to update makeup artist");
      }
      setSuccessMessage("Makeup artist updated successfully!");
      console.log("Makeup artist updated successfully!");
    } catch (error) {
      console.error("Error updating makeup artist:", error);
    }
  };

  return (
    <>
      {makeupArtists && (
        <div>
          <form onSubmit={handleSubmit}>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              defaultValue={makeupArtists[0].name}
            />

            <label htmlFor="workingSchedule.startDate">Start Date: </label>
            <input
              type="date"
              name="workingSchedule.startDate"
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              min={minDate}
              defaultValue={moment(
                makeupArtists[0].workingSchedule.startDate
              ).format("YYYY-MM-DD")}
            />

            <label htmlFor="workingSchedule.endDate">End Date:</label>
            <input
              type="date"
              name="workingSchedule.endDate"
              placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              min={minDate}
              defaultValue={moment(
                makeupArtists[0].workingSchedule.startDate
              ).format("YYYY-MM-DD")}
            />

            <label htmlFor="workingHours.startTime">Start Time:</label>
            <input
              type="time"
              name="workingHours.startTime"
              onChange={handleInputChange}
              placeholder="HH:MM"
              pattern="^([01]\d|2[0-3]):([0-5]\d)$"
              defaultValue={makeupArtists[0].workingHours.startTime}
            />

            <label htmlFor="workingHours.endTime">End Time:</label>
            <input
              type="time"
              name="workingHours.endTime"
              placeholder="HH:MM"
              onChange={handleInputChange}
              pattern="^([01]\d|2[0-3]):([0-5]\d)$"
              defaultValue={makeupArtists[0].workingHours.endTime}
            />

            <label htmlFor="breakTime.startTime">Break Start Time:</label>
            <input
              type="time"
              name="breakTime.startTime"
              placeholder="HH:MM"
              onChange={handleInputChange}
              pattern="^([01]\d|2[0-3]):([0-5]\d)$"
              defaultValue={makeupArtists[0].breakTime.startTime}
            />

            <label htmlFor="breakTime.endTime">Break End Time:</label>
            <input
              type="time"
              name="breakTime.endTime"
              placeholder="HH:MM"
              onChange={handleInputChange}
              pattern="^([01]\d|2[0-3]):([0-5]\d)$"
              defaultValue={makeupArtists[0].breakTime.endTime}
            />

            <label htmlFor="location">Location Name:</label>
            <select
              name="location"
              onChange={handleInputChange}
              defaultValue={makeupArtists[0].location._id}
            >
              <option value="">--Select Location--</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
