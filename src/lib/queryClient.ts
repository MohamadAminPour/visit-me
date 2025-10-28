"use client";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // ۵ دقیقه داده تازه در نظر گرفته می‌شود
      gcTime: 1000 * 60 * 5, // 5 دقیقه بعد از بیکار شدن، از حافظه حذف میشه
      retry: 1, // فقط یک‌بار تلاش مجدد در خطا
      refetchOnWindowFocus: false, // وقتی تب فعال میشه، دوباره فراخوانی نکن
    },
    mutations: {
      retry: 1,
    },
  },
});
