import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/Input";
import React from "react";

export interface NotesSidebarActionsProps {
    createNote: () => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const NotesSidebarActions: React.FC<NotesSidebarActionsProps> = ({ searchQuery, setSearchQuery, createNote }) => {
    return (
        <div className="p-2 border-b border-secondary-200 dark:border-secondary-900">
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="text-sm font-bold p-0 focus:ring-0"
            />
            <Button className="w-full mt-3 flex items-center" onClick={createNote}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Note
            </Button>
        </div>
    );
};

export default NotesSidebarActions;
