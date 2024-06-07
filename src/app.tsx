import { Home } from "./content/Home";
import { Projects } from "./content/Projects";
import { AboutMe } from "./content/AboutMe";
import { ContactMe } from "./content/ContactMe";
import './styles.css'
import React from "react";


const contentList:{title:string, ref:string, page:any}[] = [
    {
        title: "Home", ref: 'home', page: <Home />
    },
    {
        title: "Projects", ref: 'projects', page: <Projects />
    },
    {
        title: "About Me", ref: 'about-me', page: <AboutMe />
    },
    {
        title: "Contact Me", ref: 'contact-me', page: <ContactMe />
    }
]

type ColorScheme = {
    background: string, 
    primary1: string, 
    primary2: string, 
    secondary1: string, 
    secondary2: string
}

const colorSchemes:ColorScheme[] = [

]

export const App = () => {

    const [curContentPage, setCurContentPage] = React.useState(0)
    const sidebarWidth = "9vw"
    const sideNavStyle:React.CSSProperties = {
        display: "flex", alignItems: 'center', justifyContent: "space-between"
        , flexDirection: "column", margin: "20px", height: "90vh", width: sidebarWidth,
        
        position: "fixed", zIndex: 1, 
        top: 0, left: 0
    }

    const sidebarButtonStyle:React.CSSProperties = {
        width: "100%",
        height: "40px", 
        border: "solid black",
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
        letterSpacing: "2px"
    }

    const buttonSelectedStyle:React.CSSProperties = {
        backgroundColor: "white", 
        color: "black"
    }

    const anchorBehavior = (ev:React.MouseEvent<HTMLAnchorElement, MouseEvent>, itemI:number) => {
        if(ev.currentTarget != null){
            setCurContentPage(itemI)
            ev.currentTarget.scrollIntoView({
                behavior: "smooth"
            })
        }
    
    }

    return <div onScroll={(ev) => ev.preventDefault()} style={{ position: "relative", padding: "20px", display: "flex", flexDirection: "row"}}>
        <header style={sideNavStyle}>
            <div id="profileImgGroup" className="slide-up" style={{display: 'flex', flexDirection: "column"}}>
                <h3>Kevin Akumuo</h3>
                <img src="/resources/profile_kevin.jpg" style={{width: "100px", height: "100px", objectFit: "cover", alignSelf: "center"}}/>
            </div>
            <nav className="slide-up" style={{display: 'grid', gridTemplateRows: contentList.map(_ => "auto").join(" "), gap: "10px", marginRight: "auto", marginLeft: "auto", width: "80%"}}>
                {contentList.map((item, itemI) => {
                    
                    let targetStyle = {...sidebarButtonStyle, animationDuration: `${.25 * (itemI + 1)}s`}
                    if (itemI == curContentPage) targetStyle = {...targetStyle, ...buttonSelectedStyle}
                    return <a onClick={(ev) => anchorBehavior(ev, itemI)} href={`page.html#${item.ref}`}><button className="slide-up" style={targetStyle} id={item.ref + "-nav-btn"}>{item.title}</button></a>
                })}
            </nav>
            <div className="slide-up" style={{animationDuration: ".5s", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                <p>Light</p>
                <input type="range" min={0} max={colorSchemes.length} style={{writingMode: "vertical-lr", direction: "rtl", verticalAlign: "middle"}} />
                <p>Dark</p>
            </div>
        </header>

        <main style={{marginLeft: sidebarWidth}}>
            {contentList.map((item, itemI) => {
                let height = "100vh"
                if(itemI == 0)
                    height = "100vh"
                if(itemI == contentList.length - 1)
                    height = "auto"
                return <ContentGroup height={height} title={item.title} href={item.ref}>{item.page}</ContentGroup>
            })}
        </main>
        
        <footer>
        </footer>
    </div>
}

const ContentGroup = ({title, href, children, height="100vh"}:{title:string, href:string, height?:string, children:any}) => {
    return <div style={{height: height, alignItems: "start", display: 'flex', flexDirection: "column"}}>
        <h1 className="contentTitle slide-in" id={href}>{title}</h1>
        {children}
    </div>
}
