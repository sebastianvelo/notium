"use client";
import WorkspacesLayout from "@/components/pages/workspaces/WorkspacesLayout";
import API_ROUTES from "@/constants/api.routes";
import fetcher from "@/lib/fetcher";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import useSWR from "swr";

const WorkspacesPage: React.FC = () => {
  const { data: workspaces, error, isLoading } = useSWR<WorkspaceItemView[]>(API_ROUTES.WORKSPACES.ROOT, fetcher);

  if (error) return <div>Error</div>;
  
  return <WorkspacesLayout workspaces={workspaces || []} isLoading={isLoading} />;
}

export default WorkspacesPage;
