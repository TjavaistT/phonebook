import React, {Component} from 'react';
import Contact from './Contact'
import 'bootstrap/dist/css/bootstrap.css'

export default class Contacts extends Component{
    constructor(props) {
        super(props);
        this.state = {contacts:[]}
    }

    getContacts(){
        let currentUrl = location.href;
        let restUrl = currentUrl.replace(location.pathname, '/rest' + location.pathname)

        fetch(restUrl)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    contacts:result
                })
            })
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getContacts(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    getRenderedContact(contact){
        let phones_key = contact.phones.map(obj => obj.phoneNumber).reduce(function(a, b) {
            return "" + a + b;
        })

        return (
            <div key={contact.id + contact.name + phones_key}>
                <Contact contact={contact}/>
            </div>
        )
    }

    render(){
        return(
            <section id="contactsList" className="container pt-3 ">
                <div className="row border-bottom border-dark">
                    <div className="col-2 ">Имя</div>
                    <div className="col-2 ">Номер</div>

                    <div className="col-2" />
                    <div className="col-2" />
                </div>
                {
                    this.state.contacts.map(this.getRenderedContact)
                }
            </section>
        )
    }
}

