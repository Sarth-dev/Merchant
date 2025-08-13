"use client"
import { useState, useEffect } from 'react';

export default function NoSSR({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
