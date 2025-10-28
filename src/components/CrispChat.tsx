// components/CrispChat.tsx
'use client';

import { useEffect } from 'react';

// types/crisp.d.ts
declare global {
  interface Window {
    $crisp: null[];
    CRISP_WEBSITE_ID: string;
  }
}

export {};

interface CrispChatProps {
  websiteId: string;
}

export default function CrispChat({ websiteId }: CrispChatProps): null {
  useEffect(() => {
    // مقداردهی اولیه
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = websiteId;

    // ایجاد و اضافه کردن اسکریپت
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    d.head.appendChild(s);

    return () => {
      // پاک‌سازی
      const crispScript = document.querySelector(
        'script[src="https://client.crisp.chat/l.js"]'
      );
      if (crispScript) {
        crispScript.remove();
      }
    };
  }, [websiteId]);

  return null;
}