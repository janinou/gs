type ControlsProps = {
    pauseStatus: Boolean,
    gameStatus:GameStatus,
    launchGame: (p: GameType) => void,
    stopGame:() => void,
    pauseGame:() => void,
}

export default function Controls({pauseStatus, gameStatus, launchGame, pauseGame, stopGame}:ControlsProps){
    const pauseStatusWording = pauseStatus ? 'En pause' :  '' ;
    const pauseButtonWording = pauseStatus ? 'Reprendre' : 'Mettre en pause';

    return(
        <div className="inline"> 
            <span>{pauseStatusWording}</span>
            {
                (gameStatus !== 'started') ? 
                <div className="inline-block">
                    <PrimaryButton color='blue' onClick={() => launchGame('addition')} wording='Additions'/>
                    <PrimaryButton color='blue' onClick={() => launchGame('letters')} wording='Lettres'/>
                    <PrimaryButton color='blue' onClick={() => launchGame('syllabes')} wording='Syllabes'/>
                </div>
                :<div className="inline-block">
                <PrimaryButton color='blue' onClick={() => pauseGame()} wording={pauseButtonWording}/>
                    <PrimaryButton color='blue' onClick={() => stopGame()} wording='Arrêter'/>

                </div>

            }

        </div>
    )
}

function PrimaryButton({onClick, wording, color}: { onClick:()=> void, wording:string, color:string}){
    return (
        <button onClick={onClick} className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded-full m-4 inline-block`}> 
            {wording}
        </button>
    )
}