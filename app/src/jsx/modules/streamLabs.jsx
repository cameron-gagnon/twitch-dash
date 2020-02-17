import React from 'react';
import SockJS from 'sockjs-client';

import Scenes from '../components/scenes';
import UrlInput from '../components/urlInput';
import StreamingStatus from '../components/streaming';

class StreamLabsModule extends React.Component {

    constructor(props) {
        super(props);
        // rendered state data
        this.state = {
            scenes: [],
            audioSources: [],
            sceneItems: [],
            sources: [],
            connectionStatus: 'disconnected',
            isStreaming: false,
            // should only go from false -> true once per page load
            initialized: false
        };

        // non-rendered state data
        this.nextRequestId = 1;
        this.requests = {};
        this.subscriptions = {};

    }

    connect(url) {
        console.log(`connecting to: ${url}`);
        this.socket = new SockJS(url);

        this.socket.onopen = () => {
            console.log('Opening socket connection');
            this.onConnectionHandler();
        };

        this.socket.onmessage = (e) => {
            this.onMessageHandler(e.data);
        };

        this.socket.onclose = (e) => {
            this.connectionStatus = 'disconnected';
            alert(`Disconnected due to: ${e.reason}`);
            console.log('Socket disconnecting', e);
        };
    }

    onConnectionHandler() {
        // this.authorizeConnection();
        this.setState({connectionStatus: 'connected'});
        this.request('ScenesService', 'getScenes').then(scenes => {
            scenes.forEach(scene => this.addScene(scene));
        });

        this.request('ScenesService', 'activeSceneId').then(id => {
            console.log(`Setting active scene: ${id}`)
            this.setActiveSceneFromId(id);
        });

        this.subscribe('ScenesService', 'sceneSwitched', (activeScene) => {
            // this.onSceneSwitchedHandler(activeScene);
            this.setActiveSceneFromId(activeScene.id);
        });

        this.subscribe('StreamingService', 'streamingStatusChange', (streamingStatus) => {
            // streamingStatus can be one of [starting, live, ending, offline];
            this.setStreamingStatus(streamingStatus);
        });
        this.setState({initialized: true});
    }

    authorizeConnection() {
        this.request('TcpServerService', 'auth', {args: [this.config.token]}).then(response => {
            console.log('Authenticated with SLOBS!');
        });
    }

    setActiveSceneFromId(id) {
        console.log(`Setting scene to active: ${id}`)
        this.setState({
            scenes: this.state.scenes.map(scene => {
                if (scene.id === id) {
                    return { ...scene, isActive: true };
                } else {
                    return { ...scene, isActive: false };
                }
            })
        });
    }

    onMessageHandler(data) {
        console.log(`OnMessageHandler received: ${data}`)
        let message = JSON.parse(data);
        let request = this.requests[message.id];

        if (request) {
            if (message.error) {
                request.reject(message.error);
            } else {
                request.resolve(message.result);
            }
            delete this.requests[message.id];
        }
        const result = message.result;

        if (!result) return;

        if (result._type === 'EVENT' && result.emitter === 'STREAM') {
            console.log(`Received event from stream: ${message}`);
            this.subscriptions[message.result.resourceId](result.data);
        }
    }

    request(resourceId, methodName, ...args) {
        let id = this.nextRequestId++;

        let requestBody = {
            jsonrpc: '2.0',
            id,
            method: methodName,
            params: { resource: resourceId, args }
        };
        return this.sendMessage(requestBody);
    }

    sendMessage(message) {
        let requestBody = message;
        console.log(`Sending request: ${requestBody.method}`);

        return new Promise((resolve, reject) => {
            this.requests[requestBody.id] = {
                body: requestBody,
                resolve,
                reject,
                completed: false
            };
            this.socket.send(JSON.stringify(requestBody));
        });
    }

    subscribe(resourceId, channelName, cb) {
        this.request(resourceId, channelName).then(subscriptionInfo => {
            this.subscriptions[subscriptionInfo.resourceId] = cb;
        });
    };

    addScene(scene) {
        console.log(`Adding scene: ${scene.name}`);
        scene = {...scene,
            isActive: false,
            makeSceneActive: () => {
                this.switchScene(scene);
            } 
        }
        this.setState({
            scenes: [...this.state.scenes, scene]
        });
    }

    switchScene(scene) {
        console.log(`Switching scene to ${scene.name}`);
        this.request('ScenesService', 'makeSceneActive', scene.id);
    }

    setStreamingStatus(streamingStatus) {
        console.log(`Streaming status change: ${streamingStatus}`);
        switch(streamingStatus) {
            case 'starting':
            case 'live':
                this.setState({ isStreaming: true });
                break;
            case 'ending':
            case 'offline':
                this.setState({ isStreaming: false });
                break;
            default:
                console.error(`Error: got unknown streaming status: ${streamingStatus}`);
                break;
        }
    }

    toggleStreamingStatus(streamingStatus) {
        console.log(`Toggled streaming status change. Original status is: ${this.state.isStreaming}`);
        this.request('StreamingService', 'toggleStreaming');
    }

    render() {
        return <div>
            <UrlInput onSubmit={this.connect.bind(this)} submitOnLoad={true} defaultValue="http://127.0.0.1:59650/api"/>

            <StreamingStatus
                initialized={this.state.initialized}
                isStreaming={this.state.isStreaming}
                callback={this.toggleStreamingStatus.bind(this)}/>

            <Scenes scenes={this.state.scenes}></Scenes>
            {/*<Sources sources={sources}></Sources> */}
        </div>;
    }
}
export default StreamLabsModule;