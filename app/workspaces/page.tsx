"use client";
import WorkspacesLayout from "@/components/pages/workspaces/WorkspacesLayout";
import WorkspaceRepository from "@/lib/repository/WorkspaceRepository";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/Workspace";
import { useState } from "react";

const WorkspacesPage: React.FC = () => {
  const [isLoading] = useState(false);
  const [workspaces] = useState<Workspace[]>(WorkspaceService.getAllWorkspaces());

  return <WorkspacesLayout workspaces={workspaces} isLoading={isLoading} />;
}

export default WorkspacesPage;