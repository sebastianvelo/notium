"use client"
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import { createContext } from "react";

export interface WorkspaceContextType {
    workspace: WorkspaceItemView;
    workspaceId: string;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export default WorkspaceContext;