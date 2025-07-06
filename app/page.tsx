import BalanceCard from '../components/BalanceCard';
import EarningsCard from '../components/EarningsCard';
import HistoryCard from '../components/HistoryCard';
import SocialCard from '../components/SocialCard';

export default function Home() {
  return (
    <>
      <BalanceCard />
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <EarningsCard />
        <div className="flex flex-col flex-1">
          <HistoryCard />
          <div className="mt-4">
            <SocialCard />
          </div>
        </div>
      </div>
    </>
  );
}
