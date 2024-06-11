import React from "react"
import { ColorSchemeContext } from "../app"

export const ContactMe = () => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    return <form action="mailto:akumuok@gmail.com" 
        style={{display: "flex", width: "100%", height: "20vh"
        , alignItems: 'center', justifyContent: "center", gap: "20px"}}>
        <p>Let me know if you have any questions or concerns!</p>
        <input type="submit" className="clickable" style={{
                width: "auto", border: "none", backgroundColor: curColorScheme.secondary, color: curColorScheme.font, letterSpacing: "4px", fontWeight: "bolder",
                padding: "20px"
        }}
            value={"Email"}></input>
    </form>
}

const FormItem = ({title, type='text'}:{title:string, type?:'text'|'textField'}) => {
    return <div style={{display: 'grid', gridTemplateRows: "auto auto", width: "100%"}}>
        <h2>{title}</h2>
        {type == 'text' ? <input /> : <textarea style={{height: "20vh"}} />}
    </div>
}