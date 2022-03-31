import React from "react";


export const ChatContext = React.createContext({});

export const ChatProvider = (props) => {

    const [chat, setChat] = React.useState({
        sectorName: "",
        sectorID: null,
        contacID: null,
        operatorId: null,
        operator: null,
        phoneNumber: null,
    })


    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export const useChat = () => React.useContext(ChatContext);