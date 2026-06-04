
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100 px-6 py-4 ">
        <div className="max-w-screen-2xl  mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold ">Unsplash Demo Gallery</h1>
          <span className="text-sm text-gray-400">50 photos loaded</span>
        </div>
      </header>
     
      <main className=" max-w-screen-2xl
      flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black 
      sm:items-start">
        <div>Massonrt</div>
        <div>Loading</div>
        <p className="text-center text-sm text-gray-400 py-8">End of list</p>

      </main>
    </div>
  );
}
