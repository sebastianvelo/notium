import API_ROUTES from "@/constants/api.routes";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import { useState } from "react";
import { mutate } from "swr";

interface UseWorkspaceEditorParams {
    workspace: WorkspaceItemView;
}

interface UseWorkspaceEditorReturn {
    name: string;
    description: string;
    editMode: boolean;
    isLoading: boolean;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    handleSave: () => Promise<void>;
    handleCancel: () => void;
    toggleEdit: () => void;
}

const useWorkspaceEditor = ({ workspace }: UseWorkspaceEditorParams): UseWorkspaceEditorReturn => {
    const [name, setName] = useState(workspace.name);
    const [description, setDescription] = useState(workspace.description || "");
    const [editMode, setEditMode] = useState(false);
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

    const toggleEdit = () => {
        setEditMode(!editMode);
    };

    return {
        name,
        description,
        editMode,
        isLoading,
        setName,
        setDescription,
        handleSave,
        handleCancel,
        toggleEdit
    };
};

export default useWorkspaceEditor;