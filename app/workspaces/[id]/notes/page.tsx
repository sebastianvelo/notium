"use client";
import WorkspacesNotesLayout from "@/components/pages/workspaces/[id]/notes/WorkspacesNotesLayout";
import useWorkspace from "@/hooks/data/useWorkspace";
import NoteService from "@/lib/service/NoteService";
import Note from "@/types/Note";

const WorkspaceNotesPage: React.FC = () => {
    const { workspace, workspaceId } = useWorkspace();
    const notes: Note[] = NoteService.getNotesByWorkspace(workspaceId);

    return (
        <WorkspacesNotesLayout workspace={workspace} notes={notes} />
    );
}

export default WorkspaceNotesPage;