'use client';

import useSWR from 'swr';
import { format, parseISO } from 'date-fns';
import { ExternalLink, Brain } from 'lucide-react';
import { getThoughtLogs, type ThoughtLog } from '../../../lib/tableland';

const fetcher = async (): Promise<ThoughtLog[]> => {
  return await getThoughtLogs(50);
};

function formatTimestamp(timestamp: string): string {
  try {
    return format(parseISO(timestamp), 'dd MMM yy · HH:mm UTC');
  } catch {
    return timestamp;
  }
}

function formatAmount(amount: string): string {
  try {
    const num = parseFloat(amount);
    return num.toFixed(2);
  } catch {
    return amount;
  }
}

function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel?.toUpperCase()) {
    case 'LOW':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'MED':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'HIGH':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

function shortenAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ThoughtsPage() {
  const { data: thoughts, error, isLoading } = useSWR<ThoughtLog[]>('thoughts', fetcher, {
    refreshInterval: 60000, // Poll every 60 seconds
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen text-white">
        <div className="max-w-4xl mx-auto w-full px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5FFBF1]"></div>
              <p className="text-[#8FA5B3] font-aeonik">Loading thoughts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white bg-[#0E141F]">
        <div className="max-w-4xl mx-auto w-full px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-2xl">
              <p className="text-red-400 font-aeonik text-lg mb-4">Error loading thoughts</p>
              <div className="bg-[#181D23] border border-[#1C2431] rounded-xl p-6 text-left">
                <p className="text-[#B6C2D6] text-sm font-aeonik mb-2">
                  <strong>Error:</strong> {error.message}
                </p>
                {error.details && (
                  <p className="text-[#8FA5B3] text-xs font-mono mb-2">
                    <strong>Details:</strong> {error.details}
                  </p>
                )}
                {error.endpoint && (
                  <p className="text-[#8FA5B3] text-xs font-mono mb-2">
                    <strong>Endpoint:</strong> {error.endpoint}
                  </p>
                )}
                {error.query && (
                  <p className="text-[#8FA5B3] text-xs font-mono">
                    <strong>Query:</strong> {error.query}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain size={32} className="text-[#5FFBF1]" />
            <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-basement)' }}>
              Thoughts
            </h1>
          </div>
          <a
            href="https://calibration.filfox.info/en/address/0x9f03F83F092D025635AeA1800E6AB3c9f0882673"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#232A36] text-white font-medium border border-[#1C2431] hover:bg-[#1C2431] transition-all duration-200"
            style={{ fontFamily: 'var(--font-basement)' }}
          >
            <ExternalLink size={16} />
            View on Explorer
          </a>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5FFBF1] to-transparent"></div>

          {!thoughts || thoughts.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Brain size={48} className="text-[#8FA5B3] mx-auto mb-4" />
                <p className="text-[#8FA5B3] font-aeonik">No thoughts yet</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {thoughts.map((thought: ThoughtLog, index: number) => (
                <div key={thought.id} className="relative flex items-start gap-4 group">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#181D23] border-2 border-[#5FFBF1] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#5FFBF1]"></div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-[#181D23] border border-[#1C2431] rounded-xl p-6 hover:border-[#232A36] transition-all duration-200">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[#8FA5B3] font-aeonik">
                          {formatTimestamp(thought.updated_at)}
                        </span>
                        <span className="text-sm text-[#5FFBF1] font-mono">
                          {shortenAddress(thought.strategy)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white font-basement">
                          {formatAmount(thought.amount)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(thought.risk_level)}`}>
                          {thought.risk_level}
                        </span>
                      </div>
                    </div>

                    {/* Reason */}
                    {thought.reason && (
                      <p className="text-[#B6C2D6] text-sm leading-relaxed mb-4 font-aeonik">
                        {thought.reason}
                      </p>
                    )}

                    {/* CID Link */}
                    <div className="flex items-center justify-between">
                      <a
                        href={`https://dweb.link/ipfs/${thought.cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#5FFBF1] hover:text-[#24FF9B] transition-colors text-sm font-aeonik"
                        title={`View IPFS content: ${thought.cid}`}
                        onClick={(e) => {
                          // Add a small delay to show the user the link is being opened
                          e.currentTarget.style.opacity = '0.7';
                          setTimeout(() => {
                            e.currentTarget.style.opacity = '1';
                          }, 200);
                        }}
                      >
                        <ExternalLink size={14} />
                        View CID
                      </a>
                      <span className="text-xs text-[#8FA5B3] font-mono">
                        #{thought.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 