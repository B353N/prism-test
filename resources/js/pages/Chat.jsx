import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Chat from '@/Components/Chat';

export default function ChatPage() {
    return (
        <AppLayout title="Chat with AI">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <Chat />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 