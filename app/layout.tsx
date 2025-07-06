import '../styles/globals.css';
import '../styles/fonts.css';

import { AppKitProvider } from '../components/AppKitProvider';
import ContextProvider from '../context';
import { SWRProvider } from '../components/SWRProvider';
import { headers } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');
  return (
    <html lang="en">
      <body>
        <AppKitProvider>
          <ContextProvider cookies={cookies}>
            <SWRProvider>
              {children}
            </SWRProvider>
          </ContextProvider>
        </AppKitProvider>
      </body>
    </html>
  );
}
