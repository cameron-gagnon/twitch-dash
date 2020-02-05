import React from 'react';
import { Icon } from 'semantic-ui-react';

class SoundBoardModule extends React.Component {
    renderButton(text, size, icon, uiClasses) {
        return (
            <button size={size} icon={icon} class={uiClasses}>
                <Icon name={icon} />
                {text}
            </button>
        );
    }
    render() {
        const size = 'huge';
        const uiClasses = 'ui purple button huge';
        return <div>
            { this.renderButton('Air horn', size, 'music note', uiClasses) }
            { this.renderButton('Ding', size, 'music note', uiClasses) }
            { this.renderButton('Hot', size, 'music note', uiClasses) }
            { this.renderButton('Hits', size, 'music note', uiClasses) }
        </div>;
    }
}
export default SoundBoardModule;