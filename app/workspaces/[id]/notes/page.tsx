"use client";
import WorkspacesNotesLayout from "@/components/pages/workspaces/[id]/notes/WorkspacesNotesLayout";
import Loading from "@/components/ui/molecules/loading/Loading";
import useWorkspace from "@/hooks/data/useWorkspace";
import useWorkspaceNotes from "@/hooks/data/useWorkspaceNotes";

const WorkspaceNotesPage = () => {
    const { workspace } = useWorkspace();
    const notesData = useWorkspaceNotes({ workspaceId: workspace.id });

    if (notesData.error) return <div>Error loading notes</div>;

    return (
        <Loading isLoading={notesData.isLoading}>
            <WorkspacesNotesLayout {...notesData} />
        </Loading>
    );
}

export default WorkspaceNotesPage;