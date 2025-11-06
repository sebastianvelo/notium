import { useState } from "react";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/Workspace";
import WorkspaceEditorView from "./WorkspaceEditorView";
import { mutate } from "swr";

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
            const res = await fetch(`/api/workspaces/${workspace.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), description: description.trim() })
            });

            if (!res.ok) throw new Error("Update failed");
            const updated = await res.json();

            // actualiza caches relevantes
            await mutate("/api/workspaces"); // lista
            await mutate(`/api/workspaces/${workspace.id}`); // detail

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
