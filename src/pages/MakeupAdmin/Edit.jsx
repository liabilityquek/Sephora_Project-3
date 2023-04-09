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
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          {makeupArtists && (
            <form onSubmit={handleSubmit}>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={handleInputChange}
                  defaultValue={makeupArtists.name}
                  required
                  />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleInputChange}
                      defaultValue={makeupArtists.email}
                      required/>
                  </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={makeupArtists.phone}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <select
            name="location"
            className="form-control"
            defaultValue={makeupArtists.locations.id}
            onChange={handleInputChange}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={makeupArtists.description}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={makeupArtists.price}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={moment(makeupArtists.date).format("YYYY-MM-DD")}
            min={minDate}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            name="time"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={makeupArtists.time}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    )}
  </div>
</div>
  </div>
  );
}
