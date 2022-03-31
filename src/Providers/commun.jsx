import React from "react";


export const CommunContext = React.createContext({});

export const CommunProvider = (props) => {

    const [informatios, setInformations] = React.useState({
        phoneName: "",
        phoneNumber: null,
        phoneID: null,
    })


    return (
        <CommunContext.Provider value={{ informatios, setInformations }}>
            {props.children}
        </CommunContext.Provider>
    )
}

export const useCommun = () => React.useContext(CommunContext);