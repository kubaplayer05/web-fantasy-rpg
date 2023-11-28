import {HTMLInputTypeAttribute} from "react";

interface InputProps {
    onChange?: () => {};
    className?: string;
    value?: string;
    defaultValue?: string,
    min?: string,
    max?: string
    placeholder?: string;
    id?: string;
    type?: HTMLInputTypeAttribute,
    name?: string,
}

export default function Input({
                                  value,
                                  defaultValue,
                                  name,
                                  onChange,
                                  className,
                                  placeholder,
                                  id,
                                  type,
                                  min,
                                  max
                              }: InputProps) {

    return (
        <input name={name} id={id} onChange={onChange} type={type} defaultValue={defaultValue} value={value}
               placeholder={placeholder} min={min} max={max}
               className={`px-4 py-2.5 rounded bg-transparent border-2 border-gray-100 text-white focus:border-blue-600 ${className}`}/>
    )
}