import app from '../modules/app';
import { setGlobalState, useGlobalState } from '../state';
import { Line } from 'rc-progress';

function Progress() {
    const [progress] = useGlobalState("progress");
    const [champions] = useGlobalState("champions");


    const handleProgressClear = () => {
        setGlobalState("discovered", []);
        setGlobalState("recent", []);
        localStorage.setItem("discovered", JSON.stringify([]));
        app.syncSeen(champions);
    }

    return (
        <div className='flex flex-col align-middle items-center select-none'>
            <div className='text-xs font-mono uppercase'>
                Progress
            </div>
            <div className='font-bold -mt-2 text-4xl'>
                {progress}%
            </div>
            <div className='w-full'>
                <Line className='rounded-lg' strokeLinecap='butt' percent={progress} strokeWidth={15} trailWidth={15} trailColor="#000000aa" strokeColor="white" />
            </div>
        </div>
    )
}

export default Progress