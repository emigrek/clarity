function ChampionLoader() {
  return (
    <div className='bg-zinc-800 absolute z-40 top-0 left-0 w-full rounded-lg px-8 py-6 flex flex-col select-none space-y-4'>
        <div className='flex items-center justify-between px-4 space-x-6'>
            <div className='text-lg font-medium w-16 h-6 rounded-md bg-black bg-opacity-50 animate-pulse'>
            </div>
            <div className="relative w-14 h-14 bg-black bg-opacity-50 rounded-md shadow-lg animate-pulse">
            </div>
        </div>
        <div className='flex flex-row items-center justify-center space-x-1 rounded-xl px-2 py-6 bg-black bg-opacity-50'>
            <div className='relative h-8 w-8 shadow-lg rounded-lg bg-black animate-pulse'>
            </div>
            <div className='relative h-8 w-8 shadow-lg rounded-lg bg-black animate-pulse'>
            </div>
            <div className='relative h-8 w-8 shadow-lg rounded-lg bg-black animate-pulse'>
            </div>
            <div className='relative h-8 w-8 shadow-lg rounded-lg bg-black animate-pulse'>
            </div>
        </div>
    </div>
  )
}

export default ChampionLoader