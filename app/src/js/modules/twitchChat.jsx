import React from 'react';

class TwitchChat extends React.Component {
    render() {
        return (
            <iframe
                title="twitchChat"
                frameBorder="0"
                scrolling="yes"
                id="stroopc"
                src="https://www.twitch.tv/embed/stroopc/chat"
                height="400"
                width="370"
            >
            </iframe>
        );
    }
}

export default TwitchChat;