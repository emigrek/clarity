import { setGlobalState, useGlobalState } from '../state'
import dynamic from 'next/dynamic'

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
        setGlobalState("locale", {
            code: v.value,
            language: v.label
        })
    }

    return (
        <div className="flex items-center hover:bg-black hover:bg-opacity-40 cursor-pointer">
            <Select className="bg-black text-black" onChange={handleLocaleChange} value={
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