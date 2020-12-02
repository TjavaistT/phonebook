import React, {PureComponent} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class AddPhoneForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state={
            contact_id: this.props.contact_id,
            add: false
        }
    }

    addPhone() {
        this.setState({
            add: true
        })
    }

    render() {
        if(this.state.add) {
            return this.rendAdd();
        } else {
            return this.rendNorm();
        }
    }

    rendAdd(){
        return(
            <div className="col-3 border-bottom border-dark  py-3">
                <form className="addPhoneForm" name="addPhone" method="post"
                      action={"/contacts/" + this.state.contact_id + "/phones/new"}>
                    <input type="hidden" name="contactid" value={this.state.contact_id}/>
                    <input type="text" name="newNumber" className="newPhoneClass col-12 mb-2"/>
                    <button className="btn btn-primary" name="savePhone" type="submit"> Сохранить</button>
                </form>
            </div>
        )
    }

    rendNorm(){
        return(
            <div className="col-3 border-bottom border-dark  py-3">
                <a href="#" className="addPhone" onClick={this.addPhone.bind(this)} >Добавить номер</a>
            </div>
        )
    }
}