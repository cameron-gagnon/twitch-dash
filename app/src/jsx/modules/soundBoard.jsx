import React from 'react';
import { Icon } from 'semantic-ui-react';

class SoundBoardModule extends React.Component {

    size = 'huge';
    uiclasses = 'ui purple button huge';

    // name, size, icon, class
    sfxs = [
        { name: 'air horn', size: this.size, icon: 'music', uiClass: this.uiclasses, audio: new Audio("/soundboard/air_horn.mp3")},
        { name: 'ding', size: this.size, icon: 'music', uiClass: this.uiclasses, audio: new Audio("/soundboard/ding.mp3")},
        { name: 'hot', size: this.size, icon: 'music', uiClass: this.uiclasses, audio: new Audio("/soundboard/hot.mp3")},
        { name: 'hits', size: this.size, icon: 'music', uiClass: this.uiclasses, audio: new Audio("/soundboard/hits.mp3")}
    ];

    populateButtons() {
        return this.sfxs.map((sfx, i) => 
                <button onClick={ sfx.audio.play } size={sfx.size} icon={sfx.icon} className={sfx.uiClass} key={sfx.name}>
                    <Icon name={sfx.icon} />
                    {sfx.name}
                </button>
            )
    }

    constructor(props) {
        super(props);
        this.state.buttons = this.populateButtons();
    }

    render() {
        return <div>
            { this.state.buttons }
        </div>;
    }
}
export default SoundBoardModule;