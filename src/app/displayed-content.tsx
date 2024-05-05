import { useEffect, useState } from "react";
import Addition from "./addition";
import Letters from "./letters";
import {getContent} from "./pedagogical-content";
import {wait} from './utils'


type TurnStatus = 'hide_result' | 'show_result'
type ContentProps = {
    gameType: GameType,
    turnNumber:number,
    setNextTurn: () => void,
    playSound:(source: string) => void
    waitIfPaused: () => void
    forceNextStage: () => void
}

export default function Content( {gameType, turnNumber, setNextTurn, playSound, waitIfPaused, forceNextStage}:ContentProps ){
    let [turnStatus, setTurnStatus] = useState<TurnStatus>('hide_result');
    let [content, setContent] = useState<PedagogicalContent>(getContent(gameType, turnNumber))
    
    useEffect( () => {
        playSound('whoosh');
        waitNextStage(5000).then(() => {
            setTurnStatus('show_result')
        });
    }, [turnNumber])

    useEffect( () => {
        if (turnStatus === 'show_result'){
            playSound('explosion')
            waitNextStage(1000).then( () => {
                setNextTurn()
                setTurnStatus('hide_result')
                setContent(getContent(gameType, turnNumber));
            })
        }
    }, [turnStatus])


    function waitNextStage(defaultWaitTime: number){
        return Promise.any([
                    wait(defaultWaitTime).then(() => waitIfPaused()), 
                    forceNextStage()
                ]);
    }

    return (
        <div>
            {
                (gameType === 'addition') ?
                    <Addition content={content as AdditionContent} showResult={turnStatus==='show_result'}/>
                    :<Letters content={content as LettersContent} showResult={turnStatus==='show_result'}/>
            }
        </div>
    )
}