interface BadgeProps {
    children?: string;
    color?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
            {children}
        </span>
    );
};

export default Badge;