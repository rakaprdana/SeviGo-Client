import React from 'react';

interface CardProps {
  title: string | null;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card shadow-lg p-6 bg-gray-50 ">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
