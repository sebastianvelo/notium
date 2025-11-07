"use client";
import Button from "@/components/ui/atoms/button/Button";
import Card, { CardBody, CardFooter, CardHeader } from "@/components/ui/molecules/card/Card";
import Select from "@/components/ui/molecules/select/Select";
import I18n from "@/context/language/common/I18nKeys";
import useMemberActions from "@/hooks/controller/useMemberActions";
import useMemberInvitation from "@/hooks/controller/useMemberInvitation";
import { useState } from "react";

const WorkspaceMembersInvitation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { availableRoles } = useMemberActions();
    const { email, setEmail, role, setRole, isLoading, sendInvitation } = useMemberInvitation();

    const handleInvite = async () => {
        const result = await sendInvitation();
        if (result?.success) {
            alert(result.message || I18n.WORKSPACE.MEMBERS.INVITATION.SUCCESS);
            setEmail("");
            setIsOpen(false);
        } else {
            alert(I18n.WORKSPACE.MEMBERS.INVITATION.ERROR);
        }
    };

    return (
        <>
            <div className="inline-block">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    {I18n.WORKSPACE.MEMBERS.INVITE}
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <Card className="relative w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <CardHeader>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {I18n.WORKSPACE.MEMBERS.INVITATION.TITLE}
                            </h3>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder={I18n.WORKSPACE.MEMBERS.INVITATION.EMAIL_PLACEHOLDER}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </CardHeader>

                        <CardBody>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {I18n.WORKSPACE.MEMBERS.INVITATION.ROLE_LABEL}
                            </label>
                            <Select
                                name="invitation"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                options={availableRoles}
                            />
                        </CardBody>

                        <CardFooter className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                {I18n.WORKSPACE.MEMBERS.INVITATION.CANCEL}
                            </button>
                            <Button onClick={handleInvite} disabled={isLoading || !email}>
                                {isLoading
                                    ? I18n.WORKSPACE.MEMBERS.INVITATION.SUBMIT_LOADING
                                    : I18n.WORKSPACE.MEMBERS.INVITATION.SUBMIT}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
};

export default WorkspaceMembersInvitation;
