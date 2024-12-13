import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Table from "../components/elements/table/admin/userTable"; // Sesuaikan dengan path komponen Anda
import api from "../services/api";
import { UserResponse } from "../types/user-type";

// Mock API
jest.mock("../services/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(), // Mocking PATCH request
}));

describe("Table Component", () => {
  const mockData: UserResponse[] = [
    {
      _id: "1",
      nik: "123456789",
      name: "User test 1",
      email: "user1@example.com",
      role: "User",
      is_verified: false,
      avatar: "avatar1.jpg",
      address: "123 Example Street",
    },
    {
      _id: "2",
      nik: "987654321",
      name: "User test 2",
      email: "user2@example.com",
      role: "Admin",
      is_verified: true,
      avatar: "avatar2.jpg",
      address: "456 Example Avenue",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table and displays users", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<Table />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("User test 1")).toBeInTheDocument();
      expect(screen.getByText("User test 2")).toBeInTheDocument();
    });

    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("Unverified")).toBeInTheDocument();
  });

  test("filters users based on search input", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText("User test 1")).toBeInTheDocument();
      expect(screen.getByText("User test 2")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "User test 1" } });

    expect(screen.getByText("User test 1")).toBeInTheDocument();
    expect(screen.queryByText("User test 2")).not.toBeInTheDocument();
  });

  test('displays "No users found" when filtered users are empty', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText("User test 1")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Nonexistent User" } });

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  // Test handleVerified interaction through UI
  test("calls API patch and updates user verification status when verify button is clicked", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    (api.patch as jest.Mock).mockResolvedValueOnce({});

    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText("User test 1")).toBeInTheDocument();
      expect(screen.getByText("User test 2")).toBeInTheDocument();
    });

    const verifyButton = screen.getByTestId("verify-btn-1");
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith("/users/verify/1", {
        is_verified: true,
      });
    });

    const verifiedStatus = screen.getByTestId("status-1");
    expect(verifiedStatus).toHaveTextContent("Verified");
  });

  test("displays an error message in the console if verification fails", async () => {
    // Mock API GET response
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });
    // Mock API PATCH response to simulate failure
    (api.patch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to verify user")
    );
    // Mock console.error
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
    render(<Table />);

    // Wait until user data is displayed
    await waitFor(() => {
      expect(screen.getByText("User test 1")).toBeInTheDocument();
    });
    const verifyButton = screen.getByTestId("verify-btn-1");
    fireEvent.click(verifyButton);

    // Wait for the API failure and the error handling
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Error verify:",
        expect.any(Error)
      );
    });
    consoleErrorMock.mockRestore();
  });
});
