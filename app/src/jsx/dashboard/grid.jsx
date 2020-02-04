import React from 'react';
import GridLayout from 'react-grid-layout';

import TwitchVideo from '../modules/twitch.jsx';
import TwitchChat from '../modules/twitchChat.jsx';
// import StreamLabsModule from '../modules/streamLabs.jsx';
import SoundBoardModule from '../modules/soundBoard.jsx';
import DashboardHeader from './dashboardHeader.jsx';

//import { Header } from 'semantic-ui-react';

class DashboardGrid extends React.Component {
    layout() {
        return [
            {i: 'twitchVideo', x:10, y:0, w:1, h:7 },
            {i: 'twitchChat',  x:10, y:15, w:2, h:4 },
            {i: 'soundBoardMod', x:0, y:0, w:8, h:4 },
            {i: 'streamLabsMod', x:4, y:0, w:1, h:2 }
        ];
    }
    render () {
        return (
            <React.Fragment>
                <DashboardHeader/>
                <GridLayout className="dashGrid" layout={this.layout()} cols={12} rowHeight={30} width={1200}>
                    <div key="twitchVideo">
                        <TwitchVideo
                        targetID='twitch-embed'
                        width='370'
                        height='240'
                        channel='stroopc'
                        />
                    </div>
                    <div key="twitchChat">
                        <TwitchChat/>
                    </div>
                    {/* <div key="streamLabsMod">
                        <StreamLabsModule/>
                    </div> */}
                    <div key="soundBoardMod">
                        <SoundBoardModule/>
                    </div>
                </GridLayout>
            </React.Fragment>
        )
    }
}

export default DashboardGrid;