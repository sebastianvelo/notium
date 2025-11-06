// app/.../WorkspaceMembersPage.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import { useParams } from "next/navigation";

const WorkspaceMembersPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data: members, error } = useSWR(`/api/workspaces/${id}/members`, fetcher);

  if (error) return <div>Error</div>;
  if (!members) return <div>Loading...</div>;

  return <WorkspaceMembersLayout members={members} onInvite={() => { }} />;
};

export default WorkspaceMembersPage;
