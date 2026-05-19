import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Language } from "../types";

const data = [
  { name: "Week 1", score: 65, gpa: 3.2 },
  { name: "Week 2", score: 70, gpa: 3.3 },
  { name: "Week 3", score: 85, gpa: 3.5 },
  { name: "Week 4", score: 78, gpa: 3.4 },
  { name: "Week 5", score: 92, gpa: 3.7 },
  { name: "Week 6", score: 95, gpa: 3.82 },
];

interface GradesChartProps {
  lang: Language;
}

export function GradesChart({ lang }: GradesChartProps) {
  return (
    <div className="w-full h-[400px] glass rounded-3xl p-8 border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <span className="text-8xl font-display font-black tracking-tighter">GPA</span>
      </div>
      
      <div className="mb-8">
        <h3 className="text-2xl font-display">{lang === "en" ? "Term Performance" : "الأداء الدراسي"}</h3>
        <p className="text-white/40 text-sm">{lang === "en" ? "Cumulative GPA projection over 6 weeks" : "توقعات المعدل التراكمي خلال 6 أسابيع"}</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={[0, 4]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(18, 18, 18, 0.9)", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)"
            }}
            itemStyle={{ color: "#BEF264" }}
          />
          <Area 
            type="monotone" 
            dataKey="gpa" 
            stroke="#8B5CF6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorGpa)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
