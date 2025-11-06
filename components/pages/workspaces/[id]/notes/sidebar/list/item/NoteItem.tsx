import NoteItemView from "@/types/view/NoteItemView";
import { Clock } from "lucide-react";

interface NoteItemProps extends NoteItemView {
    active?: boolean;
    onClick: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ title, content, updatedAt, active = false, onClick }) => {
    const statusStyle = active ? "bg-primary-50 border-primary-500 dark:bg-primary-950 border-primary-300" : "border-transparent hover:bg-secondary-50 dark:bg-secondary-950";

    return (
        <div onClick={onClick} className={`px-4 py-3 cursor-pointer border-l-2 transition-colors ${statusStyle}`}>
            <h4 className={`font-medium text-sm mb-1 ${active ? "text-primary-900 dark:text-primary-200" : "text-secondary-900 dark:text-secondary-300"}`}>
                {title || "Untitled Note"}
            </h4>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                {content ? content.substring(0, 60) : "No content"}
            </p>
            <div className="flex items-center mt-2 text-xs text-secondary-400 dark:text-secondary-400 space-x-1">
                <Clock className="w-3 h-3" />
                <span>{updatedAt}</span>
            </div>
        </div>
    );
};

export default NoteItem;