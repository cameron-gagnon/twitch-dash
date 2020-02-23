import React from 'react';
import { Button } from 'semantic-ui-react';

function Toggle(props) {

    return (
        <Button className="purple" onClick={props.toggleTheme}>
            Toggle Light/Dark theme
        </Button>
    );
};

export default Toggle;
