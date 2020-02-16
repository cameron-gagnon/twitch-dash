import React from 'react';
import Scene from '../components/scene';

function Scenes(props) {

    return (
        <div id='scenes'>
            {
                props.scenes.map((scene) => {
                    return <Scene key={scene.id} scene={scene}/>
                })
            }
        </div>
    )
}

export default Scenes;