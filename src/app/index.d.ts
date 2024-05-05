type GameStatus = 'not_started' | 'started'  | 'done';
type GameType = 'letters' | 'addition' | 'syllabes'

type Difficulty = 'easy' | 'medium' | 'hard'

interface AdditionContent {
    operands: string[],
    result: string
}

interface LettersContent {
    letters: [string]
} 

interface SyllabesContent {
    letters: string[]
} 

type PedagogicalContent = AdditionContent | LettersContent | SyllabesContent