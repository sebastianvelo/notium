"use client"
import Workspace from "@/types/Workspace";
import { createContext } from "react";

export interface WorkspaceContextType {
    workspace: Workspace;
    workspaceId: string;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export default WorkspaceContext;