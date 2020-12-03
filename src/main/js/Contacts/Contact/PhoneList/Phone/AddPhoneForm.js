import React, {PureComponent} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class AddPhoneForm extends PureComponent {
    constructor(props) {
        super(props);

        const {contactId, phoneNumber, gridSize} = props

        this.state={
            addState: false,
            newNumber: this.props.phoneNumber
        }

        this.setStateAddPhone = this.setStateAddPhone.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.addPhone = this.addPhone.bind(this);
    }

    setStateAddPhone() {
        this.setState({ addState: true })
    }

    changePhone(event){
        this.setState({
            newNumber: event.target.value
        })
    }

    addPhone(e) {
        e.preventDefault();
        const contactId = this.props.contactId;
        const newPhone = this.state.newNumber;

        fetch("/rest/contacts/" + contactId + "/phones/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({ "phoneNumber": newPhone })
        }).catch(err => console.log(err));

        this.setState({ addState: false })
    }

    render(
        gridSize = this.state.gridSize
    ) {
        const render = this.state.addState ? this.rendAdd() : this.rendNorm();
        return (
            <div className={"col-" + gridSize}>
                {render}
            </div>
        )
    }

    rendAdd(
        changePhoneFn = this.changePhone,
        addPhoneFn = this.addPhone,
        phoneNumber = this.props.phoneNumber
        ){
        return(
            <form onSubmit={addPhoneFn} >
                <input onChange={changePhoneFn} className="col-12 mb-2" defaultValue={phoneNumber}/>
                <button className="btn btn-primary" type="submit"> Сохранить </button>
            </form>
        )
    }

    rendNorm(
        stateAddPhoneFn = this.setStateAddPhone
    ){
        return <div className="btn btn-link" onClick={stateAddPhoneFn} >Добавить номер</div>
    }
}