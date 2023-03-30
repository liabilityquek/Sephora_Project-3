const generateTimeSlots = (start, end, intervalMins) => {
    const slots = [];
  
    for (let i = start * 60; i <= end * 60; i += intervalMins) {
      const h = Math.floor(i / 60);
      const m = i % 60;
  
      const nextTotalMins = i + intervalMins;
      const nextH = Math.floor(nextTotalMins / 60);
      const nextM = nextTotalMins % 60;
  
      if (nextH === end && nextM > 45) break;
  
      slots.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} - ${String(
          nextH
        ).padStart(2, "0")}:${String(nextM).padStart(2, "0")}`
      );
    }
  
    return slots;
  };
  
  const time = generateTimeSlots(8, 23, 60);
  
  const makeupArtist = [
    {
      location: "Vivo City",
      employee: [
        {
          name: "Makeup Artist A",
          workingSchedule: [
            {
              startDate: new Date("2023-03-27"),
              endDate: new Date("2023-04-08"),
            },
            
          ],
          workingHours: [
            {
              startTime: "09:00",
              endTime: "17:00",
            },
          ],
          breakTime: [
            {
              startTime: "13:00",
              endTime: "14:00",
            },
          ],
        },
        {
          name: "Makeup Artist D",
          workingSchedule: [
            {
              startDate: new Date("2023-03-28"),
              endDate: new Date("2023-04-09"),
            },
          ],
          workingHours: [
            {
              startTime: "11:00",
              endTime: "18:00",
            },
          ],
          breakTime: [
            {
              startTime: "15:00",
              endTime: "16:00",
            },
          ],
        },
      ],
    },
    {
      location: "Plaza Sing",
      employee: [
        {
          name: "Makeup Artist B",
          workingSchedule: [
            {
              startDate: new Date("2023-03-27"),
              endDate: new Date("2023-04-08"),
            },
          ],
          workingHours: [
            {
              startTime: "09:00",
              endTime: "17:00",
            },
          ],
          breakTime: [
            {
              startTime: "13:00",
              endTime: "14:00",
            },
          ],
        },
        {
          name: "Makeup Artist E",
          workingSchedule: [
            {
              startDate: new Date("2023-03-28"),
              endDate: new Date("2023-04-09"),
            },
          ],
          workingHours: [
            {
              startTime: "11:00",
              endTime: "18:00",
            },
          ],
          breakTime: [
            {
              startTime: "15:00",
              endTime: "16:00",
            },
          ],
        },
      ],
    },
    {
      location: "ION Orchard",
      employee: [
        {
          name: "Makeup Artist C",
          workingSchedule: [
            {
              startDate: new Date("2023-03-27"),
              endDate: new Date("2023-04-08"),
            }
          ],
          workingHours: [
            {
              startTime: "09:00",
              endTime: "17:00",
            },
          ],
          breakTime: [
            {
              startTime: "13:00",
              endTime: "14:00",
            }
          ]
        },
        {
          name: "Makeup Artist F",
          workingSchedule: [
            {
              startDate: new Date("2023-03-28"),
              endDate: new Date("2023-04-09"),
            }
          ],
          workingHours: [
            {
              startTime: "11:00",
              endTime: "18:00",
            },
          ],
          breakTime: [
            {
              startTime: "15:00",
              endTime: "16:00",
            }
          ]
        },
      ]
    }
  
  ];
  
  export { time, makeupArtist };