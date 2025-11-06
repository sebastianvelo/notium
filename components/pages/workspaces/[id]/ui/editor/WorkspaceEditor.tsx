import API_ROUTES from "@/constants/api.routes";
import Workspace from "@/types/Workspace";
import { useState } from "react";
import { mutate } from "swr";
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
            const res = await fetch(API_ROUTES.WORKSPACES.ID(workspace.id), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), description: description.trim() })
            });

            if (!res.ok) throw new Error("Update failed");
            const updated = await res.json();

            await mutate(API_ROUTES.WORKSPACES.ROOT); 
            await mutate(API_ROUTES.WORKSPACES.ID(workspace.id));

            setEditMode(false);
        } catch (error) {
            console.error(error);
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
