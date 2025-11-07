interface MemberItemView {
    id: string;
    userId: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    color: string;
    isLoggedIn?: boolean;
}

export default MemberItemView;
