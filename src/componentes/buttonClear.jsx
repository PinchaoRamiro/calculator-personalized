import '../stylessheets/buttonClear.css';


const ButtonClear = (props) => (
    <div className="button-clear"
    onClick={props.manejarClear}>
        {props.children}
    </div>
)

export default ButtonClear;