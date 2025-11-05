"use client";
import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";
import useWorkspace from "@/hooks/data/useWorkspace";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const WorkspaceLayoutHeader: React.FC = () => {
    const { t } = useI18N();
    const router = useRouter();
    const { workspace } = useWorkspace();

    return (
        <div className="space-y-4 mb-4 bg-gradient-to-br from-accent-50 to-accent-200 dark:from-accent-800 dark:to-accent-950 p-4">
            <div className="flex space-x-4">
                <div className="">
                    <Button variant="ghost" onClick={() => router.push(`/workspaces`)}>
                        <ChevronLeft />
                    </Button>
                </div>
                <div className="space-y-4">
                    <div>
                        <Title size="lg">{workspace.name}</Title>
                        {workspace.description && <Text>{workspace.description}</Text>}
                    </div>
                    <div className="space-x-2">
                        <Button onClick={() => router.push(`/workspaces/${workspace.id}/notes`)}>
                            {t(I18n.WORKSPACE.NOTES.BUTTON)}
                        </Button>
                        <Button onClick={() => router.push(`/workspaces/${workspace.id}/members`)}>
                            {t(I18n.WORKSPACE.MEMBERS.BUTTON)}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceLayoutHeader;