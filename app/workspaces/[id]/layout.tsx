"use client"
import Button from "@/components/ui/atoms/button/Button";
import { Workspace } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const WorkspaceLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const params = useParams();
    const workspaceId = params.id as string;

    const workspace: Workspace = {
        id: workspaceId,
        name: "Personal Projects",
        description: "My personal notes and ideas",
        createdAt: "2024-01-01",
        ownerId: "1",
    };

    return (
        <div className="min-h-screen bg-secondary-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">{workspace.name}</h1>
                {workspace.description && (
                    <p className="text-secondary-600 mt-1">{workspace.description}</p>
                )}
            </div>
            <div>
                <Button onClick={() => router.push(`/workspaces/${workspaceId}/notes`)}>Notes</Button>
                <Button onClick={() => router.push(`/workspaces/${workspaceId}/members`)}>Members</Button>
            </div>
            {children}
        </div>
    );
}

export default WorkspaceLayout;