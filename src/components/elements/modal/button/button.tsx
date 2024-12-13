import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  "data-testid"?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className,
  disabled,
  "data-testid": testId,
}) => {
  return (
    <button
      data-testid={testId}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
