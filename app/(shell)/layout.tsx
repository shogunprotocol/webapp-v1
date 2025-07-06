import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-radial from-[#020409] to-[#0E141F] text-white">
      <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </div>
    </main>
  );
} 