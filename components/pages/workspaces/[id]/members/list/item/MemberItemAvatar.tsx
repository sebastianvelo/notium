interface MemberItemProps {
    name: string;
}

const MemberItemAvatar: React.FC<MemberItemProps> = ({ name }) => {
    return (
        <div className="w-10 h-10 bg-secondary-300 dark:bg-secondary-800 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-secondary-700">
                {name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </span>
        </div>
    );
};

export default MemberItemAvatar;