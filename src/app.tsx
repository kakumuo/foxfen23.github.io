import React from 'react'
import * as MUIcons from '@mui/icons-material'
import './style.css'
import { CardData, CardList, ColorPickerListItem, Dropdown, LookAt, NavLink, PageSection, SocialLink } from './Components'
import { ColorScheme, experienceData, ExperienceDetails, projectData, sampleColorSchemes } from './Details'

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

export const AppContext = React.createContext<ColorScheme>(sampleColorSchemes[0]); 

export const App = () => {
    const [curSection, setCurSection] = React.useState(0); 
    const [curNav, setCurNav] = React.useState(0); 
    const navRefs = [
        React.createRef<HTMLDivElement>(),React.createRef<HTMLDivElement>(),React.createRef<HTMLDivElement>()
    ]

    // Color scheme properties
    const [hoverSchemeI, setHoverSchemeI] = React.useState(-1); 
    const [targetSchemeI, setTargetSchemeI] = React.useState(0); 
    const [clrScheme, setTargetScheme] = React.useState(sampleColorSchemes[targetSchemeI]); 
    
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

    // COLOR SCHEME BEHAVIOR
    const handleSchemeHover = (val:number) => {
        setHoverSchemeI(val); 
    }

    const handleSchemeClick = (val:number) => {
        setHoverSchemeI(-1); 
        setTargetSchemeI(val); 
    }

    const handleSchemeFocusLost = () => {
        setHoverSchemeI(-1); 
    }

    React.useEffect(() => {
        setTargetScheme(sampleColorSchemes[hoverSchemeI != -1 ? hoverSchemeI : targetSchemeI]); 
    }, [hoverSchemeI, targetSchemeI])

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
    
    // for color picker mouse hover
    const [isHover, setIsHover] = React.useState(false); 

    return <AppContext.Provider value={clrScheme}>

    <div id='app-content' style={{backgroundColor: clrScheme.primary.toString(), color: clrScheme.fontPrimary.toString()}}>
        <header id='header-nav' style={{backgroundColor: clrScheme.primary.toString(), color: clrScheme.fontPrimary.toString()}}>
            {topNavOptions.map((nav, navI) => <NavLink 
                onClick={() => handleNavClick(navI)}
                link={nav.link} label={`0${nav.number + 1}. ${nav.label}`} key={navI} 
                isSelected={curNav == nav.number}
            />)}

            {sideNavOptions.map((nav, navI) =>  
                <LookAt caption={nav.label} link={nav.link} key={navI}> {nav.icon}</LookAt>
            )}
            <Dropdown onFocusLost={() => handleSchemeFocusLost()} target={<MUIcons.ColorLens
                className='look-at'
                style={{color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString()}}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            />} >
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
                    <h3 style={{color: clrScheme.fontAccent.toString()}}>Backend Developer</h3>
                    <h1>Kevin Akumuo</h1>
                    <h6 style={{color: clrScheme.fontAccent.toString()}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>

                    <p>Lorem ipsum dolor sit amet <LookAt caption='Some caption that should go here'>consectetur adipisicing elit. Ipsam, ab in. Nihil sit repellat</LookAt> impedit voluptates, porro cupiditate provident fuga sequi accusamus, deleniti, dignissimos ipsum itaque saepe quas recusandae perferendis modi! Recusandae magni et, sequi magnam repellendus ducimus quo reiciendis minus possimus minima odio? Eum sed id aut unde quibusdam sit? Recusandae possimus inventore, nihil qui maxime accusantium fuga. Quibusdam qui nobis repellendus optio assumenda! Dicta cumque sunt nesciunt asperiores praesentium ullam error debitis provident est reiciendis commodi nobis ipsam repellat ipsa odit repellendus iusto a vero perferendis sapiente, consequuntur magnam saepe minima quae. Rem pariatur maiores assumenda ab alias!</p>
                </div>
            </PageSection>

            <PageSection pageRef={navRefs[1]} id='projects-section' gotoLabel='More Projects' link=''>
                <CardList data={projectCardData} />
            </PageSection>

            <PageSection pageRef={navRefs[2]} id='experience-section' gotoLabel='Show Resume' link=''>
                <CardList data={cardData} />
            </PageSection>
        </main>
    </div>

    </AppContext.Provider>
}


