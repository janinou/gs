import { CSSProperties } from "react";

type AdditionProps = {
    showResult: boolean,
    content: AdditionContent
}

export default function Addition({showResult, content}: AdditionProps){
    return (
        <div style={{"fontFamily":"arial","fontSize":"40","top":"10%","left":"30%","position":"fixed"} as CSSProperties}>

            <Operand operand={content.operands[0]}/>
            
            <Operator operator="+"/>
            
            <Operand operand={content.operands[1]}/>
            
            <Operator operator="="/>

            { showResult ?
                <Operand operand={content.result}/>:null
            }
        </div>
    )
}

function Operator({operator}: {operator:string} ){
    return <span className="mx-24">  {operator}  </span>

}

function Operand({operand}: {operand:string} ){
    return <span className="relative top-3 text-7xl">  {operand}  </span>

}

// function getBlackDot(){
//     return '<svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" /></svg>'
// }