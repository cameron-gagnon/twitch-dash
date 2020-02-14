import React from 'react';

function UrlInput(props) {

    return (
        <form onSubmit={props.onSubmit}>
            <label>
                <input name="urlInput" defaultValue={props.defaultValue} type="text"/>
            </label>
            <input type="submit" value="Connect"/>
        </form>
    )

}

export default UrlInput;