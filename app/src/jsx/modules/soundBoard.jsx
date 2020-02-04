import React from 'react';
import { Button, Icon} from 'semantic-ui-react';

class SoundBoardModule extends React.Component {
    render() {
        return <div>
            <Button size="huge" icon='world'>
                <Icon name="itunes note"/>
                Air Horn
            </Button>
            <Button size="huge" icon='world'>
                <Icon name="itunes note"/>
                Hits
            </Button>
            <Button size="huge" icon='world'>
                <Icon name="itunes note"/>
                Hot
            </Button>
            <Button size="huge" icon='world'>
                <Icon name="itunes note"/>
                Ding
            </Button>
        </div>;
    }
}
export default SoundBoardModule;