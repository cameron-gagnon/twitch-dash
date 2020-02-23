import React, { useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Header } from 'semantic-ui-react';

import TwitchVideo from 'js/modules/twitch';
import TwitchChat from 'js/modules/twitchChat';
import SoundBoardModule from 'js/modules/soundBoard';
import StreamLabsModule from 'js/modules/streamLabs';
import LightBoard from 'js/dashboard/lightboard';
import DarkMode from 'js/themes/darkMode';
import Toggle from 'js/components/toggle';
import Logout from 'js/components/logout';
import { cookie_name } from 'js/services/backend';

function DashboardGrid(props) {

    useEffect(()=> {
        // redirect to login page if not logged in
        if (document.cookie.indexOf(cookie_name) === -1) {
            console.log('Redirecting to /login');
            props.history.push('/login');
        }
    }, []);

    const [theme, toggleTheme] = DarkMode();
    const layout = [
        { i: 'streamLabsMod', x: 0, y: 0, w: 10, h: 4, static: true },
        { i: 'soundBoardMod', x: 0, y: 6, w: 8, h: 4, static: true },
        { i: 'lightBoard', x: 0, y: 14, w: 8, h: 5 },
        { i: 'twitchVideo', x: 10, y: 10, w: 1, h: 7 },
        { i: 'twitchChat', x: 10, y: 25, w: 2, h: 4 }
    ];

    return (
        <div className={theme}>
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <Header size='huge'>StroopC's Twitch Dashboard</Header>
        <Logout {...props}/>
        <GridLayout className="dashGrid" layout={layout} cols={12} rowHeight={30} width={1200}>
            <div key="twitchVideo">
                <TwitchVideo targetID='twitch-embed' width='370' height='240' channel='stroopc' />
            </div>
            <div key="twitchChat">
                <TwitchChat />
            </div>
            <div key="streamLabsMod">
                <StreamLabsModule />
            </div>
            <div key="soundBoardMod">
                <SoundBoardModule />
            </div>
            <div key="lightBoard">
                <LightBoard />
            </div>
        </GridLayout>
    </div>
    );
}

export default DashboardGrid;