'use client'
import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { colors } from '../lib/colors';
import type { BarProps } from 'recharts';

// Mock data for each tab
const dataByTab: Record<string, Array<{ day: string; deposit: number; earned: number }>> = {
  '1W': [
    { day: 'Sun', deposit: 4000, earned: 124.43 },
    { day: 'Mon', deposit: 3000, earned: 98.14 },
    { day: 'Tue', deposit: 2000, earned: 243.43 },
    { day: 'Wed', deposit: 2780, earned: 156.32 },
    { day: 'Thu', deposit: 1890, earned: 187.65 },
    { day: 'Fri', deposit: 2390, earned: 165.21 },
    { day: 'Sat', deposit: 3490, earned: 198.76 },
  ],
  '1M': [
    { day: 'W1', deposit: 10000, earned: 500.12 },
    { day: 'W2', deposit: 12000, earned: 650.45 },
    { day: 'W3', deposit: 9000, earned: 430.22 },
    { day: 'W4', deposit: 15000, earned: 800.67 },
  ],
  '1Y': [
    { day: 'Jan', deposit: 40000, earned: 2000.12 },
    { day: 'Feb', deposit: 35000, earned: 1800.45 },
    { day: 'Mar', deposit: 42000, earned: 2100.22 },
    { day: 'Apr', deposit: 39000, earned: 1950.67 },
    { day: 'May', deposit: 41000, earned: 2050.33 },
    { day: 'Jun', deposit: 43000, earned: 2150.88 },
    { day: 'Jul', deposit: 44000, earned: 2200.11 },
    { day: 'Aug', deposit: 42000, earned: 2100.77 },
    { day: 'Sep', deposit: 41000, earned: 2050.55 },
    { day: 'Oct', deposit: 40000, earned: 2000.99 },
    { day: 'Nov', deposit: 45000, earned: 2250.44 },
    { day: 'Dec', deposit: 46000, earned: 2300.12 },
  ],
};

const tabs = ['1W', '1M', '1Y'];

const CustomActiveBar = (props: any) => {
  const { x, y, width, height, radius } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius || 4}
      fill="#3898ec" // Slightly different from #2774CC for hover
      style={{ cursor: 'pointer' }}
    />
  );
};

const EarningsCard = () => {
  const [activeTab, setActiveTab] = useState('1W');

  const data = dataByTab[activeTab];
  const totalEarned = data.reduce((sum: number, item: { earned: number }) => sum + item.earned, 0);

  return (
    <div className="w-full md:w-[580px] rounded-2xl bg-[#121720] border border-[#1C2431] p-4 backdrop-blur-xl">
      {/* Header with tabs and total */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <div key={tab} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] rounded-full blur ${
                activeTab === tab ? 'opacity-75' : 'opacity-0 group-hover:opacity-75'
              } transition duration-1000 group-hover:duration-200`}></div>
              <button
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-full bg-[#121720] ${
                  activeTab === tab ? 'text-white' : 'text-[#8FA5B3] hover:text-white'
                } font-medium`}
              >
                {tab}
              </button>
            </div>
          ))}
        </div>
        <div className="px-3 py-1 rounded-full bg-[#24FF9B] text-black text-sm font-medium">
          +${totalEarned.toFixed(2)} earned
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.textSecondary }}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderInner}`,
                borderRadius: '12px',
              }}
            />
            <Bar
              dataKey="deposit"
              fill="#2774CC"
              opacity={1.5}
              radius={4}
              activeBar={<CustomActiveBar />}
            />
            <Line
              type="monotone"
              dataKey="earned"
              stroke="#24FF9B"
              strokeWidth={2}
              dot={{ fill: "#2774CC", r: 4 }}
              activeDot={{ r: 6 }}
            />
            {/* {data.map((entry, index) => (
              <text
                key={`label-${index}`}
                x={index * (100 / data.length) + (100 / data.length / 2)}
                y={280 - entry.earned * 0.8}
                textAnchor="middle"
                fill="#44FBDE"
                fontSize={12}
              >
                {entry.earned.toFixed(2)}
              </text>
            ))} */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Pills for mobile (below chart) */}


      {/* KPI Pills for desktop (bottom row) */}
      <div className="hidden md:flex justify-between mt-6">
        {data.map((item: { day: string; deposit: number; earned: number }) => (
          <div
            key={item.day}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] rounded-full blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-3 py-1 rounded-full bg-[#0E141F] text-[#44FBDE] text-sm">
              +{item.earned.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsCard; 