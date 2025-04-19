import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { vi } from "vitest";
import * as supabaseModule from "./supabaseClient";

vi.mock("./supabaseClient", () => {
  return {
    supabase: {
      from: () => ({
        insert: vi.fn(async (rows) => {
          if (rows[0].email === "duplicate@example.com") {
            return { error: { code: "23505" }, data: null };
          }
          return { error: null, data: [{}] };
        }),
      }),
    },
  };
});

describe("HomePage Email Waitlist", () => {
  it("renders input and button", () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join waitlist/i })).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join waitlist/i }));

    await waitFor(() =>
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    );
  });

  it("handles duplicate email", async () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "duplicate@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join waitlist/i }));

    await waitFor(() =>
      expect(screen.getByText(/already registered/i)).toBeInTheDocument()
    );
  });

  it("shows success message for valid email", async () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join waitlist/i }));

    await waitFor(() =>
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    );
  });
});
