import React from 'react';
import { Button } from 'semantic-ui-react';

function StreamingStatus(props) {
    if (!props.initialized) { return null; }

    return (
        <Button className={'red huge ' + (props.isStreaming ? '' : 'inverted')} onClick={props.callback}>
            {
                props.isStreaming ?  'GO OFFLINE': 'GO LIVE'
            }
        </Button>
    )
}
export default StreamingStatus;