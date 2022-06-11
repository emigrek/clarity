import { LightningBoltIcon } from '@heroicons/react/solid'

function CollectionLoader() {
  return (
    <div className='flex flex-col items-center justify-center text-center h-full space-y-6'>
        <div className='h-6 w-6 animate-ping duration-1000'>
            <LightningBoltIcon className='relative'/>
        </div>
    </div>
  )
}

export default CollectionLoader