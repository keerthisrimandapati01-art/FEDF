export type Flight = {
  id: string;
  number: string;
  from: { code: string; city: string };
  to: { code: string; city: string };
  aircraft: string;
  date: string;
  depart: string;
  arrive: string;
  duration: string;
  gate: string;
  terminal: string;
  status: "On Time" | "Boarding" | "Delayed";
};

export const flights: Flight[] = [
  {
    id: "f1",
    number: "SL-204",
    from: { code: "DEL", city: "New Delhi" },
    to: { code: "DXB", city: "Dubai" },
    aircraft: "Boeing 787-9 Dreamliner",
    date: "2026-06-12",
    depart: "21:40",
    arrive: "23:55",
    duration: "3h 45m",
    gate: "A12",
    terminal: "T3",
    status: "On Time",
  },
  {
    id: "f2",
    number: "SL-815",
    from: { code: "BOM", city: "Mumbai" },
    to: { code: "SIN", city: "Singapore" },
    aircraft: "Airbus A350-900",
    date: "2026-06-15",
    depart: "01:30",
    arrive: "10:05",
    duration: "5h 35m",
    gate: "C7",
    terminal: "T2",
    status: "Boarding",
  },
  {
    id: "f3",
    number: "SL-401",
    from: { code: "BLR", city: "Bengaluru" },
    to: { code: "LHR", city: "London" },
    aircraft: "Boeing 777-300ER",
    date: "2026-06-18",
    depart: "03:15",
    arrive: "08:40",
    duration: "10h 25m",
    gate: "B22",
    terminal: "T2",
    status: "On Time",
  },
  {
    id: "f4",
    number: "SL-118",
    from: { code: "HYD", city: "Hyderabad" },
    to: { code: "JFK", city: "New York" },
    aircraft: "Airbus A380-800",
    date: "2026-06-22",
    depart: "23:50",
    arrive: "06:15",
    duration: "15h 25m",
    gate: "D4",
    terminal: "T4",
    status: "On Time",
  },
  {
    id: "f5",
    number: "SL-509",
    from: { code: "MAA", city: "Chennai" },
    to: { code: "SYD", city: "Sydney" },
    aircraft: "Boeing 787-10",
    date: "2026-06-25",
    depart: "19:00",
    arrive: "11:30",
    duration: "12h 30m",
    gate: "E9",
    terminal: "T3",
    status: "Delayed",
  },
];

export const defaultFlight = flights[0];