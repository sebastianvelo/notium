import useWorkspaceEditor from "@/hooks/controller/useWorkspaceEditor";
import Workspace from "@/types/model/Workspace";
import WorkspaceEditorActions from "./WorkspaceEditorActions";
import WorkspaceEditorHeader from "./WorkspaceEditorHeader";

interface WorkspaceEditorProps {
    workspace: Workspace;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ workspace }) => {
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