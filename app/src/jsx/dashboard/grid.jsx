import React from 'react';
import GridLayout from 'react-grid-layout';

import TwitchModule from '../modules/twitch.jsx';
import StreamLabsModule from '../modules/streamLabs.jsx';
import SoundBoardModule from '../modules/soundBoard.jsx';

class DashboardGrid extends React.Component {
    layout() {
        return [
            {i: 'twitchMod', x:0, y:0, w:1, h:2, static: true},
            {i: 'soundBoardMod', x:1, y:0, w:3, h:2, minW: 2, maxW: 4},
            {i: 'streamLabsMod', x:4, y:0, w:1, h:2}
        ];
    }
    render () {
        return (
            <GridLayout className="dashGrid" layout={this.layout()} cols={12} rowHeight={30} width={1200}>
                <div key="twitchMod">
                    <TwitchModule
                    targetID='twitch-embed'
                    width='940'
                    height='480'
                    channel='stroopc'
                    />
                </div>
                <div key="streamLabsMod">
                    <StreamLabsModule/>
                </div>
                <div key="soundBoardMod">
                    <SoundBoardModule/>
                </div>
            </GridLayout>
        )
    }
}

export default DashboardGrid;