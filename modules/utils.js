const syncSeen = (champions) => {
    var seen = JSON.parse(localStorage.getItem("discovered")) || [];

    champions.forEach(champion => {
      if(seen.includes(champion.passive.image.full.slice(0, -4)))
        champion.passive.seen = true;
      else champion.passive.seen = false;
      
      champion.spells.forEach(spell => {
        if(seen.includes(spell.image.full.slice(0, -4)))
          spell.seen = true;
        else spell.seen = false;
      });
    })
}

export default {
    syncSeen
}