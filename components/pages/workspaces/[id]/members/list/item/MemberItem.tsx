import UserAvatar from "@/components/ui/app/UserAvatar";
import Badge from "@/components/ui/atoms/badge/Badge";
import Text from "@/components/ui/atoms/text/Text";
import MemberItemView from "@/types/view/MemberItemView";

interface MemberItemProps {
    member: MemberItemView;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    return (
        <div className="flex w-full items-center justify-between p-4 bg-white dark:bg-black border border-secondary-200 dark:border-secondary-900 rounded-lg">
            <div className="flex items-center space-x-3">
                <UserAvatar name={member.name} />
                <div>
                    <Text weight="bold">{member.name}</Text>
                    <Text size="xs">{member.email}</Text>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <Badge color={member.color}>{member.role}</Badge>
            </div>
        </div>
    );
};

export default MemberItem;