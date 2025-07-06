import '../styles/globals.css';
import '../styles/fonts.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { Inter, Orbitron } from 'next/font/google';
import ContextProvider from '../context';
import { headers } from 'next/headers';
import { AppKitProvider } from '../components/AppKitProvider';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata = {
  title: 'Shōgun DeFi',
  description: 'Shōgun DeFi Dashboard',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <body style={{opacity: 1}} >
        <AppKitProvider>
        <ContextProvider cookies={cookies}>
        <main
        className="min-h-screen bg-gradient-radial from-[#020409] to-[#0E141F] text-white"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #020409 0%, #0E141F 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
      </main>
        </ContextProvider>
        </AppKitProvider>
      </body>
    </html>
  );
}
