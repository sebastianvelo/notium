import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                    {label}
                </label>
            )}
            <input className={`dark:bg-secondary-950/50 dark:text-secondary-50 w-full px-3 py-2 border border-secondary-300 dark:border-secondary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${error ? "border-red-500" : ""} ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;