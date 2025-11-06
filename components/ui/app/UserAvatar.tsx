interface UserAvatarProps {
    name: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name }) => {
    const initials = name.split(" ").map(n => n[0]);
    
    return (
        <div className="w-10 h-10 bg-secondary-300 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
                {initials.join("").toUpperCase()}
            </span>
        </div>
    );
};

export default UserAvatar;