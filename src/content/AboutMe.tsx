import React from "react"
import {Tag} from './Projects'
import { ColorSchemeContext } from "../app"
import { Important } from "./Home"
import '../styles.css'

type AboutItem = {
    title:string, 
    subtitle1:string, 
    subtitle2?:string,
    date:{startDate:string, endDate:string}, 
    description:React.JSX.Element, 
    imagePath:string,
    tags:string[]
}

const aboutItemList:AboutItem[] = [ 
    {
        title: 'Applications Developer I & II', 
        subtitle1: 'United Parcel Service (UPS)',
        date: {
            startDate: "Feb 2024",
            endDate: "May 2021" 
        },
        description: <>
            I created Jenkins pipelines for <Important> SSIS/TSQL </Important> deployments and code refactoring as well as developed <Important> Marketo-Salesforce </Important> ETL and recovered lost email-account relationships.
            Participated in management training on leadership, goals, and conflict resolution.
            Performed database maintenance, Log4J removal, and audits. Assisted with ETL processes for contact/case extracts and lead preference management between Marketo environments. 
            Supported auto-delete process for Marketo records. Audited user email preferences against MSSQL DB. 
            Aided knowledge transfer and ETL/JBoss Fuse process development. Deployed ETL pushing around <Important> 80m UPS.com contacts </Important> to Salesforce whilst deduplicating. 
            Additionally, I assisted JBoss Fuse upgrade and maintenance projects like <Important> database failovers </Important>.
        </>,
        imagePath: "./resources/ups.png", 
        tags: ['GIT', 'Jenkins', 'SSIS', 'MSSQL', 'Management Training', 'Linux', 'Java', 'Salesforce', 'Marketo']
    },
    {
        title: 'Software Developer I & II', 
        subtitle1: 'United Parcel Service (UPS)',
        date: {
            startDate: "May 2021",
            endDate: "Sept 2019" 
        },
        description: <>
            I orchestrated seamless <Important> MSSQL/SSIS </Important> deployments via <Important> Git/Jenkins </Important> pipelines and populated Marketo with customer data. 
            Exploring the Mulesoft Anypoint Platform, I created Mule ESB proof of concepts while fortifying Linux servers with <Important> renewed certificates </Important> and <Important> encryption </Important>.
            Embracing Agile rhythms through sprint/retrospective training, I optimized software delivery with <Important> Jenkins </Important> pipelines for <Important> TFS/Nexus </Important> deployments.
        </>,
        imagePath: "./resources/ups.png", 
        tags: ['GIT', 'Jenkins', 'MSSQL', 'Salesforce', 'Mulesoft', 'Linux', 'Java', 'Agile/Scrum', 'Marketo', 'SSIS', 'TFS']
    },
     {
        title: 'Software Developer Intern', 
        subtitle1: 'United Parcel Service (UPS)',
        date: {
            startDate: "June 2019",
            endDate: "Sept 2019" 
        },
        description: <>
            I worked on a process to regularly upload contact data from an <Important> MSSQL database </Important> to an 
            <Important> iPaaS solution</Important>. Additionally, I aided in testing and migrating 
            a REST API upload process to a <Important> BULK API </Important> within the <Important>Fuse ESB</Important>.
            Furthermore, I assisted in developing a mock-up of a <Important> digital badge system </Important> for
            a 2019 Hackathon and presented my 2019 UPS Hackathon and Internship project to 
            the then CI/EO, <Important>Juan Perez</Important>.
        </>,
        imagePath: "./resources/ups_intern.jpg", 
        tags: ["MSSQL", "Java", "Marketo"]
    }, 
    {
        title: 'Undergraduate Teaching Assistant', 
        subtitle1: 'New Jersey Institute of Technology',
        date: {
            startDate: "Sept 2017",
            endDate: "Sept 2019" 
        },
        description: <>
            As a teaching assistant, I facilitated communication between the professor and 
            over <Important> 50 students </Important> across <Important> 6 sections </Important> for the 
            <Important> Data Structures and Algorithms </Important>courses,
            ensuring smooth functioning. I assisted students after class hours to reinforce 
            lessons and complete assignments. Outside of class, I maintained communication 
            with students through online chat, providing information on assignments, 
            practice exercises, and relevant<Important> IT articles </Important>. I also aided the professor by verifying 
            assignment accuracy and giving feedback on <Important> code quality </Important> 
            and <Important> completeness </Important>.
        </>,
        imagePath: "./resources/classroom.jpg", 
        tags: ["Java"]
    }, 
    {
        title: 'Education', 
        subtitle1: 'New Jersey Institute of Technology (NJIT)',
        date: {
            startDate: "Sept 2015",
            endDate: "Sept 2019" 
        },
        description: <>
            I graduated from the <Important>New Jersey Institute of Technology</Important> with a 
            <Important> Bachelor of Science in Computer Science </Important> 
            and a minor in <Important>Applied Mathematics</Important>. During my time at NJIT, I delved into various courses, 
            including 
            <Important> Data Structures and Algorithms </Important>, 
            <Important> Database Systems </Important> , Intensive Programming in Linux, 
            <Important> Intensive Programming in Linux </Important>
            and <Important> Introduction to Artificial Intelligence </Important>.
        </>,
        imagePath: "./resources/njit.jpg", 
        tags: ["Java", "C++", "Linux", "Bash", "Python"]
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
        <div style={{border: "solid", color: curColorScheme.accent, backgroundColor: curColorScheme.accent, borderColor: curColorScheme.accent, width: markerDiam, height: markerDiam, borderRadius: markerDiam}} />
        <div style={{transform: "translateY(-.5vw)", color: curColorScheme.accent,backgroundColor: curColorScheme.accent, borderColor: curColorScheme.accent, borderRight: "solid", borderLeft: 'solid', height:`${isLastItem ? '0' : `calc(100% + ${marginHeight})`}`, width: ".5vw", marginLeft: "auto", marginRight: "auto"}} />
    </div>

    <div style={{position: "relative"}}>
        <img style={{position: "absolute", width: "200px",height: "200px", objectFit: 'cover'}} src={aboutItem.imagePath}/>
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