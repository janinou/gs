type GameStatus = 'not_started' | 'started'  | 'done';
type GameType = 'letters' | 'addition'

type Difficulty = 'easy' | 'medium' | 'hard'

interface AdditionContent {
    operands: string[],
    result: string
}

interface LettersContent {
    letters: string[]
} 

type PedagogicalContent = AdditionContent | LettersContent