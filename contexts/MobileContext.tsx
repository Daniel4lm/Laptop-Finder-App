import React, { createContext, useContext, useState } from 'react';
import useDisplaySize from '../hooks/useDisplaySize';

interface StateTypes {
    toggle: boolean;
}

const defaultMobState: StateTypes = {
    toggle: false,
}

const MobileContext = createContext<{ mobState: StateTypes; toggleNav: Function; isMobile: boolean; }>({
    mobState: defaultMobState,
    toggleNav: () => null,
    isMobile: false
});

const MobileProvider: React.FC = ({ children }) => {

    const { isMobile } = useDisplaySize();
    const [mobState, setMobState] = useState<StateTypes>(defaultMobState);

    const toggleNav = (new_toggle?: boolean) => {
        if (new_toggle) {
            setMobState(mobState => {
                return { ...mobState, toggle: new_toggle }
            })
        } else {
            setMobState(mobState => {
                return { ...mobState, toggle: !mobState.toggle }
            })
        }
    }

    return (
        <MobileContext.Provider value={{ mobState, toggleNav, isMobile }}>
            {children}
        </MobileContext.Provider>
    )
}

const useMobileContext = () => {
    return useContext(MobileContext);
}

export { MobileContext, MobileProvider, useMobileContext };