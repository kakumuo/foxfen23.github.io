
import React from "react"




type ProjectItemData = {
    title:string, 
    imagePath:string, 
    description:string, 
    softwareUsed:string[]
}

const projectList:ProjectItemData[] = [
    {
        title: "Ludo Card Game",
        imagePath: "/resources/ludo.webp",
        description: "Created a board game in Godot with gameplay elements from Ludo and traditional deck building games.",
        softwareUsed: ["Godot", "GDScript"]
    },
    {
        title: "Smart Home Web Server",
        imagePath: "/resources/smarthome.jpg",
        description: "Created a web server application for managing multiple smart home bulbs and motion sensors. Realtime data of motion sensors is collected through RocketMQ.",
        softwareUsed: ["HTML", "CSS", "JavaScript", "Python"]
    },
    {
        title: "Smart Lighting Client",
        imagePath: "/resources/smartlighting.webp",
        description: "Developed a desktop client through Java to connect to smart bulbs and light strips. Application allows for color customization and lighting synchronization to videos.",
        softwareUsed: ["Java"]
    },
    {
        title: "Transportation Modelling",
        imagePath: "/resources/transportationmodelling.jpg",
        description: "Assisted in creating an analytics platform for the KPF Architecture Firm to ingest ArcGIS data and generate metrics related to walkability, sunlight, foot traffic etc.",
        softwareUsed: ["Python", "Rhino"]
    },
    {
        title: "Linux Terminal Through C",
        imagePath: "/resources/linux.jpg",
        description: "Created a C program to mimic a Linux terminal, making use of the Cygwin library for command execution and Posix library for parallel processing.",
        softwareUsed: ["C"]
    },
    {
        title: "Pong with Machine Learning",
        imagePath: "/resources/pong.png",
        description: "Used Unity’s ML agents library to create an AI opponent for a pong-like microgame.",
        softwareUsed: ["C#", "Unity"]
    },
    {
        title: "Color Palette Generator",
        imagePath: "/resources/colorpalette.jpg",
        description: "Used k-means clustering techniques to identify a color palette from a photograph.",
        softwareUsed: ["Python"]
    }    
]

export const Projects = () => {
    const [searchTags, setSearchTags] = React.useState<string[]>([])
    const searchRef = React.useRef<HTMLInputElement>(null)

    const handleSearch = (ev:React.KeyboardEvent<HTMLInputElement>) => {
        if(searchRef.current && searchRef.current.value && ev.key == 'Enter'){
            setSearchTags([...searchTags, searchRef.current.value])
            searchRef.current.value = ""
        }
    }

    const handleCloseSearchTag = (searchTagI:number) => {
        setSearchTags(searchTags.filter((_, i) => i != searchTagI))
    }

    return <div style={{width: "100%", height: "100%"}}>
        <header>
            <input type="search" ref={searchRef} onKeyDown={ev => handleSearch(ev)}/>
            <div id="tagList" style={{display: "flex", gap: "10px", height: "4vh", alignItems: "center"}}>
                {searchTags.map((searchTag, i) => <Tag title={searchTag} closable onClose={() => handleCloseSearchTag(i)}/>)}
            </div>
        </header>

        <main style={{border: "solid", display: "flex", flexWrap: "wrap", alignItems: "center"}}>
            {projectList.map(projectItem => 
                <ProjectItem 
                    title={projectItem.title} 
                    imagePath={projectItem.imagePath} 
                    description={projectItem.description}
                    tags={projectItem.softwareUsed}
                />
            )}
        </main>

        <footer>
            <button>Previous</button>

            <button>Next</button>
        </footer>
    </div>
}


const Tag = ({title, color, closable, onClose}:{title:string, color?:string, closable?:boolean, onClose?:()=>void}) => {
    return <p>{title}{closable && <button onClick={onClose}>X</button>}</p>
}

const ProjectItem = ({imagePath, title, description, tags}:{imagePath:string, title:string, description:string, tags:string[]}) => {
    return  <div style={{width: "300px", height: "300px", margin: "10px"}}>
        <img style={{width: "300px", height: "200px", objectFit: "cover"}} src={imagePath} alt="" />
        <h3>{title}</h3>
        <p>{description}</p>
        <div style={{display: "flex"}}>{tags.map(tag => <Tag title={tag} />)}</div>
    </div>
}