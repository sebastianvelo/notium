"use client";
import Button from "@/components/ui/atoms/button/Button";
import { useRouter } from "next/navigation";

interface WorkspaceLayoutProps {
    workspaceId: string;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ workspaceId }) => {
    const router = useRouter();

    return (
        <div>
            <Button onClick={() => router.push(`/workspaces/${workspaceId}/notes`)}>Notes</Button>
            <Button onClick={() => router.push(`/workspaces/${workspaceId}/members`)}>Members</Button>
        </div>
    );
}

export default WorkspaceLayout;