"use client"
import dynamic from 'next/dynamic';
import NoSSR from '../Components/noSSR';

// Dynamically import with no SSR
const MainApp = dynamic(() => import('../Components/MainApp'), {
  ssr: false,
  loading: () => <div style={{ padding: '2rem', textAlign: 'center' }}>Loading E-Commerce App...</div>
});

export default function Home() {
  return (
    <NoSSR>
      <MainApp />
    </NoSSR>
  );
}
