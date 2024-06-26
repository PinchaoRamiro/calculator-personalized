import '../stylessheets/Button.css';

//El componente Button es el encargado de mostrar los botones de la calculadora
// y de controlar eventos de teclado
function Button(props){
  const esOperador = valor => {
    return isNaN(valor) && (valor !== '.') && (valor !== '=');
  };

  return (
      <div
        className={`button-container ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()}
        onClick={() => props.manejarClick(props.children)}
        onKeyDown={() => props.manejarTeclado(props.children)}>
        {props.children}
      </div>
  )
}

export default Button;