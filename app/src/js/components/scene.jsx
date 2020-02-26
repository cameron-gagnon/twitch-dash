import React from 'react';
import 'styles/css/App.css';


function Scene(props) {
    return (
        <div className="two wide column">
            <button className={"square ui blue button " + (props.scene.isActive ? "" : "inverted")}
                onClick={props.scene.makeSceneActive} >
                {props.scene.name}
            </button>
        </div>
    );
}
export default Scene;