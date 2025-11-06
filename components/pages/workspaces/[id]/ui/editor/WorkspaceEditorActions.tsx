import Button from "@/components/ui/atoms/button/Button";
import { Check, Pencil, X } from "lucide-react";

interface WorkspaceEditorActionsProps {
    editMode: boolean;
    isLoading: boolean;
    disabledSave: boolean;
    onSave: () => void;
    onCancel: () => void;
    onToggleEdit: () => void;
}

const WorkspaceEditorActions: React.FC<WorkspaceEditorActionsProps> = ({ editMode, isLoading, disabledSave, onSave, onCancel, onToggleEdit }) => {
    return (
        <div className="flex gap-2">
            {editMode ? (
                <>
                    <Button variant="primary" size="sm" onClick={onSave} disabled={isLoading || disabledSave}>
                        <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="danger" size="sm" onClick={onCancel} disabled={isLoading}>
                        <X className="w-4 h-4" />
                    </Button>
                </>
            ) : (
                <Button variant="primary" size="sm" onClick={onToggleEdit}>
                    <Pencil className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};

export default WorkspaceEditorActions;