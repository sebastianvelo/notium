import { Note } from "@/types";

interface NoteItemProps {
    note: Note;
    active?: boolean;
    onClick: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, active = false, onClick }) => {
    const statusStyle = active ? "bg-blue-50 border-blue-500" : "border-transparent hover:bg-gray-50";

    return (
        <div onClick={onClick} className={`px-4 py-3 cursor-pointer border-l-2 transition-colors ${statusStyle}`}>
            <h4 className={`font-medium text-sm mb-1 ${active ? "text-blue-900" : "text-gray-900"}`}>
                {note.title || "Untitled Note"}
            </h4>
            <p className="text-xs text-gray-500 truncate">
                {note.content ? note.content.substring(0, 60) : "No content"}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-400">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(note.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default NoteItem;