// src/components/profile/AchievementsList.tsx
import React from 'react';
import { RiTrophyLine, RiCheckLine, RiBookOpenLine, RiAwardLine, RiHeartFill, RiStarFill } from 'react-icons/ri';
import type { IconType } from 'react-icons';

interface RewardItem {
  user_reward_id: string;
  reward_id: string;
  claimed_at: string;
  name: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsListProps {
  achievements: RewardItem[];
}

const allAchievements: Achievement[] = [
  // Cần thêm các thành tích khác vào đây để hiển thị đầy đủ
  { id: '1', title: 'Chương Đầu Tiên', description: 'Đọc chương đầu tiên của bạn', icon: RiBookOpenLine, color: 'bg-green-500', unlocked: false, rarity: 'common' },
  { id: '2', title: 'Độc Giả Kỳ Cựu', description: 'Đọc 100 chương', icon: RiAwardLine, color: 'bg-purple-500', unlocked: false, rarity: 'rare' },
  { id: '3', title: 'Người Sưu Tầm', description: 'Yêu thích 10 truyện', icon: RiHeartFill, color: 'bg-red-500', unlocked: false, rarity: 'common' },
  { id: '4', title: 'Huyền Thoại Truyện', description: 'Đọc 1000 chương', icon: RiTrophyLine, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', unlocked: false, rarity: 'legendary' },
];

const getAchievementData = (rewardId: string, claimedAt: string): Achievement | undefined => {
  const achievement = allAchievements.find(a => a.id === rewardId);
  if (achievement) {
    return {
      ...achievement,
      unlocked: true,
      unlockedDate: new Date(claimedAt).toLocaleDateString('vi-VN'),
    };
  }
  return undefined;
};

const getRarityGlow = (rarity: string, unlocked: boolean) => {
  if (!unlocked) return '';
  switch (rarity) {
    case 'rare': return 'shadow-blue-200 dark:shadow-blue-700/50 shadow-lg';
    case 'epic': return 'shadow-purple-200 dark:shadow-purple-700/50 shadow-lg';
    case 'legendary': return 'shadow-yellow-200 dark:shadow-yellow-700/50 shadow-xl';
    default: return '';
  }
};

const RarityStars = ({ rarity }: { rarity: string }) => {
  switch (rarity) {
    case 'rare': return <RiStarFill className="text-blue-400 text-xs" />;
    case 'epic': return <div className="flex gap-0.5"><RiStarFill className="text-purple-400 text-xs" /><RiStarFill className="text-purple-400 text-xs" /></div>;
    case 'legendary': return <div className="flex gap-0.5"><RiStarFill className="text-yellow-400 text-xs" /><RiStarFill className="text-yellow-400 text-xs" /><RiStarFill className="text-yellow-400 text-xs" /></div>;
    default: return null;
  }
};

export default function AchievementsList({ achievements }: AchievementsListProps) {
  const unlockedAchievements = achievements.map(reward => getAchievementData(reward.reward_id, reward.claimed_at)).filter(Boolean) as Achievement[];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {unlockedAchievements.length > 0 ? (
          unlockedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                achievement.unlocked
                  ? `bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 ${getRarityGlow(achievement.rarity, achievement.unlocked)}`
                  : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <RarityStars rarity={achievement.rarity} />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  !achievement.unlocked ? 'opacity-50 grayscale' : 'shadow-md'
                } transition-all duration-300 ${achievement.color}`}>
                  <achievement.icon className="text-white text-xl" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm mb-1 ${
                    achievement.unlocked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs mb-2 ${
                    achievement.unlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-500'
                  } leading-relaxed`}>
                    {achievement.description}
                  </p>
                  
                  {achievement.unlocked && achievement.unlockedDate && (
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-full px-2 py-1 w-fit">
                      <RiCheckLine />
                      <span>Mở khóa {achievement.unlockedDate}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {achievement.unlocked && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <RiCheckLine className="text-white text-xs" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Bạn chưa mở khóa thành tích nào.
          </div>
        )}
      </div>
    </div>
  );
}