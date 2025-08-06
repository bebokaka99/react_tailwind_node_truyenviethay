// src/components/profile/StatsCard.tsx
import React from 'react';
import * as RiIcons from 'react-icons/ri';
import type { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

const getIconComponent = (iconName: string): IconType => {
  const Icon = RiIcons[iconName as keyof typeof RiIcons];
  return Icon || RiIcons.RiQuestionLine;
};

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const IconComponent = getIconComponent(icon);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-white ${color}`}>
        <IconComponent className="text-xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
}