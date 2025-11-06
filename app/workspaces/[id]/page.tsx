"use client"
import ROUTES from "@/constants/routes";
import { redirect, useParams } from "next/navigation";

const WorkspacePage: React.FC = () => {
    const params = useParams();
    const workspaceId = params.id as string;

    redirect(ROUTES.WORKSPACE_NOTES(workspaceId));
};

export default WorkspacePage;