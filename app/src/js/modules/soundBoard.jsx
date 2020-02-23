import React from 'react';
import { Icon } from 'semantic-ui-react';

class SoundBoardModule extends React.Component {

    ONE_SECOND_MS = 1000;

    size = 'huge';
    uiclasses = 'ui purple button huge';
    audioPath = '/audio/soundboard'
    createAudio(name, filetype='mp3') {
        return new Audio(`${this.audioPath}/${name}.${filetype}`);
    }

    /*  available properties:
     *     name, size, icon, uiClass, audio, volume, startTime, duration
     **/
    sfxs = [
        {
            name: 'air horn',
            size: this.size,
            icon: 'music',
            uiClass: this.uiclasses,
            audio: this.createAudio('air_horn'),
            volume: 0.1,
            startTime: .05
        },
        {
            name: 'ding',
            size: this.size,
            icon: 'music',
            uiClass: this.uiclasses,
            audio: this.createAudio('ding', 'wav'),
            startTime: .06,
            volume: 0.4
        },
        {
            name: 'hot',
            size: this.size,
            icon: 'music',
            uiClass: this.uiclasses,
            audio: this.createAudio('hot', 'wav'),
            volume: 0.3
        },
        {
            name: 'hits',
            size: this.size,
            icon: 'music',
            uiClass: this.uiclasses,
            audio: this.createAudio('hits', 'wav') 
        },
        {
            name: 'discustin',
            size: this.size,
            icon: 'music',
            uiClass: this.uiclasses,
            audio: this.createAudio('discustin'),
            startTime: 17,
            duration: 1.3,
            volume: 0.2
        },
        {
            name: 'smack',
            size: this.size,
            icon: 'music',
            uiClass: this.uiclasses,
            audio: this.createAudio('smack'),
            volume: 0.25,
            startTime: 0.45
        }
    ];

    // note: can be called multiple times before an audio clip is done playing
    //       it should repeat the clip from the beginning
    playAudio(sfx) {
        clearTimeout(this.timer);
        
        console.log(`sfx ${sfx.name} playing`);
        // pause then play allows us to more quickly repeat the audio
        sfx.audio.pause();

        sfx.audio.volume = sfx.volume || 0.5;
        sfx.audio.currentTime = sfx.startTime || 0;

        if (sfx.duration) {
            this.timer = setTimeout(function() {
                sfx.audio.pause();
            }, sfx.duration * this.ONE_SECOND_MS);
        }
        sfx.audio.play();
    }

    populateButtons() {
        return this.sfxs.map((sfx, i) => 
            <button onClick={ () => this.playAudio(sfx) } size={sfx.size} icon={sfx.icon} className={sfx.uiClass} key={sfx.name}>
                <Icon name={sfx.icon} />
                {sfx.name}
            </button>
        )
    }

    constructor(props) {
        super(props);
        this.state = {buttons: []};
        this.state.buttons = this.populateButtons();
    }

    render() {
        return <div>
            { this.state.buttons }
        </div>;
    }
}
export default SoundBoardModule;