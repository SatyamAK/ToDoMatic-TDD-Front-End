import './style.css'

export default function TextFormField(props){

    function onChange(event){
        props.onChange()
    }

    return (
        <input 
            type={props.type} 
            className='text-form-field' 
            placeholder={props.placeholder}
            value={props.value}
            onChange = {onChange}/>
    )
}