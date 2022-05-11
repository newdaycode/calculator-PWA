import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [number1,setNumber1] = useState("");
  const [number2,setNumber2] = useState("");
  const [currentOperation,setcurrentOperation] = useState("");
  const [result,setresult] = useState(0);


  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      // event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    // window.deferredPrompt = null;
    // Hide the install button.
    // setIsReadyForInstall(false);
  }

  function allClear(){
      setNumber1("")
      setNumber2("")
      setcurrentOperation("")
      setresult("")
  }

  function deleteNumber () {
    if (currentOperation === "") {
      setNumber1(number1.toString().slice(0, -1));
    } else {
      setNumber2(number2.toString().slice(0, -1));
    }
  };

  function clickNumber(val){

    if(currentOperation === ""){
      setNumber1(number1 + val)
    }else{
      setNumber2(number2 + val)
    }
   
  }

  function clickOperaction(val){
    setcurrentOperation(val)
  }


  function getResult(){
    switch(currentOperation){
      case '+':
        setresult(Number(number1) + Number(number2));
        break;
      case '-':
        setresult(Number(number1) - Number(number2));
        break;
      case '/':
        setresult(Number(number1) / Number(number2));
        break;
      case '*':
        setresult(Number(number1) * Number(number2));
        break;
    }
  }
  return (
    <div className="App">
      <h1 className='text-h1'>Calculator</h1>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{currentOperation  ? number1 + currentOperation + number2: ""}</div>
          <div className="current-operand">{result ? result : (!currentOperation  ? number1 : " ") }</div>
        </div>
        <button onClick={allClear} className='span-two' >AC</button>
        <button onClick={deleteNumber}>DEL</button>
        <button onClick={() => {clickOperaction('/')}}>/</button>
        <button onClick={()=> {clickNumber(7)}}>7</button>
        <button onClick={()=> {clickNumber(8)}}>8</button>
        <button onClick={()=> {clickNumber(9)}}>9</button>
        <button onClick={() => {clickOperaction('*')}}>*</button>
        <button onClick={()=> {clickNumber(4)}}>4</button>
        <button onClick={()=> {clickNumber(5)}}>5</button>
        <button onClick={()=> {clickNumber(6)}}>6</button>
        <button onClick={() => {clickOperaction('+')}}>+</button>
        <button onClick={()=> {clickNumber(1)}}>1</button>
        <button onClick={()=> {clickNumber(2)}}>2</button>
        <button onClick={()=> {clickNumber(3)}}>3</button>
        <button onClick={() => {clickOperaction('-')}}>-</button>
        <button onClick={() => {clickNumber('.')}}>.</button>
        <button onClick={() => {clickNumber(0)}}>0</button>
        <button onClick={getResult} className='span-two'>=</button>
        {isReadyForInstall && <button className='span-dow' onClick={downloadApp}>Descargar</button>}
      </div>

    </div>
  );
}

export default App;
