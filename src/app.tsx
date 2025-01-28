import React from 'react'
import * as MUIcons from '@mui/icons-material'
import './style.css'
import { CardData, CardList, NavLink, PageSection } from './Components'


const sideNavOptions:{label:string, icon:React.JSX.Element, link:string}[] = [
    {label: "LinkedIn", icon: <MUIcons.LinkedIn />, link: 'https://www.linkedin.com/in/kevin-akumuo/'}, 
    {label: "GitHub", icon: <MUIcons.GitHub />, link: 'https://github.com/kakumuo/'}, 
    {label: "Leetcode", icon: <MUIcons.Code />, link: 'https://leetcode.com/u/foxfen23/'}, 

]

const topNavOptions:{number:number, label:string, link:string}[] = [
   {number: 0, label: "About", link:"#about-section"}, 
   {number: 1, label: "Projects", link:"#projects-section"}, 
   {number: 2, label: "Experience", link:"#experience-section"}
]


type ProjectDetails = {
    title:string, 
    desc:string, 
    link:string, 
    thumbnail:string, 
    techUsed:string[], 
    devAt:string, 
    year:number, 
}

const projectData: ProjectDetails[] = [
    {
      title: "EcoTrack",
      desc: "A mobile app for tracking personal carbon footprint and suggesting eco-friendly alternatives.",
      link: "https://github.com/username/ecotrack",
      thumbnail: "https://placehold.co/600x400/EEE/31343C",
      techUsed: ["React Native", "Node.js", "MongoDB", "AWS"],
      devAt: "Green Solutions Inc.",
      year: 2024
    },
    {
      title: "MindfulMe",
      desc: "A web-based meditation and mindfulness platform with guided sessions and progress tracking.",
      link: "https://mindfulme.app",
      thumbnail: "https://placehold.co/100x400/EEE/31343C",
      techUsed: ["Vue.js", "Express", "PostgreSQL", "Docker"],
      devAt: "Wellness Tech Startup",
      year: 2023
    },
    {
      title: "SmartHome Hub",
      desc: "An IoT solution for integrating and controlling various smart home devices through a single interface.",
      link: "https://smarthomehub.io",
      thumbnail: "https://example.com/images/smarthomehub-thumb.jpg",
      techUsed: ["Python", "Raspberry Pi", "MQTT", "React", "GraphQL"],
      devAt: "ConnectedLiving Labs",
      year: 2025
    },
    {
      title: "CodeMentor AI",
      desc: "An AI-powered coding assistant and tutor for beginner programmers.",
      link: "https://github.com/username/codementor-ai",
      thumbnail: "https://example.com/images/codementor-thumb.png",
      techUsed: ["Python", "TensorFlow", "Flask", "Angular", "OpenAI API"],
      devAt: "EduTech Innovations",
      year: 2024
    },
    {
      title: "UrbanFarmer",
      desc: "A mobile app for managing urban gardens and connecting local food producers with consumers.",
      link: "https://urbanfarmer.app",
      thumbnail: "https://example.com/images/urbanfarmer-thumb.jpg",
      techUsed: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
      devAt: "Sustainable City Solutions",
      year: 2023
    }
];


type ExperienceDetails = {
    startDate:Date, 
    endDate?:Date, 
    jobTitle:string, 
    location:string, 
    desc:string, 
    techUsed:string[], 
    jobLink:string,
}

const experienceData: ExperienceDetails[] = [
    {
      startDate: new Date('2022-03-15'),
      jobTitle: 'Senior Full Stack Developer',
      location: 'Bringa',
      desc: 'Led a team of developers in creating scalable web applications for fintech clients. Implemented microservices architecture and improved system performance by 40%.',
      techUsed: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
      jobLink: 'https://example.com/senior-fullstack-dev'
    },
    {
      startDate: new Date('2019-07-01'),
      endDate: new Date('2022-03-14'),
      jobTitle: 'Frontend Developer',
      location: 'FedCorp',
      desc: 'Developed responsive user interfaces for e-commerce platforms. Collaborated with UX designers to implement pixel-perfect designs and improve user engagement.',
      techUsed: ['Vue.js', 'JavaScript', 'SASS', 'Webpack', 'Jest'],
      jobLink: 'https://example.com/frontend-dev'
    },
    {
      startDate: new Date('2019-01-10'),
      endDate: new Date('2019-06-30'),
      jobTitle: 'Junior Software Engineer',
      location: 'Space Industries',
      desc: 'Assisted in the development of backend services for a social media analytics tool. Implemented RESTful APIs and contributed to database optimization.',
      techUsed: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Git'],
      jobLink: 'https://example.com/junior-software-engineer'
    }
];

