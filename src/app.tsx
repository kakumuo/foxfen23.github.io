import { Home } from "./content/Home";
import { Projects } from "./content/Projects";
import { AboutMe } from "./content/AboutMe";
import { ContactMe } from "./content/ContactMe";
import './styles.css'
import React from "react";
import * as MatIcons from '@mui/icons-material'


type ContentPaneType = {
    title:string, ref:string, page:any
}
const contentList:ContentPaneType[] = [
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
    primary:string, 
    secondary:string, 
    background:string, 
    font:string, 
    accent: string,
}

const colorSchemes: ColorScheme[] = [
    {primary: "#8FB339", secondary: "#536231", background: "#0F1A20", font: "#DADDD8", accent: "#B7CE63" },
    {primary: "#88A2AA", secondary: "#E2856E", background: "#0F1A20", font: "#ADA296", accent: "#F42C04" },
    {primary: "#F42C04", secondary: "#F42C04", background: "#88A2AA", font: "#0F1A20", accent: "#E2856E" },
    {primary: "#D10000", secondary: "#7C0B2B", background: "#FFCBDD", font: "#0F1A20", accent: "#FB4B4E" },
    {primary: "#150578", secondary: "#449DD1", background: "#78C0E0", font: "#0E0E52", accent: "#3943B7" },
    {primary: "#F1DABF", secondary: "#92817A", background: "#FFFBFF", font: "#000500", accent: "#362417" },
];

const dayString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const getCurrentDateAndTime = () => {
    const curDate = new Date();
    let targetHours = curDate.getHours()
    targetHours = targetHours == 0 ? 12 : targetHours >= 13 ? targetHours - 12 : targetHours;

    let h = targetHours.toString()
    let m = curDate.getMinutes().toString()
    let s = curDate.getSeconds().toString()

    h = ("00" + h).substring(h.length)
    m = ("00" + m).substring(m.length)
    s = ("00" + s).substring(s.length)

    return [`${dayString[curDate.getDay()]}, ${monthString[curDate.getMonth()]} ${curDate.getDate()}`, `${h}:${m}:${s}`]
}


export const ColorSchemeContext = React.createContext(colorSchemes[0])

