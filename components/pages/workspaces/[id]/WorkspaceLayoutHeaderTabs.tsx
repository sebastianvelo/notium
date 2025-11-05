"use client";
import Text from "@/components/ui/atoms/text/Text";
import ROUTES from "@/constants/routes";
import I18n from "@/context/language/common/I18nKeys";
import useWorkspace from "@/hooks/data/useWorkspace";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getTabStyle = (isActive: boolean) => `pb-1  ${isActive ? "border-b-2 border-primary-500 font-semibold" : "opacity-70 hover:opacity-100"}`

const getTabs = (workspaceId: string) => [
    {
        href: ROUTES.WORKSPACE_NOTES(workspaceId),
        label: I18n.WORKSPACE.NOTES.BUTTON
    },
    {
        href: ROUTES.WORKSPACE_MEMBERS(workspaceId),
        label: I18n.WORKSPACE.MEMBERS.BUTTON
    }
];

const WorkspaceLayoutHeaderTabs: React.FC = () => {
    const pathname = usePathname();
    const { workspace } = useWorkspace();
    const tabs = getTabs(workspace.id);

    return (
        <div className="flex space-x-4">
            {tabs.map((tab) => (
                <Link key={tab.href} href={tab.href}>
                    <Text t={tab.label} className={getTabStyle(pathname.startsWith(tab.href))} />
                </Link>
            ))}
        </div>
    );
};

export default WorkspaceLayoutHeaderTabs;
