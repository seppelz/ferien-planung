"use client";

import React, { useEffect } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  // Remove browser extension attributes after hydration
  useEffect(() => {
    const html = document.documentElement;
    if (html.hasAttribute('data-lt-extension-installed')) {
      html.removeAttribute('data-lt-extension-installed');
    }
    if (html.hasAttribute('data-lt-installed')) {
      html.removeAttribute('data-lt-installed');
    }
  }, []);

  return (
    <main>
      {children}
    </main>
  );
} 