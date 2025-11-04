"use client";
import WorkspaceLayout from "@/components/pages/workspaces/WorkspaceLayout";
import { useParams } from "next/navigation";

const WorkspacePage: React.FC = () => {
    const params = useParams();
    const workspaceId = params.id as string;

    return (
       <WorkspaceLayout workspaceId={workspaceId} />
    );
}

export default WorkspacePage;