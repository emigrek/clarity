import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from '../state'

function LocaleSelect() {
    const [locale] = useGlobalState("locale");
    const [locales] = useGlobalState("locales");

    const handleLocaleChange = (e) => {
        setGlobalState("locale", e.target.value);
    };

    useEffect(() => {
        var browserLang = navigator.language.replace("-", "_");
        setGlobalState("locale", browserLang);
    }, []);

    return (
        <div className="flex items-center rounded-full p-2 md:p-4 hover:bg-black hover:bg-opacity-40 cursor-pointer">
            {
                locales && (
                    <select onChange={handleLocaleChange} defaultValue={locale} className="outline-none bg-transparent focus:bg-black rounded-full">
                        {
                            locales.map((l) => <option key={l} value={l}>{l}</option>)
                        }
                    </select>
                )
            }
        </div>
    )
}

export default LocaleSelect