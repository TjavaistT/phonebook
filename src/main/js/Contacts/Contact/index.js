import React, {Component} from 'react'
import Phone from './PhoneList/Phone'
import AddPhoneForm from './AddPhoneForm'
import 'bootstrap/dist/css/bootstrap.css'

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            contact: props.contact
        }
    }

    editClick(){
        this.setState({
            edit: true
        })
    }

    render() {
        if(this.state.edit) {
            return this.rendEdit();
        } else {
            return this.rendNorm();
        }
    }

    changeName(event){
        this.state.contact.name = event.target.value;

        this.setState({
            contact: this.state.contact
        })
    }

    // changeNumber(number){
    //     this.state.contact.phones. = name;
    //
    //     this.setState({
    //         contact: this.state.contact
    //     })
    // }

    // submitForm(event){
    //     event.preventDefault();
    //
    //     // console.log('this.state.contact', event.target.value)
    //
    //     fetch('contacts/' + this.state.contact.id, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: event.target.value
    //     }).then(res => res.json())
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err));
    //
    //
    //     this.setState({
    //         edit: false
    //     });
    //
    // }

    rendEdit(){
        return(
            <form  name="editContact" method="post" className="editContactForm col-12" action={"contacts/" + this.state.contact.id}>
                <div className="contact row " data-contactid={this.state.contact.id}>
                    <input type="text" className="col-2" name="name" defaultValue={this.state.contact.name} onChange={this.changeName.bind(this)} />
                    <div className="col-4 phones">
                        {
                            this.state.contact.phones.map(phone => (
                                <div key={phone.id + phone.phoneNumber} className="row phone border-bottom border-dark py-3" data-phoneid={phone.id}>
                                    <input type="text" className="col-9" name="phoneNumber" defaultValue={phone.phoneNumber} />
                                    <div className="col-4">
                                        <a href={"/contacts/" + this.state.contact.id + "/phones/" + phone.id + "/delete"} className="deletePhone  py-3">
                                            Удалить номер
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <AddPhoneForm contact_id={this.props.contact.id}/>

                    <div className="col-2 border-bottom border-dark  py-3">
                        <button name="saveContact" type="submit" className="btn btn-primary"> Сохранить</button>
                    </div>
                    <div className="col-1 border-bottom border-dark  py-3">
                        <a className="deleteContact" href={"/contacts/" + this.props.contact.id + "/delete"} >Удалить контакт</a>
                    </div>
                </div>
            </form>
        )
    }

    rendNorm(){
        return(
            <div className="contact row" >
                <div className="col-2 border-bottom border-dark py-3" >
                    {this.state.contact.name}
                </div>
                <div className="col-4 phones"  >
                    {this.state.contact.phones.map(phone => (
                        <div key={phone.id + phone.phoneNumber} className="row phone  border-bottom border-dark py-3">
                            <Phone contact_id={this.state.contact.id} phone={phone} phone_counts = {this.state.contact.phones.length}/>
                        </div>
                    ))}
                </div>

                <AddPhoneForm contact_id={this.props.contact.id}/>

                <div className="col-2 border-bottom border-dark  py-3">
                    <a href="#" className="editContact" onClick={this.editClick.bind(this)}>Редактировать контакт</a>
                </div>

                <div className="col-1 border-bottom border-dark  py-3">
                    <a className="deleteContact" href={"/contacts/" + this.state.contact.id + "/delete"}>Удалить
                        контакт</a>
                </div>
            </div>
        )
    }
}