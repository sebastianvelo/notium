import Button from "@/components/ui/atoms/button/Button";
import { Member, MemberRole } from "@/types";

const getRoleBadgeColor = (role: MemberRole) => {
    switch (role) {
        case "owner":
            return "bg-purple-100 text-purple-700";
        case "editor":
            return "bg-blue-100 text-blue-700";
        case "viewer":
            return "bg-gray-100 text-gray-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

interface MemberItemProps {
    member: Member;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    return (
        <div key={member.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                        {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </span>
                </div>
                <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
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