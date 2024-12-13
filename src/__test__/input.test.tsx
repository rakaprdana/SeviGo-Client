import TextInput from "../components/elements/modal/input/TextInput";
import TextArea from "../components/elements/modal/input/TextArea";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Render Input Component", () => {
  test("render text input", () => {
    render(
      <TextInput
        name="name"
        type="text"
        placeholder="your name"
        value=""
        icon={""}
        required={false}
        onChange={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText(/your name/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  test("render text area", () => {
    render(
      <TextArea
        name="text"
        placeholder="description"
        value=""
        onChange={() => {}}
      />
    );
    const inputAreaElement = screen.getByPlaceholderText(/description/i);
    expect(inputAreaElement).toBeInTheDocument();
    expect(inputAreaElement).toHaveValue("");
  });
});

describe("call onChange in input element", () => {
  test("call onChange input", () => {
    const handleChange = jest.fn();
    render(
      <TextInput
        name="email"
        type="email"
        placeholder="your email"
        value="email"
        icon={""}
        required={false}
        onChange={handleChange}
      />
    );
    const emailInput = screen.getByPlaceholderText(/your email/i);
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    expect(emailInput).toHaveValue("email");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  test("call onChange in text area", () => {
    const handleChange = jest.fn();
    render(
      <TextArea
        name="text"
        placeholder="description"
        value="description"
        onChange={handleChange}
      />
    );
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: "This is description" },
    });
    expect(descriptionInput).toHaveValue("description");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
