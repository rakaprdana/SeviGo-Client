import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormReport from "../components/elements/forms/formReport";
import api from "../services/api";

jest.mock("../services/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  (api.get as jest.Mock).mockResolvedValue({ data: { data: [] } });
  (api.post as jest.Mock).mockResolvedValue({ data: { data: {} } });
});
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
  global.URL.revokeObjectURL = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("FormReport Component", () => {
  test("should render the form with all fields and buttons", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        data: [{ _id: "1", name: "Category 1", updatedAt: "2023-01-01" }],
      },
    });

    render(<FormReport />);

    // Verify form fields
    expect(
      await screen.findByPlaceholderText("Judul laporan anda..")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Isi laporan anda..")
    ).toBeInTheDocument();
    expect(screen.getByText("Upload Bukti")).toBeInTheDocument();
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
    expect(screen.getByText("CANCEL")).toBeInTheDocument();
  });

  test("should fetch and display categories", async () => {
    const mockCategories = [
      { _id: "1", name: "Category 1", updatedAt: "2023-01-01" },
      { _id: "2", name: "Category 2", updatedAt: "2023-01-02" },
    ];

    (api.get as jest.Mock).mockResolvedValue({
      data: { data: mockCategories },
    });

    render(<FormReport />);

    const categorySelect = await screen.findByRole("combobox");
    expect(categorySelect).toBeInTheDocument();

    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  test("should display error if category is not selected", async () => {
    render(<FormReport />);

    fireEvent.submit(screen.getByText("SUBMIT"));

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText("Please select a category")).toBeInTheDocument();
    });
  });

  test("should call the API on form submit with valid data", async () => {
    const mockCategory = { _id: "1", name: "Category 1" };
    (api.get as jest.Mock).mockResolvedValue({
      data: { data: [mockCategory] },
    });
    render(<FormReport />);

    fireEvent.change(
      await screen.findByPlaceholderText("Judul laporan anda.."),
      { target: { value: "Test Title" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Isi laporan anda.."), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: mockCategory._id },
    });

    fireEvent.submit(screen.getByText("SUBMIT"));

    // Verify API call
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/complaints",
        expect.any(FormData)
      );
    });
  });

  test("should display preview image when file is uploaded", async () => {
    render(<FormReport />);

    // Mock file input
    const file = new File(["dummy content"], "evidence.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(/upload bukti/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for preview image to be displayed
    const previewImage = await screen.findByAltText("Preview Evidence");
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute("src", expect.any(String));
  });

  test("should reset form fields when CANCEL button is clicked", async () => {
    render(<FormReport />);

    fireEvent.change(
      await screen.findByPlaceholderText("Judul laporan anda.."),
      {
        target: { value: "Test Title" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Isi laporan anda.."), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByText("CANCEL"));

    expect(screen.getByPlaceholderText("Judul laporan anda..")).toHaveValue("");
    expect(screen.getByPlaceholderText("Isi laporan anda..")).toHaveValue("");
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  test("should revoke preview URL when component unmounts", async () => {
    const { unmount } = render(<FormReport />);

    const file = new File(["dummy content"], "evidence.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(/upload bukti/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    unmount();

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("mocked-url");
  });

  test("should handle error during category fetch", async () => {
    (api.get as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch categories")
    );

    render(<FormReport />);

    const categorySelect = screen.getByRole("combobox");
    expect(categorySelect).toBeInTheDocument(); // Dropdown tetap ada
    await waitFor(() => {
      expect(screen.queryByText("Category 1")).not.toBeInTheDocument();
    });
  });

  test("should append evidence to FormData when file is uploaded", async () => {
    const mockCategory = { _id: "1", name: "Category 1" };
    (api.get as jest.Mock).mockResolvedValue({
      data: { data: [mockCategory] },
    });

    render(<FormReport />);

    // Simulasikan pengisian formulir
    fireEvent.change(
      await screen.findByPlaceholderText("Judul laporan anda.."),
      {
        target: { value: "Test Title" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Isi laporan anda.."), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: mockCategory._id },
    });

    // Simulasikan pengunggahan file bukti
    const file = new File(["dummy content"], "evidence.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(/upload bukti/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Submit form
    fireEvent.submit(screen.getByText("SUBMIT"));

    // Verifikasi bahwa API dipanggil dengan FormData yang berisi bukti
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/complaints",
        expect.any(FormData) // Pastikan FormData dipakai
      );
      const formData = (api.post as jest.Mock).mock.calls[0][1] as FormData;
      expect(formData.has("evidence")).toBe(true); // Periksa evidence ada
      expect(formData.get("evidence")).toBe(file); // Periksa value-nya benar
    });
  });

  test("should close modal when closeModal is called", async () => {
    render(<FormReport />);

    // Simulasikan modal terbuka
    fireEvent.submit(screen.getByText("SUBMIT"));
    await waitFor(() => {
      expect(screen.getByText("Please select a category")).toBeInTheDocument();
    });
    const closeButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(closeButton);

    // Verifikasi modal tertutup dan errorBody di-reset
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please select a category")
      ).not.toBeInTheDocument();
    });
  });
});
