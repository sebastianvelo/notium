"use client"
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import UserService from "@/lib/service/UserService";
import Member from "@/types/Member";

const WorkspaceMembersPage: React.FC = () => {
  const members: Member[] = UserService.getAllUsers().map((u) => ({...u, role: "owner", joinedAt: ""}));

  const onInvite = () => {

  };

  return <WorkspaceMembersLayout members={members} onInvite={onInvite} />;
};

export default WorkspaceMembersPage;