"use client"
import useSelectInput, { SelectOption } from "@/hooks/components/useSelectInput";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SelectProps {
    label?: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    className?: string;
}

const Select: React.FC<SelectProps> = ({ label = "", name, value = "", options, className = "", onChange }) => {
    const {
        selectedLabel,
        isOpen,
        selectRef,
        toggleDropdown,
        handleOptionSelect
    } = useSelectInput({
        options,
        initialValue: value,
        onChange: (newValue) => {
            const syntheticEvent = {
                target: {
                    name,
                    value: newValue.toString()
                },
                currentTarget: {
                    name,
                    value: newValue.toString()
                }
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange(syntheticEvent);
        },
    });

    const labelClassName = "block text-sm font-medium text-secondary-700 dark:text-white mb-1";
    const selectTriggerClassName = " border border-black/20 dark:border-white/20 text-xs transition-all duration-200 w-full px-3 py-2 dark:text-white bg-white dark:bg-black/50 dark:bg-black/50 rounded-md shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex justify-between items-center cursor-pointer space-x-2";
    const listClassName = "flex flex-col absolute z-50 w-full bg-white dark:bg-black/80 dark:bg-secondary-900/80 backdrop-blur-2xl rounded-md shadow-lg overflow-y-auto scrollbar transition-all duration-300";
    const listStatusClassName = isOpen ? "max-h-60 opacity-100 scale-y-100 origin-top" : "max-h-0 opacity-0 scale-y-0 origin-top";

    return (
        <div className={`relative z-50 ${className}`} ref={selectRef}>
            <label htmlFor={name} className={labelClassName}>
                {label}
            </label>

            <div
                className={`${selectTriggerClassName} ${isOpen ? "ring-2 ring-primary-500 border-primary-500 dark:ring-primary-300 dark:border-primary-300" : ""}`}
                onClick={toggleDropdown}
                tabIndex={0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-labelledby={name}
            >
                <span>{selectedLabel}</span>
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </div>

            <ul className={`${listClassName} ${listStatusClassName}`} role="listbox" aria-labelledby={name}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        className="w-full text-left px-3 py-2 text-xs cursor-pointer hover:bg-primary-200/80 dark:hover:bg-primary-900/80 dark:text-secondary-100 transition-colors duration-150 z-50"
                        onClick={() => handleOptionSelect(option)}
                        role="option"
                        aria-selected={value.toString() === option.value.toString()}
                    >
                        {option.label}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Select;