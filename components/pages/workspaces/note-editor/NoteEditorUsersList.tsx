import { Note } from "@/types";

interface NoteEditorUsersListProps {
  note?: Note;
}

const NoteEditorUsersList: React.FC<NoteEditorUsersListProps> = ({ note }) => {
  return (
    note && note.sharedWith && note.sharedWith.length > 0 && (
      <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200">
        <h4 className="text-sm font-medium text-secondary-700 mb-2">Shared with</h4>
        <div className="flex flex-wrap gap-2">
          {note.sharedWith.map((userId) => (
            <span key={userId} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
              User {userId}
            </span>
          ))}
        </div>
      </div>
    )
  );
}

export default NoteEditorUsersList;