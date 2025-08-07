'use client';

import { useState } from 'react';

export default function ChapterEditor() {
  const [editorData, setEditorData] = useState({
    storyId: '',
    chapterTitle: '',
    chapterNumber: '',
    content: '',
    authorNote: '',
    status: 'draft',
    publishAt: ''
  });

  const [wordCount, setWordCount] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const stories = [
    { id: '1', title: 'Tu La Vương Triều', chapters: 341 },
    { id: '2', title: 'Thiên Kim Tiểu Thư', chapters: 245 },
    { id: '3', title: 'Mộng Hồi Đại Thanh', chapters: 89 },
    { id: '4', title: 'Huyền Thoại Kiếm Sĩ', chapters: 567 },
    { id: '5', title: 'Nữ Hoàng Băng Giá', chapters: 12 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditorData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'content') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  };

  const handleSave = () => {
    console.log('Saving chapter:', editorData);
    // Handle save logic here
  };

  const handlePublish = () => {
    console.log('Publishing chapter:', editorData);
    // Handle publish logic here
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph || '\u00A0'}
      </p>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trình soạn thảo chương</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Viết và xuất bản chương mới cho truyện của bạn</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <i className="ri-save-line"></i>
            <span>Tự động lưu: {autoSave ? 'Bật' : 'Tắt'}</span>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`w-10 h-6 rounded-full transition-colors ${
                autoSave ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                autoSave ? 'translate-x-5' : 'translate-x-1'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Cài đặt chương</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chọn truyện *
                </label>
                <select
                  name="storyId"
                  value={editorData.storyId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
                  required
                >
                  <option value="">Chọn truyện</option>
                  {stories.map(story => (
                    <option key={story.id} value={story.id}>
                      {story.title} ({story.chapters} chương)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Số chương
                </label>
                <input
                  type="number"
                  name="chapterNumber"
                  value={editorData.chapterNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Tự động"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên chương *
                </label>
                <input
                  type="text"
                  name="chapterTitle"
                  value={editorData.chapterTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Nhập tên chương..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={editorData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="scheduled">Lên lịch</option>
                  <option value="published">Xuất bản ngay</option>
                </select>
              </div>

              {editorData.status === 'scheduled' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Thời gian xuất bản
                  </label>
                  <input
                    type="datetime-local"
                    name="publishAt"
                    value={editorData.publishAt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Writing Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Thống kê</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Số từ:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{wordCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Ký tự:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{editorData.content.length.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Đoạn văn:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {editorData.content.split('\n').filter(p => p.trim()).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Thời gian đọc:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ~{Math.ceil(wordCount / 200)} phút
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Thao tác nhanh</h3>
            <div className="space-y-2">
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm whitespace-nowrap"
              >
                <i className="ri-save-line mr-2"></i>
                Lưu nháp
              </button>
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm whitespace-nowrap"
              >
                <i className="ri-eye-line mr-2"></i>
                {isPreview ? 'Chỉnh sửa' : 'Xem trước'}
              </button>
              <button
                onClick={handlePublish}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Xuất bản
              </button>
            </div>
          </div>
        </div>

        {/* Editor/Preview */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Editor Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPreview(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      !isPreview ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <i className="ri-edit-line mr-2"></i>
                    Soạn thảo
                  </button>
                  <button
                    onClick={() => setIsPreview(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isPreview ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <i className="ri-eye-line mr-2"></i>
                    Xem trước
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="ri-time-line"></i>
                  <span>Lưu lần cuối: 2 phút trước</span>
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-6">
              {!isPreview ? (
                <div className="space-y-6">
                  <textarea
                    name="content"
                    value={editorData.content}
                    onChange={handleInputChange}
                    className="w-full h-96 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
                    placeholder="Bắt đầu viết chương của bạn tại đây...

Mẹo: 
- Sử dụng Enter để tạo đoạn văn mới
- Viết tự nhiên, đừng lo lắng về định dạng
- Tập trung vào nội dung, bạn có thể chỉnh sửa sau"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ghi chú tác giả (tùy chọn)
                    </label>
                    <textarea
                      name="authorNote"
                      value={editorData.authorNote}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                      placeholder="Thêm ghi chú cho độc giả về chương này..."
                    />
                  </div>
                </div>
              ) : (
                <div className="prose dark:prose-invert prose-lg max-w-none">
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {editorData.chapterTitle || 'Tên chương'}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Chương {editorData.chapterNumber || 'XX'}</span>
                      <span>•</span>
                      <span>{wordCount.toLocaleString()} từ</span>
                      <span>•</span>
                      <span>~{Math.ceil(wordCount / 200)} phút đọc</span>
                    </div>
                  </div>
                  
                  <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    {editorData.content ? (
                      formatContent(editorData.content)
                    ) : (
                      <p className="text-gray-500 italic">Nội dung chương sẽ hiển thị ở đây...</p>
                    )}
                  </div>
                  
                  {editorData.authorNote && (
                    <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Ghi chú tác giả:</h4>
                      <p className="text-purple-800 dark:text-purple-200 text-sm">{editorData.authorNote}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}