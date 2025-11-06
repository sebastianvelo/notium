import UserAvatar from "@/components/ui/app/UserAvatar";
import Badge from "@/components/ui/atoms/badge/Badge";
import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Member, { MemberRole } from "@/types/Member";
import { getRoleBadgeColor } from "./getRoleBadgeColor";

interface MemberItemProps {
    member: Member;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    const m = {name: "", email: "", role: "owner" as MemberRole};

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-black border border-secondary-200 dark:border-secondary-900 rounded-lg">
            <div className="flex items-center space-x-3">
                <UserAvatar name={m.name} />
                <div>
                    <Text weight="bold">{m.name}</Text>
                    <Text size="xs">{m.email}</Text>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <Badge color={getRoleBadgeColor(m.role)}>{m.role}</Badge>
                {m.role !== "owner" && (
                    <Button variant="ghost" size="sm">
                        Remove
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MemberItem;