"use client";
import WorkspacesNotesLayout from "@/components/pages/workspaces/[id]/notes/WorkspacesNotesLayout";
import useWorkspace from "@/hooks/data/useWorkspace";
import useWorkspaceNotes from "@/hooks/data/useWorkspaceNotes";

export default function NotesPage() {
    const { workspace } = useWorkspace();
    const notesData = useWorkspaceNotes({ workspaceId: workspace.id });

    if (notesData.isLoading) return <div>Loading...</div>;
    if (notesData.error) return <div>Error loading notes</div>;

    return <WorkspacesNotesLayout {...notesData} />;
}