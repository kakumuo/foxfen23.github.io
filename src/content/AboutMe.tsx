import React from "react"
import {Tag} from './Projects'
import { ColorSchemeContext } from "../app"

type AboutItem = {
    title:string, 
    subtitle1:string, 
    subtitle2?:string,
    date:{startDate:string, endDate:string}, 
    description:string, 
    imagePath:string,
    tags:string[]
}

const aboutItemList:AboutItem[] = [
    {
        title: 'Lorem, ipsum', 
        subtitle1: 'Lorem ipsum dolor sit',
        date: {
            startDate: "Sept 2015",
            endDate: "Sept 2019" 
        },
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellendus 
        nulla odio laudantium sint? Odit placeat tenetur dolore nesciunt consectetur recusandae 
        eaque molestias labore sapiente nulla officia cum ullam ducimus necessitatibus nemo quis 
        quae, sunt velit laudantium consequuntur, at itaque? Harum atque commodi eum nesciunt 
        nemo veniam sapiente esse perspiciatis?`,
        imagePath: "/resources/placeholder1.jpg", 
        tags: ["test1", "test2"]
    }, 
    {
        title: 'Lorem, ipsum dolor', 
        subtitle1: 'Lorem ipsum dolor sit',
        subtitle2: 'Lorem ipsum dolor sit dolor sit',
        date: {
            startDate: "Sept 2015",
            endDate: "Sept 2019" 
        },
        description: `Officia cum ullam ducimus necessitatibus nemo quis 
        quae, sunt velit laudantium consequuntur, at itaque? Harum atque commodi eum nesciunt 
        nemo veniam sapiente esse perspiciatis?`,
        imagePath: "/resources/placeholder1.jpg", 
        tags: ["test1", "test2"]
    }, 
    {
        title: 'Lorem, ipsum dolor', 
        subtitle1: 'Lorem ipsum dolor sit',
        date: {
            startDate: "Sept 2015",
            endDate: "Sept 2019" 
        },
        description: `Officia cum ullam ducimus necessitatibus nemo quis 
        quae, sunt velit laudantium consequuntur, at itaque? Harum atque commodi eum nesciunt 
        nemo veniam sapiente esse perspiciatis?`,
        imagePath: "/resources/placeholder1.jpg", 
        tags: ["test1", "test2"]
    }
]

export const AboutMe = () => {
    return <div style={{marginTop: "2vh"}}>
        {aboutItemList.map((aboutItem, aboutI) => <TimelineItem aboutItem={aboutItem} isLastItem={aboutI == aboutItemList.length - 1} />)}
    </div>
}


const TimelineItem = ({aboutItem, isLastItem}:{aboutItem:AboutItem, isLastItem:boolean}) => {
    const curColorScheme = React.useContext(ColorSchemeContext)
    const marginHeight = "10vh"
    const markerDiam = "1vw"
   return (<div className="timelineItem anim-cascade" style={{display: "grid", gridTemplateColumns: "auto auto auto", gap: "48px", marginBottom: `${isLastItem ? 0 : marginHeight}`, borderRight: `solid ${curColorScheme.accent} 4px`}}>
    {/* timeline */}
    <div style={{position: 'relative', transform: "translateY(50%)", marginLeft: "3vw"}}>
        <div style={{border: "solid", backgroundColor: curColorScheme.accent, borderColor: curColorScheme.accent, width: markerDiam, height: markerDiam, borderRadius: markerDiam}} />
        <div style={{transform: "translateY(-.5vw)", backgroundColor: curColorScheme.accent, borderColor: curColorScheme.accent, borderRight: "solid", borderLeft: 'solid', height:`${isLastItem ? '0' : `calc(100% + ${marginHeight})`}`, width: ".5vw", marginLeft: "auto", marginRight: "auto"}} />
    </div>

    <div style={{position: "relative"}}>
        <img style={{position: "absolute",height: "200px"}} src={aboutItem.imagePath}/>
        <div style={{
            border: "solid 2px",
            borderColor: curColorScheme.accent, 
            width: "200px", height: "200px", transform: "translate(4%, 4%)"
        }} />
    </div>

    <div style={{fontSize: "larger", display: "flex", flexDirection: 'column', justifyContent: "end"}}>
        <h2 style={{color: curColorScheme.primary}}>{aboutItem.title}</h2>
        <h5 style={{color: curColorScheme.secondary}}>{aboutItem.subtitle1}</h5>
        {aboutItem.subtitle2 && <h6>{aboutItem.subtitle2}</h6>}
        <h6 style={{color: curColorScheme.accent}}>{`${aboutItem.date.startDate}-${aboutItem.date.endDate}`}</h6>
        <p>{aboutItem.description}</p>
        <div style={{display: "flex", gap: "4px", marginTop: "10px"}}>{aboutItem.tags.map(tag => <Tag title={tag}/>)}</div>
    </div>

   
</div>) 
}