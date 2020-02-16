import React from 'react';

class UrlInput extends React.Component {

    // TODO: Connect to website by default
    // componentDidMount() {
    //     if (this.props.submitOnLoad) {
    //         console.log('Submitting form on load')
    //         const submitButton = document.getElementById('urlFormSubmitButton');
    //         console.log(`SubmitButton: ${submitButton.form}`);
    //     }
    // }



    render () {
        return (
            <form onSubmit={this.props.onSubmit} id='urlForm'>
                <label>
                    <input name="urlInput" defaultValue={this.props.defaultValue} type="text"/>
                </label>
                <input id='urlFormSubmitButton' type="submit" value="Connect"/>
            </form>
        )
    }
}

export default UrlInput;