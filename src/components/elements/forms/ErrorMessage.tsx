// src/components/forms/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  messages: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ messages }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <strong className="font-bold">Terjadi Kesalahan!</strong>
      <ul className="list-disc pl-5 mt-2 uppercase">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessage;
