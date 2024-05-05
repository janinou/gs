import { text } from "stream/consumers";

type LettersProps = {
    content: LettersContent,
    showResult: boolean
}

export default function Letters({content, showResult}: LettersProps){
    let colorClass = {
        red: 'text-red-600',
        blue: 'text-blue-600',
        black: 'text-black'
    }
    function getColor(index: number){
        return showResult ? 
            index % 2 ? 'blue' : 'red' 
            : 'black' ; 
    }

    return (
            <div className="font-belleAllure text-8xl top-24 flex flex-row justify-center relative">
                <div> {
                    content.letters.map((letter, idx) => 
                        <span key={idx} className={colorClass[getColor(idx)]}>
                            {letter}
                        </span>)
                        }
                </div>
            </div>

    )
}
