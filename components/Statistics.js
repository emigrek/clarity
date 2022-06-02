import { useGlobalState } from '../state'
import _ from 'lodash';

function Statistics() {
    const [responseTimes] = useGlobalState("responseTimes");

    const averageResponseTime = () => {
        if(responseTimes.length)
            return _.round(_.sum(responseTimes)/responseTimes.length, 2);
    }

    if(responseTimes.length)
        return (
            <div className="flex flex-row space-x-1 items-center justify-center text-center text-sm mt-1 opacity-20 font-light">
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