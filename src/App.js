import './App.css'; // Importa los estilos CSS para el componente App
import logoImagen from './assest/logo-calculadora.webp'; // Importa una imagen del logo de la calculadora
import Button from './componentes/button.jsx'; // Importa el componente Button
import Pantalla from './componentes/pantalla.jsx'; // Importa el componente Pantalla
import ButtonClear from './componentes/buttonClear.jsx'; // Importa el componente ButtonClear
import { useState, useEffect } from 'react'; // Importa hooks de React
import { evaluate } from 'mathjs'; // Importa la función evaluate de la librería mathjs para evaluar expresiones matemáticas

function App() {
  const [input, setInput] = useState(''); // Declara una variable de estado para almacenar el input del usuario

  // Función para agregar valores al input
  const agregarInput = val => {
    setInput(input + val);
  };

  // Maneja eventos de teclado
  const handleKeyDown = (event) => {
    const { key } = event;
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.'].includes(key)) {
      setInput(input + key);
    } else if (key === 'Enter') {
      if (input.length > 0) {
        CalculateResult();
      }
    } else if (key === 'Backspace') {
      if (input.length > 0) {
        setInput(input.slice(0, -1));
      }
    }
  };

  // useEffect para añadir y eliminar el evento de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  // Verifica si el input contiene operadores
  const avalueOperadores = (input) => {
    input.forEach(element => {
      if(element === '+' || element === '-' || element === '*' || element === '/'){
        return true;
      }
    });
    return false;
  }

  // Verifica si la operación es válida
  const isOperation = (input) => {
    const operators = ['+', '-', '*', '/', '%'];
    for (let i = 0; i < input.length; i++) {
      if (operators.includes(input[i]) && operators.includes(input[i + 1])) {
        return false;
      }
    }
    return true;
  };

  // Calcula el resultado de la operación
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
