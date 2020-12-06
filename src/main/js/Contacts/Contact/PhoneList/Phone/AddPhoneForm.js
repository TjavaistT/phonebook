import React, {PureComponent} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class AddPhoneForm extends PureComponent {
    constructor(props) {
        super(props);

        const {gridSize, addPhoneFn} = this.props

        this.state={
            addState: false,
            newNumber: "7"
        }

        this.setStateAdding = this.setStateAdding.bind(this);
        this.addPhoneFn = addPhoneFn;
        this.changePhone = this.changePhone.bind(this);
    }

    setStateAdding() {
        this.setState({ addState: true })
    }

    changePhone(event){
        this.setState({
            newNumber: event.target.value
        })
    }

    render(
        gridSize = this.props.gridSize
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
        addPhoneFn = this.addPhoneFn
        ){
        return(
            <form onSubmit={(e) => addPhoneFn(this.state.newNumber, e)} >
                <input onChange={changePhoneFn} className="col-12 mb-2 w-100" defaultValue="7"/>
                <button className="btn btn-primary" type="submit"> Сохранить </button>
            </form>
        )
    }

    rendNorm(
        stateAdding = this.setStateAdding
    ){
        return  <div onClick={stateAdding} className="col-3 btn-link cursor-link">
                    Добавить номер
                </div>
    }
}