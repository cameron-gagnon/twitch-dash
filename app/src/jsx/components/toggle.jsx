import React from 'react';

function Toggle(props) {

    return (
        <button onClick={props.toggleTheme}>
            Toggle Light/Dark theme
        </button>
    );
};

export default Toggle;
