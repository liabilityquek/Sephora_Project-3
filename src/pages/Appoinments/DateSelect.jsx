const DateSelect = ({ date }) => {

    return (
        <p>
        <span>Date Selected:</span>
        {date.toLocaleDateString("en-UK")}
      </p>

    )
}

export default DateSelect;