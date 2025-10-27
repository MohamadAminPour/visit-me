import jalaali from "jalaali-js";

export function PersianDate(date?: string | Date) {
  if (!date) return "";

  // اطمینان از اینکه ورودی از نوع Date هست
  const d = typeof date === "string" ? new Date(date) : date;

  const jDate = jalaali.toJalaali(d);

  // نام ماه‌ها و روزهای هفته به فارسی
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const weekdays = [
    "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهار‌شنبه", "پنج‌شنبه", "جمعه", "شنبه"
  ];

  const dayName = weekdays[d.getDay()];
  const monthName = months[jDate.jm - 1];
  const persianDate = `${dayName}-${monthName}-${jDate.jy}`;

  return persianDate;
}
