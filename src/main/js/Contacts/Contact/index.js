import React, {Component} from 'react'
import PhoneList from './PhoneList'
import DeleteContact from './DeleteContact'

export default class Contact extends Component {
    constructor(props) {
        super(props);

        const {contact, borderStyle, delContactFn} = this.props

        this.state = {
            contact: contact,
            edit: false,
            marginStyle: " py-3 "
        }

        this.editClick = this.editClick.bind(this);
        this.changeContactsPhoneNumer = this.changeContactsPhoneNumer.bind(this);
        this.saveContact = this.saveContact.bind(this);

    }

    editClick(e){
        e.preventDefault();

        this.setState({
            edit: true
        })
    }

    changeName(event){
        this.state.contact.name = event.target.value;

        this.forceUpdate();
    }

    changeContactsPhoneNumer(event, phoneId){
        const currentNumber = event.target.value;

        this.state.contact.phones = this.state.contact.phones.map(phone => {
            if (phone.id === phoneId) {
                phone.phoneNumber = currentNumber;
            }

            return phone
        });

        this.setState({
            contact: this.state.contact
        })
    }

    saveContact(event){
        event.preventDefault();

        fetch('rest/contacts/' + this.state.contact.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(this.state.contact)
        }).then(res => res.json())
            .then(data => console.log('res', data))
            .catch(err => console.log('err', err));

        this.setState({
            edit: false
        });

    }

    render(
        edit = this.state.edit
    ) {
        if(edit) {
            return this.rendEdit();
        } else {
            return this.rendNorm();
        }
    }

    rendEdit(
        phones = this.state.contact.phones,
        contactId= this.state.contact.id,
        borderStyle=this.props.borderStyle,
        marginStyle=this.state.marginStyle,
        edit=this.state.edit,
        changePhoneNumerFn = this.changeContactsPhoneNumer,
        delContFn = this.props.delContactFn
    ){
        const styles = borderStyle + marginStyle;

        return(
            <div className="contact row">
                <form className="col-12" onSubmit={this.saveContact}>
                    <div className="contact row " data-contactid={this.state.contact.id}>
                        <div className={"col-2 text-center " + styles}>
                            <input className="w-100" name="name" value={this.state.contact.name} onChange={this.changeName.bind(this)} />
                        </div>

                        <PhoneList
                            phones = {phones}
                            contactId = {contactId}
                            gridSize = "6"
                            borderStyle =  {borderStyle}
                            marginStyle = {marginStyle}
                            edit = {edit}
                            changePhoneNumerFn = {changePhoneNumerFn}
                        />

                        <div className={"col-2 " + styles}>
                            <button name="saveContact" type="submit" className="d-block btn-primary"> Сохранить контакт</button>
                        </div>

                        <DeleteContact delContFn = {delContFn} styles={styles} />

                    </div>
                </form>
            </div>
        )
    }

    rendNorm(
        phones = this.state.contact.phones,
        contactId= this.state.contact.id,
        borderStyle=this.props.borderStyle,
        marginStyle=this.state.marginStyle,
        edit=this.state.edit,
        editFn=this.editClick,
        delContFn = this.props.delContactFn
    ){

        const styles = " " + borderStyle + marginStyle

        return(
            <div className="contact row " >
                <div className={"col-2 " + styles} >
                    {this.state.contact.name}
                </div>

                <PhoneList
                    phones = {phones}
                    contactId = {contactId}
                    gridSize = "6"
                    borderStyle = {borderStyle}
                    marginStyle = {marginStyle}
                    edit = {edit}
                />

                <div className={"col-2 " + styles}>
                    <a href="#" className="editContact" onClick={editFn}>Редактировать контакт</a>
                </div>

                <DeleteContact delContFn = {delContFn} styles={styles}/>

            </div>
        )
    }
}