import React, { useEffect } from 'react';

import TwitchVideo from 'js/modules/twitch';
import TwitchChat from 'js/modules/twitchChat';
import SoundBoardModule from 'js/modules/soundBoard';
import StreamLabsModule from 'js/modules/streamLabs';
import LightBoard from 'js/modules/lightboard';
import Logout from 'js/components/logout';
import { cookie_name } from 'js/services/backend';

import 'styles/css/dashboardGrid.css';

function DashboardGrid(props) {

    useEffect(()=> {
        // redirect to login page if not logged in
        if (document.cookie.indexOf(cookie_name) === -1) {
            console.log('Redirecting to /login');
            props.history.push('/login');
        }
    });

    return (
        <div>
            <h1 id="header" className="ui inverted center aligned black header">
                StroopC's Twitch Dashboard
            </h1>
            <div className="ui grid container">
                <div className="ui right aligned column">
                    <Logout {...props}/>
                </div>
            </div>
            <div className="ui grid container">
                <StreamLabsModule />
            </div>
            <div className="ui section divider"></div>
            <div className="ui grid centered">
                <SoundBoardModule />
            </div>
            <div className="ui section divider"></div>
            <div className="ui grid centered">
                <div >
                    <LightBoard />
                </div>
                <div className="twitch">
                    <TwitchVideo targetID='twitch-embed' width='370' height='240' channel='stroopc' />
                    <TwitchChat />
                </div>
            </div>
        </div>
    );
}

export default DashboardGrid;