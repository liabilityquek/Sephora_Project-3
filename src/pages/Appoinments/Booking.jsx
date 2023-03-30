import React, { useState } from "react";
import BookingForm from "./BookingForm";
import {makeupArtist} from "./time"

const Booking = ({ setSelectedArtist, setLocation, setCustomerInfo, customerInfo }) => {
  const [form, setForm] = useState({});
  const [selectArtist, setSelectArtist] = useState({});
  const [selectLocation, setSelectLocation] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name" || e.target.name === "email") {
      setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    if (e.target.name === "location") {
      setSelectLocation(e.target.value);
      setLocation(e.target.value);

      const artistLocation = makeupArtist.find(
        (artist) => artist.location === e.target.value
      );

      if (artistLocation) {
        setSelectArtist(artistLocation.employee);
        console.log(`artistLocation.employee: ${JSON.stringify(artistLocation)}`);
      } else {
        setSelectArtist({});
      }
    }
    if (e.target.name === "artist") {
      const selectedArtist = selectArtist.find(
        (artist) => artist.name === e.target.value
      );

      setSelectedArtist(selectedArtist);
      console.log(`selectedArtist in BookingForm: ${JSON.stringify(selectedArtist)}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <BookingForm
        form={form}
        selectArtist={selectArtist}
        selectLocation={selectLocation}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Booking;