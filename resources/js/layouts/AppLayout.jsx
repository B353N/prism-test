import React from 'react';
import { Head } from '@inertiajs/react';

export default function AppLayout({ title, children }) {
    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <h1 className="text-xl font-bold">AI Chat</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>
            </div>
        </>
    );
} 