import React from 'react'
import * as MUIcons from '@mui/icons-material'
import './style.css'
import { CardData, CardList, ColorPickerListItem, Dropdown, LookAt, NavLink, PageSection } from './Components'
import { experienceData, ExperienceDetails, projectData, sampleColorSchemes } from './Details'




const sideNavOptions:{label:string, icon:React.JSX.Element, link:string}[] = [
    {label: "Contact Me", icon: <MUIcons.Mail />, link: 'mailto:akumuok@gmail.com'}, 
    {label: "LinkedIn", icon: <MUIcons.LinkedIn />, link: 'https://www.linkedin.com/in/kevin-akumuo/'}, 
    {label: "GitHub", icon: <MUIcons.GitHub />, link: 'https://github.com/kakumuo/'}, 
    {label: "Leetcode", icon: <MUIcons.Code />, link: 'https://leetcode.com/u/foxfen23/'}, 
    {label: "GoodReads", icon: <MUIcons.Book />, link: 'https://www.goodreads.com/user/show/186704789-kevin-akumuo'}, 
]

const topNavOptions:{number:number, label:string, link:string}[] = [
   {number: 0, label: "Kevin Akumuo", link:"#about-section"}, 
   {number: 1, label: "Projects", link:"#projects-section"}, 
   {number: 2, label: "Experience", link:"#experience-section"}
]


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
        const OFFSET = 100; 
        const curPane = navRefs[navI].current; 
        if(curPane){
            window.scrollTo({top: navI == 0 ? 0 : curPane.offsetTop - OFFSET, behavior: 'smooth'})
        }
    }

    const handleSchemeHover = (val:number) => {

    }

    const handleSchemeClick = (val:number) => {

    }

    // SCROLL BEHAVIOR
    React.useEffect(() => {
        const HEADER_OFFSET = 100

        const onScroll = () => {
            let [maxInView, maxRefI] = [0, curNav]
            const windowTop = window.scrollY + HEADER_OFFSET;
            const windowBottom = window.scrollY + window.innerHeight 

            for(let refI = 0; refI < navRefs.length; refI++){
                const ref = navRefs[refI]; 
                if(!ref.current) continue; 

                const eleTop = ref.current.offsetTop
                const eleBottom = ref.current.offsetTop + ref.current.clientHeight

                if(eleTop < windowTop && windowBottom < eleBottom){
                    [maxInView, maxRefI] = [0, refI]
                    break;
                }
                else if (windowTop < eleTop && eleTop < windowBottom && (windowBottom - eleTop) > maxInView) {
                    [maxInView, maxRefI] = [windowBottom - eleTop, refI]
                }
                else if (windowTop < eleBottom && eleBottom < windowBottom && (eleBottom - windowTop) > maxInView){
                    [maxInView, maxRefI] = [eleBottom - windowTop, refI]
                } 
            }

            if(maxRefI != curNav) setCurNav(maxRefI)
        }

        document.addEventListener('scroll', onScroll)

        return () => {
            document.removeEventListener('scroll', onScroll); 
        }
    }, [curNav])

    return <div id='app-content'>
        <header id='header-nav'>
            {topNavOptions.map((nav, navI) => <NavLink 
                onClick={() => handleNavClick(navI)}
                link={nav.link} label={`0${nav.number + 1}. ${nav.label}`} key={navI} 
                isSelected={curNav == nav.number}
            />)}

            {sideNavOptions.map((nav, navI) => <a 
                className='other-link' key={navI} children={nav.icon} 
                title={nav.label}
                href={nav.link}
            />)}
            <Dropdown target={<MUIcons.ColorLens />} >
                {sampleColorSchemes.map((scheme, schemeI) => (
                    <ColorPickerListItem key={scheme.label} scheme={scheme} optionVal={schemeI}
                    onClick={(v) => handleSchemeHover(v)} onHover={(v) => handleSchemeClick(v)} />
                ))}
            </Dropdown>
        </header>

        <main id='main-content'>
            <PageSection pageRef={navRefs[0]} id='about-section'>
                <img src='/resources/profile_kevin.jpg' />
                <div>
                    <h3>Backend Developer</h3>
                    <h1>Kevin Akumuo</h1>
                    <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>

                    <p>Lorem ipsum dolor sit amet <LookAt caption='Some caption that should go here'>consectetur adipisicing elit. Ipsam, ab in. Nihil sit repellat</LookAt> impedit voluptates, porro cupiditate provident fuga sequi accusamus, deleniti, dignissimos ipsum itaque saepe quas recusandae perferendis modi! Recusandae magni et, sequi magnam repellendus ducimus quo reiciendis minus possimus minima odio? Eum sed id aut unde quibusdam sit? Recusandae possimus inventore, nihil qui maxime accusantium fuga. Quibusdam qui nobis repellendus optio assumenda! Dicta cumque sunt nesciunt asperiores praesentium ullam error debitis provident est reiciendis commodi nobis ipsam repellat ipsa odit repellendus iusto a vero perferendis sapiente, consequuntur magnam saepe minima quae. Rem pariatur maiores assumenda ab alias!</p>
                </div>
            </PageSection>

            <PageSection pageRef={navRefs[1]} id='projects-section'>
                <CardList data={projectCardData} />
                
                <div className='section-goto'>
                    <p>More Projects</p>
                    <span children={<MUIcons.ArrowForward />} />
                </div>
            </PageSection>

            <PageSection pageRef={navRefs[2]} id='experience-section'>
                <CardList data={cardData} />
                <div className='section-goto'>
                    <p>Show Resume</p>
                    <span children={<MUIcons.ArrowForward />} />
                </div>
                
            </PageSection>
        </main>
    </div>
}


