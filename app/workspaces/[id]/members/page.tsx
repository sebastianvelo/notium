"use client";
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import Loading from "@/components/ui/molecules/loading/Loading";
import API_ROUTES from "@/constants/api.routes";
import { fetcher } from "@/lib/fetcher";
import MemberItemView from "@/types/view/MemberItemView";
import { useParams } from "next/navigation";
import useSWR from "swr";

const WorkspaceMembersPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data: members, error } = useSWR<MemberItemView[]>(API_ROUTES.WORKSPACES.MEMBERS(id), fetcher);

  if (error) return <div>Error</div>;
  if (!members) return <div>Loading...</div>;

  return (
    <Loading isLoading={!members}>
      <WorkspaceMembersLayout members={members} onInvite={() => { }} />
    </Loading>
  );
};

export default WorkspaceMembersPage;
