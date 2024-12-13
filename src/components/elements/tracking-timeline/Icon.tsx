import React from "react";

interface IconProps {
    text: string;
    border: string;
    textColor: string;
    bgColor: string;
    icon: string;
}

const Icon: React.FC<IconProps> = ({ text, icon, border, textColor, bgColor }) => {
    return (
        <>
            <div className="flex flex-col relative items-center">
                <div className={`flex relative items-center justify-center w-8 h-8 ${border} ${textColor} ${bgColor} rounded-full transition-colors duration-200`}>
                    <i className={`bx ${icon} transition-transform duration-200`}></i>
                </div>
                <p className="absolute text-slate-600 -bottom-12 leading-tight transition-transform duration-300">{text}</p>
            </div>
        </>        
    )
}

export default Icon;