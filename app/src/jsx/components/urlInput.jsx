import React, { useState } from 'react';

function UrlInput(props) {
    const [url, setUrl] = useState(props.defaultValue);

    return (
        <div className="ui action input">
            <input onChange={event => setUrl(event.target.value)} type="text" defaultValue={url}/>
            <button onClick={(e)=>{e.preventDefault(); props.onSubmit(url)}} className="ui button">
                Connect
            </button>
        </div>
    )
}

export default UrlInput;