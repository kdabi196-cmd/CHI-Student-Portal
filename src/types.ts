import { BookOpen, CheckSquare, GraduationCap, LayoutDashboard, Settings, Trophy, Users } from "lucide-react";

export type Language = "en" | "ar";

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  progress: number;
  image: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
}

export interface Grade {
  id: string;
  course: string;
  score: string;
  date: string;
}

export const NAV_ITEMS = [
  { id: "dashboard", label: { en: "Dashboard", ar: "لوحة التحكم" }, icon: LayoutDashboard },
  { id: "courses", label: { en: "My Courses", ar: "مقرراتي" }, icon: BookOpen },
  { id: "assignments", label: { en: "Assignments", ar: "التكليفات" }, icon: CheckSquare },
  { id: "quizzes", label: { en: "Quizzes", ar: "الاختبارات" }, icon: Users },
  { id: "grades", label: { en: "Grades", ar: "الدرجات" }, icon: GraduationCap },
  { id: "achievements", label: { en: "Achievements", ar: "الإنجازات" }, icon: Trophy },
  { id: "profile", label: { en: "Profile", ar: "الملف الشخصي" }, icon: Users },
  { id: "settings", label: { en: "Settings", ar: "الإعدادات" }, icon: Settings },
];
