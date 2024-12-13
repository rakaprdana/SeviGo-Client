import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string; 
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl text-black font-bold mb-2 whitespace-nowrap">{title}</h1>
        <div className="w-full h-px bg-gray-800"></div>
      </div>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default PageHeader;
