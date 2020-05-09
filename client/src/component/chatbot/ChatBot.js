import React, { Component } from 'react'
import Axios from "axios";

//import components
import Message from "./Message";

class ChatBot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
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
        const res = await Axios.post('/api/df_text_query', {text})

        for(let msg of res.data.fulfilmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    async df_event_event(event) {
        const res = await Axios.post('/api/df_event_event', {event})

        for(let msg of res.data.fulfilmentMessages) {
            let says = {
                speaks: 'me',
                msg: msg,
            }
            this.setState({messages: [...this.state.messages, says]})
        }
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

    render() {
        return (
            <div style={{ height: 400, width: 400, float: 'right' }}>
                <div id='chatbot' style={{ height: '100%', width: '100%', overflow: 'auto'}}>
                    <h2>ChatBot</h2>
                    {this.renderMessage(this.state.message)}
                    <input type='text'/>
                </div>
            </div>
        )
    }


}

export default ChatBot
