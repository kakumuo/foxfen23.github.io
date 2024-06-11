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
    {primary: "#ffffff", secondary: "#ffe8d1", background: "#ffffff", font: "#568ea3", accent: "#68c3d4" },
    {primary: "#fdf0d5", secondary: "#c6d8d3", background: "#fdf0d5", font: "#3a3335", accent: "#d81e5b" },
    {primary: "#f1ffe7", secondary: "#44cf6c", background: "#f1ffe7", font: "#32a287", accent: "#6c464e" },
    {primary: "#edf6f9", secondary: "#83c5be", background: "#edf6f9", font: "#006d77", accent: "#e29578" },
    {primary: "#ffc4eb", secondary: "#ffe4fa", background: "#f1dedc", font: "#e1dabd", accent: "#abc798" },
    {primary: "#ddd8b8", secondary: "#b3cbb9", background: "#ddd8b8", font: "#84a9c0", accent: "#6a66a3" },
    {primary: "#d1faff", secondary: "#9bd1e5", background: "#d1faff", font: "#6a8eae", accent: "#57a773" },
    {primary: "#d782ba", secondary: "#e18ad4", background: "#eeb1d5", font: "#efc7e5", accent: "#e0efda" },
    {primary: "#d1ccdc", secondary: "#424c55", background: "#f5edf0", font: "#886f68", accent: "#3d2c2e" },
    {primary: "#bce784", secondary: "#5dd39e", background: "#bce784", font: "#348aa7", accent: "#525174" },
    {primary: "#8783d1", secondary: "#aa9aba", background: "#bfa4a4", font: "#d1abad", accent: "#e3b9bc" },
    {primary: "#eca400", secondary: "#eaf8bf", background: "#eca400", font: "#006992", accent: "#27476e" },
    {primary: "#582707", secondary: "#972d07", background: "#ff4b3e", font: "#ffb20f", accent: "#ffe548" },
    {primary: "#524632", secondary: "#8f7e4f", background: "#c3c49e", font: "#d8ffdd", accent: "#dedbd8" },
    {primary: "#4e3d42", secondary: "#6d6466", background: "#9f9f92", font: "#c9d5b5", accent: "#e3dbdb" },
    {primary: "#1b1b3a", secondary: "#693668", background: "#a74482", font: "#f84aa7", accent: "#ff3562" },
    {primary: "#0a2342", secondary: "#2ca58d", background: "#84bc9c", font: "#fffdf7", accent: "#f46197" },
    {primary: "#6a0136", secondary: "#bfab25", background: "#b81365", font: "#026c7c", accent: "#055864" },
    {primary: "#020202", secondary: "#503b31", background: "#705d56", font: "#9097c0", accent: "#a7bbec" }
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
        borderColor: curColorScheme.font,
        borderRadius: "50%",
        display: 'block',
        position: "absolute", 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: "1000", 
        pointerEvents: 'none', 
        transition: 'border-color .2s ease-in-out, background-color .2s ease-in-out'
    }

    const innerStyle:React.CSSProperties = {
        width: innerWidth, height: innerWidth, 
        backgroundColor: curColorScheme.primary,
        borderRadius: "50%",
        position: "absolute",
        zIndex: "1000", 
        pointerEvents: 'none', 
        transition: 'border-color .2s ease-in-out, background-color .2s ease-in-out'
    }

    return (
    <ColorSchemeContext.Provider value={curColorScheme}>
    <div onScroll={(ev) => ev.preventDefault()} style={{ position: "relative", padding: "20px", display: "flex", flexDirection: "row", 
        background: `linear-gradient(${curColorScheme.background} 60%, ${curColorScheme.background}, ${curColorScheme.accent})`, 
        color: curColorScheme.font}}>
        <div className="cursor-outer" style={outerStyle}></div>
        <div className="cursor-inner" style={innerStyle} />
        
        
        <nav style={sideNavStyle}>
            <div id="profileImgGroup" className="slide-up" style={{display: 'flex', flexDirection: "column", alignItems: "center", color: curColorScheme.accent}}>
                <div style={{textAlign: "center", fontWeight: "bolder", marginBottom: "8px"}}><p>{curTime[0]}</p><p>{curTime[1]}</p></div>
                <h3>Kevin Akumuo</h3>
                <img src="/resources/profile_kevin.jpg" style={{width: "100px", height: "100px", objectFit: "cover", alignSelf: "center"}}/>
            </div>
            <div className="slide-up" style={{display: 'grid', gridTemplateRows: contentList.map(_ => "auto").join(" "), gap: "10px", marginRight: "auto", marginLeft: "auto", width: "80%"}}>
                {contentList.map((item, itemI) => 
                    <SidebarButton key={itemI} animationStyle={{animationDuration: `${1 * (itemI + 1)}s`}} contentData={item} isSelected={itemI == curContentPage} onClick={(ev) => anchorBehavior(ev, itemI)} />
                )}
            </div>
            <div className="slide-up" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                <p className="slide-up" > Light</p>
                <input  className="slide-up" type="range" min={0} max={colorSchemes.length-1}
                    style={{writingMode: "vertical-lr", direction: "rtl", verticalAlign: "middle"
                        ,   background: "linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%)"
                        , color: curColorScheme.font}} 
                    onChange={ev => handleColorSchemeUpdate(ev.target.value)} />
                <p className="slide-up" >Dark</p>
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
        color: curColorScheme.font,
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
        href={`page.html#${contentData.ref}`}>
            <div className=""/>
            <button className="slide-up clickable" style={{...sidebarButtonStyle}}>{contentData.title}</button>
        </a>
    )
}
