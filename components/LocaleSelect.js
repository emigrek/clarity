import { setGlobalState, useGlobalState } from '../state'
import app from '../modules/app';
import Select from 'react-select';

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