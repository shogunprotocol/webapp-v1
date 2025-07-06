export interface ThoughtLog {
  id: number;
  cid: string;
  strategy: string;
  reason: string;
  updated_at: string;
  amount: string;
  risk_level: string;
}

export async function getThoughtLogs(limit: number = 50): Promise<ThoughtLog[]> {
  try {
    const response = await fetch('/api/thoughts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching thought logs:', error);
    return [];
  }
} 