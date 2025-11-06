// app/.../WorkspaceMembersPage.tsx
"use client";
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import API_ROUTES from "@/constants/api.routes";
import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";

const WorkspaceMembersPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data: members, error } = useSWR(API_ROUTES.WORKSPACES.MEMBERS(id), fetcher);

  if (error) return <div>Error</div>;
  if (!members) return <div>Loading...</div>;

  return <WorkspaceMembersLayout members={members} onInvite={() => { }} />;
};

export default WorkspaceMembersPage;
