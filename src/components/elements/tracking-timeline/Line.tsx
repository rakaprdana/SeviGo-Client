import React from "react";

interface LineProps {
    bgColor: string;
}

const Line: React.FC<LineProps> = ({ bgColor = 'bg-slate-300' }) => {
    return (
        <div className={`h-1 ${bgColor} relative w-40 max-w-full transition-colors duration-200`}></div>
    )
}

export default Line;