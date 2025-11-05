import Badge from "@/components/ui/atoms/badge/Badge";
import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Member from "@/types/Member";
import MemberItemAvatar from "./MemberItemAvatar";
import { getRoleBadgeColor } from "./getRoleBadgeColor";

interface MemberItemProps {
    member: Member;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-black border border-secondary-200 dark:border-secondary-900 rounded-lg">
            <div className="flex items-center space-x-3">
                <MemberItemAvatar name={member.name} />
                <div>
                    <Text weight="bold">{member.name}</Text>
                    <Text size="xs">{member.email}</Text>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <Badge color={getRoleBadgeColor(member.role)}>{member.role}</Badge>
                {member.role !== "owner" && (
                    <Button variant="ghost" size="sm">
                        Remove
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MemberItem;