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
        <div className="pb-2 pr-3 border-b border-secondary-200 dark:border-secondary-900 space-y-2">
            <Button size="sm" className="w-full flex items-center justify-center space-x-2" onClick={createNote}>
                <Plus className="w-4 h-4" />
                <span>{t(I18n.WORKSPACE.NOTES.NEW)}</span>
            </Button>
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(I18n.WORKSPACE.NOTES.SEARCH)}
                className="text-sm font-bold p-0 focus:ring-0"
            />
        </div>
    );
};

export default NotesSidebarActions;
