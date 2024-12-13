import React from "react";
import "boxicons";
interface TextInputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  disable?: boolean;
  icon: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  type,
  icon,
  value,
  onChange,
  disable,
  required,
}) => {
  return (
    <div className="relative group">
      <i
        className={`bx ${icon} absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl gruop-hover:text-orange-500 transition-colors duration-300 `}
      />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
        disabled={disable}
        required={required}
      />
    </div>
  );
};

export default TextInput;
