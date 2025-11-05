import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import Card, { CardBody } from "@/components/ui/molecules/card/Card";
import ROUTES from "@/constants/routes";
import I18n from "@/context/language/common/I18nKeys";
import Workspace from "@/types/Workspace";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface WorkspaceCardProps {
    workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
    return (
        <Link href={ROUTES.WORKSPACE(workspace.id)}>
            <Card hover>
                <CardBody className="space-y-3">
                    <div>
                        <Title size="xs">{workspace.name}</Title>
                        <Text size="xs" t={workspace.description ?? I18n.WORKSPACES.CARD.WITHOUT_DESCRIPTION}/>
                    </div>
                    <Text size="xs" className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created {new Date(workspace.createdAt).toLocaleDateString()}</span>
                    </Text>
                </CardBody>
            </Card>
        </Link>
    );
};

export default WorkspaceCard;