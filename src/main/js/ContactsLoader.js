// import React, {Component} from 'react'
// import PropTypes from 'prop-types';
//
//
// /*export default class ContactsLoader extends Component {
//     constructor(props) {
//         super(props);
//
//         console.log(' in ContactsLoader this.props', this.props)
//
//         let loadLink = this.props.loadLink;
//         const defaultLoadLink = "http://localhost:8080/rest/contacts";
//
//         this.state = {
//             loadLink: loadLink !== "" ? loadLink : defaultLoadLink,
//             contacts: []
//         }
//
//         console.log('loadLink', this.state.loadLink);
//     }
//
//     load(){
//         console.log('this.state.loadLink', this.state.loadLink)
//
//         fetch(this.state.loadLink)
//             .then(res => res.json())
//             .then(result => {
//                 this.setState({
//                     contacts:result
//                 })
//             })
//
//         console.log('this.state.contacts', this.state.contacts)
//     }
//
//     render() {
//         this.load()
//
//         console.log('this.state.contacts', this.state.contacts)
//         return (
//             [{"id":100179,"name":"Леонардо","phones":[{"id":100181,"phoneNumber":79994445561},{"id":100180,"phoneNumber":79994445559},{"id":100182,"phoneNumber":79994445565}]},{"id":100197,"name":"Микеланжело","phones":[{"id":100198,"phoneNumber":79785577333},{"id":100199,"phoneNumber":79994445560},{"id":100200,"phoneNumber":79994445570}]}]
//         )
//     }
// }*/
//
// function ContactsLoader(props){
//
//     console.log('link props', props);
//     console.log('ContactsLoader', ContactsLoader);
//
//     //[{"id":100179,"name":"Леонардо","phones":[{"id":100181,"phoneNumber":79994445561},{"id":100180,"phoneNumber":79994445559},{"id":100182,"phoneNumber":79994445565}]},{"id":100197,"name":"Микеланжело","phones":[{"id":100198,"phoneNumber":79785577333},{"id":100199,"phoneNumber":79994445560},{"id":100200,"phoneNumber":79994445570}]}]
//
//     return (
//         <div>test</div>
//     )
// }
//
// export default ContactsLoader