import React from 'react';
import Backend from 'js/services/backend';
import { Button } from 'semantic-ui-react';

const backend = new Backend();

function Logout (props){
    
    function redirect() {
        console.log('Redirecting on logout');
        props.history.push('/login');
    }

    function logout() {
        backend.logout(redirect)
    }

    return (
        <Button className="inverted" onClick={ logout }>
            Logout
        </Button>
    )
}

export default Logout;