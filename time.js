import moment from 'moment';

const generateTimeSlots = (start, end, intervalMins) => {
  const slots = [];

  for (let i = start * 60; i <= end * 60; i += intervalMins) {

    const currentMoment = moment().startOf('day').add(i, 'minutes');
    const nextMoment = currentMoment.clone().add(intervalMins, 'minutes');
    if(nextMoment.hour() === end && nextMoment.minute() > 45) break;

    slots.push(`${currentMoment.format('HH:mm')} - ${nextMoment.format('HH:mm')}`)
  }

  return slots;
};

const time = generateTimeSlots(8, 23, 60);


export { time };