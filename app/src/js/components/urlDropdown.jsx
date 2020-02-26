import React, { useState } from 'react';

function UrlDropdown(props) {
    const [value, setValue] = useState(props.values[0]);

    return (
        <div>
            <select class="ui dropdown"
                onChange={event => setValue(event.target.value)}
                value={value}
            >
                { 
                    props.values.map((value) => {
                        return <option value={value}>{value}</option>;
                    })
                }
            </select>
            <button
                onClick={(e)=>{e.preventDefault(); props.onSubmit(value)}}
                className={"ui button right huge inverted " + (props.connected ? "disabled" : "")}
            >
               {props.text} 
            </button>
        </div>
    )
}

export default UrlDropdown;