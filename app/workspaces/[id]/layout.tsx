"use client";
import WorkspaceLayoutHeader from "@/components/pages/workspaces/[id]/WorkspaceLayoutHeader";
import Loading from "@/components/ui/molecules/loading/Loading";
import API_ROUTES from "@/constants/api.routes";
import ROUTES from "@/constants/routes";
import WorkspaceProvider from "@/context/workspace/WorkspaceContext";
import fetcher from "@/lib/fetcher";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import useSWR from "swr";

const WorkspaceLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { data: workspace, error } = useSWR<WorkspaceItemView>(API_ROUTES.WORKSPACES.ID(id), fetcher);

    if (error) {
        router.push(ROUTES.LOGIN)
    }
    if (!workspace) return <Loading isLoading />;
    console.log(error)
    return (
        <WorkspaceProvider value={{ workspace, workspaceId: id }}>
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 max-w-7xl mx-auto">
                <WorkspaceLayoutHeader />
                <div className="px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </WorkspaceProvider>
    );
};

export default WorkspaceLayout;