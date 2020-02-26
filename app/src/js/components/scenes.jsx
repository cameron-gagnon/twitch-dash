import React from 'react';
import Scene from './scene';

function Scenes(props) {

    return (
        <div className="ui grid container">
            {
                props.scenes.map((scene) => {
                    return <Scene key={scene.id} scene={scene}/>
                })
            }
        </div>
    )
}

export default Scenes;