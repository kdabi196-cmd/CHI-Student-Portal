/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LogOut, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Globe, 
  Wifi, 
  WifiOff, 
  Calendar,
  ChevronRight,
  PlayCircle,
  Sparkles,
  Trophy,
  Star,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap
} from "lucide-react";
import { Course, Language, NAV_ITEMS, Assignment, Grade } from "./types";
import { CourseCard } from "./components/CourseCard";
import { GradesChart } from "./components/GradesChart";

// Mock Data
const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "مبادئ العلوم السياسية",
    code: "HUM-121",
    instructor: "محمد محمد نور الدين / Basant Maher",
    progress: 75,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop",
    lessons: [
      { id: "l1", title: "Introduction to Political Science", duration: "45m", completed: true },
      { id: "l2", title: "Modern Governance", duration: "1h 30m", completed: true },
      { id: "l3", title: "International Relations", duration: "55m", completed: false },
    ]
  },
  {
    id: "2",
    title: "التفكير الابتكاري",
    code: "HUM-111",
    instructor: "د. صفا مجدي",
    progress: 42,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    lessons: [
      { id: "l1", title: "Creative Mindset", duration: "40m", completed: true },
      { id: "l2", title: "Innovation Techniques", duration: "1h", completed: false },
    ]
  },
  {
    id: "3",
    title: "رياضيات الأعمال",
    code: "BAS-215",
    instructor: "د. نادر عبد العظيم / د. مصطفى الجيار",
    progress: 15,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    lessons: [
      { id: "l1", title: "Financial Math", duration: "50m", completed: false },
    ]
  },
  {
    id: "4",
    title: "السلوك التنظيمي",
    code: "BAS-216",
    instructor: "د. صفا مجدي",
    progress: 90,
    image: "https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?q=80&w=2070&auto=format&fit=crop",
    lessons: [
      { id: "l1", title: "Organizational Culture", duration: "1h", completed: true },
    ]
  },
  {
    id: "5",
    title: "طرق و مهارات الاتصال",
    code: "HUM-115",
    instructor: "د. ولاء فوزي / Habiba Mohamed",
    progress: 10,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    lessons: [
      { id: "l1", title: "Communication Basics", duration: "45m", completed: true },
    ]
  },
  {
    id: "6",
    title: "حقوق إنسان",
    code: "HUM-123",
    instructor: "د. ولاء فوزي / Basant Maher",
    progress: 80,
    image: "https://images.unsplash.com/photo-1450101496173-eb415183ccdd?q=80&w=2070&auto=format&fit=crop",
    lessons: [
      { id: "l1", title: "Human Rights Basics", duration: "1h", completed: true },
    ]
  }
];

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Political Systems Analysis", course: "HUM-121", dueDate: "2026-05-20", status: "pending" },
  { id: "a2", title: "Creative Ideation Report", course: "HUM-111", dueDate: "2026-05-18", status: "submitted" },
  { id: "a3", title: "Business Math Problem Set", course: "BAS-215", dueDate: "2026-05-22", status: "graded" },
];

