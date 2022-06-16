import Champion from './Champion';

function ChampionGrid({ collection }) {
  return (
    <div className="grid grid-cols-6 gap-1 md:gap-6 p-2">
      {
        collection.map((champion) => (
          <Champion key={champion.id} champion={champion}/>
        ))
      }
    </div>
  )
}

export default ChampionGrid