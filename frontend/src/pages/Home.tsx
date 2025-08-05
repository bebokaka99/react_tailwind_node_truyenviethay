// src/pages/Home.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import RankingSection from '../components/RankingSection';
import { featuredNovels, popularComics } from '../mockData';

const Home = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        <HeroSection />

        {/* Phần Tiểu thuyết nổi bật */}
        <StorySection
          title="Tiểu thuyết nổi bật"
          description="Những tác phẩm được yêu thích nhất"
          stories={featuredNovels.map(novel => ({...novel, type: 'novel'}))}
          linkTo="/novels"
        />

        {/* Phần Truyện tranh phổ biến */}
        <StorySection
          title="Truyện tranh phổ biến"
          description="Manga và Manhwa được yêu thích"
          stories={popularComics.map(comic => ({...comic, type: 'comic'}))}
          linkTo="/comics"
        />

        {/* Thêm phần Bảng xếp hạng vào đây */}
        <RankingSection />

      </main>
      <Footer />
    </>
  );
};

export default Home;