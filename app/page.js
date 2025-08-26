"use client";

import Link from "next/link";
import Navbar from "./components/Navbar_index";
import Footer from "@/app/components/Footer_index";
import LoginModal from "./components/login";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaTree,
  FaDumbbell,
  FaUsers,
  FaHome,
  FaHeart,
  FaBalanceScale,
  FaFire,
  FaRandom,
  FaUser,
  FaHandshake,
  FaChalkboardTeacher,
  FaDove,
  FaWeight,
  FaSpa,
  FaRunning,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import React from "react";

const products = [
  {
    id: 1,
    title: "乳清蛋白(巧克力口味)",
    image: "/images/hotproducts/img01.png",
    price: 1200,
    originalPrice: 1500,
    rating: 4,
  },
  {
    id: 2,
    title: "分離豌豆蛋白-烏龍奶茶",
    image: "/images/hotproducts/img14.png",
    price: 880,
    originalPrice: 1100,
    rating: 5,
  },
  {
    id: 3,
    title: "蛋白隨搖飲(珍珠奶茶)",
    image: "/images/hotproducts/img21.png",
    price: 440,
    originalPrice: 550,
    rating: 4,
  },
  {
    id: 4,
    title: "涮嘴蛋白酥脆脆(日式海苔)",
    image: "/images/hotproducts/img32.png",
    price: 680,
    originalPrice: 850,
    rating: 5,
  },
  {
    id: 5,
    title: "乳清蛋白(芒果口味)",
    image: "/images/hotproducts/img04.png",
    price: 640,
    originalPrice: 800,
    rating: 5,
  },
  {
    id: 6,
    title: "不鏽鋼搖搖杯(木棉花)",
    image: "/images/hotproducts/img44.png",
    price: 750,
    rating: 5,
  },
  {
    id: 7,
    title: "健行帽TREK 900(深灰)",
    image: "/images/hotproducts/img59.png",
    price: 890,
    rating: 4,
  },
  {
    id: 8,
    title: "登山健行背包(NH Arpenaz 500)",
    image: "/images/hotproducts/img48.png",
    price: 480,
    rating: 5,
  },
  {
    id: 9,
    title: "桌球拍2入組",
    image: "/images/hotproducts/img69.png",
    price: 620,
    rating: 4,
  },
  {
    id: 10,
    title: "成人款滑板車Town",
    image: "/images/hotproducts/img73.png",
    price: 860,
    rating: 5,
  },
];

