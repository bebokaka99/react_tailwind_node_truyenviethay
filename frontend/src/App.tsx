import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import NovelDetail from './pages/novel/NovelDetail';
import NovelsPage from './pages/NovelsPage';
import ComicsPage from './pages/ComicsPage';
import GenresPage from './pages/GenresPage';
import RankingsPage from './pages/RankingsPage';
import LibraryPage from './pages/LibraryPage';
import ReadingHistoryPage from './pages/ReadingHistoryPage'; 
import SettingProfilePage from './pages/ProfileSettings';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AuthorDashboard from './pages/dashboard/AuthorDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novels" element={<NovelsPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/reading-history" element={<ReadingHistoryPage />} /> 
          {/* Cập nhật đường dẫn này */}
          <Route path="/novel/:slug" element={<NovelDetail />} />
          {/* Hoặc nếu bạn muốn hỗ trợ cả id và slug, có thể thêm 2 route */}
          {/* <Route path="/novel/:id" element={<NovelDetail />} /> */}
          {/* <Route path="/novel/slug/:slug" element={<NovelDetail />} /> */}
          <Route path="/comic/:id" element={<div>Trang chi tiết truyện tranh</div>} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile-settings" element={<SettingProfilePage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/author-dashboard" element={<AuthorDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;