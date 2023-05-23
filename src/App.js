import "./App.css";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";

function App(){
    const [input, setInput] = useState("");
    const [operator, setOperator] = useState(null);
    const [preState, setPreState] = useState("");
    const [curState, setCurState] = useState("");
    const [total, setTotal] = useState(false);
    const [reset, setReset] = useState(false);

    const inputNum = (e) => {
        // only one dot and one zero should be
        if((curState.includes(".") && e.target.innerText === ".") || (curState.startsWith("0") && e.target.innerText === "0")){ return };
        if(total){ setPreState(""); }
        curState 
            ? setCurState((pre) => pre + e.target.innerText) 
            : setCurState(e.target.innerText);
        setTotal(false);
    };

    useEffect(() => { setInput(curState); }, [curState]);
    useEffect(() => { setInput("0"); setReset(false); }, [reset]);
    useEffect(() => { setInput("0"); }, []);

    const operatorType = (e) => {
        setTotal(false);
        setOperator(e.target.innerText);
        if(curState === ""){ return };
        if(preState === ""){
            setPreState(curState);
            setCurState("");
        }
    };

    const equals = (e) => {
        if(e.target.innerText === "="){ setTotal(true); }
        let cal;
        switch(operator){
            case "/":
                cal = String(parseFloat(preState) / parseFloat(curState));
                break;
            case "+":
                cal = String(parseFloat(preState) + parseFloat(curState));
                break;
            case "X":
                cal = String(parseFloat(preState) * parseFloat(curState));
                break;
            case "-":
                cal = String(parseFloat(preState) - parseFloat(curState));
                break;
            default:
                return;
        }
        setInput("");
        setPreState(cal); // result becomes first operand
        setCurState("");
    };

    const minusPlus = () => {
        if(curState.charAt(0) === "-"){
            setCurState(curState.substring(1));
        } else {
            setCurState("-" + curState);
        }
    };

    const percent = () => {
      preState ? setCurState(String((parseFloat(curState) / 100) * preState)) : setCurState(String(parseFloat(curState) / 100));
    };

    const resetFunc = () => {
        setReset(true);
        setPreState("");
        setCurState("");
        setInput("0");
    };

    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='screen'>
                    {
                    input !== "" ? 
                    (<NumericFormat  value={input} displayType={"text"} thousandSeparator={true}/>) 
                    : 
                    (<NumericFormat  value={preState} displayType={"text"} thousandSeparator={true}/>)
                    }
                </div>
                <div className='btn red' onClick={resetFunc}>
                    AC
                </div>
                <div className='btn blue' onClick={percent}>
                    %
                </div>
                <div className='btn blue' onClick={minusPlus}>
                    +/-
                </div>
                <div className='btn orange' onClick={operatorType}>
                    /
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    7
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    8
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    9
                </div>
                <div className='btn orange' onClick={operatorType}>
                    X
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    4
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    5
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    6
                </div>
                <div className='btn orange' onClick={operatorType}>
                    +
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    1
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    2
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    3
                </div>
                <div className='btn orange' onClick={operatorType}>
                    -
                </div>
                <div className='btn zero light-gray' onClick={inputNum}>
                    0
                </div>
                <div className='btn light-gray' onClick={inputNum}>
                    .
                </div>
                <div className='btn green' onClick={equals}>
                    =
                </div>
            </div>
        </div>
    );
}

export default App;