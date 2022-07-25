import './style.css'

export default function TextFormField(props){
    return (
        <input type="text" className='text-form-field' placeholder={props.placeholder}/>
    )
}