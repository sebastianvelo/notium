"use client";
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import Loading from "@/components/ui/molecules/loading/Loading";
import useWorkspaceMembers from "@/hooks/data/useWorkspaceMembers";

const WorkspaceMembersPage: React.FC = () => {
  const { members, error } = useWorkspaceMembers();

  if (error) return <div>Error</div>;
  if (!members) return <Loading isLoading />;

  return <WorkspaceMembersLayout members={members} onInvite={() => { }} />;
};

export default WorkspaceMembersPage;
