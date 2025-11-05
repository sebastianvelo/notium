import { useState } from "react";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/Workspace";
import WorkspaceEditorView from "./WorkspaceEditorView";

interface WorkspaceEditorProps {
    workspace: Workspace;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ workspace }) => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(workspace.name);
    const [description, setDescription] = useState(workspace.description || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) return;
        setIsLoading(true);

        try {
            await WorkspaceService.updateWorkspace(workspace.id, {
                name: name.trim(),
                description: description.trim()
            });
            setEditMode(false);
        } catch (error) {
            console.error("Error updating workspace:", error);
            setName(workspace.name);
            setDescription(workspace.description || "");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setName(workspace.name);
        setDescription(workspace.description || "");
        setEditMode(false);
    };

    return (
        <WorkspaceEditorView
            name={name}
            description={description}
            editMode={editMode}
            isLoading={isLoading}
            setName={setName}
            setDescription={setDescription}
            onSave={handleSave}
            onCancel={handleCancel}
            onToggleEdit={() => setEditMode(!editMode)}
        />
    );
};

export default WorkspaceEditor;
