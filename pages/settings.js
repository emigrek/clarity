import LocaleSelect from '../components/LocaleSelect';
import Image from 'next/image';
import Progress from '../components/Progress';

function Settings() {
    return (
        <div className='flex flex-col justify-center space-y-8 items-center opacity-100'>
            <div className='block md:hidden'>
                <Progress/>
            </div>
            <div className='flex flex-col space-y-4 text-center'>
                <span className='text-xl'>Language</span>
                <LocaleSelect/>
            </div>
            <a href="https://github.com/emigrek/spellz" target="_blank" rel="noopener noreferrer">
                <div className="relative w-16 h-16">
                    <Image layout="fill" src={'/github.png'}/>
                </div> 
            </a>
        </div>
    )
}

export default Settings