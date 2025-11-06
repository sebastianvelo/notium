"use client";
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import Loading from "@/components/ui/molecules/loading/Loading";
import API_ROUTES from "@/constants/api.routes";
import useWorkspace from "@/hooks/data/useWorkspace";
import fetcher from "@/lib/fetcher";
import MemberItemView from "@/types/view/MemberItemView";
import useSWR from "swr";

const WorkspaceMembersPage: React.FC = () => {
  const { workspace } = useWorkspace();
  const { data: members, error } = useSWR<MemberItemView[]>(API_ROUTES.WORKSPACES.MEMBERS(workspace.id), fetcher);

  if (error) return <div>Error</div>;
  if (!members) return <Loading isLoading />;

  return <WorkspaceMembersLayout members={members} onInvite={() => { }} />;
};

export default WorkspaceMembersPage;
