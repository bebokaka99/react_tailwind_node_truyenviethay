// src/components/admin-dashboard/AdminRecentActivities.tsx
'use client';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

interface Activity {
    id: number;
    user_id: number;
    activity_type: string;
    description: string;
    target_id: number | null;
    created_at: string;
    username: string;
    story_title: string | null;
    chapter_title: string | null;
}

interface AdminRecentActivitiesProps {
    activities: Activity[];
}

const AdminRecentActivities = ({ activities }: AdminRecentActivitiesProps) => {

    if (activities.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Hoạt động gần đây
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Chưa có hoạt động nào được ghi nhận.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Hoạt động gần đây
            </h2>
            <ul className="space-y-4">
                {activities.map((activity) => (
                    <li key={activity.id} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <i className="ri-user-line"></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                <span className="font-bold">{activity.username}</span> {activity.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <i className="ri-time-line mr-1"></i>
                                {dayjs(activity.created_at).fromNow()}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminRecentActivities;