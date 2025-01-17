interface Window {
  gtag: (
    command: 'consent' | 'config' | 'event',
    targetId: string,
    config?: {
      [key: string]: any;
    }
  ) => void;
} 