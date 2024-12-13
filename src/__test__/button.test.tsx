import Button from "../components/elements/modal/button/button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button Component", () => {
  test("renders button with children", () => {
    render(<Button>Click</Button>);
    const buttonElement = screen.getByText(/click/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const buttonElement = screen.getByText(/click/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies specified button type", () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  test("applies additional className", () => {
    render(<Button className="custom-class">Styled</Button>);
    const buttonElement = screen.getByText(/styled/i);
    expect(buttonElement).toHaveClass("custom-class");
  });
});
