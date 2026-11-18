"use client";

import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  { label: "A world between the covers", title: "Find your next\nfavorite chapter.", text: "Thoughtful reads, new discoveries, and stories worth passing along. Your next bookshelf favorite is waiting.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1800&q=85", tone: "#173b32" },
  { label: "Share the stories you love", title: "Good books are\nbetter shared.", text: "Add a title to the shelves and help another reader discover something wonderful.", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800&q=85", tone: "#2d3d37" },
  { label: "A little reading goes a long way", title: "Make room for\nnew ideas.", text: "Borrow a book, take your time, and return it ready for the next curious mind.", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1800&q=85", tone: "#4c3928" },
];

export default function HeroSlider() {
  return (
    <section className="hero-frame relative overflow-hidden">
      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" loop autoplay={{ delay: 5200, disableOnInteraction: false }} pagination={{ clickable: true }} className="h-full">
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="hero-slide" style={{ backgroundImage: `linear-gradient(90deg, ${slide.tone}F2 0%, ${slide.tone}C9 44%, ${slide.tone}28 100%), url(${slide.image})` }}>
              <div className="page-shell flex h-full items-center py-16 sm:py-20">
                <div className="max-w-2xl text-white">
                  <p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#f0c779]">{slide.label}</p>
                  <h1 className="whitespace-pre-line font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">{slide.title}</h1>
                  <p className="mt-6 max-w-lg text-base leading-8 text-white/75 sm:text-lg">{slide.text}</p>
                  <Link href="/books" className="btn mt-8 h-10 rounded-full border-0 bg-[#e9b85f] px-7 text-sm font-bold text-[#19372f] shadow-lg hover:bg-[#f4cb7d]">Browse Books <span aria-hidden>↗</span></Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-bottom-note"><span>01 — 03</span><span className="h-px w-12 bg-white/50" /><span>Curated for curious minds</span></div>
    </section>
  );
}
