
import React from "react"
import * as MatIcon from '@mui/icons-material'
import '../styles.css'
import { ColorSchemeContext } from "../app"




type ProjectItemData = {
    title:string, 
    imagePath:string, 
    startMonth:string,
    endMonth:string,
    description:string, 
    projectLink?:string,
    softwareUsed:string[]
}

const projectList:ProjectItemData[] = [
    {
        title: "Ludo Card Game",
        imagePath: "./resources/ludo.webp",
        description: "Created a board game in Godot with gameplay elements from Ludo and traditional deck building games.",
        softwareUsed: ["Godot", "GodotScript"],
        startMonth: "Sept 2023", 
        endMonth: "Oct 2023"
    }, 
    {
        title: "Smart Home Web Server",
        imagePath: "./resources/smarthome.jpg",
        description: "Created a web server application for managing multiple smart home bulbs and motion sensors. Realtime data of motion sensors is collected through RocketMQ.",
        softwareUsed: ["Python", "RocketMQ", "Javascript", "HTML", "CSS"], 
        startMonth: "Oct 2022", 
        endMonth: "Nov 2022"
    }, 
    {
        title: "Smart Lighting Client",
        imagePath: "./resources/smartlighting.webp",
        description: "Developed a desktop client through Java to connect to smart bulbs and light strips. Application allows for color customization and lighting synchronization to videos.",
        softwareUsed: ["Java"], 
        startMonth: "Nov 2020", 
        endMonth: "Nov 2020"
    }, 
    {
        title: "Transportation Modelling",
        imagePath: "./resources/transportationmodelling.jpg",
        description: "Assisted in creating an analytics platform for the KPF Architecture Firm to ingest ArcGIS data and generate metrics related to walkability, sunlight, foot traffic etc.",
        softwareUsed: ["Rhino", "Python"], 
        startMonth: "Jan 2019", 
        endMonth: "June 2019"
    }, 
    {
        title: "Linux Terminal Through",
        imagePath: "./resources/linux.jpg",
        description: "Created a C program to mimic a Linux terminal, making use of the Cygwin library for command execution and Posix library for parallel processing.",
        softwareUsed: ["C", "Linux"], 
        startMonth: "Jan 2019", 
        endMonth: "Jan 2019"
    }, 
    {
        title: "Pong with Machine Learning",
        imagePath: "./resources/pong.png",
        description: "Used Unity’s ML agents library to create an AI opponent for a pong-like microgame.",
        softwareUsed: ["Unity", "Unity ML Agents"], 
        startMonth: "Dec 2019", 
        endMonth: "Dec 2019"
    }, 
    {
        title: "Color Palette Generator",
        imagePath: "./resources/colorpalette.jpg",
        description: "Used k-means clustering techniques to identify a color palette from a photograph.",
        softwareUsed: ["Python"], 
        startMonth: "June 2018", 
        endMonth: "June 2018"
    }
]

export const Projects = () => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    const [targetShowAmount, setTargetShowAmount] = React.useState(4)
    
    return <div style={{width: "100%", height: "100%"}}>
        <main style={{ display: "flex", flexWrap: "wrap", width: "100%", alignItems: "start", justifyContent: 'center', marginTop: "5vh"}}>
            {projectList.filter((_, i) => i < targetShowAmount).map((projectItem, projectI) => 
                <ProjectItem projectItem={projectItem} animDelayStyle={{animationDuration: `${.4 * (projectI%4)}s`}} />
            )}
        </main>

        <footer style={{display: 'flex', tableLayout: 'fixed', width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: "4vh"}}>
            {!(targetShowAmount == projectList.length) && 
                <button className="showMoreButton clickable" style={{
                    width: "auto", border: "none", backgroundColor: curColorScheme.secondary, color: curColorScheme.background, letterSpacing: "4px", fontWeight: "bolder",
                    padding: "20px"
                }} onClick={() => setTargetShowAmount(projectList.length)}>Show More</button>}
        </footer>
    </div>
}


const ProjectItem = ({projectItem, animDelayStyle}:{projectItem:ProjectItemData, animDelayStyle:React.CSSProperties}) => {
    const curColorScheme = React.useContext(ColorSchemeContext)

    const imagePath:string = projectItem.imagePath;
    const title:string = projectItem.title;
    const description:string = projectItem.description;
    const tags:string[] = projectItem.softwareUsed;
    const link:string|undefined = projectItem.projectLink;

    const projectItemStyle:React.CSSProperties = {
        position:"relative", display: "flex", 
        flexDirection: "column", alignItems: "start", 
        width: "20%", margin: "10px", padding: "8px",
        gap: "4px", ...animDelayStyle,
        borderColor: curColorScheme.accent
    }

   return  <div className="project-card slide-in" style={projectItemStyle}>
        <img style={{ alignSelf: 'center', width: "100%", height: "200px", objectFit: "cover"}} src={imagePath} alt="" />
        {link ? 
            <a className="clickable" style={{display: 'flex', gap: "10px", textDecoration: 'none', color: curColorScheme.primary}} href={link} target="_blank">
                <h3 className="clickable">{title}</h3><span><MatIcon.ArrowRightAltRounded /></span>
            </a> 
            : <h3 style={{color: curColorScheme.primary}}>{title}</h3>
        }
        <p style={{fontSize: "15px", color: curColorScheme.accent, fontWeight: "500"}}>{`${projectItem.startMonth} - ${projectItem.endMonth}`}</p>
        <p style={{fontSize: "smaller"}}>{description}</p>
        <div style={{display: "flex", gap: "4px"}}>{tags.map(tag => <Tag title={tag} />)}</div>
    </div>
}

export const Tag = ({title, color, closable, onClose}:{title:string, color?:string, closable?:boolean, onClose?:()=>void}) => {
    const curColorScheme = React.useContext(ColorSchemeContext)

    const tagStyle:React.CSSProperties = {
        border: 'solid 1px',
        borderColor: curColorScheme.accent,
        color: curColorScheme.font,
        backgroundColor: curColorScheme.background,
        padding: "4px", 
        borderRadius: "8px",
        fontSize: '10px', 
        fontWeight: "bolder"
    }
    return <p style={tagStyle}>{title}{closable && <button onClick={onClose}>X</button>}</p>
}