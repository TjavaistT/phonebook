import React, {Component} from 'react'
import PhoneList from './PhoneList'
import 'bootstrap/dist/css/bootstrap.css'

export default class Contact extends Component {
    constructor(props) {
        super(props);

        const {contact} = this.props

        this.state = {
            contact: contact,
            edit: false,
            borderStyle: " border-bottom border-dark ",
            marginStyle: " py-3 "
        }

        this.editClick = this.editClick.bind(this)
        this.delContClick = this.delContClick.bind(this)

    }

    editClick(e){
        e.preventDefault();

        this.setState({
            edit: true
        })
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

    delContClick(event,
                 contactId = this.state.contact.id
    ){
        event.preventDefault();

        fetch("/rest/contacts/" + contactId,
            {method: 'DELETE'})
            .catch(err => console.log(err));
    }

    deleteContactHTML(
            delContFn = this.delContClick,
            borderStyle = this.state.borderStyle,
            marginStyle = this.state.marginStyle
    ){
        const styles = borderStyle + marginStyle

        return ( <div className={"col-2 btn-link " + styles} onClick={delContFn}>
                    <a href="#"> Удалить контакт </a>
                </div>
        )
    }

    rendEdit(
        phones = this.state.contact.phones,
        contactId= this.state.contact.id,
        borderStyle=this.state.borderStyle,
        marginStyle=this.state.marginStyle,
        edit=this.state.edit
    ){
        const styles = this.state.borderStyle + this.state.marginStyle
        return(
            <div className="contact row">
                <form  name="editContact" method="post" className="editContactForm col-12" action={"contacts/" + this.state.contact.id}>
                    <div className="contact row " data-contactid={this.state.contact.id}>
                        <div className={"col-2  text-center " + styles}>
                            <input type="text" className="w-100" name="name" value={this.state.contact.name} onChange={this.changeName.bind(this)} />
                        </div>

                        <PhoneList
                            phones = {phones}
                            contactId = {contactId}
                            gridSize = "6"
                            borderStyle =  {borderStyle}
                            marginStyle = {marginStyle}
                            edit = {edit}
                        />

                        <div className={"col-2 " + styles}>
                            <button name="saveContact" type="submit" className="d-block btn-primary"> Сохранить контакт</button>
                        </div>

                        {this.deleteContactHTML()}

                    </div>
                </form>
            </div>
        )
    }

    rendNorm(
        phones = this.state.contact.phones,
        contactId= this.state.contact.id,
        borderStyle=this.state.borderStyle,
        marginStyle=this.state.marginStyle,
        edit=this.state.edit,
        editFn=this.editClick
    ){

        const styles = this.state.borderStyle + this.state.marginStyle

        return(
            <div className="contact row" >
                <div className={"col-2" + styles} >
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

                <div className={"col-2" + styles}>
                    <a href="#" className="editContact" onClick={editFn}>Редактировать контакт</a>
                </div>

                {this.deleteContactHTML()}

            </div>
        )
    }
}