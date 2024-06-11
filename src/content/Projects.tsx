
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
        title: "Lorem, ipsum dolor 1",
        imagePath: "/resources/placeholder1.jpg",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"],
        projectLink: 'https://www.google.com', 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 2",
        imagePath: "/resources/placeholder2.webp",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 3",
        imagePath: "/resources/placeholder1.jpg",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 3",
        imagePath: "/resources/placeholder1.jpg",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 3",
        imagePath: "/resources/placeholder1.jpg",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 2",
        imagePath: "/resources/placeholder2.webp",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 2",
        imagePath: "/resources/placeholder2.webp",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }, 
    {
        title: "Lorem, ipsum dolor 3",
        imagePath: "/resources/placeholder1.jpg",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla voluptas ducimus nihil, reiciendis beatae eveniet.",
        softwareUsed: ["Loreipsum", "IpsumLorem"], 
        startMonth: "Jan 2023", 
        endMonth: "Feb 2023"
    }
]

export const Projects = () => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    const [targetShowAmount, setTargetShowAmount] = React.useState(4)
    
    return <div style={{width: "100%", height: "100%"}}>
        <main style={{ display: "flex", flexWrap: "wrap", width: "100%", alignItems: "center", justifyContent: 'center', marginTop: "5vh"}}>
            {projectList.filter((_, i) => i < targetShowAmount).map((projectItem, projectI) => 
                <ProjectItem projectItem={projectItem} animDelayStyle={{animationDuration: `${.4 * (projectI%4)}s`}} />
            )}
        </main>

        <footer style={{display: 'flex', tableLayout: 'fixed', width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: "4vh"}}>
            {!(targetShowAmount == projectList.length) && 
                <button className="showMoreButton clickable" style={{
                    width: "auto", border: "none", backgroundColor: curColorScheme.secondary, color: curColorScheme.font, letterSpacing: "4px", fontWeight: "bolder",
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
        <p style={{fontSize: "15px", color: curColorScheme.secondary}}>{`${projectItem.startMonth} - ${projectItem.endMonth}`}</p>
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
        backgroundColor: curColorScheme.secondary,
        padding: "4px", 
        borderRadius: "8px",
        fontSize: '10px', 
        fontWeight: "bolder"
    }
    return <p style={tagStyle}>{title}{closable && <button onClick={onClose}>X</button>}</p>
}