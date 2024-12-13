import React from "react";

interface TextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className="textarea textarea-bordered w-full"
    />
  );
};

export default TextArea;
