import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Times from "./Times";
import Booking from "./Booking";
import Cal from "./Calendar";
import DateSelect from "./DateSelect";

const AppointmentPage = () => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [selectArtist, setSelectedArtist] = useState([]);
  const [location, setLocation] = useState();
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });

  console.log(`selectArtist in ApptPage: ${JSON.stringify(selectArtist)}`);
  console.log(`location in ApptPage: ${JSON.stringify(location)}`);

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <Booking
        setSelectedArtist={setSelectedArtist}
        showTime={showTime}
        date={date}
        setLocation={setLocation}
        setCustomerInfo={setCustomerInfo}
        customerInfo={customerInfo}
      />
      {showTime ? (
        <Times
          date={date}
          selectArtist={selectArtist}
          showTime={showTime}
          location={location}
          customerInfo={customerInfo}
        />
      ) : null}

      <div>
        <Cal
          date={date}
          setDate={setDate}
          selectArtist={selectArtist}
          setShowTime={setShowTime}
        />
      </div>
      <DateSelect date={date} />
    </div>
  );
};

export default AppointmentPage;