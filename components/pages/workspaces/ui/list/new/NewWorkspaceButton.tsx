import Text from "@/components/ui/atoms/text/Text";
import Card, { CardBody, CardHeader } from "@/components/ui/molecules/card/Card";
import ROUTES from "@/constants/routes";
import I18n from "@/context/language/common/I18nKeys";
import { Plus } from "lucide-react";
import Link from "next/link";

const NewWorkspaceButton: React.FC = () => {
    return (
        <Link href={ROUTES.WORKSPACE_NEW}>
            <Card hover>
                <CardHeader>
                    <Text t={I18n.WORKSPACES.NEW} />
                </CardHeader>
                <CardBody className="space-y-3 h-max flex items-center justify-center">
                    <Text>
                        <Plus />
                    </Text>
                </CardBody>
            </Card>
        </Link>
    );
};

export default NewWorkspaceButton;