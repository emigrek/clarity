import { setGlobalState, useGlobalState } from '../state'
import _ from 'lodash';

function Statistics() {
    const [responseTimes] = useGlobalState("responseTimes");

    const averageResponseTime = () => {
        if(responseTimes.length)
            return _.round(_.sum(responseTimes)/responseTimes.length, 2);
    }

    if(responseTimes.length)
        return (
            <div onClick={() => setGlobalState('responseTimes', [])} className="flex flex-row space-x-2 items-center justify-center text-center text-sm mt-1 opacity-20 font-light select-none cursor-pointer">
                <div>
                    correct: <span>{responseTimes.length}</span>
                </div>
                <div>
                    last: <span>{_.round(responseTimes[0]/1000, 2)}s</span>
                </div>
                <div>
                    avg: <span>{_.round(averageResponseTime()/1000, 2)}s</span>
                </div>
            </div>
        )
}

export default Statistics