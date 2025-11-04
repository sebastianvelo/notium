import Button from "@/components/ui/atoms/button/Button";

interface NoteEditorProps {
  onDelete?: () => void;
  handleSave: () => void;
}

const NoteEditorActions: React.FC<NoteEditorProps> = ({ onDelete, handleSave }) => {
  return (
    <div className="p-6 border-t border-secondary-200 dark:border-secondary-900 flex justify-between">
      <div className="flex space-x-2">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="secondary">
          Share
        </Button>
      </div>
      {onDelete && (
        <Button variant="danger" onClick={onDelete}>
          Delete Note
        </Button>
      )}
    </div>
  );
}

export default NoteEditorActions;