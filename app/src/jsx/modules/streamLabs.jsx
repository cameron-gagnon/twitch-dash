import React from 'react';
// import sockjs from 'sockjs';

import UrlInput from '../components/urlInput';


class StreamLabsModule extends React.Component {
    connect(e) {
        e.preventDefault();
        console.log('connecting to: ', e.target.elements["urlInput"].value);
    }

    render() {
        return <div>
            <UrlInput onSubmit={this.connect} defaultValue="http://127.0.0.1:59650/api"/>
            {/* <Scenes scenes={scenes}></Scenes>
            <Sources sources={sources}></Sources> */}
        </div>;
    }
}
export default StreamLabsModule;