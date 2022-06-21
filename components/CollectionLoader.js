import { LightningBoltIcon } from '@heroicons/react/solid'

function CollectionLoader() {
  return (
    <div className='flex flex-col items-center justify-center text-center h-full space-y-6'>
      <div className='h-9 w-9 animate-pulse'>
        <LightningBoltIcon className='relative'/>
      </div>
    </div>
  )
}

export default CollectionLoader