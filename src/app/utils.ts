function randomItem<T>(arr:T[]){
    let random_index = Math.floor(Math.random() * arr.length);
    return arr[random_index];
}

function shuffle<T>(array:T[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

function wait(ms: number){
    return new Promise ((resolve, reject) => {
        window.setTimeout(resolve, ms);
    })
}



export {randomItem, shuffle, wait};