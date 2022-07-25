import './style.css'

export default function Button(props){
    return(
        <button onClick={props.onClick} type = {props.type} className = {props.class}>{props.title}</button>
    )
}