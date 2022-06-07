import { useEffect } from 'react';
import { useGlobalState } from '../state'
import ddragon from '../modules/ddragon';

function Collection() {
    const [locale] = useGlobalState("locale");
    const [version] = useGlobalState("version");
    const [champions] = useGlobalState("champions");

    useEffect(() => {
        if(!version) return;
        ddragon.getChampions(version, locale);
    }, [locale]);

    useEffect(() => {
      if(!champions) return;
      console.log(champions);
    }, [champions]);

    return (
        <div className="flex flex-col align-middle justify-center">
            Collection
        </div>
    )
}

export default Collection