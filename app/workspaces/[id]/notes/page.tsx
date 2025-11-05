"use client";
import WorkspacesNotesLayout from "@/components/pages/workspaces/[id]/notes/WorkspacesNotesLayout";
import { Note, Workspace } from "@/types";
import { useParams } from "next/navigation";

const WorkspaceNotesPage: React.FC = () => {
    const params = useParams();
    const workspaceId = params.id as string;

    // Mock data
    const workspace: Workspace = {
        id: workspaceId,
        name: "Personal Projects",
        description: "My personal notes and ideas",
        createdAt: "2024-01-01",
        ownerId: "1",
    };

    const notes: Note[] = [
        {
            id: "1",
            title: "Project Ideas",
            content: "List of new project ideas to explore...",
            workspaceId,
            createdBy: "user1",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-16",
            sharedWith: [],
        },
        {
            id: "2",
            title: "Meeting Notes",
            content: "Notes from team meeting on Jan 20...",
            workspaceId,
            createdBy: "user1",
            createdAt: "2024-01-20",
            updatedAt: "2024-01-20",
            sharedWith: ["user2"],
        },
    ];

    return (
        <WorkspacesNotesLayout workspace={workspace} notes={notes} />
    );
}

export default WorkspaceNotesPage;