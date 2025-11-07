import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import ROUTES from "@/constants/routes";
import I18n from "@/context/language/common/I18nKeys";
import { Folder } from "lucide-react";
import Link from "next/link";

const WorkspacesEmptyList: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12 bg-white/60 dark:bg-black/60 rounded-lg border border-secondary-200 dark:border-secondary-900 backdrop-blur-xl">
            <Folder className="h-32 w-32 text-center text-black/80 dark:text-white/80" />
            <div>
                <Text weight="bold" size="lg" align="center" t={I18n.WORKSPACES.EMPTY.TITLE} />
                <Text align="center" size="sm" t={I18n.WORKSPACES.EMPTY.SUBTITLE} />
            </div>
            <Link href={ROUTES.WORKSPACE_NEW}>
                <Button t={I18n.WORKSPACES.EMPTY.BUTTON} />
            </Link>
        </div>
    );
};

export default WorkspacesEmptyList;