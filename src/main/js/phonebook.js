const React = require('react');
const ReactDOM = require('react-dom');


class Phonebook extends React.Component {

    render() {
        console.log("react work");
        return (
            <div data-test="test-attribute"></div>
        )
    }
}

ReactDOM.render(
    <Phonebook />,
    document.getElementById('react')
)