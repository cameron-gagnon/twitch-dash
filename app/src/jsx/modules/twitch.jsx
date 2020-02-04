import React from 'react';

const EMBED_URL = 'https://player.twitch.tv/js/embed/v1.js';

class TwitchVideo extends React.Component {
    componentDidMount() {
        let player;
        const script = document.createElement('script');
        script.setAttribute('src', EMBED_URL)
        script.addEventListener('load', () => {
            player = new window.Twitch.Player(this.props.targetID, { ...this.props });
            player.setVolume(0.0);
        });

        document.body.appendChild(script);
    }

    render() {
        return (
            <div className="Twitch">
              <div id={this.props.targetID}/>
            </div>
        );
    }
}

export default TwitchVideo;