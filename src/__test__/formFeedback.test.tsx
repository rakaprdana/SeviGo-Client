import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import CreateReport from "../components/elements/forms/ContentCreateReport";
import { useNameProfile } from "../hooks/nameProfile";
import api from "../services/api";

// Mocking dependencies
jest.mock("../hooks/nameProfile", () => ({
  useNameProfile: jest.fn(),
}));

jest.mock("../services/api", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock window.alert
});

describe("CreateReport Component", () => {
  beforeEach(() => {
    (useNameProfile as jest.Mock).mockReturnValue({ name: "Test User" });
  });
  test("should render the component correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useParams } = require("react-router-dom");
    useParams.mockReturnValue({ complaintId: "12345" });
    render(
      <BrowserRouter>
        <CreateReport />
      </BrowserRouter>
    );

    expect(screen.getByText("Create Feedback")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Masukkan Judul..")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tulis Deskripsi..")
    ).toBeInTheDocument();
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
  });

  test("should update input values when changed", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useParams } = require("react-router-dom");
    useParams.mockReturnValue({ complaintId: "12345" });
    render(
      <BrowserRouter>
        <CreateReport />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText(
      "Masukkan Judul.."
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "Tulis Deskripsi.."
    ) as HTMLTextAreaElement;
    const dateInput = screen.getByPlaceholderText(
      "Pilih Tanggal.."
    ) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });

    expect(titleInput.value).toBe("Test Title");
    expect(descriptionInput.value).toBe("Test Description");
    expect(dateInput.value).toBe("2024-12-10");
  });

  test("should handle file changes and update preview image", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useParams } = require("react-router-dom");
    useParams.mockReturnValue({ complaintId: "12345" });
    render(
      <BrowserRouter>
        <CreateReport />
      </BrowserRouter>
    );

    const mockObjectUrl = "mock-url";
    URL.createObjectURL = jest.fn(() => mockObjectUrl);

    const mockFile = new File(["test image content"], "test-image.png", {
      type: "image/png",
    });
    const fileInput = screen.getByTestId("image-upload");

    fireEvent.change(fileInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);

    fireEvent.change(fileInput, {
      target: { files: [] },
    });
  });

  test("should handle form submission successfully", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useParams } = require("react-router-dom");
    useParams.mockReturnValue({ complaintId: "12345" });

    (api.post as jest.Mock).mockResolvedValue({
      status: 201,
      data: { message: "Feedback submitted successfully" },
    });

    render(
      <BrowserRouter>
        <CreateReport />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Masukkan Judul.."), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Pilih Tanggal.."), {
      target: { value: "2023-12-31" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tulis Deskripsi.."), {
      target: { value: "This is a test description" },
    });

    fireEvent.click(screen.getByText("SUBMIT"));

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith(
        `/admin-feedback/12345`,
        expect.any(FormData)
      )
    );

    expect(screen.getByText("Feedback telah terkirim.")).toBeInTheDocument();
  });

  test("should show alert when complaintId is missing", async () => {
    (useParams as jest.Mock).mockReturnValue({}); // Tidak ada complaintId

    render(
      <BrowserRouter>
        <CreateReport />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Masukkan Judul.."), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tulis Deskripsi.."), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Pilih Tanggal.."), {
      target: { value: "2024-12-10" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Complaint ID tidak ditemukan."
      );
      expect(api.post).not.toHaveBeenCalled();
    });
  });
});

describe("handleOptionChange function", () => {
  test("should update the selected option value", () => {
    render(
      <BrowserRouter>
        <CreateReport />
      </BrowserRouter>
    );
    const selectElement = screen.getByTestId("select-option");
    fireEvent.change(selectElement, { target: { value: "reject" } });
    expect(selectElement).toHaveValue("reject");
  });
});
