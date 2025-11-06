"use client";
import Button from "@/components/ui/atoms/button/Button";
import ROUTES from "@/constants/routes";
import useWorkspaceMembers from "@/hooks/data/useWorkspaceMembers";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import WorkspaceEditor from "./ui/editor/WorkspaceEditor";
import WorkspaceHeader from "./ui/header/WorkspaceHeader";
import WorkspaceHeaderTabs from "./ui/tabs/WorkspaceHeaderTabs";

const WorkspaceLayoutHeader: React.FC = () => {
    const router = useRouter();
    const { loggedInRole } = useWorkspaceMembers();

    return (
        <div className="space-y-4 mb-4 bg-gradient-to-l from-primary-100 via-primary-50 to-primary-100 dark:from-black dark:via-secondary-900 dark:to-black pt-6 pb-2 px-4">
            <div className="flex space-x-4">
                <Button variant="ghost" onClick={() => router.push(ROUTES.WORKSPACES)}>
                    <ChevronLeft />
                </Button>
                <div className="space-y-4 flex-1">
                    {loggedInRole.isOwner ? <WorkspaceEditor /> : <WorkspaceHeader />}
                    <WorkspaceHeaderTabs />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceLayoutHeader;