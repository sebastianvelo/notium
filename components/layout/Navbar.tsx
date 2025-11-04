"use client";
import Button from "@/components/ui/atoms/button/Button";
import Link from "next/link";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/workspaces" className="flex items-center">
                            <span className="text-2xl font-bold text-primary-600">NotesApp</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">JD</span>
                            </div>
                            <span className="text-sm text-gray-700">john@example.com</span>
                        </div>
                        <Button variant="ghost" size="sm">
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;