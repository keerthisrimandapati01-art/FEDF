import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultFlight, type Flight } from "@/data/flights";

export type Passenger = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passport: string;
  nationality: string;
  dob: string;
  seat?: string;
};

type BookingState = {
  pnr: string;
  flight: Flight;
  passengers: Passenger[];
  baggageId: string;
  mealIds: Record<string, string>; // passengerId -> mealId
  checkedIn: boolean;
  step: number;
  setPnr: (p: string) => void;
  setFlight: (f: Flight) => void;
  setPassengers: (p: Passenger[]) => void;
  assignSeat: (passengerId: string, seat: string) => void;
  setBaggage: (id: string) => void;
  setMeal: (passengerId: string, mealId: string) => void;
  setStep: (n: number) => void;
  complete: () => void;
  reset: () => void;
};

const defaultPassengers: Passenger[] = [
  { id: "p1", firstName: "Aarav", lastName: "Sharma", email: "aarav@skyline.app", passport: "M7842193", nationality: "Indian", dob: "1992-03-14" },
];

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      pnr: "SKY7HXQ",
      flight: defaultFlight,
      passengers: defaultPassengers,
      baggageId: "b15",
      mealIds: { p1: "veg" },
      checkedIn: false,
      step: 0,
      setPnr: (pnr) => set({ pnr }),
      setFlight: (flight) => set({ flight }),
      setPassengers: (passengers) => set({ passengers }),
      assignSeat: (id, seat) =>
        set((s) => ({ passengers: s.passengers.map((p) => (p.id === id ? { ...p, seat } : p)) })),
      setBaggage: (baggageId) => set({ baggageId }),
      setMeal: (id, mealId) => set((s) => ({ mealIds: { ...s.mealIds, [id]: mealId } })),
      setStep: (step) => set({ step }),
      complete: () => set({ checkedIn: true }),
      reset: () =>
        set({
          pnr: "SKY7HXQ",
          flight: defaultFlight,
          passengers: defaultPassengers,
          baggageId: "b15",
          mealIds: { p1: "veg" },
          checkedIn: false,
          step: 0,
        }),
    }),
    { name: "skyline-booking" },
  ),
);