import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100 px-6 py-4 ">
        <div className="max-w-screen-2xl  mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold ">Unsplash Demo Gallery</h1>
          <span className="text-sm text-gray-400">50 photos loaded</span>
        </div>
      </header>
     
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

        </div>
      </main>
    </div>
  );
}
