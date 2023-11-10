import {HTMLInputTypeAttribute} from "react";

interface InputProps {
    onChange?: () => {};
    className?: string;
    value?: string;
    placeholder?: string;
    id?: string;
    type?: HTMLInputTypeAttribute
}

export default function Input({value, onChange, className, placeholder, id, type}: InputProps) {

    return (
        <input id={id} onChange={onChange} type={type} value={value} placeholder={placeholder}
               className={`px-4 py-2.5 rounded bg-transparent border-2 border-gray-100 text-white focus:border-blue-600 ${className}`}/>
    )
}