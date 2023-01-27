import { useState } from 'react';

import './index.scss';

const Input = ({handleSubmit}) => {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setText('');
        handleSubmit(text);
    }
    
    return(
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={text} type='text' placeholder='Enter your message' autoFocus={true}/>
            <button>Send</button>
        </form>
    );
}
 
export default Input;