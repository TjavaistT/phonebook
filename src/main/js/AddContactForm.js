import React, {Component} from "react";
import { Modal, Button } from "react-bootstrap";


export default class AddContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            contact:  {name:'',
                        phones:[]}
        };

        this.openModal  = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.changeName   = this.changeName.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.addContact   = this.addContact.bind(this);
    }

    openModal () {this.setState({ isOpen: true });}
    closeModal(){this.setState({ isOpen: false });}

    changeName(event){
        this.state.contact.name = event.target.value;

        this.setState({
            contact: this.state.contact
        });
    }

    changeNumber(event, index){
        this.state.contact.phones[index] = {"phoneNumber": event.target.value}
        this.forceUpdate()
    }

    addContact(event){
        event.preventDefault();

        fetch('/rest/contacts/new',
            {method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(this.state.contact)
            }).then(res => res.json())
            .then(data => console.log('data', data))
            .catch(err => console.log('err', err));

        this.closeModal()
    }

    render() {
        return (
            <>
                <div className="d-flex" >
                    <Button variant="primary" onClick={this.openModal}>
                        Добавить контакт
                    </Button>
                </div>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title> Добавить контакт </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="modal-form" onSubmit={this.addContact}>

                                 <div className="form-group">
                                     <label htmlFor="name" className="col-form-label">Имя</label>
                                     <input onChange={this.changeName} type="text" id="name" className="form-control" name="name"
                                       placeholder="Имя"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber" className="col-form-label">Номера</label>
                                    <input onChange={(e) => this.changeNumber(e, 0)} type="text" className="form-control mb-2" name="phoneNumber" />
                                    <input onChange={(e) => this.changeNumber(e, 1)} type="text" className="form-control mb-2" name="phoneNumber" />
                                    <input onChange={(e) => this.changeNumber(e, 2)} type="text" className="form-control mb-2" name="phoneNumber" />
                                </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.addContact}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
