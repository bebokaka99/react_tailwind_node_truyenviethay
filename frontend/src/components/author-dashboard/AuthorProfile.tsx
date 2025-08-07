'use client';

import { useState } from 'react';

export default function AuthorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: 'Lê Minh Tâm',
    bio: 'Tác giả chuyên viết truyện tiên hiệp và huyền huyễn. Đam mê sáng tạo những thế giới kỳ ảo đầy màu sắc.',
    location: 'Hồ Chí Minh, Việt Nam',
    website: 'https://leminhtan.author.vn',
    socialMedia: {
      facebook: 'leminhtan.author',
      instagram: 'leminhtan_writer',
      twitter: '@leminhtan_vn'
    },
    genres: ['Tiên Hiệp', 'Huyền Huyễn', 'Cổ Đại'],
    achievements: [
      'Tác giả xuất sắc 2024',
      'Top 10 truyện được yêu thích nhất',
      '1M+ lượt đọc'
    ]
  });

  const stats = [
    { label: 'Tổng số truyện', value: '8', icon: 'ri-book-line' },
    { label: 'Tổng lượt xem', value: '2.3M', icon: 'ri-eye-line' },
    { label: 'Người theo dõi', value: '12.5K', icon: 'ri-user-heart-line' },
    { label: 'Đánh giá trung bình', value: '4.7/5', icon: 'ri-star-line' }
  ];

  const recentStories = [
    {
      title: 'Tu La Vương Triều',
      chapters: 341,
      status: 'ongoing',
      rating: 4.8,
      views: '1.2M',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20fantasy%20novel%20cover%20with%20mystical%20warrior%2C%20ancient%20oriental%20design%2C%20purple%20and%20gold%20colors&width=120&height=160&seq=author-profile-001&orientation=portrait'
    },
    {
      title: 'Thiên Kim Tiểu Thư',
      chapters: 245,
      status: 'ongoing',
      rating: 4.6,
      views: '856K',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20romance%20novel%20cover%20with%20elegant%20lady%20in%20traditional%20dress%2C%20soft%20pink%20and%20white%20colors&width=120&height=160&seq=author-profile-002&orientation=portrait'
    },
    {
      title: 'Huyền Thoại Kiếm Sĩ',
      chapters: 567,
      status: 'completed',
      rating: 4.9,
      views: '2.1M',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20fantasy%20novel%20cover%20with%20legendary%20sword%20master%2C%20mystical%20sword%2C%20blue%20and%20silver%20colors&width=120&height=160&seq=author-profile-003&orientation=portrait'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <img 
                  src="https://readdy.ai/api/search-image?query=professional%20Vietnamese%20author%20portrait%2C%20creative%20writer%20with%20artistic%20expression%2C%20warm%20lighting%2C%20inspiring%20background&width=120&height=120&seq=author-profile-avatar&orientation=squarish"
                  alt="Author Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <i className="ri-camera-line text-sm"></i>
                  </button>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleInputChange}
                    className="text-2xl font-bold bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white placeholder-white/70 border border-white/30 focus:border-white/50 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{profileData.displayName}</h1>
                )}
                <div className="flex items-center space-x-4 mt-2 text-purple-100">
                  <span className="flex items-center">
                    <i className="ri-map-pin-line mr-1"></i>
                    {profileData.location}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-calendar-line mr-1"></i>
                    Tham gia từ 2022
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors whitespace-nowrap"
            >
              <i className={`${isEditing ? 'ri-check-line' : 'ri-edit-line'} mr-2`}></i>
              {isEditing ? 'Lưu' : 'Chỉnh sửa'}
            </button>
          </div>
          
          <div className="mt-6">
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-white placeholder-white/70 border border-white/30 focus:border-white/50 focus:outline-none resize-none"
                placeholder="Viết mô tả về bản thân..."
              />
            ) : (
              <p className="text-purple-100 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {profileData.genres.map((genre, index) => (
              <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className={`${stat.icon} text-xl text-purple-600 dark:text-purple-300`}></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Thông tin liên hệ</h3>
            {isEditing && (
              <span className="text-sm text-purple-600 dark:text-purple-400">Đang chỉnh sửa</span>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <i className="ri-global-line text-gray-400"></i>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Website của bạn"
                />
              ) : (
                <a href={profileData.website} target="_blank" rel="noopener noreferrer" 
                   className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 transition-colors">
                  {profileData.website}
                </a>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-facebook-line text-gray-400"></i>
              {isEditing ? (
                <input
                  type="text"
                  name="socialMedia.facebook"
                  value={profileData.socialMedia.facebook}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Facebook username"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">@{profileData.socialMedia.facebook}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-instagram-line text-gray-400"></i>
              {isEditing ? (
                <input
                  type="text"
                  name="socialMedia.instagram"
                  value={profileData.socialMedia.instagram}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Instagram username"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">@{profileData.socialMedia.instagram}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-twitter-line text-gray-400"></i>
              {isEditing ? (
                <input
                  type="text"
                  name="socialMedia.twitter"
                  value={profileData.socialMedia.twitter}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Twitter handle"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{profileData.socialMedia.twitter}</span>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Thành tích</h3>
          <div className="space-y-3">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <i className="ri-trophy-line text-yellow-600 dark:text-yellow-300"></i>
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Stories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Truyện nổi bật</h3>
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 text-sm font-medium whitespace-nowrap">
            Xem tất cả truyện
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentStories.map((story, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img 
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    story.status === 'ongoing' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {story.status === 'ongoing' ? 'Đang ra' : 'Hoàn thành'}
                  </span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {story.title}
              </h4>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{story.chapters} chương</span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    {story.rating}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-eye-line mr-1"></i>
                    {story.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Profile Preview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <i className="ri-eye-line text-blue-600 dark:text-blue-300"></i>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-200">Hồ sơ công khai</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">Độc giả sẽ thấy thông tin này trên trang tác giả của bạn</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
            <i className="ri-external-link-line mr-2"></i>
            Xem trang công khai
          </button>
        </div>
      </div>
    </div>
  );
}