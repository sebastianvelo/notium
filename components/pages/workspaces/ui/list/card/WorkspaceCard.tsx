import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import Card, { CardBody } from "@/components/ui/molecules/card/Card";
import ROUTES from "@/constants/routes";
import I18n from "@/context/language/common/I18nKeys";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface WorkspaceCardProps extends WorkspaceItemView { }

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ id, name, description, createdAt }) => {
    return (
        <Link href={ROUTES.WORKSPACE(id)}>
            <Card hover>
                <CardBody className="space-y-3">
                    <div>
                        <Title size="xs">{name}</Title>
                        <Text size="xs" t={description || I18n.WORKSPACES.CARD.WITHOUT_DESCRIPTION} />
                    </div>
                    <Text size="xs" className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{createdAt}</span>
                    </Text>
                </CardBody>
            </Card>
        </Link>
    );
};

export default WorkspaceCard;