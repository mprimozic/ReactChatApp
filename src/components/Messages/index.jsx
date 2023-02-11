import { useEffect, useRef } from 'react';
import './index.scss';

const Messages = ({messages, currentUser}) => {

    // const container = useRef(null);
    // const scroll = () => {
    //     if (container.current){
    //         container.current.scrollTop = container.scrollHeight;
    //     }
    // }
    // useEffect(() => {
    //     scroll();
    // }, [messages])

    const renderMessage = (message, index) => {
        const {text, member} = message;
        const myMessage = member.id === currentUser.id;
        const className = myMessage ?
        'Messages-message currentMember' : 'Messages-message';
        return (
            <li key={index} className={className}>
                <span 
                    className='avatar' 
                    style={{backgroundColor: member.clientData.color}} >
                       
                </span>
                <div className='Message-content'>
                    <div className='username'>{member.clientData.username}</div>
                    <div className='text'>{text}</div>
                </div>
            </li>
        );
    }

    return(
        <ul className='Messages-list'>
            {
                messages.map((message, index) => (
                  renderMessage(message, index)
                ))
            }
        </ul>
    );
}

export default Messages;