"use client";
import WorkspacesNotesLayout from "@/components/pages/workspaces/[id]/notes/WorkspacesNotesLayout";
import useWorkspace from "@/hooks/data/useWorkspace";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const WorkspaceNotesPage: React.FC = () => {
    const { workspace, workspaceId } = useWorkspace(); // asumimos que useWorkspace ahora expone id + workspace (ver abajo)
    const { data: notes, error } = useSWR(`/api/workspaces/${workspaceId}/notes`, fetcher);

    if (error) return <div>Error</div>;
    if (!notes) return <div>Loading...</div>;

    return <WorkspacesNotesLayout workspace={workspace} notes={notes} />;
};

export default WorkspaceNotesPage;
