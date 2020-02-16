import React from 'react';

function Scene(props) {
    return (
        <button className={'ui blue huge button scene ' + (props.scene.isActive ? '' : 'inverted')}
            onClick={props.scene.makeSceneActive} >
            {props.scene.name}
        </button>
    );
}
export default Scene;