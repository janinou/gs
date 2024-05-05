import {shuffle, randomItem} from './utils'

type TurnThresholds = {
    [K in GameType]:{
        [K in Difficulty]: number
    }
}
type MaxTurnsByGameType = { [K in GameType]: number }
type GetContentByGameType = { [K in GameType]: (diff:Difficulty) => PedagogicalContent }


function getMaximumTurnIndex(gameType:GameType){
    const maxTurnsByGameType: MaxTurnsByGameType = {
        'addition': 20,
        'letters': 30,
        'syllabes': 15
    }
    return maxTurnsByGameType[gameType]
}


function getContent(gameType:GameType, roundNumber: number):PedagogicalContent {
    const difficulty = getDifficulty(gameType, roundNumber);

    let getContentByGameType: GetContentByGameType = {
        addition: getAdditionContent,
        letters: getLettersContent,
        syllabes: getSyllabesContent
    }

    return getContentByGameType[gameType](difficulty)
}


function getDifficulty(gameType:GameType, turnNumber: number):Difficulty{
    const turnThreshold: TurnThresholds = {
        addition: {
            hard: 14,
            medium: 6,
            easy:0
        },
        letters:{
            hard:30,
            medium:15,
            easy:0
        },
        syllabes: {
            hard:30,
            medium:15,
            easy:0
        }
    }
    if (turnNumber >= turnThreshold[gameType].hard)
        return 'hard'
    else if (turnNumber >= turnThreshold[gameType].medium)
        return 'medium'
    else if (turnNumber >= turnThreshold[gameType].easy)
        return 'easy'
    else throw new Error(`Turn number should be a positive number. Received: ${turnNumber}`);

}


function getAdditionContent(difficulty:Difficulty):AdditionContent{
    const numbersByDifficulty = {
        easy: [1, 2, 3],
        medium: [4, 5, 6],
        hard: [7, 8, 9]
    }
    const numbers = numbersByDifficulty[difficulty];
    const easyNumbers = numbersByDifficulty.easy;

    let operands:number[] = [randomItem(numbers), randomItem(easyNumbers)]
    shuffle(operands)
    let sum = operands.reduce((sum, operand) => sum + operand, 0)

    return {
        operands: operands.map(o => String(o)),
        result: String(sum)
    }
}

function getLettersContent(difficulty:Difficulty):LettersContent{
    let letters = {
        lowercase: 'azertyuiopmlkjhgfdsqwxcvbn'.split(''),
        uppercase: 'AZERTYUIOPMLKJHGFDSQWXCVBN'.split(''),
        anycase: 'azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN'.split('')
    }

    return {letters: [randomItem(letters.lowercase)] }
}

function getSyllabesContent():SyllabesContent{
    let letters = {
        consonants:'zrtpmlkjhgfdsqwxcvbn'.split(''),
        vowels:'aeuio'.split('')
    }
    return {letters: [
        randomItem(letters.consonants),
        randomItem(letters.vowels)
    ]}
}

export {getContent, getMaximumTurnIndex}