'use client';

import { useState } from 'react';

export default function CreateStory() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    tags: [],
    coverImage: null,
    status: 'draft',
    ageRating: 'all',
    language: 'vi'
  });

  const [currentTag, setCurrentTag] = useState('');
  const [step, setStep] = useState(1);

  const genres = [
    'Tiên Hiệp', 'Huyền Huyễn', 'Ngôn Tình', 'Cổ Đại', 'Hiện Đại',
    'Khoa Học Viễn Tưởng', 'Kinh Dị', 'Trinh Thám', 'Hành Động', 'Phiêu Lưu'
  ];

  const ageRatings = [
    { value: 'all', label: 'Mọi lứa tuổi', description: 'Phù hợp cho tất cả độc giả' },
    { value: '13+', label: '13+', description: 'Phù hợp cho độc giả từ 13 tuổi trở lên' },
    { value: '16+', label: '16+', description: 'Phù hợp cho độc giả từ 16 tuổi trở lên' },
    { value: '18+', label: '18+', description: 'Chỉ dành cho người trưởng thành' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating story:', formData);
    // Handle story creation logic here
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tên truyện *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="Nhập tên truyện của bạn..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mô tả truyện *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors"
          placeholder="Viết mô tả hấp dẫn về truyện của bạn..."
          maxLength={500}
          required
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Mô tả ngắn gọn sẽ thu hút độc giả hơn</p>
          <span className="text-sm text-gray-400 dark:text-gray-500">{formData.description.length}/500</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Thể loại *
          </label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 transition-colors"
            required
          >
            <option value="">Chọn thể loại</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Độ tuổi phù hợp
          </label>
          <select
            name="ageRating"
            value={formData.ageRating}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 transition-colors"
          >
            {ageRatings.map(rating => (
              <option key={rating.value} value={rating.value}>{rating.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Thẻ tag
        </label>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Nhập tag và nhấn Enter..."
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Thêm các tag để độc giả dễ tìm thấy truyện của bạn</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ảnh bìa truyện
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-image-line text-2xl text-gray-400 dark:text-gray-500"></i>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Kéo thả ảnh vào đây hoặc</p>
          <button
            type="button"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
          >
            Chọn ảnh
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Khuyến nghị: 400x600px, định dạng JPG/PNG</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Trạng thái xuất bản
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className={`flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-colors ${formData.status === 'draft' ? 'bg-purple-50 dark:bg-purple-900 border-purple-500 dark:border-purple-500' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Bản nháp</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lưu để chỉnh sửa sau</div>
            </div>
          </label>
          <label className={`flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-colors ${formData.status === 'published' ? 'bg-purple-50 dark:bg-purple-900 border-purple-500 dark:border-purple-500' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <input
              type="radio"
              name="status"
              value="published"
              checked={formData.status === 'published'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Xuất bản ngay</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Công khai cho độc giả</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tạo truyện mới</h2>
        <p className="text-gray-600 dark:text-gray-400">Chia sẻ câu chuyện của bạn với thế giới</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-purple-600 dark:bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            1
          </div>
          <span className="ml-2 font-medium">Thông tin cơ bản</span>
        </div>
        <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'} rounded-full`}></div>
        <div className={`flex items-center ${step >= 2 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-purple-600 dark:bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            2
          </div>
          <span className="ml-2 font-medium">Tùy chỉnh & Xuất bản</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit}>
          {step === 1 ? renderStep1() : renderStep2()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Quay lại
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                Lưu nháp
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                >
                  Tiếp tục
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 whitespace-nowrap"
                >
                  <i className="ri-check-line mr-2"></i>
                  Tạo truyện
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-200 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-lightbulb-line text-blue-600 dark:text-blue-300"></i>
          </div>
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Mẹo để tạo truyện thành công</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Chọn tên truyện ngắn gọn, dễ nhớ và thu hút</li>
              <li>• Viết mô tả hấp dẫn, tóm tắt nội dung chính mà không spoil</li>
              <li>• Sử dụng ảnh bìa chất lượng cao, phù hợp với nội dung</li>
              <li>• Thêm tag phù hợp để độc giả dễ tìm thấy truyện</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}