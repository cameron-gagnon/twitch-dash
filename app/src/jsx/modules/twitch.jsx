import React from 'react';

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

class TwitchModule extends React.Component {
    componentDidMount() {
        let embed;
        const script = document.createElement('script');
        script.setAttribute('src', EMBED_URL)
        script.addEventListener('load', () => {
            embed = new window.Twitch.Embed(this.props.targetID, { ...this.props });
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

export default TwitchModule;