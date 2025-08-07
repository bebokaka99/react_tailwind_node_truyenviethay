'use client';

import { useState } from 'react';

export default function UserManagement() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const users = [
    {
      id: 1,
      username: 'reader_lover',
      email: 'reader@example.com',
      fullName: 'Nguyễn Văn An',
      role: 'reader',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 giờ trước',
      storiesRead: 45,
      chaptersRead: 1250,
      avatar: 'reader-001'
    },
    {
      id: 2,
      username: 'author_master',
      email: 'author@example.com',
      fullName: 'Lê Thị Bình',
      role: 'author',
      status: 'active',
      joinDate: '2024-02-10',
      lastActive: '1 ngày trước',
      storiesWritten: 8,
      chaptersWritten: 234,
      avatar: 'author-002'
    },
    {
      id: 3,
      username: 'super_admin',
      email: 'admin@example.com',
      fullName: 'Trần Văn Cường',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: '30 phút trước',
      actionsToday: 15,
      managedUsers: 150,
      avatar: 'admin-003'
    },
    {
      id: 4,
      username: 'suspended_user',
      email: 'suspended@example.com',
      fullName: 'Phạm Thị Dung',
      role: 'reader',
      status: 'suspended',
      joinDate: '2024-03-01',
      lastActive: '1 tuần trước',
      violationCount: 3,
      suspendReason: 'Spam comments',
      avatar: 'user-004'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter || user.status === filter;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getRoleColors = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      case 'author': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300';
      case 'reader': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
      case 'suspended': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Quản lý người dùng</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Quản lý tất cả người dùng và phân quyền</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            <i className="ri-user-add-line mr-2"></i>
            Thêm người dùng
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Xuất dữ liệu
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Tổng người dùng', value: '12,345', icon: 'ri-user-line', color: 'blue' },
          { title: 'Độc giả', value: '10,892', icon: 'ri-book-open-line', color: 'green' },
          { title: 'Tác giả', value: '1,234', icon: 'ri-edit-line', color: 'purple' },
          { title: 'Bị khóa', value: '219', icon: 'ri-lock-line', color: 'red' }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-red-100 dark:bg-red-900'
              }`}>
                <i className={`${stat.icon} text-xl ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-300' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-300' :
                  stat.color === 'purple' ? 'text-purple-600 dark:text-purple-300' : 'text-red-600 dark:text-red-300'
                }`}></i>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lọc theo:</span>
            {[
              { value: 'all', label: 'Tất cả' },
              { value: 'reader', label: 'Độc giả' },
              { value: 'author', label: 'Tác giả' },
              { value: 'admin', label: 'Quản trị' },
              { value: 'suspended', label: 'Bị khóa' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === option.value
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hoạt động
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={`https://readdy.ai/api/search-image?query=professional%20user%20avatar%20${user.role}%20friendly%20expression%20clean%20background&width=40&height=40&seq=${user.avatar}&orientation=squarish`}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{user.fullName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getRoleColors(user.role)}`}>
                      {user.role === 'admin' ? 'Quản trị' :
                       user.role === 'author' ? 'Tác giả' : 'Độc giả'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColors(user.status)}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">Hoạt động: {user.lastActive}</p>
                      {user.role === 'reader' && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.storiesRead} truyện • {user.chaptersRead} chương
                        </p>
                      )}
                      {user.role === 'author' && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.storiesWritten} truyện • {user.chaptersWritten} chương
                        </p>
                      )}
                      {user.role === 'admin' && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.actionsToday} hành động hôm nay
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition-colors">
                        <i className="ri-mail-line"></i>
                      </button>
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                        <i className="ri-lock-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Hiển thị <span className="font-medium">{filteredUsers.length > 0 ? '1' : '0'}-{filteredUsers.length}</span> trong tổng số <span className="font-medium">{users.length}</span> người dùng
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}