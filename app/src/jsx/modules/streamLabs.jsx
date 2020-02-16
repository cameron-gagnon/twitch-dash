import React from 'react';
import SockJS from 'sockjs-client';

import Scenes from '../components/scenes';
import UrlInput from '../components/urlInput';

class StreamLabsModule extends React.Component {

    constructor(props) {
        super(props);
        // rendered state data
        this.state = {
            scenes: [],
            audioSources: [],
            sceneItems: [],
            sources: [],
            connectionStatus: 'disconnected'
        };

        // non-rendered state data
        this.nextRequestId = 1;
        this.connect = this.connect.bind(this);
        this.requests = {};
        this.subscriptions = {};
    }

    connect(e) {
        e.preventDefault();
        let url = e.target.elements["urlInput"].value;
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
            alert(`Disconnected from: ${this.url} due to ${e.reason}`);
            console.log('Socket disconnecting', e);
        };
    }

    onConnectionHandler() {
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

    // should be bound to the scene context
    switchScene(scene) {
        console.log(`Switching scene to ${scene.name}`);
        this.request('ScenesService', 'makeSceneActive', scene.id);
    }

    render() {
        return <div>
            <UrlInput onSubmit={this.connect} submitOnLoad={true} defaultValue="http://127.0.0.1:59650/api"/>
            <Scenes scenes={this.state.scenes}></Scenes>
            {/*<Sources sources={sources}></Sources> */}
        </div>;
    }
}
export default StreamLabsModule;