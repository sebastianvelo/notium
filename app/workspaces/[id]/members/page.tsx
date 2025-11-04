"use client"
import WorkspaceMembersLayout from "@/components/pages/workspaces/[id]/members/WorkspaceMembersLayout";
import { Member } from "@/types";

const WorkspaceMembersPage: React.FC = () => {
  const members: Member[] = [
    {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      role: "owner",
      joinedAt: "2024-01-01",
    },
    {
      id: "2",
      email: "jane@example.com",
      name: "Jane Smith",
      role: "editor",
      joinedAt: "2024-01-10",
    },
  ];

  const onInvite = () => {

  };

  return <WorkspaceMembersLayout members={members} onInvite={onInvite} />;
};

export default WorkspaceMembersPage;