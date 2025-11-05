import Input from "@/components/ui/atoms/input/Input";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import WorkspaceEditorActions from "./WorkspaceEditorActions";

interface WorkspaceEditorViewProps {
    name: string;
    description: string;
    editMode: boolean;
    isLoading: boolean;
    setName: (v: string) => void;
    setDescription: (v: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onToggleEdit: () => void;
}

const WorkspaceEditorView: React.FC<WorkspaceEditorViewProps> = ({ name, description, editMode, isLoading, setName, setDescription, onSave, onCancel, onToggleEdit }) => (
    <div className="space-y-2">
        <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
                {editMode ? (
                    <>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Workspace name"
                            className="text-3xl font-bold border-0 p-0 focus:ring-0"
                            disabled={isLoading}
                        />
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                            className="text-sm border-0 p-0 focus:ring-0"
                            disabled={isLoading}
                        />
                    </>
                ) : (
                    <>
                        <Title size="lg">{name}</Title>
                        {description && <Text>{description}</Text>}
                    </>
                )}
            </div>

            <WorkspaceEditorActions
                editMode={editMode}
                isLoading={isLoading}
                onSave={onSave}
                onCancel={onCancel}
                onToggleEdit={onToggleEdit}
                disabledSave={!name.trim()}
            />
        </div>
    </div>
);

export default WorkspaceEditorView;
