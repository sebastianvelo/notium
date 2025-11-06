"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import WorkspaceProvider from "@/context/workspace/WorkspaceContext";
import WorkspaceLayoutHeader from "@/components/pages/workspaces/[id]/WorkspaceLayoutHeader";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

const WorkspaceLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const params = useParams();
    const id = params.id as string;
    const { data: workspace, error } = useSWR(`/api/workspaces/${id}`, fetcher);

    if (error) return <p>Error</p>;
    if (!workspace) return <p>Loading...</p>;

    return (
        <WorkspaceProvider value={{ workspace, workspaceId: id }}>
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 max-w-7xl mx-auto">
                <WorkspaceLayoutHeader />
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </div>
        </WorkspaceProvider>
    );
};

export default WorkspaceLayout;