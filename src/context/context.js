import React, { useState, createContext } from 'react'

export const context = createContext()
const ContextProvider = ({ children }) => {
    const [toggleButton, SetToggleButton] = useState(false)
    return (
        <context.Provider value=
            {{
                toggleButton,
                SetToggleButton
            }}
        >
            {children}
        </context.Provider >
    )
}

export default ContextProvider