export const App = () => {

    const [curContentPage, setCurContentPage] = React.useState(0)
    const [curTime, setCurTime] = React.useState(getCurrentDateAndTime())
    const [targetScheme, setTargetScheme] = React.useState(0)
    const curColorScheme = colorSchemes[targetScheme]
    
    // mouse cursor
    let [outerWidth, innerWidth] = ["30px", "10px"]
    React.useEffect(() => {

        // set date and time
        setInterval(() => {
            setCurTime(getCurrentDateAndTime())
        }, 1000)

        // update mouse cursor
        const cursorOuter = document.querySelector<HTMLDivElement>('.cursor-outer')
        const cursorInner = document.querySelector<HTMLDivElement>('.cursor-inner')
        let [targetMouseX, targetMouseY] = [0, 0]
        let [lerpOuterX, lerpOuterY] = [targetMouseX, targetMouseY]
        let [lerpInnerX, lerpInnerY] = [targetMouseX, targetMouseY]
        let outerDampCoeff = .75
        let innerDampCoeff = .1

        const lerp = (start:number, end:number, delta:number) => {
            return start * (1-delta) + end * delta
        }

        setInterval(() => {
            lerpOuterX = lerp(lerpOuterX, targetMouseX, outerDampCoeff)
            lerpOuterY = lerp(lerpOuterY, targetMouseY, outerDampCoeff)

            lerpInnerX = lerp(lerpInnerX, targetMouseX, innerDampCoeff)
            lerpInnerY = lerp(lerpInnerY, targetMouseY, innerDampCoeff)
            if(cursorOuter && cursorOuter.style) {
                cursorOuter.style.transform = `translate3d(
                    calc(${lerpOuterX}px - ${cursorOuter.style.width}), 
                    calc(${lerpOuterY}px - ${cursorOuter.style.height} ), 
                    0)`
            }

            if(cursorInner && cursorInner.style && cursorOuter && cursorOuter.style) {
                cursorInner.style.transform = `translate3d(
                    calc(${lerpInnerX}px - (${cursorInner.style.width} * .5) - (${cursorOuter.style.width} / 2)), 
                    calc(${lerpInnerY}px - ((${cursorInner.style.height} * 1.25) + (${cursorOuter.style.height} * .25))), 
                    0)`
            }
        }, 1000/144) 

        const mainContainer = document.querySelector<HTMLDivElement>('mainContainer')
        window.addEventListener('mousemove', (ev) => {
            targetMouseX = ev.pageX; 
            targetMouseY = ev.pageY;

            const targetElement = (ev.target as HTMLElement)
            if(cursorInner && cursorInner.style && cursorOuter && cursorOuter.style){
                if(targetElement.classList.contains('clickable')){
                    cursorInner.style.backgroundColor = curColorScheme.font
                    cursorOuter.style.borderColor = curColorScheme.primary
                    cursorOuter.style.borderWidth = '4px'
                }else {
                    cursorInner.style.backgroundColor = curColorScheme.primary
                    cursorOuter.style.borderColor = curColorScheme.font
                    cursorOuter.style.borderWidth = '1px'
                }
            }

        })
        

        const anchors = document.querySelectorAll<HTMLHeadElement>('.contentTitleAnchor')
        const handleScroll = (ev:Event) => {
            const viewTop = 0
            const viewBottom = document.documentElement.clientHeight * .75
            for(let i = anchors.length -1; i >= 0; i--){
                const curTop = anchors[i].getBoundingClientRect().top
                if(viewBottom >= curTop && curTop >= viewTop){
                    setCurContentPage(i)
                    break;
                }
            }
        }

        window.addEventListener('scroll', handleScroll)

    }, [])

    const sidebarWidth = "9vw"
    const sideNavStyle:React.CSSProperties = {
        display: "flex", alignItems: 'center', justifyContent: "space-between"
        , flexDirection: "column", padding: "1vh", height: "98vh", width: sidebarWidth,
        backgroundColor: curColorScheme.secondary,
        position: "fixed", zIndex: 1, 
        top: 0, left: 0
    }

    const anchorBehavior = (ev:React.MouseEvent<HTMLAnchorElement, MouseEvent>, itemI:number) => {
        if(ev.currentTarget != null){
            ev.currentTarget.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    const handleColorSchemeUpdate = (targetVal:string) => {
        setTargetScheme(parseInt(targetVal))
        console.log(targetVal)
    }

    
    const outerStyle:React.CSSProperties = {
        width: outerWidth, height: outerWidth,
        border: `solid 1px`, 
        borderColor: curColorScheme.accent,
        borderRadius: "50%",
        display: 'block',
        position: "absolute", 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: "1000", 
        filter: 'invert(1)',
        pointerEvents: 'none', 
        transition: 'border-color .2s ease-in-out, background-color .2s ease-in-out'
    }

    const innerStyle:React.CSSProperties = {
        width: innerWidth, height: innerWidth, 
        backgroundColor: curColorScheme.accent,
        filter: 'invert(1)',
        border: "100px",
        borderRadius: "50%",
        position: "absolute",
        zIndex: "1000", 
        pointerEvents: 'none', 
        transition: 'border-color .2s ease-in-out, background-color .2s ease-in-out'
    }

    return (
    <ColorSchemeContext.Provider value={curColorScheme}>
    <div onScroll={(ev) => ev.preventDefault()} style={{ position: "relative", padding: "20px", display: "flex", flexDirection: "row", 
        background: `linear-gradient(${curColorScheme.background} 90%, ${curColorScheme.background}, ${curColorScheme.accent})`, 
        color: curColorScheme.font}}>
        <div className="page-grain" style={{position: 'absolute', top: '0', right: '0', width: "100%", height: "100%", pointerEvents: 'none', zIndex: "1000"}} />
        <div className="cursor-outer" style={outerStyle}></div> 
        <div className="cursor-inner" style={innerStyle} />
        
        
        <nav style={sideNavStyle}>
            <div id="profileImgGroup" className="slide-up" style={{display: 'flex', flexDirection: "column", alignItems: "center", color: curColorScheme.accent}}>
                <div style={{textAlign: "center", fontWeight: "bolder", marginBottom: "8px"}}><p>{curTime[0]}</p><p>{curTime[1]}</p></div>
                <h3>Kevin Akumuo</h3>
                <img src="./resources/profile_kevin.jpg" style={{width: "100px", height: "100px", objectFit: "cover", alignSelf: "center", marginTop: "1vh"}}/>
            </div>
            <div className="slide-up" style={{display: 'grid', gridTemplateRows: contentList.map(_ => "auto").join(" "), gap: "10px", marginRight: "auto", marginLeft: "auto", width: "80%"}}>
                {contentList.map((item, itemI) => 
                    <SidebarButton key={itemI} animationStyle={{animationDuration: `${1 * (itemI + 1)}s`}} contentData={item} isSelected={itemI == curContentPage} onClick={(ev) => anchorBehavior(ev, itemI)} />
                )}
            </div>
            <div className="slide-up" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                <p className="slide-up" style={{alignItems: 'center', display: 'grid', gridTemplateColumns: "auto auto", color: curColorScheme.background, gap: '4px'}} >
                    <MatIcons.LightMode /> Light</p>
                <input  className="slide-up" type="range" min={0} max={colorSchemes.length-1} value={targetScheme} style={{writingMode: "vertical-lr", direction: "rtl", verticalAlign: "middle"
                        ,   background: "linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%)"
                        , color: curColorScheme.font}} 
                    onChange={ev => handleColorSchemeUpdate(ev.target.value)} />
                <p className="slide-up" style={{alignItems: 'center', display: 'grid', gridTemplateColumns: "auto auto", gap: '4px', color: curColorScheme.background}} >
                     <MatIcons.DarkMode /> Dark</p>
            </div>
            <div style={{position: 'relative', display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                <a className="slide-up hover-slideup" href="https://github.com/kakumuo" target="_blank"><MatIcons.GitHub className="clickable" htmlColor={curColorScheme.accent} /></a>
                <a className="slide-up hover-slideup" href="https://www.linkedin.com/in/kevin-akumuo/" target="_blank"><MatIcons.LinkedIn className="clickable" htmlColor={curColorScheme.accent} /></a>
            </div>
        </nav>

        <main style={{marginLeft: sidebarWidth}}>
            {contentList.map((item, itemI) => {
                let height = "100vh"
                if(itemI == 0)
                    height = "100vh"
                if(itemI == contentList.length - 1)
                    height = "auto"
                return <ContentGroup key={itemI} height={height} title={item.title} href={item.ref}>{item.page}</ContentGroup>
            })}
        </main>
        
        <footer style={{height: "50px", display: "block"}}>

        </footer>
    </div>
    </ColorSchemeContext.Provider>
    )
    
}

const ContentGroup = ({title, href, children, height="85vh"}:{title:string, href:string, height?:string, children:any}) => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    return <div style={{minHeight: height, alignItems: "start", display: 'flex', flexDirection: "column", paddingLeft: "24px"}}>
        <a className="contentTitleAnchor" id={href} style={{height: "8vh"}} />
        <h1 className="contentTitle slide-in" style={{color: curColorScheme.primary}}>{title}</h1>
        {children}
    </div>
}


const SidebarButton = ({contentData, animationStyle, isSelected=false, onClick}:{contentData:ContentPaneType, animationStyle:React.CSSProperties, isSelected:boolean, onClick:(ev:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>void}) => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    const sidebarButtonStyle:React.CSSProperties = {
        width: "100%",
        height: "40px", 
        border: "none",
        borderColor: "black",
        textDecoration: 'none',
        backgroundColor: "#00000000",
        color: curColorScheme.background,
        fontWeight: "1000",
        fontSize: "15px",
        letterSpacing: "2px",
    }

    const [targetClass, setTargetClass] = React.useState("")


    const handleMouseEnter = () => {
        setTargetClass("navBtn-hover")
    }

    const handleMouseLeave = () => {
        setTargetClass("")
    }

    return (
        <a className={`navBtn ${isSelected ? 'navBtn-selected' : targetClass}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
        style={{display: "flex", position: "relative", ...animationStyle, textDecorationLine: "none", color: curColorScheme.accent}} 
        onClick={(ev) => onClick(ev)} 
        href={`index.html#${contentData.ref}`}>
            <div className=""/>
            <button className="slide-up clickable" style={{...sidebarButtonStyle}}>{contentData.title}</button>
        </a>
    )
}
