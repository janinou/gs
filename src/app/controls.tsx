type ControlsProps = {
    pauseStatus: Boolean,
    gameStatus:GameStatus,
    launchGame: (p: GameType) => void,
    stopGame:() => void
}

export default function Controls({pauseStatus, gameStatus, launchGame, stopGame}:ControlsProps){
    const pauseStatusWording = pauseStatus ? 'En pause' :  '' ;

    return(
        <div> 
            <span>{pauseStatusWording}</span>
            { (gameStatus !== 'started') ? 
                <div>
                    <ControlsButton onClick={() => launchGame('addition')} wording='Lancer les maths'/>
                    <ControlsButton onClick={() => launchGame('letters')} wording='Lancer les lettres'/>
                </div>
                :<ControlsButton onClick={() => stopGame()} wording='Arrêter le jeu'/>
            }

        </div>
    )
}

function ControlsButton({onClick, wording}: { onClick:()=> void, wording:string}){
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> 
            {wording}
        </button>
    )
}