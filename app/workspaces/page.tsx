"use client";
import WorkspacesLayout from "@/components/pages/workspaces/WorkspacesLayout";
import Workspace from "@/types/Workspace";
import { useState } from "react";

const WorkspacesPage: React.FC = () => {
  const [isLoading] = useState(false);
  const [workspaces] = useState<Workspace[]>([
    {
      id: "1",
      name: "Personal Projects",
      description: "My personal notes and ideas",
      createdAt: "2024-01-15",
      ownerId: "user1",
    },
    {
      id: "2",
      name: "Work Team",
      description: "Shared workspace for team collaboration",
      createdAt: "2024-02-20",
      ownerId: "user1",
    },
    {
      id: "3",
      name: "Research Notes",
      description: "Academic research and references",
      createdAt: "2024-03-10",
      ownerId: "user1",
    },
  ]);

  return <WorkspacesLayout workspaces={workspaces} isLoading={isLoading} />;
}

export default WorkspacesPage;