import React from "react";

interface ButtonProps {
    onClick?: () => void
    className?: string,
    type?: "submit" | "reset" | "button"
    children: React.ReactNode
    disabled?: boolean
}

export default function Button({children, onClick, type, className, disabled}: ButtonProps) {

    return (
        <button type={type} onClick={onClick} disabled={disabled}
                className={`text-xl px-4 py-2.5 bg-blue text-white font-bold ${className}`}>
            {children}
        </button>
    )
}