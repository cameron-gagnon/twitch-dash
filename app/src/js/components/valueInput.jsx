import React, { useState } from 'react';

function ValueInput(props) {
    const [value, setValue] = useState(props.defaultValue);

    return (
        <div className="ui action input">
            <input
                type={props.type || 'text' }
                onChange={event => setValue(event.target.value)}
                defaultValue={value}
            />
            <button
                onClick={(e)=>{e.preventDefault(); props.onSubmit(value)}}
                className="ui button"
            >
               {props.text} 
            </button>
        </div>
    )
}

export default ValueInput;