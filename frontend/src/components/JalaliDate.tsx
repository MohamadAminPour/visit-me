import jalaali from "jalaali-js";

export default function JalaliDate(gregorianDate:any){
  let date: Date;

  if (gregorianDate) {
    // اگر تاریخ ورودی هست، از اون استفاده کن
    const [year, month, day] = gregorianDate.split(" ")[0].split("-");
    date = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    // در غیر این صورت از تاریخ امروز استفاده کن
    date = new Date();
  }

  const { jy, jm, jd } = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  return `${jy}/${jm.toString().padStart(2, "0")}/${jd
    .toString()
    .padStart(2, "0")}`;
}
