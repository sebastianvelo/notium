"use client";
import Button from "@/components/ui/atoms/button/Button";
import { Workspace } from "@/types";
import { useRouter } from "next/navigation";

interface WorkspaceLayoutHeaderProps {
    workspace: Workspace;
}

const WorkspaceLayoutHeader: React.FC<WorkspaceLayoutHeaderProps> = ({ workspace }) => {
    const router = useRouter();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">{workspace.name}</h1>
                {workspace.description && (
                    <p className="text-secondary-600 mt-1">{workspace.description}</p>
                )}
            </div>
            <div>
                <Button onClick={() => router.push(`/workspaces/${workspace.id}/notes`)}>Notes</Button>
                <Button onClick={() => router.push(`/workspaces/${workspace.id}/members`)}>Members</Button>
            </div>
        </div>
    );
}

export default WorkspaceLayoutHeader;