// 新增心理測驗相關常數
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "從下方 4 張卡片中選擇你喜歡的運動環境，找到最適合你的運動類型！",
    options: [
      {
        text: "戶外大自然",
        value: "outdoor",
        icon: <FaTree className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "室內健身房",
        value: "indoor",
        icon: <FaDumbbell className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "獨自在家",
        value: "home",
        icon: <FaHome className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "團體教室",
        value: "group",
        icon: <FaUsers className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
    ],
  },
  {
    id: 2,
    question: "你期望的運動強度是？",
    options: [
      {
        text: "輕鬆舒緩",
        value: "light",
        icon: <FaSpa className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "中等強度",
        value: "medium",
        icon: <FaBalanceScale className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "高強度挑戰",
        value: "high",
        icon: <FaFire className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "混合強度",
        value: "mixed",
        icon: <FaRandom className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
    ],
  },
  {
    id: 3,
    question: "你喜歡的運動方式是？",
    options: [
      {
        text: "獨自專注",
        value: "solo",
        icon: <FaUser className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "團體互動",
        value: "group",
        icon: <FaHandshake className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "一對一指導",
        value: "personal",
        icon: <FaChalkboardTeacher className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "自由發揮",
        value: "free",
        icon: <FaDove className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
    ],
  },
  {
    id: 4,
    question: "你的運動目標是？",
    options: [
      {
        text: "減重塑形",
        value: "weight",
        icon: <FaWeight className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "增肌強身",
        value: "muscle",
        icon: <FaDumbbell className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "放鬆身心",
        value: "relax",
        icon: <FaSpa className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
      {
        text: "提升體能",
        value: "fitness",
        icon: <FaRunning className="w-8 h-8 sm:w-12 sm:h-12" />,
      },
    ],
  },
];

const SPORT_RECOMMENDATIONS = {
  // 戶外系列
  outdoor_light_solo_relax: {
    title: "自然療癒者",
    description:
      "你適合戶外瑜伽、太極拳、健行等舒緩型運動。這些運動能幫助你在大自然中放鬆身心，同時提升身體素質。",
    image: "/images/quiz/yoga-outdoor.jpg",
    tags: ["戶外", "舒緩", "獨處", "療癒"],
  },
  outdoor_medium_group_fitness: {
    title: "戶外探險家",
    description:
      "你適合越野跑、攀岩、戶外團體訓練等活動。這些運動能讓你享受大自然的同時，挑戰自我極限。",
    image: "/images/quiz/outdoor-adventure.jpg",
    tags: ["戶外", "團體", "挑戰", "探險"],
  },
  // 室內系列
  indoor_high_group_fitness: {
    title: "團體戰士",
    description:
      "你適合高強度間歇訓練(HIIT)、拳擊、CrossFit等團體課程。這些運動能激發你的競爭精神，同時建立社交連結。",
    image: "/images/quiz/group-fitness.jpg",
    tags: ["室內", "高強度", "團體", "挑戰"],
  },
  indoor_medium_personal_muscle: {
    title: "力量追求者",
    description:
      "你適合重量訓練、功能性訓練等個人指導課程。這些運動能幫助你建立肌肉，提升力量。",
    image: "/images/quiz/strength-training.jpg",
    tags: ["室內", "中強度", "個人", "力量"],
  },
  // 團體系列
  group_high_group_fitness: {
    title: "團隊領袖",
    description:
      "你適合團體運動如籃球、排球、足球等。這些運動能培養團隊精神，同時提升體能。",
    image: "/images/quiz/team-sports.jpg",
    tags: ["團體", "高強度", "社交", "競技"],
  },
  group_light_group_relax: {
    title: "社交運動者",
    description:
      "你適合團體舞蹈、太極、瑜伽等課程。這些運動能讓你享受社交樂趣，同時保持健康。",
    image: "/images/quiz/group-dance.jpg",
    tags: ["團體", "舒緩", "社交", "樂趣"],
  },
  // 居家系列
  home_light_solo_weight: {
    title: "居家健身達人",
    description:
      "你適合居家健身、徒手訓練、瑜伽等運動。這些運動能讓你在舒適的環境中達到健身目標。",
    image: "/images/quiz/home-fitness.jpg",
    tags: ["居家", "舒緩", "獨處", "便利"],
  },
  home_medium_free_fitness: {
    title: "自由健身者",
    description:
      "你適合居家HIIT、有氧運動、核心訓練等。這些運動能讓你在家也能達到良好的健身效果。",
    image: "/images/quiz/home-hiit.jpg",
    tags: ["居家", "中強度", "自由", "效率"],
  },
  // --- 16組前兩題組合 ---
  outdoor_light: {
    title: "戶外舒緩型",
    description: "你適合在戶外進行輕鬆舒緩的運動，如瑜伽、散步、太極等。",
    image: "/images/quiz/yoga-outdoor.jpg",
    tags: ["戶外", "舒緩"],
  },
  outdoor_medium: {
    title: "戶外中強度型",
    description: "你適合在戶外進行中等強度的運動，如慢跑、登山等。",
    image: "/images/quiz/outdoor-adventure.jpg",
    tags: ["戶外", "中強度"],
  },
  outdoor_high: {
    title: "戶外高強度型",
    description: "你適合在戶外進行高強度運動，如越野跑、登山健行等。",
    image: "/images/quiz/outdoor-adventure.jpg",
    tags: ["戶外", "高強度"],
  },
  outdoor_mixed: {
    title: "戶外混合型",
    description: "你適合在戶外嘗試多種強度的運動，享受多元運動樂趣。",
    image: "/images/quiz/outdoor-adventure.jpg",
    tags: ["戶外", "混合"],
  },
  indoor_light: {
    title: "室內舒緩型",
    description: "你適合在室內進行輕鬆舒緩的運動，如瑜伽、伸展等。",
    image: "/images/quiz/group-fitness.jpg",
    tags: ["室內", "舒緩"],
  },
  indoor_medium: {
    title: "室內中強度型",
    description: "你適合在室內進行中等強度的運動，如健身房重訓、有氧等。",
    image: "/images/quiz/strength-training.jpg",
    tags: ["室內", "中強度"],
  },
  indoor_high: {
    title: "室內高強度型",
    description: "你適合在室內進行高強度運動，如HIIT、拳擊等。",
    image: "/images/quiz/group-fitness.jpg",
    tags: ["室內", "高強度"],
  },
  indoor_mixed: {
    title: "室內混合型",
    description: "你適合在室內嘗試多種強度的運動，享受多元運動樂趣。",
    image: "/images/quiz/group-fitness.jpg",
    tags: ["室內", "混合"],
  },
  group_light: {
    title: "團體舒緩型",
    description: "你適合參加團體舒緩運動，如團體瑜伽、舞蹈等。",
    image: "/images/quiz/group-dance.jpg",
    tags: ["團體", "舒緩"],
  },
  group_medium: {
    title: "團體中強度型",
    description: "你適合參加團體中強度運動，如團體有氧、球類等。",
    image: "/images/quiz/team-sports.jpg",
    tags: ["團體", "中強度"],
  },
  group_high: {
    title: "團體高強度型",
    description: "你適合參加團體高強度運動，如團體HIIT、競技球類等。",
    image: "/images/quiz/team-sports.jpg",
    tags: ["團體", "高強度"],
  },
  group_mixed: {
    title: "團體混合型",
    description: "你適合參加團體混合強度運動，享受多元團體運動樂趣。",
    image: "/images/quiz/team-sports.jpg",
    tags: ["團體", "混合"],
  },
  home_light: {
    title: "居家舒緩型",
    description: "你適合在家進行舒緩運動，如居家瑜伽、伸展等。",
    image: "/images/quiz/home-fitness.jpg",
    tags: ["居家", "舒緩"],
  },
  home_medium: {
    title: "居家中強度型",
    description: "你適合在家進行中強度運動，如居家有氧、核心訓練等。",
    image: "/images/quiz/home-hiit.jpg",
    tags: ["居家", "中強度"],
  },
  home_high: {
    title: "居家高強度型",
    description: "你適合在家進行高強度運動，如居家HIIT、重訓等。",
    image: "/images/quiz/home-hiit.jpg",
    tags: ["居家", "高強度"],
  },
  home_mixed: {
    title: "居家混合型",
    description: "你適合在家嘗試多種強度的運動，享受多元運動樂趣。",
    image: "/images/quiz/home-hiit.jpg",
    tags: ["居家", "混合"],
  },
  // 大方向 fallback
  outdoor: {
    title: "戶外運動愛好者",
    description:
      "你熱愛大自然，適合各種戶外運動，建議多參與戶外活動，享受陽光與新鮮空氣。",
    image: "/images/quiz/yoga-outdoor.jpg",
    tags: ["戶外", "自然", "陽光"],
  },
  indoor: {
    title: "室內運動愛好者",
    description:
      "你偏好在舒適的環境中運動，建議參加健身房、室內團體課程或個人訓練。",
    image: "/images/quiz/group-fitness.jpg",
    tags: ["室內", "舒適", "健身房"],
  },
  group: {
    title: "團體運動愛好者",
    description:
      "你喜歡與人互動，適合參加團體運動如球類、舞蹈等，享受團隊合作的樂趣。",
    image: "/images/quiz/team-sports.jpg",
    tags: ["團體", "互動", "合作"],
  },
  home: {
    title: "居家運動愛好者",
    description:
      "你喜歡在家運動，建議多做徒手訓練、瑜伽或線上課程，方便又自在。",
    image: "/images/quiz/home-fitness.jpg",
    tags: ["居家", "便利", "自在"],
  },
};

function ExploreCoursesSection() {
  const features = [
    {
      image: "/images/ExploreCourses01.jpg",
      title: "客製化訓練",
      desc: "依身體節奏打造專屬訓練方式，從呼吸、動作到步調，每一步都為你量身設計，讓運動真正貼近你的生活。",
      link: "/reservation/course",
    },
    {
      image: "/images/ExploreCourses02.jpg",
      title: "營養補給",
      desc: "用適合自己的方式補營養，吃得開心才能走得更遠。不節食、不勉強，讓身體與心情都得到支持與滋養。",
      link: "/shop/products",
    },
    {
      image: "/images/ExploreCourses03.jpg",
      title: "持續練習",
      desc: "一步一腳印地練習與成長，不求快速蛻變，而是專注在每一次的累積中建立長久習慣，打造可持續的健康生活。",
      link: "/reservation/course",
    },
    {
      image: "/images/ExploreCourses04.jpg",
      title: "與內在連結",
      desc: "健身不只是流汗與燃燒，更是一場探索自我、與內在對話的旅程。相信自己，活出獨一無二的節奏與生活。",
      link: "/forum",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      className="relative bg-[#E7E7E5] overflow-hidden py-8 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-16 lg:space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className={`flex flex-col gap-4 sm:gap-8 lg:gap-16 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* 文字區塊 */}
              <div className="flex-1 flex flex-col justify-center order-2 lg:order-none">
                <div className="max-w-lg mx-auto lg:mx-0 px-4 lg:px-0">
                  <div className="flex items-baseline gap-2 sm:gap-4 mb-4">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#101828] tracking-tight leading-none select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#101828]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[#101828] text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* 圖片區塊 */}
              <div className="flex-1 flex justify-center items-center order-1 lg:order-none">
                <a href={feature.link} className="group">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer bg-white">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const weekDays = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];
const courseList = [
  { title: "高效有氧燃脂課程", teacher: "Lynn" },
  { title: "核心穩定強化訓練", teacher: "Kevin" },
  { title: "深層肌肉伸展課程", teacher: "Irene" },
  { title: "進階重量訓練班", teacher: "Jason" },
  { title: "流動瑜珈冥想課程", teacher: "Sophia" },
  { title: "功能性動作訓練", teacher: "Jack" },
  { title: "高強度心肺強化班", teacher: "Fangyu" },
  { title: "爆發力與肌力提升", teacher: "Sean" },
  { title: "全身循環運動課程", teacher: "Peggy" },
  { title: "肌肉放鬆與筋膜釋放", teacher: "Howard" },
];

function getDeterministicTime(idx) {
  const times = ["10:00", "14:00", "16:00", "18:00", "19:00", "20:00"];
  return times[idx % times.length];
}

const scheduledCourses = weekDays.map((day, idx) => {
  const course = courseList[idx % courseList.length];
  return {
    day,
    time: getDeterministicTime(idx),
    title: course.title,
    teacher: course.teacher,
  };
});

// 月曆資料生成
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const today = new Date();
const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
const scheduledMonthCourses = monthDays.map((day, idx) => {
  const course = courseList[idx % courseList.length];
  return {
    day,
    time: getDeterministicTime(idx),
    title: course.title,
    teacher: course.teacher,
  };
});

const courseIdMap = {
  高效有氧燃脂課程: 1,
  核心穩定強化訓練: 2,
  深層肌肉伸展課程: 3,
  進階重量訓練班: 4,
  流動瑜珈冥想課程: 5,
  功能性動作訓練: 6,
  高強度心肺強化班: 7,
  爆發力與肌力提升: 8,
  全身循環運動課程: 9,
  肌肉放鬆與筋膜釋放: 10,
};

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const scrollRef = useRef(null);
  const scrollByAmount = 300;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [confettiItems, setConfettiItems] = useState([]);
  const swiperRef = useRef(null);
  const [calendarMode, setCalendarMode] = useState("week"); // 'week' or 'month'
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [quizStarted, setQuizStarted] = useState(true);

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Add window resize listener
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate confetti items only when showConfetti changes
  useEffect(() => {
    if (showConfetti) {
      const items = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * (windowSize.width || 0),
        duration: Math.random() * 2 + 1,
        emoji: ["🎉", "🎊", "✨", "🌟"][Math.floor(Math.random() * 4)],
      }));
      setConfettiItems(items);
    } else {
      setConfettiItems([]);
    }
  }, [showConfetti, windowSize.width]);

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleCardClick = (index) => {
    if (isFlipping || flippedCards.includes(index)) return;

    setIsFlipping(true);
    setFlippedCards([...flippedCards, index]);

    setTimeout(() => {
      const option = QUIZ_QUESTIONS[currentQuestion].options[index];
      handleAnswer(option.value);
      setIsFlipping(false);
    }, 1000);
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFlippedCards([]);
    } else {
      const tryKeys = [
        newAnswers.join("_"),
        newAnswers.slice(0, 3).join("_"),
        newAnswers.slice(0, 2).join("_"),
        newAnswers[0],
      ];
      let found = null;
      for (const key of tryKeys) {
        if (SPORT_RECOMMENDATIONS[key]) {
          found = SPORT_RECOMMENDATIONS[key];
          break;
        }
      }
      setResult(
        found || {
          title: "全能運動者",
          description:
            "你適合多種運動類型，建議嘗試不同的運動來找到最適合你的方式。",
          image: "/images/quiz/all-around.jpg",
          tags: ["全能", "探索", "多元", "適應"],
        }
      );
      setShowResult(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setFlippedCards([]);
  };

  // 切換月份
  function handlePrevMonth() {
    if (calendarMonth === 0) {
      setCalendarYear(calendarYear - 1);
      setCalendarMonth(11);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  }
  function handleNextMonth() {
    if (calendarMonth === 11) {
      setCalendarYear(calendarYear + 1);
      setCalendarMonth(0);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  }

  // 月曆資料生成（依目前狀態）
  const daysInMonthDynamic = getDaysInMonth(calendarYear, calendarMonth);
  const monthDaysDynamic = Array.from(
    { length: daysInMonthDynamic },
    (_, i) => i + 1
  );
  const scheduledMonthCoursesDynamic = monthDaysDynamic.map((day, idx) => {
    const course = courseList[idx % courseList.length];
    return {
      day,
      time: getDeterministicTime(idx),
      title: course.title,
      teacher: course.teacher,
    };
  });

  return (
    <div className="scroll-smooth bg-[#E7E7E5]">
      <Navbar />
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      <main className="scroll-smooth">
        {/* Hero 區塊 - 輪播圖 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative w-full h-screen"
        >
          {/* 桌面版圖片 */}
          <Image
            src="/index3.jpg"
            alt="首頁"
            fill
            className="object-cover w-full h-full lg:block hidden"
          />

          {/* 手機版圖片 */}
          <Image
            src="/index3-mobile.jpg"
            alt="首頁"
            fill
            className="object-cover w-full h-full block lg:hidden"
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative w-full h-screen snap-start"
        >
          <Image
            src="/about_3.jpg"
            alt="首頁"
            fill
            className="object-cover w-full h-full"
          />
        </motion.section>

        {/* 探索課程特色區塊 */}
        <ExploreCoursesSection />

        {/* 過渡區塊2 - 響應式優化 */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full flex flex-col lg:flex-row items-stretch justify-center relative"
        >
          <div className="flex flex-col lg:flex-row items-center w-full h-full py-6 lg:py-10">
            {/* 左側圖片 */}
            <div className="flex items-center justify-center w-full lg:w-1/2 brightness-85">
              <img
                src="/images/about2.jpg"
                alt="About Us"
                className="w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] object-cover"
                style={{ objectPosition: "left center" }}
              />
            </div>
            <div className="flex flex-col w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] lg:w-1/2 justify-center bg-[#7F9161] px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-10 text-[#FBF9FA] text-center">
                OUR PURPOSE
              </h2>
              <p className="font-medium text-sm sm:text-base lg:text-lg text-[#FBF9FA] leading-relaxed text-center">
                NEXFIT 打造一個「真實可持續的健康生活系統」
                <br />
                我們相信健康管理不是一個壓力沉重的任務，
                <br />
                而是一場充滿選擇與陪伴的旅程
              </p>
            </div>
          </div>
        </motion.section>

        {/* 熱門排行榜 - 響應式優化 */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] bg-[#E7E7E5] flex flex-col justify-center relative py-8 sm:py-12 lg:py-16"
        >
          {/* 標題與箭頭同一行 - 響應式優化 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 lg:px-16 mb-6 lg:mb-10 gap-4 sm:gap-6 lg:gap-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Ranking
              </span>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-[#101828]">
                熱銷排行｜補給專區
              </span>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <button
                className="group w-10 h-10 sm:w-12 sm:h-12 bg-[#F0F0F0] rounded-full flex items-center justify-center shadow-lg transition hover:bg-[#7F9161] cursor-pointer"
                onClick={() => swiperRef.current?.slidePrev()}
                type="button"
                aria-label="上一個"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 transition group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="group w-10 h-10 sm:w-12 sm:h-12 bg-[#F0F0F0] rounded-full flex items-center justify-center shadow-lg transition hover:bg-[#7F9161] cursor-pointer"
                onClick={() => swiperRef.current?.slideNext()}
                type="button"
                aria-label="下一個"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 transition group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="px-4 sm:px-8 lg:px-12 relative"
          >
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={"auto"}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 12,
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: "auto",
                  spaceBetween: 32,
                },
              }}
              className="w-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {products.map((product, idx) => (
                <SwiperSlide
                  key={product.id}
                  className="!w-60 sm:!w-72 flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-60 h-60 sm:w-72 sm:h-72 object-cover mb-3 rounded-xl"
                  />
                  <div className="text-center px-2">
                    <h3 className="text-xs sm:text-sm font-medium mb-1">
                      {product.title}
                    </h3>
                    <div className="flex flex-col items-center">
                      {product.originalPrice && (
                        <span className="line-through text-xs sm:text-sm mb-1">
                          NT${product.originalPrice}
                        </span>
                      )}
                      <span
                        className="text-xs sm:text-sm font-medium"
                        style={{
                          color: product.originalPrice ? "#7F9161" : "",
                          fontWeight: product.originalPrice ? "bold" : "",
                        }}
                      >
                        NT${product.price}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.section>

        {/* 行事曆區塊 - 響應式優化 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full min-h-[60vh] bg-[#E7E7E5] flex items-center justify-center py-8 sm:py-12"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 px-4 sm:px-8 lg:px-16 mb-8 sm:mb-12 lg:mb-15">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-start">
                Booking
              </h2>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-[#101828]">
                預約課程行事曆
              </span>
            </div>

            {/* 週/月切換按鈕 - 響應式優化 */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base cursor-pointer ${
                  calendarMode === "week"
                    ? "bg-[#7F9161] text-[#FBF9FA]"
                    : "bg-[#FBF9FA] text-[#7F9161] border border-[#7F9161]"
                }`}
                onClick={() => setCalendarMode("week")}
              >
                週曆
              </button>
              <button
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base cursor-pointer ${
                  calendarMode === "month"
                    ? "bg-[#7F9161] text-[#FBF9FA]"
                    : "bg-[#FBF9FA] text-[#7F9161] border border-[#7F9161]"
                }`}
                onClick={() => setCalendarMode("month")}
              >
                月曆
              </button>
            </div>
            {/* 週曆/月曆 - 響應式優化 */}
            {calendarMode === "week" ? (
              <section className="w-full bg-[#E7E7E5] p-0 m-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 lg:gap-8 w-full px-2 sm:px-8 lg:px-14">
                  {weekDays.map((day) => {
                    const course = scheduledCourses.find((c) => c.day === day);
                    return (
                      <div
                        key={day}
                        className="p-2 sm:p-4 lg:p-6 min-h-[120px] sm:min-h-[150px] lg:min-h-[180px] flex flex-col items-center bg-white rounded-lg shadow-sm"
                      >
                        <div className="font-bold mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-lg lg:text-xl text-[#7F9161]">
                          {day}
                        </div>
                        {course && (
                          <Link
                            href={`/reservation/course/${
                              courseIdMap[course.title]
                            }`}
                            className="block hover:bg-[#7F9161]/10 rounded transition cursor-pointer w-full text-center"
                          >
                            <div className="mb-1 sm:mb-2">
                              <div className="text-sm sm:text-base lg:text-lg font-semibold">
                                {course.time}
                              </div>
                              <div className="text-xs sm:text-sm lg:text-base mt-1 leading-tight">
                                {course.title}
                              </div>
                              <div className="text-xs sm:text-sm lg:text-base text-zinc-500 mt-1">
                                {course.teacher}
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-6 lg:mt-8">
                {/* 月份切換與顯示 - 響應式優化 */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded bg-white border text-sm sm:text-base"
                  >
                    &#60;
                  </button>
                  <span className="font-bold text-base sm:text-lg">
                    {calendarYear}年 {calendarMonth + 1}月
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded bg-white border text-sm sm:text-base"
                  >
                    &#62;
                  </button>
                </div>
                {/* 星期標題 - 響應式優化 */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-[#7F9161] text-xs sm:text-sm lg:text-base"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3">
                  {/* 填充月初空白 */}
                  {Array.from(
                    { length: getFirstDayOfMonth(calendarYear, calendarMonth) },
                    (_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="bg-gray-50 rounded-lg shadow p-1 sm:p-2 min-h-[60px] sm:min-h-[70px] lg:min-h-[80px]"
                      />
                    )
                  )}
                  {/* 日期格子 - 響應式優化 */}
                  {monthDaysDynamic.map((day) => {
                    const course = scheduledMonthCoursesDynamic.find(
                      (c) => c.day === day
                    );
                    return (
                      <div
                        key={day}
                        className="bg-white rounded-lg shadow p-1 sm:p-2 min-h-[60px] sm:min-h-[70px] lg:min-h-[80px] flex flex-col items-center"
                      >
                        <div className="font-bold mb-1 text-[#7F9161] text-xs sm:text-sm">
                          {day}
                        </div>
                        {course && (
                          <Link
                            href={`/reservation/course/${
                              courseIdMap[course.title]
                            }`}
                            className="block hover:bg-[#7F9161]/10 rounded transition cursor-pointer text-center"
                          >
                            <div className="mb-1">
                              <div className="text-[8px] sm:text-xs font-semibold">
                                {course.time}
                              </div>
                              <div className="text-[8px] sm:text-xs leading-tight">
                                {course.title}
                              </div>
                              <div className="text-[8px] sm:text-xs text-zinc-600">
                                {course.teacher}
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* GOOGLE 地圖區塊 - 響應式優化 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full min-h-[60vh] bg-[#E7E7E5] flex flex-col items-center justify-center py-8 sm:py-12"
        >
          {/* 標題 - 響應式優化 */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 px-4 sm:px-8 lg:px-16 mb-8 sm:mb-12 lg:mb-15 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">
              Where to find us
            </h2>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-[#101828]">
              與我們相遇
            </span>
          </div>

          {/* 地圖與資訊橫向排列 - 響應式優化 */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-12 lg:gap-24 w-full max-w-6xl px-4 sm:px-6">
            {/* 地圖 - 響應式優化 */}
            <div className="flex-1 min-w-0 h-[300px] sm:h-[400px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.017367129919!2d120.2932479!3d22.6283906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0463352ebb51:0x5f532bceeb1713ca!2zODAx6auY6ZuE5biC5YmN6YeR5Y2A5Lit5q2j5Zub6LevMjEx6Jmf!5e0!3m2!1szh-TW!2stw!4v1680000000000!5m2!1szh-TW!2stw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* 地址資訊 - 響應式優化 */}
            <div className="flex-1 flex flex-col justify-center items-start px-4 sm:px-6 lg:pl-6 text-center lg:text-left">
              <p className="text-base sm:text-lg font-medium mb-2">
                高雄市中正四路211號8樓之1
              </p>
              <p className="text-sm sm:text-base font-medium mb-2">
                電話：07-9699-885
              </p>
              <p className="text-sm sm:text-base font-medium mb-2">
                營業時間：週一至週日 08:00-22:00
              </p>
              <p className="text-sm sm:text-base font-medium">
                歡迎蒞臨或來電洽詢！
              </p>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
