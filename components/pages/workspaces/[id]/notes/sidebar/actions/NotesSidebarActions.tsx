import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/Input";
import { Plus } from "lucide-react";
import React from "react";

export interface NotesSidebarActionsProps {
    createNote: () => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const NotesSidebarActions: React.FC<NotesSidebarActionsProps> = ({ searchQuery, setSearchQuery, createNote }) => {
    return (
        <div className="py-2 px-3 border-b border-secondary-200 dark:border-secondary-900 space-y-2">
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="text-sm font-bold p-0 focus:ring-0"
            />
            <Button className="w-full flex items-center space-x-2" onClick={createNote}>
                <Plus />
                <span>New Note</span>
            </Button>
        </div>
    );
};

export default NotesSidebarActions;
