"use client";
import WorkspacesLayout from "@/components/pages/workspaces/WorkspacesLayout";
import API_ROUTES from "@/constants/api.routes";
import ROUTES from "@/constants/routes";
import fetcher from "@/lib/fetcher";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const WorkspacesPage: React.FC = () => {
  const router = useRouter();
  const { data: workspaces, error, isLoading } = useSWR<WorkspaceItemView[]>(API_ROUTES.WORKSPACES.ROOT, fetcher, {
    onError: () => router.push(ROUTES.LOGIN)
  });

  return <WorkspacesLayout workspaces={workspaces || []} isLoading={isLoading} />;
}

export default WorkspacesPage;
