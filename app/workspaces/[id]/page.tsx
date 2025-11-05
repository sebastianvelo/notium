"use client"
import { redirect, useParams } from "next/navigation";

const WorkspacePage: React.FC = () => {
    const params = useParams();
    const workspaceId = params.id as string;

    redirect(`/workspaces/${workspaceId}/notes`);
};

export default WorkspacePage;