import React from 'react'
import './style.css'
import { Routes, BrowserRouter, Route } from 'react-router';
import { MainPage } from './pages/MainPage';
import { AllProjects } from './pages/AllProjects';

export const AppContext = React.createContext<{
    schemeI:number, 
    setSchemeI:React.Dispatch<React.SetStateAction<number>>
}>({
    schemeI:0, 
    setSchemeI:()=>null
}); 

export const App = () => {
    const [schemeI, setSchemeI] = React.useState(-1);
    
    // handle color scheme change
    React.useEffect(() => {
        document.hasStorageAccess()
            .then(hasAccess => {
                if(!hasAccess) return; 
                const KEY = 'kakumuo-color-scheme'
                
                const val = localStorage.getItem(KEY);
                if(schemeI == -1) {
                    setSchemeI(val ? Number.parseInt(val) : 0); 
                }
                else localStorage.setItem(KEY, `${schemeI}`)
            })
    }, [schemeI])

    return <>{schemeI == -1 ? <></> : <AppContext.Provider value={{
        schemeI: schemeI, 
        setSchemeI: setSchemeI
    }}>
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={MainPage} />
                <Route path='/projects' Component={AllProjects} />
            </Routes>
        </BrowserRouter>
    </AppContext.Provider>}</>
}

export const HeaderNav = () => {
    
}


