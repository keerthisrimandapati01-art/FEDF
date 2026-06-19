import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import BookingForm from "./components/BookingForm";

describe("BookingForm Component", () => {
  test("Book Ticket button exists", () => {
    render(<BookingForm />);

    const button = screen.getByText(/Book Ticket/i);

    expect(button).toBeDefined();
  });
});