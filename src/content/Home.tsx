import { CSSProperties } from "react"
import '../styles.css'
import { ColorSchemeContext } from "../app"
import React from "react"
import { Row } from "antd"

export const Home = () => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    return <div style={{width: "100%", animationDuration: "10s", marginTop: "20px"}}>
        <p className="stretch-and-slide" style={{fontSize: "20px", fontWeight: 1000, animationDuration: "1s", borderRightColor: curColorScheme.accent, color: curColorScheme.accent}}>
            Hi, my name is
        </p>
        <p className="stretch-and-slide" style={{fontSize: "50px", animationDuration: ".2s", borderRightColor: curColorScheme.accent}}>
            <Important>Kevin Akumuo</Important>
        </p>
        <p className="stretch-and-slide" style={{fontSize: "30px", animationDuration: ".6s", borderRightColor: curColorScheme.accent}}> and I specialize in <Important>Backend Development</Important></p>
        <p className="stretch-and-slide" style={{fontSize: "20px", animationDuration: "1s", borderRightColor: curColorScheme.accent}}>
            I've been a professional developer for about <Important>{new Date().getFullYear() - 2019} years</Important>.
            My journey in the tech world has been exciting, and I thrive on challenges that push me 
            to <Important>grow</Important> and <Important>innovate</Important>.
        </p>
    </div>
}


export const Important = ({children}:{children:any}) => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    const [isHovered, setIsHovered] = React.useState(false)
    const normalStyle:React.CSSProperties = {
        fontWeight:"1000" 
    }
    const hoverStyle:React.CSSProperties = {
        color: curColorScheme.accent
    }

    let targetStyle = normalStyle
    if(isHovered) targetStyle = {...targetStyle, ...hoverStyle}

    return <span style={{...targetStyle}} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>{children}</span>
}


