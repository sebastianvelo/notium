import useWorkspaceEditor from "@/hooks/controller/useWorkspaceEditor";
import useWorkspace from "@/hooks/data/useWorkspace";
import WorkspaceEditorActions from "./WorkspaceEditorActions";
import WorkspaceEditorHeader from "./WorkspaceEditorHeader";

const WorkspaceEditor: React.FC = () => {
    const { workspace } = useWorkspace();
    const { name, description, editMode, isLoading, setName, setDescription, handleSave, handleCancel, toggleEdit } = useWorkspaceEditor({ workspace });

    return (
        <div className="space-y-2">
            <div className="flex items-start gap-2">
                <WorkspaceEditorHeader
                    name={name}
                    description={description}
                    editMode={editMode}
                    isLoading={isLoading}
                    setName={setName}
                    setDescription={setDescription}
                />
                <WorkspaceEditorActions
                    editMode={editMode}
                    isLoading={isLoading}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onToggleEdit={toggleEdit}
                    disabledSave={!name.trim()}
                />
            </div>
        </div>
    );
};

export default WorkspaceEditor;