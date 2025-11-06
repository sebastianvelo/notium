"use client";
import WorkspacesNotesLayout from "@/components/pages/workspaces/[id]/notes/WorkspacesNotesLayout";
import API_ROUTES from "@/constants/api.routes";
import useWorkspace from "@/hooks/data/useWorkspace";
import { fetcher } from "@/lib/fetcher";
import Note from "@/types/model/Note";
import useSWR from "swr";

const WorkspaceNotesPage: React.FC = () => {
    const { workspace, workspaceId } = useWorkspace();
    const { data: notes, error } = useSWR<Note[]>(API_ROUTES.WORKSPACES.NOTES(workspaceId), fetcher);

    if (error) return <div>Error</div>;
    if (!notes) return <div>Loading...</div>;

    return <WorkspacesNotesLayout workspace={workspace} notes={notes} />;
};

export default WorkspaceNotesPage;
