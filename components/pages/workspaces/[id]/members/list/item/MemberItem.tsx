import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Member, { MemberRole } from "@/types/Member";
import MemberItemAvatar from "./MemberItemAvatar";

const getRoleBadgeColor = (role: MemberRole) => {
    switch (role) {
        case "owner":
            return "bg-purple-100 text-purple-700";
        case "editor":
            return "bg-primary-100 text-primary-700";
        case "viewer":
            return "bg-secondary-100 text-secondary-700";
        default:
            return "bg-secondary-100 text-secondary-700";
    }
};

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
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                </span>
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