import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center text-white h-[44vh] p-5 md:p-0 flex-col items-center gap-4">
        <div className="md:text-5xl text-2xl flex justify-center items-center gap-4 font-bold">Buy me a chai <span><img className="invertimg " src="/tea.gif" width={84} alt="" /></span></div>
        <p>A crowdfunding platform for creators to fund their projects. </p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Hare</button>
          </Link>
          <Link href={"/About"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-2 opacity-5">
      </div>
      <div className="text-white container mx-auto py-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Now you can create anything</h2>
        <div className="flex gap-3 md:gap-4 justify-around">
          <div className="item space-y-3 flex flex-col items-center ">
            <img className="bg-slate-400 rounded-full p-2 text-black" src="/man.gif" width={88} alt="" />
            <p className="font-bold">Fans wanted to help</p>
            <p className=" text-center">Fans are available for you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center ">
            <img className="bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" width={88} alt="" />
            <p className="font-bold text-sm md:text-xl">Fans wanted to help</p>
            <p className=" text-center">Fans are available for you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center ">
            <img className="bg-slate-400 rounded-full p-2 text-black" src="/group.gif" width={88} alt="" />
            <p className="font-bold">Fans wanted to help</p>
            <p className=" text-center">Fans are available for you</p>
          </div>

        </div>
      </div>

      <div className="bg-white h-2 opacity-5">
      </div>

      <div className="text-white container mx-auto md:py-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="md:text-3xl text-2xl font-bold text-center mb-14">Learn More About Us</h2>
        <span >
          <iframe width="350" height="215" src="https://www.youtube.com/embed/p5dXv_FN4AA?si=HCkOh65p4OIacZxz" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </span>
      </div>
    </>
  );
}


export const metadata = {
  title: "Home - Get Me A Chai",
};

