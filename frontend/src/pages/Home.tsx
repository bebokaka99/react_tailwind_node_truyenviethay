// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import RankingSection from '../components/RankingSection';
import { getHomePageData } from '../api/storyService.js';

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
        const homeData = await getHomePageData();
        setData(homeData);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu trang chủ.");
        setLoading(false);
        console.error(err);
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
    <>

      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        <HeroSection />
        {/* Phần Tiểu thuyết nổi bật - Dùng dữ liệu từ API */}
        <StorySection
          title="Truyện nổi bật"
          description="Những tác phẩm được yêu thích nhất"
          stories={data.trendingStories} // <-- Truyền dữ liệu thật vào đây
          linkTo="/novels" // Giả định là chỉ có tiểu thuyết
        />
        {/* Phần Truyện mới cập nhật - Dùng dữ liệu từ API */}
        <StorySection
          title="Truyện mới cập nhật"
          description="Các chương mới nhất từ tác phẩm"
          stories={data.newStories}
          linkTo="/novels" // Giả định là chỉ có tiểu thuyết
        />
        {/* Phần Bảng xếp hạng - Dùng dữ liệu từ API */}
        {/*
          Giả định RankingSection có thể nhận dữ liệu từ trendingStories.
          Nếu không, có thể bạn sẽ cần một component RankingSection riêng cho từng loại xếp hạng.
        */}
        <RankingSection
          stories={data.trendingStories} // <-- Giả định có thể truyền dữ liệu thật
        />
        {/* Phần Truyện theo thể loại ngẫu nhiên */}
        {data.storiesByGenres.map(genreSection => (
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