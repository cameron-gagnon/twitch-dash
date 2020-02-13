import React from 'react';
import GridLayout from 'react-grid-layout';

import TwitchVideo from '../modules/twitch.jsx';
import TwitchChat from '../modules/twitchChat.jsx';
// import StreamLabsModule from '../modules/streamLabs.jsx';
import SoundBoardModule from '../modules/soundBoard.jsx';
import DashboardHeader from './dashboardHeader.jsx';
import LightBoard from './lightboard.jsx';
import DarkMode from '../themes/darkMode.jsx';
import Toggle from '../components/toggle.jsx';

//import { Header } from 'semantic-ui-react';

function DashboardGrid() {
    const [theme, toggleTheme] = DarkMode();
    const layout = [
        {i: 'soundBoardMod', x:0, y:0, w:8, h:4, static: true },
        {i: 'lightBoard', x:0, y:5, w:8, h: 5 },
        {i: 'twitchVideo', x:10, y:0, w:1, h:7 },
        {i: 'twitchChat',  x:10, y:15, w:2, h:4 },
        {i: 'streamLabsMod', x:4, y:0, w:1, h:2 }
    ];

    return (
        <div className={theme}>
            <Toggle theme={theme} toggleTheme={toggleTheme}/>
            <DashboardHeader/>
            <GridLayout className="dashGrid" layout={layout} cols={12} rowHeight={30} width={1200}>
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
                <div key="lightBoard">
                    <LightBoard/>
                </div>
            </GridLayout>
        </div>
    )
};

export default DashboardGrid;