"use client";
import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import ROUTES from "@/constants/routes";
import useWorkspace from "@/hooks/data/useWorkspace";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import WorkspaceLayoutHeaderTabs from "./WorkspaceLayoutHeaderTabs";

const WorkspaceLayoutHeader: React.FC = () => {
    const router = useRouter();
    const { workspace } = useWorkspace();

    return (
        <div className="space-y-4 mb-4 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100 dark:from-secondary-950 dark:via-primary-950 dark:to-secondary-950 py-8 px-4">
            <div className="flex space-x-4">
                <Button variant="ghost" onClick={() => router.push(ROUTES.WORKSPACES)}>
                    <ChevronLeft />
                </Button>
                <div className="space-y-4">
                    <div>
                        <Title size="lg">{workspace.name}</Title>
                        {workspace.description && <Text>{workspace.description}</Text>}
                    </div>
                    <WorkspaceLayoutHeaderTabs />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceLayoutHeader;
