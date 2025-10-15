// File: nextjs-client/src/components/providers.tsx
'use client';

import { AppProvider } from '@/context/AppContext';
import { ReactNode } from 'react'; // Import ReactNode

// Define the Props interface
interface Props {
  children: ReactNode;
}

// Apply the interface to your component's props
export function Providers({ children }: Props) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}