import { CSSProperties } from "react"
import '../styles.css'
import { ColorSchemeContext } from "../app"
import React from "react"

export const Home = () => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    return <div>
        <p className="stretch-and-slide" style={{fontSize: "50px", animationDuration: "1s", borderRightColor: curColorScheme.accent}}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae eius fugit excepturi reprehenderit culpa odio corrupti et cupiditate! In odio unde corrupti qui voluptatibus sit! Et alias commodi quae quasi.
        </p>
    </div>
}


