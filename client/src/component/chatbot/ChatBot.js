import React, { Component } from 'react'
import Axios from "axios";
import Cookies from 'universal-cookie'
import { v4 as uuid } from 'uuid'

//import components
import Message from "./Message";

const cookies = new Cookies();

class ChatBot extends Component {
    messageEnd;
    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this)
        this.state = {
            messages: [],
        }
        if(cookies.get('userID') === 'undefined') {
            cookies.set('userID', uuid(), {path: '/'});
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            message: {
                text: {
                    text: text
                }
            }
        }

        this.setState({messages: [...this.state.messages, says]})
        const res = await Axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID')})

        for(let msg of res.data.fulfilmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    async df_event_event(event) {
        const res = await Axios.post('/api/df_event_event', {event: eventName, userID: cookies.get('userID')})

        for(let msg of res.data.fulfilmentMessages) {
            let says = {
                speaks: 'me',
                msg: msg,
            }
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    componentDidMount() {
        this.df_event_event('Welcome in chat')
    }

    componentDidUpdate() {
        this.messageEnd.scrollIntoView({ behavior: 'smoth' })
    }

    renderMessage(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message
                    key={i}
                    speks={message.speaks}
                    text={message.msg.text.text}
                />
            })
        } else  {
            return null
        }
    }

    _handleInputKeyPress(e) {
        e.preventDefult()

        if(e.key === 'Enter') {
            this.df_text_query(e.target.value)
            e.target.value = ''
        }
    }

    render() {
        return (
            <div style={{ height: 400, width: 400, float: 'right' }}>
                <div id='chatbot' style={{ height: '100%', width: '100%', overflow: 'auto'}}>
                    <h2>ChatBot</h2>
                    {this.renderMessage(this.state.message)}
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => {this.messageEnd = el}}
                        >
                        </div>
                    <input
                        type='text'
                        onKeyPress={this._handleInputKeyPress}
                    />
                </div>
            </div>
        )
    }


}

export default ChatBot
