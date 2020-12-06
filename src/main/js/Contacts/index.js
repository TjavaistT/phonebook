import React, {Component} from 'react';
import Contact from './Contact'

export default class Contacts extends Component{
    constructor(props) {
        super(props);
        const {loadUrl} = this.props;

        this.state = {
            contacts:[],
            borderStyle: " border-bottom border-dark "
        };
    }

    getContacts(
        loadUrl = this.props.loadUrl
    ){
        fetch(loadUrl)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    contacts:result
                })
            })
    }

    delContClick(contactId){
        fetch("/rest/contacts/" + contactId,{method: 'DELETE'})
            .catch(err => console.log(err));
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

    getRenderedContact(
        contact
    ){

        const contactId = contact.id;
        const contactName = contact.name;
        const phones = contact.phones;

        const concat = (acc, cur) => "" + acc + cur;
        let phones_key = phones.length > 0
            ?  phones.map(obj => obj.phoneNumber).reduce(concat)
            : 0;

        const delContactFn = this.delContClick.bind(this, contact.id);

        return (
            <div key={contactId + contactName + phones_key}>
                <Contact contact={contact} borderStyle={this.state.borderStyle} delContactFn={delContactFn} />
            </div>
        )
    }

    render(
        contacts = this.state.contacts,
        borderStyle = this.state.borderStyle
    ){
        const headerContacts = (
        <div className={"row " + borderStyle}>
            <div className="col-2 ">Имя</div>
            <div className="col-2 ">Номер</div>

            <div className="col-2" />
            <div className="col-2" />
        </div>);

        return(
            <section id="contactsList" className="container pt-3 ">
                { headerContacts }
                { contacts.length > 0
                    ? contacts.map(contact => this.getRenderedContact(contact, this.delContClick.bind(this, contact.id)))
                    : ""
                }
            </section>
        )
    }
}

