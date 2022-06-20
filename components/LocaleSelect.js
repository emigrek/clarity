import { setGlobalState, useGlobalState } from '../state'
import dynamic from 'next/dynamic'
import app from '../modules/app';

const Select = dynamic(
    () => import('react-select').then((mod) => mod.default),
    {
      ssr: false,
      loading: () => null,
    },
  );

function LocaleSelect() {
    const [locale] = useGlobalState("locale");
    const [locales] = useGlobalState("locales");

    const handleLocaleChange = (v) => {
        const choosen =  {
            code: v.value,
            language: v.label
        };

        setGlobalState("locale", choosen);
        app.saveLocale(choosen);
    }

    return (
        <div className="flex flex-col space-y-2 items-center">
            <Select className="bg-black text-black cursor-pointer" onChange={handleLocaleChange} value={
                    {
                        value: locale.code,
                        label: locale.language
                    }
                } options={locales ? 
                locales.map((locale) => {
                    return {
                        value: locale.code,
                        label: locale.language
                    }
            }) : []}/>
        </div>
    )
}

export default LocaleSelect