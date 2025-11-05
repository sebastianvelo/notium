import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";
import { Plus } from "lucide-react";
import React from "react";

export interface NotesSidebarActionsProps {
    createNote: () => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const NotesSidebarActions: React.FC<NotesSidebarActionsProps> = ({ searchQuery, setSearchQuery, createNote }) => {
    const { t } = useI18N();

    return (
        <div className="py-2 px-3 border-b border-secondary-200 dark:border-secondary-900 space-y-2">
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(I18n.WORKSPACE.NOTES.SEARCH)}
                className="text-sm font-bold p-0 focus:ring-0"
            />
            <Button className="w-full flex items-center space-x-2" onClick={createNote}>
                <Plus />
                <span>{t(I18n.WORKSPACE.NOTES.NEW)}</span>
            </Button>
        </div>
    );
};

export default NotesSidebarActions;
