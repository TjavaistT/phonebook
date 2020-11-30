import React, {Component} from 'react';
import Contact from './Contact'
import 'bootstrap/dist/css/bootstrap.css'

export default class Contacts extends Component{
    constructor(props) {
        super(props);
        this.state = {contacts:[]}
    }

    componentDidMount() {
        let currentUrl = location.href;
        let restUrl = currentUrl.replace(location.pathname, '/rest' + location.pathname)

        fetch(restUrl)
            .then(res => res.json())
            .then(result => {this.setState({contacts:result})})
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
                    this.state.contacts.map(contact=>(
                        <div key={contact.id}>
                            <Contact contact={contact}/>
                        </div>
                    ))
                }
            </section>
        )
    }
}

