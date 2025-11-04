"use client"
import WorkspaceLayoutHeader from "@/components/pages/workspaces/[id]/WorkspaceLayout";
import { Workspace } from "@/types";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

const WorkspaceLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const params = useParams();
    const workspaceId = params.id as string;

    const workspace: Workspace = {
        id: workspaceId,
        name: "Personal Projects",
        description: "My personal notes and ideas",
        createdAt: "2024-01-01",
        ownerId: "1",
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WorkspaceLayoutHeader workspace={workspace} />
            {children}
        </div>
    );
}

export default WorkspaceLayout;