'use client'
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { colors } from '../lib/colors';

const data = [
  { day: 'Sun', deposit: 4000, earned: 2400 },
  { day: 'Mon', deposit: 3000, earned: 1398 },
  { day: 'Tue', deposit: 2000, earned: 9800 },
  { day: 'Wed', deposit: 2780, earned: 3908 },
  { day: 'Thu', deposit: 1890, earned: 4800 },
  { day: 'Fri', deposit: 2390, earned: 3800 },
  { day: 'Sat', deposit: 3490, earned: 4300 },
];

const tabs = ['ID', '1W', '1M', '1Y'];

const ChartCard = () => {
  const [activeTab, setActiveTab] = useState('ID');

  return (
    <div className="w-full md:w-[580px] h-[360px] rounded-[24px] bg-[#121720] border border-[#1C2431] p-4 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
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

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.textSecondary }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderInner}`,
                borderRadius: '12px',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
            <Bar
              dataKey="deposit"
              stackId="a"
              fill={colors.depositBar}
              name="Deposit"
            />
            <Bar
              dataKey="earned"
              stackId="a"
              fill={colors.earnedBar}
              name="Earned"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard; 