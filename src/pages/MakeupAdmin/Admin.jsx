import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import MakeupArtist from "./MakeupArtist";
import NewArtist from "./NewArtist";

export default function Admin() {
  const [makeupArtists, setMakeupArtists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedMakeUpLocation, setSelectedMakeUpLocation] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    JSON.parse(window.atob(adminToken.split(".")[1])).role === "HRADMIN" ? setToken(adminToken) : null ;
    
    axios.get("/api/maps").then((response) => {
        setLocations(response.data);
    });
  }, []);

  useEffect(() => {
    async function fetchMakeupArtists() {
      try {
        if(selectedMakeUpLocation !== ""){
        const response = await axios.get(`/api/makeupartist/${selectedMakeUpLocation}`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });
        setMakeupArtists(response.data);
        } 
      } catch (error) {
        console.error("Error fetching makeup artists:", error);
      }
    }
    fetchMakeupArtists();
  }, [selectedMakeUpLocation, token]);

  const handleLocationChange = (event) => {
    setSelectedMakeUpLocation(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/makeupartist/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const updatedMakeupArtists = makeupArtists.filter(
          (makeupArtist) => makeupArtist._id !== id
        );
        setMakeupArtists(updatedMakeupArtists);
      }
    } catch (error) {
      console.error("Error deleting makeup artist:", error);
    }
  };

  function handleClick(){
    console.log('hi1')
    navigate('/newmakeupartist')
    console.log('hi2')

  }

  return (
    <>
      <div>
      {/* `<Link to={"/newmakeupartist"}> */}
          <button onClick={handleClick}> Create New Make Up Artist</button>
        {/* </Link> */}
        <h2>Select a location:</h2>
        <select value={selectedMakeUpLocation} onChange={handleLocationChange}>
          <option value="">--Select a location--</option>
          {locations.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name}
            </option>
          ))}
        </select>
        {makeupArtists && makeupArtists.length > 0 ? (
      <div>
        <h2>Makeup Artists</h2>
        <ul>
          {makeupArtists.map((makeupArtist) => (
            <li key={makeupArtist._id}>
            <Link to={`/makeupartist/${makeupArtist._id}`}>
                {makeupArtist.name}
              </Link>
              <button onClick={() => handleDelete(makeupArtist._id)}>X</button>
            </li>
          ))}
        </ul>
      </div>):(<p> No makeup artist at this location</p>)}
    </div>    
    <Routes>
      {makeupArtists.map((makeupArtist) => (
      <Route key={makeupArtist._id} path={`/makeupartist/${makeupArtist._id}`} element={<MakeupArtist id={makeupArtist._id} />} />
        ))}
      <Route path="/newmakeupartist" element={<NewArtist />} />
    </Routes>
  </>
  );
}
