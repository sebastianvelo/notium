"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import WorkspacesLayout from "@/components/pages/workspaces/WorkspacesLayout";

const WorkspacesPage: React.FC = () => {
  const { data: workspaces, error, isLoading } = useSWR("/api/workspaces", fetcher);

  if (error) return <div>Error</div>;
  return <WorkspacesLayout workspaces={workspaces || []} isLoading={isLoading} />;
}

export default WorkspacesPage;
