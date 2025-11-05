import Button from "@/components/ui/atoms/button/Button";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";

interface NoteEditorProps {
  onDelete?: () => void;
  handleSave: () => void;
}

const NoteEditorActions: React.FC<NoteEditorProps> = ({ onDelete, handleSave }) => {
  const { t } = useI18N();

  return (
    <div className="p-6 border-t border-secondary-200 dark:border-secondary-900 flex justify-between">
      <div className="flex space-x-2">
        <Button onClick={handleSave}>
          {t(I18n.WORKSPACE.NOTES.SAVE)}
        </Button>
        <Button variant="secondary">
          {t(I18n.WORKSPACE.NOTES.SHARE)}
        </Button>
      </div>
      {onDelete && (
        <Button variant="danger" onClick={onDelete}>
          {t(I18n.WORKSPACE.NOTES.DELETE)}
        </Button>
      )}
    </div>
  );
}

export default NoteEditorActions;