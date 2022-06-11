import dynamic from 'next/dynamic';

const Champion = dynamic(() => import('../components/Champion'), {
  ssr: false
});

function ChampionGrid({ collection }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-2">
      {
        collection.map((champion) => (
          <Champion key={champion.id} champion={champion}/>
        ))
      }
    </div>
  )
}

export default ChampionGrid