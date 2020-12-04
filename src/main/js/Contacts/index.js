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

        let phones_key;
        if(contact.phones.length <= 0) {
            phones_key = 0;
        } else {
            phones_key = contact.phones.map(obj => obj.phoneNumber).reduce(function (a, b) {
                return "" + a + b;
            })
        }

        return (
            <div key={contact.id + contact.name + phones_key}>

                {/*                <div className="row border-bottom border-dark">
                    <div className="col-2 ">Имя</div>
                    <div className="col-2 ">Номер</div>

                    <div className="col-2" />
                    <div className="col-2" />
                </div>

                <div className="row">
                    <div className="col-2 border-bottom border-dark py-4">Беатриc</div>
                    <div className="col-6 phones">
                        <div className="row  border-bottom border-dark py-4">
                            <div className="col-6"> 79994445592</div>
                            <div className="col-3 btn-link text-center">Удалить номер</div>
                            <div className="col-3 btn-link">Добавить номер</div>
                        </div>
                    </div>
                    <div className="col-2 btn-link border-bottom border-dark py-4">Редактировать контакт</div>
                    <div className="col-2 btn-link border-bottom border-dark py-4">Удалить контакт</div>
                </div>

                <div className="row">
                    <div className="col-2 border-bottom border-dark py-4">Беатриc</div>
                    <div className="col-6 phones">
                        <div className="row  border-bottom border-dark py-4">
                            <div className="col-6"> 79994445592</div>
                            <div className="col-3 btn-link text-center">Удалить номер</div>
                            <div className="col-3 btn-link">Добавить номер</div>
                        </div>
                        <div className="row  border-bottom border-dark py-4">
                            <div className="col-6"> 79994445593</div>
                            <div className="col-3 btn-link text-center">Удалить номер</div>
                            <div className="col-3 btn-link">Добавить номер</div>
                        </div>
                    </div>
                    <div className="col-2 btn-link border-bottom border-dark py-4">Редактировать контакт</div>
                    <div className="col-2 btn-link  border-bottom border-dark py-4">Удалить контакт</div>
                </div>

                <div className="row">
                    <form name="editContact" method="post" className="editContactForm col-12" action="contacts/100121">
                        <div className="contact row " data-contactid="100121">
                            <div className="col-2  text-center border-bottom border-dark  py-4">
                                <input type="text" name="name" defaultValue="Беовульф" value="Беовульф" className="w-100" />
                            </div>
                            <div className="row col-6 phones">
                                <div className="row col-12 border-bottom border-dark     py-4  ">
                                    <div className="col-6 ">
                                        <input type="text" value="79993334006" className="w-100" />
                                    </div>
                                    <div className="col-6 btn-link text-center ">Удалить номер</div>
                                </div>
                            </div>
                            <div className="col-2 border-bottom border-dark  py-4">
                                <button className="d-block btn-primary">Сохранить контакт</button>
                            </div>
                            <div className="col-2 border-bottom border-dark btn-link py-4">Удалить контакт</div>
                        </div>
                    </form>
                </div>

                <div className="row">
                    <form name="editContact" method="post" className="editContactForm col-12" action="contacts/100121">
                        <div className="contact row " data-contactid="100121">
                            <div className="col-2  text-center border-bottom border-dark  py-4">
                                <input type="text" name="name" value="Беовульф" className="w-100" />
                            </div>
                            <div className="row col-6 phones">
                                <div className="row col-12 border-bottom border-dark     py-4  ">
                                    <div className="col-6 ">
                                        <input type="text" value="79993334006" className="w-100" />
                                    </div>
                                    <div className="col-6 btn-link text-center ">Удалить номер</div>
                                </div>

                                <div className="row col-12 border-bottom border-dark     py-4  ">
                                    <div className="col-6 ">
                                        <input type="text" value="79993334006" />
                                    </div>
                                    <div className="col-6 btn-link text-center ">Удалить номер</div>
                                </div>
                            </div>
                            <div className="col-2 border-bottom border-dark  py-4">
                                <button name="saveContact" type="submit" className="d-block btn-primary"> Сохранить
                                    контакт
                                </button>
                            </div>
                            <div className="col-2 border-bottom border-dark btn-link py-4">Удалить контакт</div>
                        </div>
                    </form>
                </div>*/}

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

