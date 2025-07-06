'use client'
import { useState } from 'react';
import Image from 'next/image';
import { colors } from '../lib/colors';

const tabs = ['ID', '1W', '1M', '1Y'];

const transactionsByTab: Record<string, Array<{ type: string; amount: string; value: string }>> = {
  'ID': [
    { type: 'Deposit', amount: '1,324', value: '$1,324.00' },
    { type: 'Withdraw', amount: '500', value: '$500.00' },
    { type: 'Deposit', amount: '200', value: '$200.00' },
  ],
  '1W': [
    { type: 'Deposit', amount: '1,324', value: '$1,324.00' },
    { type: 'Withdraw', amount: '500', value: '$500.00' },
    { type: 'Deposit', amount: '200', value: '$200.00' },
  ],
  '1M': [
    { type: 'Deposit', amount: '2,000', value: '$2,000.00' },
    { type: 'Withdraw', amount: '1,000', value: '$1,000.00' },
    { type: 'Deposit', amount: '1,324', value: '$1,324.00' },
    { type: 'Deposit', amount: '500', value: '$500.00' },
  ],
  '1Y': [
    { type: 'Deposit', amount: '10,000', value: '$10,000.00' },
    { type: 'Withdraw', amount: '2,000', value: '$2,000.00' },
    { type: 'Deposit', amount: '5,000', value: '$5,000.00' },
    { type: 'Deposit', amount: '1,324', value: '$1,324.00' },
    { type: 'Withdraw', amount: '1,000', value: '$1,000.00' },
  ],
};

const HistoryCard = () => {
  const [activeTab, setActiveTab] = useState('ID');

  const transactions = transactionsByTab[activeTab];

  return (
    <div className="w-full md:w-[500px] h-[360px] rounded-[24px] bg-[#121720] border border-[#1C2431] p-4 backdrop-blur-xl">
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

      {/* Transaction List */}
      <div className="overflow-y-auto" style={{ maxHeight: '220px' }}>
        {transactions.map((tx, index) => (
          <>
            <div key={index} className="flex items-center gap-4 py-2">
              <Image
                src="/usdc.png"
                alt="USDC"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="text-white text-base font-semibold">
                  {tx.type} {tx.amount} USDC
                </p>
                <p className="text-[#8FA5B3] text-sm">{tx.value}</p>
              </div>
            </div>
            {index < transactions.length - 1 && (
              <hr className="border-[#23243a] my-1" />
            )}
          </>
        ))}
      </div>

      {/* Show All Button */}
      <div className="relative group mt-4">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] rounded-full blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <button className="relative w-full px-4 py-2 rounded-full bg-[#121720] text-white hover:bg-[#4B615A] transition-colors">
          Show all
        </button>
      </div>
    </div>
  );
};

export default HistoryCard; 