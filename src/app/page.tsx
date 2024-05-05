'use client';

import { useEffect, useState } from "react";
import Controls from "./controls";
import Content from "./displayed-content";
import { getMaximumTurnIndex } from "./pedagogical-content";


export default function Game() {
    let [gameStatus, setGameStatus] = useState<GameStatus>('not_started');
    let [gameType, setGameType] = useState<GameType>();

    let [turnNumber, setTurnNumber] = useState<number>(0);
    let [isPaused, setPaused] = useState(false);


    useEffect(() => {
        const triggerPauseIfSpacePressed = (e:KeyboardEvent) => keyIsSpace(e) && setPaused(!isPaused)
        window.addEventListener('keyup', triggerPauseIfSpacePressed )
        return () => window.removeEventListener( 'keyup', triggerPauseIfSpacePressed)
    }, [isPaused]);

    const launchGame = (gameType:GameType) => {
        if (gameStatus === 'not_started'){
            setGameStatus('started');
            setGameType(gameType);
        }
    }

    const stopGame = () => {
        setGameStatus('not_started');
        setGameType(undefined);
        setTurnNumber(0);
    }

    const setNextTurn = () => {
        let nextTurnNumber = turnNumber + 1
        if (isLastRound(gameType as GameType, nextTurnNumber)) 
            setGameStatus('done');
        else
            setTurnNumber(nextTurnNumber)
    }

    async function waitIfPaused(){
        return new Promise<void>( async (resolve) => {
            if (isPaused){
                await keyIsPressed('space');
            }
            resolve();
        })
    }

    async function forceNextStage(){
        return await keyIsPressed('enter');
    }


  return (
        <div>
            <span>{gameStatus} {turnNumber}</span>

            <Controls pauseStatus={isPaused} gameStatus={gameStatus} launchGame={launchGame} stopGame={stopGame}/>
            { 
                ((gameStatus === 'started') && (gameType !== undefined))?
                    <Content 
                        gameType={gameType} 
                        turnNumber={turnNumber} 
                        setNextTurn={setNextTurn} 
                        playSound={playSound} 
                        waitIfPaused={waitIfPaused} 
                        forceNextStage={forceNextStage}
                        />
                    :null
            }
            
            <audio id="ding" src="audio/ding.wav"></audio>
            <audio id="explosion" src="audio/explosion.wav"></audio>
            <audio id="boomerang" src="audio/boomerang.wav"></audio>
            <audio id="whoosh" src="audio/whoosh.wav"></audio>
        </div>
  );
}

const isLastRound = (gameType:GameType, turnNumber:number) => (turnNumber >= getMaximumTurnIndex(gameType))

function playSound(sound: string){
    let audioPlayer = document?.getElementById(sound) as HTMLVideoElement | null;
    audioPlayer?.play();
}

function keyIsPressed(expectedKey: string){
    return new Promise<void>( (resolve) => {
        document.body.addEventListener('keyup', function resolveIfMatch(e) {                
            if ((expectedKey === "space") && keyIsSpace(e)) {
                resolve();
                document.body.removeEventListener('keyup', resolveIfMatch)
            }
            if ((expectedKey === "enter") && keyIsEnter(e)) {
                resolve();
                document.body.removeEventListener('keyup', resolveIfMatch)
            }
        })
    })
}

function keyIsSpace(event: KeyboardEvent){
    return (event.key == " ")
}

function keyIsEnter(event: KeyboardEvent){
    return (event.key == "\n" || event.keyCode == 13 )
}
