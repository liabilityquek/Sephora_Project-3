import React from "react";
import { makeupArtist } from "./time"

const BookingForm = ({ form, selectArtist, selectLocation, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      <br />
      <label>Email:</label>
      <input type="text" name="email" onChange={handleChange} />

      <label htmlFor="location">Choose a location:</label>

      <select name="location" onChange={handleChange}>
        <option value="">--Please choose location</option>
        {makeupArtist.map((artist, index) => {
          return (
            <option key={index} value={artist.location}>
              {" "}
              {artist.location}
            </option>
          );
        })}
      </select>

      {selectLocation && (
        <select name="artist" onChange={handleChange}>
          <option value="">--Please select makeup artist</option>
          {selectArtist.map((artist, index) => (
            <option key={index} value={artist.name}>
              {" "}
              {artist.name}
              {/* {console.log(artist)} */}
            </option>
          ))}
        </select>
      )}

      <button type="submit">Send Email Notification </button>
    </form>
  );
};

export default BookingForm;