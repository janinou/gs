import { ReactNode, useEffect, useState } from "react";
import Addition from "./addition";
import Letters from "./letters";
import {getContent} from "./pedagogical-content";
import {wait} from './utils'


type TurnStatus = 'hide_result' | 'show_result'
type Stage = 'question' | 'result'

type ContentProps = {
    gameType: GameType,
    turnNumber:number,
    setNextTurn: () => void,
    playSound:(source: string) => void
    waitIfPaused: () => void
    forceNextStage: () => void
}

const durationByGameType:{[K in GameType]: {[K in Stage]: number}} = {
    addition: {
        question:15000,
        result:5000
    },
    letters: {
        question: 4000,
        result: 1
    },
    syllabes: {
        question: 5000,
        result: 4000
    }
}

export default function Content( {gameType, turnNumber, setNextTurn, playSound, waitIfPaused, forceNextStage}:ContentProps ){
    let [turnStatus, setTurnStatus] = useState<TurnStatus>('hide_result');
    let [content, setContent] = useState<PedagogicalContent>(getContent(gameType, turnNumber))
    
    useEffect( () => {
        playSound('whoosh');
        let questionDuration = durationByGameType[gameType].question
        waitNextStage(questionDuration).then(() => {
            setTurnStatus('show_result')
        });
    }, [turnNumber])

    useEffect( () => {
        if (turnStatus === 'show_result'){
            playSound('explosion')
            let resultDuration = durationByGameType[gameType].result

            waitNextStage(resultDuration).then( () => {
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

    let contentHTML: {[K in GameType]: ReactNode} = {
        'addition': <Addition content={content as AdditionContent} showResult={turnStatus==='show_result'}/>,
        'letters': <Letters content={content as LettersContent} showResult={turnStatus==='show_result'}/>,
        'syllabes': <Letters content={content as LettersContent} showResult={turnStatus==='show_result'}/>
    }

    return ( <div> {contentHTML[gameType]} </div> )
}