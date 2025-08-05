// src/pages/ProfilePage.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ReadingStats from '../components/Profile/ReadingStats';
import FavoriteBooks from '../components/Profile/FavoriteBooks';
import ReadingHistory from '../components/Profile/ReadingHistory';

export default function ProfilePage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-6 py-8">
                <ProfileHeader />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-1">
                        <ReadingStats />
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <FavoriteBooks />
                        <ReadingHistory />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}