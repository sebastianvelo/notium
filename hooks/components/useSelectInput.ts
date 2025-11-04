"use client"
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../app/useClickOutside";

export interface SelectOption {
    label: string;
    value: string | number;
}

interface UseSelectInputProps {
    options: SelectOption[];
    initialValue?: string | number;
    onChange?: (value: string | number) => void;
}

interface UseSelectInput {
    selectedValue: string | number;
    selectedLabel: string;
    isOpen: boolean;
    selectRef: React.RefObject<HTMLDivElement | null>;
    setIsOpen: (isOpen: boolean) => void;
    toggleDropdown: () => void;
    handleOptionSelect: (option: SelectOption) => void;
}

const useSelectInput = ({ options, initialValue = "", onChange }: UseSelectInputProps): UseSelectInput => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | number>(initialValue);
    const [selectedLabel, setSelectedLabel] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionSelect = (option: SelectOption) => {
        setSelectedValue(option.value);
        if (onChange) { onChange(option.value); }
        setIsOpen(false);
    };

    useClickOutside(selectRef, () => setIsOpen(false));

    useEffect(() => {
        const option = options.find(opt => opt.value.toString() === selectedValue.toString());
        setSelectedLabel(option ? option.label : "");
    }, [selectedValue, options]);


    return {
        selectedValue,
        selectedLabel,
        isOpen,
        selectRef,
        setIsOpen,
        toggleDropdown,
        handleOptionSelect
    };
};

export default useSelectInput;