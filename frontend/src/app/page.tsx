import Link from "next/link";
import AnimatedContainer from "../components/AnimatedContainer";

export default async function Home() {

  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/views`);
  const views = await res.json()

  console.log(views)

  return (
    <AnimatedContainer>
      <div className="h-screen flex items-center justify-center flex-col ">
        <h1 className="text-[2.5rem] md:text-[3rem] Morabba">ویزیت می</h1>
        <p className="text-[1rem] md:text-[1.2rem] text-center">
          اپلیکیشن هوشمند رزرواسیون آنلاین دکتر
        </p>
        <p className="text-[.8rem] md:text-[1rem] mt-1 text-zinc-600 text-center">
          از بین گزینه های زیر میتوانید نقش خود را در ویزیت می انتخاب کنید !
        </p>
        <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
          <div className="flex items-center justify-center flex-col rounded-2xl w-full md:w-[25rem] border-1 border-zinc-200 shadow-xl shadow-zinc-200 p-5">
            <img
              src="/images/Hospital patient-bro.svg"
              alt=""
              className="size-[7rem] md:size-[15rem]"
            />
            <p>بیمار هستم</p>
            <Link
              href="/sickLogin"
              className="bg-secondryLight hover:bg-secondry hover:text-white duration-300 mt-2 w-full text-center px-5 py-2 rounded-lg text-[.8rem] "
            >
              انتخاب
            </Link>
          </div>
          <div className="flex items-center justify-center flex-col rounded-2xl w-full md:w-[25rem] border-1 border-zinc-200 shadow-xl shadow-zinc-200 p-5">
            <img
              src="/images/Health professional team-bro (1).svg"
              alt=""
              className="size-[7rem] md:size-[15rem]"
            />
            <p>دکتر هستم</p>
            <Link
              href="/drLogin"
              className="bg-primaryLight hover:bg-primary hover:text-white duration-300 mt-2 w-full text-center px-5 py-2 rounded-lg text-[.8rem] "
            >
              انتخاب
            </Link>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
