import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import I18n from "@/context/language/common/I18nKeys";
import { Plus } from "lucide-react";
import Link from "next/link";

const WorkspacesLayoutHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <Title t={I18n.WORKSPACES.HEADER.TITLE} />
                <Text t={I18n.WORKSPACES.HEADER.SUBTITLE} />
            </div>
            <Link href="/workspaces/new">
                <Button>
                    <Plus />
                </Button>
            </Link>
        </div>
    );
};

export default WorkspacesLayoutHeader;