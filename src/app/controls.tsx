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
                    <PrimaryButton onClick={() => launchGame('addition')} wording='Additions'/>
                    <PrimaryButton onClick={() => launchGame('letters')} wording='Lettres'/>
                    <PrimaryButton onClick={() => launchGame('syllabes')} wording='Syllabes'/>
                </div>
                :<div className="inline-block">
                <PrimaryButton onClick={() => pauseGame()} wording={pauseButtonWording}/>
                    <PrimaryButton onClick={() => stopGame()} wording='Arrêter'/>

                </div>

            }

        </div>
    )
}

function PrimaryButton({onClick, wording}: { onClick:()=> void, wording:string}){
    return (
        <button onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4 inline-block`}> 
            {wording}
        </button>
    )
}