const getStartEndDate = (exp:ExperienceDetails):string => {
    const monthMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let startStr = "", endStr = "Present"
    const curDate = new Date(); 

    startStr = monthMap[exp.startDate.getMonth()] 
    if(!(curDate.getFullYear() == exp.startDate.getFullYear() || exp.endDate && exp.endDate.getFullYear() == exp.startDate.getFullYear()))
        startStr += ` ${exp.startDate.getFullYear()}`

    if(exp.endDate){
        endStr = monthMap[exp.endDate.getMonth()] 
        if(curDate.getFullYear() != exp.endDate.getFullYear())
            endStr += ` ${exp.endDate.getFullYear()}`
    }

    return `${startStr} - ${endStr}`
}

export const App = () => {
    const [curSection, setCurSection] = React.useState(0); 
    const [curNav, setCurNav] = React.useState(0); 
    const navRefs = [
        React.createRef<HTMLDivElement>(),React.createRef<HTMLDivElement>(),React.createRef<HTMLDivElement>()
    ]

    const [projectCardData, setProjectCardData] = React.useState(projectData.map(p => {
        return {
          aside: {type: 'img', val: p.thumbnail}, 
          desc: p.desc, 
          tags: p.techUsed, 
          link: p.link,
          title: `${p.title} - ${p.devAt}`
        } as CardData
    }))

    const [cardData, setCardData] = React.useState(experienceData.map(d => {
        return {
            aside: {type: 'text', val: getStartEndDate(d)}, 
            desc: d.desc, 
            tags: d.techUsed,
            link: d.jobLink, 
            title: `${d.jobTitle} - ${d.location}`
        } as CardData
    }))

    const handleNavClick = (navI:number) => {
        console.log(navRefs[navI])
    }

    return <div id='app-content'>
        <header id='header-nav'>
            {topNavOptions.map((nav, navI) => <NavLink 
                onClick={() => handleNavClick(navI)}
                link={nav.link} label={`0${nav.number + 1}. ${nav.label}`} key={navI} 
                isSelected={curNav == nav.number}
            />)}

            {sideNavOptions.map((nav, navI) => <a 
                className='other-link' key={navI} children={nav.icon} 
                href={nav.link}
            />)}
            <a><MUIcons.ColorLens /></a>
        </header>

        <main id='main-content'>
            <PageSection ref={navRefs[0]} id='about-section' title='About'>
                <img src='/resources/profile_kevin.jpg' />
                <div>
                    <h3>Backend Developer</h3>
                    <h1>Kevin Akumuo</h1>
                    <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ab in. Nihil sit repellat impedit voluptates, porro cupiditate provident fuga sequi accusamus, deleniti, dignissimos ipsum itaque saepe quas recusandae perferendis modi! Recusandae magni et, sequi magnam repellendus ducimus quo reiciendis minus possimus minima odio? Eum sed id aut unde quibusdam sit? Recusandae possimus inventore, nihil qui maxime accusantium fuga. Quibusdam qui nobis repellendus optio assumenda! Dicta cumque sunt nesciunt asperiores praesentium ullam error debitis provident est reiciendis commodi nobis ipsam repellat ipsa odit repellendus iusto a vero perferendis sapiente, consequuntur magnam saepe minima quae. Rem pariatur maiores assumenda ab alias!</p>
                </div>
            </PageSection>

            <PageSection ref={navRefs[1]} id='projects-section' title="Projects">
                <CardList data={projectCardData} />
                <p id="more-projects">More Projects</p>
            </PageSection>

            <PageSection ref={navRefs[2]} id='experience-section' title='Experience'>
                <CardList data={cardData} />
                <p id="show-resume">View Resume</p>
            </PageSection>
        </main>
    </div>
}


