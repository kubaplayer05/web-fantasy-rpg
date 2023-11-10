import React from "react";

interface ButtonProps {
    onClick?: () => {}
    className?: string,
    type?: "submit" | "reset" | "button"
    children: React.ReactNode
}

export default function Button({children, onClick, type, className}: ButtonProps) {

    return (
        <button type={type} onClick={onClick}
                className={`text-xl px-4 py-2.5 bg-blue text-white font-bold ${className}`}>
            {children}
        </button>
    )
}