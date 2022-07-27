import './style.css'

export default function TextFormField(props){

    return (
        <input 
            name={props.name}
            type={props.type} 
            className='text-form-field' 
            placeholder={props.placeholder}
            value={props.value}
            onChange = {props.onChange}/>
    )
}