// src/pages/Home.tsx (đã sửa đổi)
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import RankingSection from '../components/RankingSection';
import { getHomePageData } from '../services/storyService';

const Home = () => {
  const [data, setData] = useState({
    trendingStories: [],
    newStories: [],
    storiesByGenres: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await getHomePageData(); // Gọi hàm service
        setData(homeData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    // ... phần JSX còn lại không đổi
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        <HeroSection />
        <StorySection
          title="Truyện nổi bật"
          description="Những tác phẩm được yêu thích nhất"
          stories={data.trendingStories}
          linkTo="/novels"
        />
        <StorySection
          title="Truyện mới cập nhật"
          description="Các chương mới nhất từ tác phẩm"
          stories={data.newStories}
          linkTo="/novels"
        />
        <RankingSection 
          stories={data.trendingStories}
        />
        {data.storiesByGenres.map((genreSection: any) => (
          <StorySection
            key={genreSection.id_theloai}
            title={genreSection.ten_theloai}
            description="Những tác phẩm được yêu thích"
            stories={genreSection.stories}
            linkTo={`/genres/${genreSection.id_theloai}`}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Home;