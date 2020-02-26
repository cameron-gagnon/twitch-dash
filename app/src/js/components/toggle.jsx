import React from 'react';
import { Button } from 'semantic-ui-react';
import { lightTheme } from 'js/themes/darkMode';

function Toggle(props) {

    return (
        <Button className={"secondary " + (props.theme === lightTheme ? '' : 'inverted')} onClick={props.toggleTheme}>
            Toggle Light/Dark theme
        </Button>
    );
};

export default Toggle;
