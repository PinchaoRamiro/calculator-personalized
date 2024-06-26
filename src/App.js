import './App.css';
import logoImagen from './assest/logo-calculadora.webp';
import Button from './componentes/button.jsx';
import Pantalla from './componentes/pantalla.jsx';
import ButtonClear from './componentes/buttonClear.jsx';
import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');

  const agregarInput = val => {
    setInput(input + val);
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.'].includes(key)) {
      setInput(input + key);
    } else if (key === 'Enter') {
      if(input.length > 0){
        CalculateResult();
      }
    } else if (key === 'Backspace') {
      if(input.length > 0){
        setInput(input.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const avalueOperadores = (input) => {
    input.forEach(element => {
      if(element === '+' || element === '-' || element === '*' || element === '/'){
        return true;
      }
    });
    return false;
  }

  const isOperation = (input) => {
    const operators = ['+', '-', '*', '/', '%'];
    for (let i = 0; i < input.length; i++) {
      if (operators.includes(input[i])) {
        if (operators.includes(input[i + 1])) {
          return false;
        }
      }
    }
    return true;
  };

  const CalculateResult = () => {
    if (input) {
      try {
        setInput(evaluate(input).toString());
      } catch (error) {
        setInput("Syntax Error");
      }
    } else {
      if (avalueOperadores(input)) {
        alert("No hay ningún operador");
      } else if (!isOperation(input)) {
        setInput("Syntax Error");
      } else {
        alert("No hay ningún valor para calcular");
      }
    }
  };

  return (
    <div className="App">
      <div className='title-app'>
        <img
          src={logoImagen}
          className='logo-calculadora'
          alt='logo-calculadora'
        />
      </div>

      <div className='contenedor-calculadora'>
        <Pantalla input={input} />
        <div className='fila'>
          <Button manejarClick={agregarInput}>1</Button>
          <Button manejarClick={agregarInput}>2</Button>
          <Button manejarClick={agregarInput}>3</Button>
          <Button manejarClick={agregarInput}>+</Button>
        </div>
        <div className='fila'>
          <Button manejarClick={agregarInput}>4</Button>
          <Button manejarClick={agregarInput}>5</Button>
          <Button manejarClick={agregarInput}>6</Button>
          <Button manejarClick={agregarInput}>-</Button>
        </div>
        <div className='fila'>
          <Button manejarClick={agregarInput}>7</Button>
          <Button manejarClick={agregarInput}>8</Button>
          <Button manejarClick={agregarInput}>9</Button>
          <Button manejarClick={agregarInput}>*</Button>
        </div>
        <div className='fila'>
          <Button manejarClick={CalculateResult}>=</Button>
          <Button manejarClick={agregarInput}>0</Button>
          <Button manejarClick={agregarInput}>.</Button>
          <Button manejarClick={agregarInput}>/</Button>
        </div>
        <div className='fila'>
          <ButtonClear manejarClear={() => setInput('')}>
            Clear
          </ButtonClear>
        </div>
      </div>
    </div>
  );
}

export default App;

