"use client"
import WorkspaceLayoutHeader from "@/components/pages/workspaces/[id]/WorkspaceLayoutHeader";
import WorkspaceProvider from "@/context/workspace/WorkspaceContext";
import WorkspaceService from "@/lib/service/WorkspaceService";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

const WorkspaceLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const params = useParams();
    const workspaceId = params.id as string;
    const workspace = WorkspaceService.getWorkspaceById(workspaceId);

    if (!workspace) return (
        <p>Not found</p>
    );

    return (
        <WorkspaceProvider value={{ workspace, workspaceId }}>
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 max-w-7xl mx-auto">
                <WorkspaceLayoutHeader />
                <div className="px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </WorkspaceProvider>
    );
}

export default WorkspaceLayout;