const MOCK_GRADES: Grade[] = [
  { id: "g1", course: "HUM-121", score: "A", date: "2026-05-10" },
  { id: "g2", course: "BAS-216", score: "B+", date: "2026-05-12" },
];

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleStatusChange = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);

  const toggleLanguage = () => setLang(prev => prev === "en" ? "ar" : "en");
  const isRTL = lang === "ar";

  const filteredCourses = MOCK_COURSES.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex bg-midnight overflow-x-hidden ${isRTL ? "flex-row-reverse text-right" : "flex-row"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Blobs for Visual Flair */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-brand-primary/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] bg-brand-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Sidebar - Hidden on mobile, drawer/collapsible on tablet+ */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 80,
          x: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isSidebarOpen ? 0 : (isRTL ? 400 : -400)) : 0
        }}
        className="fixed lg:sticky inset-y-0 z-50 flex flex-col glass border-r-0 bg-midnight/90 lg:bg-midnight/80 backdrop-blur-3xl lg:backdrop-blur-2xl"
        style={{ [isRTL ? "right" : "left"]: 0 }}
      >
        <div className="h-24 flex items-center px-6 gap-3 border-b border-white/5">
          <div 
             onClick={() => setActiveTab("dashboard")}
             className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px] cursor-pointer shadow-lg shadow-brand-primary/20"
          >
             <div className="w-full h-full rounded-[14px] bg-midnight flex items-center justify-center font-display font-black text-xl text-brand-secondary">
               CHI
             </div>
          </div>
          {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth < 1024)) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-display font-black text-lg leading-tight uppercase tracking-tighter">Cairo Higher</span>
              <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em]">Institution</span>
            </motion.div>
          )}
          {/* Close button for mobile drawer */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-2 text-white/40">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 py-10 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all group ${
                activeTab === item.id 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={22} className={activeTab === item.id ? "" : "group-hover:scale-110 transition-transform"} />
              {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth < 1024)) && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {item.label[lang]}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-4">
          <button 
             onClick={() => {
               setShowAI(true);
               if (window.innerWidth < 1024) setSidebarOpen(false);
             }}
             className={`w-full flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-white/10 hover:border-brand-secondary/50 transition-all ${!isSidebarOpen && window.innerWidth >= 1024 ? "justify-center" : ""}`}
          >
            <Sparkles size={20} className="text-brand-secondary" />
            {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth < 1024)) && <span className="font-semibold text-sm">{lang === "en" ? "Study Buddy" : "مساعد الدراسة"}</span>}
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-2xl text-brand-accent hover:bg-brand-accent/10 transition-colors">
            <LogOut size={22} />
            {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth < 1024)) && <span>{lang === "en" ? "Logout" : "تسجيل الخروج"}</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300 min-h-screen pb-32 lg:pb-20"
      >
        {/* Header */}
        <header className="sticky top-0 z-40 h-20 glass border-x-0 border-t-0 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-white/60"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "en" ? "Search..." : "ابحث..."}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 w-40 lg:w-64 focus:outline-none focus:border-brand-primary/50 transition-colors"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Offline Indicator */}
             <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOffline ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-secondary/20 text-brand-secondary"}`}>
                {isOffline ? <WifiOff size={12} /> : <Wifi size={12} />}
                <span>{isOffline ? (lang === "en" ? "Offline" : "غير متصل") : (lang === "en" ? "Live" : "مباشر")}</span>
             </div>

            <button 
              onClick={toggleLanguage}
              className="p-2 hover:bg-white/5 rounded-lg text-white/60 flex items-center gap-2"
            >
              <Globe size={20} />
              <span className="text-sm font-bold uppercase">{lang === "en" ? "AR" : "EN"}</span>
            </button>
            
            <button className="relative p-2 hover:bg-white/5 rounded-lg text-white/60">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-midnight" />
            </button>

            <button 
              onClick={() => setActiveTab("profile")}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px] transition-transform hover:scale-105 active:scale-95"
            >
              <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                <span className="text-xs font-bold">MM</span>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-b-0 border-x-0 bg-midnight/90 backdrop-blur-3xl px-4 py-3 flex justify-around items-center">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === item.id ? "text-brand-primary" : "text-white/30"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label[lang]}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Views */}
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 lg:space-y-12"
              >
                {/* Hero Greeting */}
                <div className="relative group overflow-hidden rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 bg-gradient-to-br from-brand-primary via-brand-primary to-[#4C1D95]">
                   <div className="relative z-10 space-y-4 lg:space-y-6">
                      <div className="space-y-2">
                        <motion.h1 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-4xl md:text-8xl font-display leading-[1] md:leading-[0.85] tracking-tighter"
                        >
                          {lang === "en" ? "Welcome back," : "مرحباً بك مجدداً،"} <br />
                          <span className="text-brand-secondary">Mahmoud Mostafa.</span>
                        </motion.h1>
                        <p className="text-white/60 text-base md:text-lg max-w-sm">
                          {lang === "en" ? "You have 3 projects due this week." : "لديك 3 مشاريع تستحق التسليم هذا الأسبوع."}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedCourse(MOCK_COURSES[0])}
                        className="w-full sm:w-auto px-6 py-3 lg:px-8 lg:py-4 bg-brand-secondary text-midnight font-bold rounded-xl lg:rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-transform"
                      >
                        <PlayCircle size={24} />
                        {lang === "en" ? "Continue Learning" : "واصل التعلم"}
                      </button>
                   </div>
                   {/* Abstract Parallax Shapes */}
                   <motion.div 
                    animate={{ rotate: 360, x: [0, 20, 0], y: [0, -20, 0] }}
                    transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, x: { duration: 5, repeat: Infinity }, y: { duration: 6, repeat: Infinity } }}
                    className="absolute -top-12 -right-12 w-48 h-48 md:w-96 md:h-96 rounded-[3rem] md:rounded-[5rem] border-2 border-white/10 bg-white/5 backdrop-blur-3xl"
                   />
                </div>

                {/* Dashboard Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
                  {/* Progress Stats */}
                  <div className="md:col-span-1 glass rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 flex flex-row md:flex-col justify-between items-center md:items-start gap-4">
                    <div className="flex justify-between items-start w-full md:w-auto">
                       <span className="text-white/40 font-display uppercase tracking-widest text-[10px] lg:text-xs">{lang === "en" ? "GPA" : "المعدل"}</span>
                       <GraduationCap className="text-brand-secondary hidden md:block" />
                    </div>
                    <div className="space-y-0 lg:space-y-1">
                      <span className="text-4xl lg:text-7xl font-display font-bold">3.82</span>
                      <p className="text-brand-secondary font-semibold text-[10px] lg:text-sm flex items-center gap-1">
                        +0.15 {lang === "en" ? "this term" : "هذا الفصل"}
                      </p>
                    </div>
                  </div>

                  {/* Upcoming Deadline */}
                  <div className="md:col-span-2 glass rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 border-l-4 lg:border-l-8 border-l-brand-accent flex flex-col justify-between gap-4">
                    <div className="flex justify-between items-start">
                       <span className="text-white/40 font-display uppercase tracking-widest text-[10px] lg:text-xs">{lang === "en" ? "Next Deadline" : "الموعد القادم"}</span>
                       <div className="p-2 lg:p-3 bg-brand-accent/20 rounded-xl lg:rounded-2xl text-brand-accent">
                        <Calendar size={20} />
                       </div>
                    </div>
                    <div className="space-y-2 lg:space-y-4">
                       <div className="space-y-1">
                        <h3 className="text-xl lg:text-4xl font-display leading-tight">Seismic Report</h3>
                        <p className="text-white/40 text-sm lg:text-lg">Tomorrow • 11:59 PM</p>
                       </div>
                       <div className="flex gap-2">
                          <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px]">{lang === "en" ? "STR-402" : "STR-402"}</div>
                          <div className="px-2 py-1 rounded bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase">{lang === "en" ? "Critical" : "هام"}</div>
                       </div>
                    </div>
                  </div>

                   {/* Quick Notice */}
                   <div className="md:col-span-1 glass rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group hover:border-brand-primary transition-all cursor-pointer flex flex-col justify-between gap-4">
                      <div className="relative z-10 space-y-3 lg:space-y-4 flex-1">
                        <div className="p-2 lg:p-3 bg-brand-primary/20 rounded-xl lg:rounded-2xl w-fit text-brand-primary">
                          <Bell size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg lg:text-xl font-display">{lang === "en" ? "Update" : "تحديث"}</h3>
                          <p className="text-white/60 text-xs lg:text-sm">Lab Monday.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-brand-primary text-[10px] font-bold uppercase group-hover:gap-4 transition-all lg:mt-auto relative z-10">
                        {lang === "en" ? "Read More" : "اقرأ المزيد"}
                        <ChevronRight size={14} />
                      </div>
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 lg:w-32 lg:h-32 bg-brand-primary/5 rounded-full blur-2xl lg:blur-3xl group-hover:bg-brand-primary/20 transition-all" />
                   </div>
                </div>

                {/* Recent Courses Section */}
                <section className="space-y-6 lg:space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl lg:text-4xl font-display">{lang === "en" ? "Active Courses" : "المقررات النشطة"}</h2>
                    <button 
                      onClick={() => setActiveTab("courses")}
                      className="text-brand-secondary text-xs lg:text-sm font-bold hover:underline py-2"
                    >
                      {lang === "en" ? "View all" : "عرض الكل"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {filteredCourses.slice(0, 4).map(course => (
                      <CourseCard 
                        key={course.id} 
                        course={course} 
                        lang={lang} 
                        onClick={() => setSelectedCourse(course)}
                      />
                    ))}
                    {filteredCourses.length === 0 && (
                      <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-white/10">
                        <p className="text-white/40">{lang === "en" ? "No courses found matching your search." : "لم يتم العثور على مقررات تطابق بحثك."}</p>
                      </div>
                    )}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div 
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                   <div className="space-y-1 lg:space-y-2">
                    <h1 className="text-4xl lg:text-6xl font-display uppercase tracking-widest">{lang === "en" ? "Catalogue" : "الدليل"}</h1>
                    <p className="text-white/40 text-sm">{lang === "en" ? "Explore CHI Curriculum" : "استكشف منهج CHI"}</p>
                   </div>
                   <div className="flex bg-white/5 p-1 rounded-xl lg:rounded-2xl border border-white/10 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-4 lg:px-6 py-2 rounded-lg lg:rounded-xl bg-brand-primary font-bold text-xs lg:text-sm">Active</button>
                      <button className="flex-1 sm:flex-none px-4 lg:px-6 py-2 rounded-lg lg:rounded-xl text-white/40 font-bold text-xs lg:text-sm">Archived</button>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                   {filteredCourses.map(course => (
                      <CourseCard 
                        key={course.id} 
                        course={course} 
                        lang={lang} 
                        onClick={() => setSelectedCourse(course)}
                      />
                    ))}
                    {filteredCourses.length === 0 && (
                      <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-white/10">
                        <p className="text-white/40">{lang === "en" ? "No courses found." : "لم يتم العثور على مقررات."}</p>
                      </div>
                    )}
                </div>
              </motion.div>
            )}

            {activeTab === "grades" && (
               <motion.div 
               key="grades"
               initial={{ opacity: 0, rotateX: 10 }}
               animate={{ opacity: 1, rotateX: 0 }}
               exit={{ opacity: 0, rotateX: -10 }}
               className="space-y-8"
             >
               <h1 className="text-6xl font-display">{lang === "en" ? "Performance" : "الأداء"}</h1>
               <GradesChart lang={lang} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_GRADES.map((grade) => (
                    <div key={grade.id} className="glass rounded-[2rem] p-8 flex items-center justify-between group hover:border-brand-secondary transition-all">
                       <div className="space-y-1">
                          <h4 className="text-2xl font-display">{grade.course}</h4>
                          <p className="text-white/40">{grade.date}</p>
                       </div>
                       <div className="w-16 h-16 rounded-2xl bg-brand-secondary text-midnight flex items-center justify-center text-3xl font-bold font-display group-hover:scale-110 transition-transform">
                          {grade.score}
                       </div>
                    </div>
                  ))}
               </div>
             </motion.div>
            )}

            {activeTab === "assignments" && (
              <motion.div 
                key="assignments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                   <div className="space-y-2">
                    <h1 className="text-6xl font-display uppercase tracking-widest">{lang === "en" ? "Mission Control" : "مركز العمليات"}</h1>
                    <p className="text-white/40">{lang === "en" ? "Deadlines and projects tracker" : "متتبع المواعيد والمشاريع"}</p>
                   </div>
                   <button className="px-8 py-4 bg-brand-primary rounded-2xl font-bold hover:bg-brand-primary/80 transition-colors shadow-lg shadow-brand-primary/20">
                    {lang === "en" ? "Submit Work" : "تسليم عمل"}
                   </button>
                </div>

                <div className="space-y-4">
                   {MOCK_ASSIGNMENTS.map((asgn) => (
                      <motion.div 
                        key={asgn.id}
                        whileHover={{ x: 10 }}
                        className="glass rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all border-l-8 border-l-transparent data-[status=pending]:border-l-brand-accent data-[status=submitted]:border-l-brand-secondary"
                        data-status={asgn.status}
                      >
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                               <Clock size={32} />
                            </div>
                            <div className="space-y-1">
                               <h3 className="text-2xl font-display">{asgn.title}</h3>
                               <div className="flex items-center gap-2 text-white/40 text-sm">
                                  <span>{asgn.course}</span>
                                  <span>•</span>
                                  <span>{asgn.dueDate}</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                              asgn.status === "pending" ? "bg-brand-accent/20 text-brand-accent" : 
                              asgn.status === "submitted" ? "bg-brand-primary/20 text-brand-primary" : 
                              "bg-brand-secondary/20 text-brand-secondary"
                            }`}>
                               {asgn.status}
                            </span>
                            <button className="p-3 hover:bg-white/5 rounded-xl transition-colors">
                               <ExternalLink size={20} />
                            </button>
                         </div>
                      </motion.div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === "achievements" && (
              <motion.div 
              key="achievements"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                 <div className="w-24 h-24 rounded-full bg-brand-secondary/20 text-brand-secondary flex items-center justify-center mx-auto mb-6 border border-brand-secondary/30">
                    <Trophy size={48} />
                 </div>
                 <h1 className="text-6xl font-display">{lang === "en" ? "Hall of Fame" : "قاعة المشاهير"}</h1>
                 <p className="text-white/40">{lang === "en" ? "Your academic milestones and reward badges earned during your studies at CHI" : "إنجازاتك الأكاديمية وشارات المكافأة التي حصلت عليها خلال دراستك في CHI"}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                   { icon: Star, title: "Top Finisher", color: "text-[#FCD34D]" },
                   { icon: CheckCircle2, title: "No Lates", color: "text-[#34D399]" },
                   { icon: Sparkles, title: "Creative Thinker", color: "text-[#A78BFA]" },
                   { icon: Clock, title: "Early Bird", color: "text-[#60A5FA]" }
                 ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="glass rounded-[2rem] p-10 flex flex-col items-center gap-6 text-center group"
                    >
                       <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center ${item.color} group-hover:bg-white/10 transition-colors`}>
                          <item.icon size={40} />
                       </div>
                       <div className="space-y-2">
                          <h3 className="font-display font-bold text-xl">{item.title}</h3>
                          <p className="text-white/40 text-xs">Unlocked 2 days ago</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
            </motion.div>
            )}

            {activeTab === "quizzes" && (
               <motion.div 
               key="quizzes"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="space-y-8"
             >
               <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest">{lang === "en" ? "Blitz Center" : "مركز الاختبارات"}</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 1, title: "Structure Basics", time: "15 min", questions: 10, type: "Midterm Prep" },
                    { id: 2, title: "Logic Gates Mastery", time: "20 min", questions: 15, type: "Weekly Quiz" },
                    { id: 3, title: "Ethics & Compliance", time: "10 min", questions: 5, type: "Review" },
                  ].map((quiz) => (
                    <div key={quiz.id} className="glass rounded-[2rem] p-8 space-y-6 hover:border-brand-primary transition-colors group">
                       <div className="flex justify-between items-start">
                          <div className="p-3 bg-brand-primary/20 rounded-2xl text-brand-primary">
                             <CheckCircle2 size={24} />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{quiz.type}</span>
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-2xl font-display">{quiz.title}</h3>
                          <p className="text-white/40 text-sm">{quiz.questions} Questions • {quiz.time}</p>
                       </div>
                       <button className="w-full py-4 bg-white/5 group-hover:bg-brand-primary transition-colors rounded-2xl font-bold flex items-center justify-center gap-2">
                          {lang === "en" ? "Start Blitz" : "ابدأ الاختبار"}
                          <PlayCircle size={18} />
                       </button>
                    </div>
                  ))}
               </div>
             </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 glass rounded-[3rem] p-12">
                   <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-tr from-brand-primary to-brand-secondary p-1 shrink-0">
                      <div className="w-full h-full rounded-[2.8rem] bg-midnight flex items-center justify-center text-6xl font-bold font-display uppercase">
                        MM
                      </div>
                   </div>
                   <div className="text-center md:text-left space-y-4">
                      <div>
                        <h1 className="text-5xl font-display">Mahmoud Mostafa</h1>
                        <p className="text-brand-secondary font-bold text-lg">Engineering Undergraduate • Year 4</p>
                      </div>
                      <p className="text-white/40 max-w-xl">
                        {lang === "en" 
                          ? "Passionate engineering student at Cairo Higher Institution specializing in Systems & Control. Currently maintaining a 3.82 GPA with active involvement in technical labs." 
                          : "طالب هندسة شغوف في معهد القاهرة العالي متخصص في النظم والتحكم. أحافظ حالياً على معدل تراكمي 3.82 مع مشاركة نشطة في المختبرات التقنية."}
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                         <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm">
                            <span className="text-white/40 block text-[10px] uppercase font-bold tracking-widest mb-1">Student ID</span>
                            <span className="font-display font-bold">20261050</span>
                         </div>
                         <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm">
                            <span className="text-white/40 block text-[10px] uppercase font-bold tracking-widest mb-1">Email</span>
                            <span className="font-display font-bold text-brand-secondary">m.mostafa@chi-edu.eg</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="glass rounded-[2rem] p-8 space-y-4">
                      <h3 className="text-xl font-display">{lang === "en" ? "Academic Focus" : "التركيز الأكاديمي"}</h3>
                      <div className="flex flex-wrap gap-2">
                         {["Control", "Electronics", "Math", "Ethics"].map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-lg bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase">{tag}</span>
                         ))}
                      </div>
                   </div>
                   <div className="glass rounded-[2rem] p-8 space-y-4">
                      <h3 className="text-xl font-display">{lang === "en" ? "Languages" : "اللغات"}</h3>
                      <div className="space-y-3">
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-primary w-[100%]" />
                         </div>
                         <p className="text-xs font-bold uppercase tracking-widest text-white/40">Arabic (Native)</p>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-secondary w-[85%]" />
                         </div>
                         <p className="text-xs font-bold uppercase tracking-widest text-white/40">English (Professional)</p>
                      </div>
                   </div>
                   <div className="glass rounded-[2rem] p-8 space-y-4">
                      <h3 className="text-xl font-display">{lang === "en" ? "CHI Clubs" : "نوادي معهد القاهرة"}</h3>
                      <div className="space-y-2">
                         <p className="text-sm border-b border-white/5 pb-2">Robotics Development Team</p>
                         <p className="text-sm border-b border-white/5 pb-2">IEEE CHI Student Branch</p>
                         <p className="text-sm">Ethics Society</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 max-w-4xl"
              >
                <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest">{lang === "en" ? "Config" : "الإعدادات"}</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section className="space-y-6">
                    <h2 className="text-xl font-display uppercase tracking-widest text-brand-secondary border-l-4 border-brand-primary pl-4">{lang === "en" ? "App Experience" : "تجربة التطبيق"}</h2>
                    <div className="space-y-4">
                       {[
                         { label: lang === "en" ? "High Performance Mode" : "وضع الأداء العالي", desc: "Enable smoother animations", active: true },
                         { label: lang === "en" ? "Notification Tones" : "نغمات التنبيه", desc: "Classic CHI bell sounds", active: false },
                         { label: lang === "en" ? "AI Study Reminders" : "تنبيهات المساعد الذكي", desc: "Daily goals from Study Buddy", active: true },
                         { label: lang === "en" ? "Compact Dashboard" : "لوحة تحكم مدمجة", desc: "Show more items per row", active: false },
                       ].map((pref, i) => (
                          <div key={i} className="glass rounded-3xl p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                             <div className="space-y-1">
                                <span className="font-semibold block">{pref.label}</span>
                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{pref.desc}</span>
                             </div>
                             <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${pref.active ? "bg-brand-primary" : "bg-white/10"}`}>
                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${pref.active ? "translate-x-6" : "translate-x-0"}`} />
                             </div>
                          </div>
                       ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h2 className="text-xl font-display uppercase tracking-widest text-brand-secondary border-l-4 border-brand-primary pl-4">{lang === "en" ? "Security & Access" : "الأمن والوصول"}</h2>
                    <div className="space-y-4">
                       <div className="glass rounded-3xl p-6 space-y-4">
                          <div className="flex items-center justify-between">
                             <span className="font-semibold">{lang === "en" ? "Two-Factor Auth" : "المصادقة الثنائية"}</span>
                             <span className="text-[10px] px-2 py-1 bg-brand-secondary/20 text-brand-secondary rounded font-bold uppercase">{lang === "en" ? "Strong" : "قوي"}</span>
                          </div>
                          <p className="text-xs text-white/40">{lang === "en" ? "Protect your CHI account with a mobile verification code." : "احمِ حسابك برمز تحقق مرسل لهاتفك."}</p>
                          <button className="w-full py-3 border border-white/10 hover:border-brand-primary rounded-xl text-xs font-bold uppercase transition-colors">{lang === "en" ? "Manage Security" : "إدارة الأمان"}</button>
                       </div>
                       
                       <div className="glass rounded-3xl p-6 space-y-4">
                          <div className="flex items-center justify-between">
                             <span className="font-semibold">{lang === "en" ? "Active Sessions" : "الجلسات النشطة"}</span>
                             <span className="text-xs text-white/40">2 {lang === "en" ? "Connected" : "متصلين"}</span>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>iPhone 15 Pro • Cairo, EG</span>
                                <span className="text-brand-secondary">Current</span>
                             </div>
                             <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>MacBook Pro • Giza, EG</span>
                                <button className="hover:text-brand-accent underline">Revoke</button>
                             </div>
                          </div>
                       </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Course Detail Modal (Side Panel) */}
      <AnimatePresence>
        {selectedCourse && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: isRTL ? -1000 : 1000 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? -1000 : 1000 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 z-[60] w-full max-w-full lg:max-w-2xl glass p-6 lg:p-8 shadow-2xl backdrop-blur-3xl overflow-y-auto border-y-0 border-r-0 lg:border-l border-white/10"
              style={{ [isRTL ? "left" : "right"]: 0 }}
            >
              <div className="flex items-center justify-between mb-8 lg:mb-12">
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                  title={lang === "en" ? "Close" : "إغلاق"}
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
                  <span className="text-[10px] lg:text-xs font-display uppercase tracking-widest text-white/40">
                    {lang === "en" ? "Active Curriculum" : "المنهج النشط"}
                  </span>
                </div>
              </div>

              <div className="space-y-8 lg:space-y-12 pb-20">
                <div className="relative aspect-video rounded-2xl lg:rounded-[3rem] overflow-hidden">
                  <img 
                    src={selectedCourse.image} 
                    alt={selectedCourse.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-2xl"
                    >
                        <PlayCircle size={32} />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-2 py-1 rounded bg-brand-primary/20 border border-brand-primary/30 text-[10px] font-display text-brand-primary">
                        {selectedCourse.code}
                    </div>
                    <div className="px-2 py-1 rounded bg-brand-secondary/20 border border-brand-secondary/30 text-[10px] font-display text-brand-secondary">
                        {selectedCourse.progress}% Complete
                    </div>
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-display leading-tight">{selectedCourse.title}</h1>
                  <p className="text-white/60 text-base lg:text-lg">{lang === "en" ? "Under" : "تحت إشراف"} <span className="text-white font-bold">{selectedCourse.instructor}</span></p>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl lg:text-2xl font-display">{lang === "en" ? "Lessons" : "دروس"}</h3>
                    <span className="text-white/40 text-xs font-bold">{selectedCourse.lessons.length} total</span>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    {selectedCourse.lessons.map((lesson, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          key={lesson.id} 
                          className={`flex items-center justify-between p-5 lg:p-8 rounded-2xl lg:rounded-[2rem] border transition-all cursor-pointer group ${lesson.completed ? "bg-brand-secondary/5 border-brand-secondary/20" : "bg-white/5 border-white/10 hover:border-white/30"}`}
                        >
                          <div className="flex items-center gap-4 lg:gap-6">
                              <span className={`text-xl lg:text-2xl font-display font-medium ${lesson.completed ? "text-brand-secondary" : "text-white/20"}`}>
                                {(idx + 1).toString().padStart(2, "0")}
                              </span>
                              <div>
                                <p className={`text-base lg:text-xl font-bold ${lesson.completed ? "text-brand-secondary/80 line-through" : ""}`}>{lesson.title}</p>
                                <span className="text-xs text-white/40">{lesson.duration}</span>
                              </div>
                          </div>
                          {lesson.completed ? (
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl bg-brand-secondary text-midnight flex items-center justify-center">
                                <CheckCircle2 size={18} />
                            </div>
                          ) : (
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                <ChevronRight size={18} />
                            </div>
                          )}
                        </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Smart Study Buddy AI (Gemini Mock UI) */}
      <AnimatePresence>
        {showAI && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 lg:p-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAI(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
             />
             <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full lg:max-w-4xl h-full lg:h-[80vh] flex flex-col bg-[#0F0F0F] rounded-none lg:rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
             >
                <div className="p-6 lg:p-8 border-b border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center">
                        <Sparkles size={20} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-display">Study Buddy</h2>
                        <p className="text-brand-secondary text-[8px] lg:text-[10px] uppercase font-bold tracking-widest animate-pulse">Gemini 2.0 Flash</p>
                      </div>
                   </div>
                   <button onClick={() => setShowAI(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 lg:space-y-8">
                   <div className="max-w-[85%] lg:max-w-xl bg-white/5 p-5 lg:p-6 rounded-2xl lg:rounded-3xl rounded-tl-none border border-white/10">
                      <p className="text-base lg:text-lg">
                        {lang === "en" 
                          ? "Hey John! Ready to study?" 
                          : "مرحباً يا جون! هل أنت مستعد للبدء؟"}
                      </p>
                   </div>
                   <div className="max-w-[85%] lg:max-w-xl ml-auto bg-brand-primary/20 p-5 lg:p-6 rounded-2xl lg:rounded-3xl rounded-tr-none border border-brand-primary/30">
                      <p className="text-base lg:text-lg">
                        {lang === "en" ? "Summarize Lesson 2." : "لخص الدرس الثاني."}
                      </p>
                   </div>
                </div>

                <div className="p-6 lg:p-8 border-t border-white/10 bg-[#121212]">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder={lang === "en" ? "Ask anything..." : "اسأل أي شيء..."}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl py-4 lg:py-6 px-6 lg:px-10 focus:outline-none focus:border-brand-primary transition-all text-base lg:text-xl"
                      />
                      <button className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-brand-primary rounded-xl lg:rounded-2xl hover:scale-105 active:scale-95 transition-transform">
                         <PlayCircle size={20} />
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
