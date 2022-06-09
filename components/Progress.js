import app from '../modules/app';
import { setGlobalState, useGlobalState } from '../state';

function Progress() {
    const [progress] = useGlobalState("progress");
    const [champions] = useGlobalState("champions");


    const handleProgressClear = () => {
        setGlobalState("discovered", []);
        localStorage.setItem("discovered", JSON.stringify([]));
        app.syncSeen(champions);
    }

    return (
        <div className='flex flex-col align-middle items-center select-none'>
            <div className='text-xs mt-1 font-mono uppercase'>
                Progress
            </div>
            <div className='font-bold -mt-2 text-4xl'>
                {progress}%
            </div>
            {
                progress > 0 && (
                    <div onClick={handleProgressClear} className='rounded-md shadow-lg text-xs opacity-40 hover:opacity-100 hover:bg-red-700 transition-colors duration-500 cursor-pointer p-1 bg-white text-black'>
                        tap to clear
                    </div>
                )
            }
        </div>
    )
}

export default Progress