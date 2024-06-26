import '../stylessheets/buttonClear.css';

// El componente ButtonClear limpia la pantalla donde se muestra el resultado
const ButtonClear = (props) => (
    <div className="button-clear"
    onClick={props.manejarClear}>
        {props.children}
    </div>
)

export default ButtonClear;