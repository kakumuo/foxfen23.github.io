import React from "react";
import { AppContext } from "../app";
import * as MUIcons from '@mui/icons-material'
import { CardData, CardList, ColorPickerListItem, Dropdown, IconMyAnimeList, LookAt, NavLink, PageSection } from '../util/Components'
import { aboutDetails, ColorScheme, experienceData, ExperienceDetails, LookAtDetail, projectData, sampleColorSchemes } from '../util/Details'

const sideNavOptions:{label:string, icon:React.JSX.Element, link:string}[] = [
    {label: "Contact Me", icon: <MUIcons.Mail />, link: 'mailto:akumuok@gmail.com'}, 
    {label: "LinkedIn", icon: <MUIcons.LinkedIn />, link: 'https://www.linkedin.com/in/kevin-akumuo/'}, 
    {label: "GitHub", icon: <MUIcons.GitHub />, link: 'https://github.com/kakumuo/'}, 
    {label: "LeetCode", icon: <MUIcons.Code />, link: 'https://leetcode.com/u/foxfen23/'}, 
    {label: "GoodReads", icon: <MUIcons.Book />, link: 'https://www.goodreads.com/user/show/186704789-kevin-akumuo'}, 
    {label: "MyMangaList", icon: <IconMyAnimeList />, link: 'https://myanimelist.net/mangalist/foxfen64?status=2&order=4&order2=0'}
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

    startStr = monthMap[exp.startDate.getMonth()].substring(0, 3) 
    if(!(curDate.getFullYear() == exp.startDate.getFullYear() || exp.endDate && exp.endDate.getFullYear() == exp.startDate.getFullYear()))
        startStr += ` ${exp.startDate.getFullYear()}`

    if(exp.endDate){
        endStr = monthMap[exp.endDate.getMonth()].substring(0, 3) 
        if(curDate.getFullYear() != exp.endDate.getFullYear())
            endStr += ` ${exp.endDate.getFullYear()}`
    }

    return `${startStr} - ${endStr}`
}

export const MainPage = () => {
    const appContext = React.useContext(AppContext)
    const [curNav, setCurNav] = React.useState(0); 

    // for color picker mouse hover
    const [isColorPickerHover, setIsColorPickerHover] = React.useState(false); 

    const navRefs = [
        React.useRef<HTMLDivElement>(),React.useRef<HTMLDivElement>(),React.useRef<HTMLDivElement>()
    ]

    // Color scheme properties
    const [hoverSchemeI, setHoverSchemeI] = React.useState(-1); 
    const [targetSchemeI, setTargetSchemeI] = React.useState(appContext.schemeI); 
    const clrScheme = sampleColorSchemes[appContext.schemeI]
    
    const [projectCardData, setProjectCardData] = React.useState(projectData.filter((_, i) => i <= 3).map(p => {
        return {
          aside: {type: 'img', val: p.thumbnail}, 
          desc: p.desc, 
          tags: p.techUsed, 
          link: p.link,
          title: `${p.title}${p.devAt ? ' - ' + p.devAt : ''}`
        } as CardData
    }))

    const [cardData, setCardData] = React.useState(experienceData.filter((_, i) => i <= 2).map(d => {
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
        const target = hoverSchemeI != -1 ? hoverSchemeI : targetSchemeI
        appContext.setSchemeI(target) 

        document.documentElement.style.setProperty("--selection-bkg", 
            sampleColorSchemes[target].fontAccent.toString()
        )

        document.documentElement.style.setProperty("--selection-color", 
            sampleColorSchemes[target].fontAccent.grade(150).toString()
        )
    }, [hoverSchemeI, targetSchemeI])

    // SCROLL BEHAVIOR
    React.useEffect(() => {
        const HEADER_OFFSET = 100

        const onScroll = () => {
            let [maxInView, maxRefI] = [0, curNav]
            const windowTop = window.scrollY + HEADER_OFFSET;
            const windowBottom = window.scrollY + window.innerHeight 

            // console.log({windowTop, windowBottom})

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
                
            // console.log(maxRefI, curNav)
        }

        document.addEventListener('scroll', onScroll)

        return () => {
            document.removeEventListener('scroll', onScroll); 
        }
    }, [curNav])

    return <div id='app-content' style={{backgroundColor: clrScheme.primary.toString(), color: clrScheme.fontPrimary.toString()}}>
    <header id='header-nav' style={{backgroundColor: clrScheme.primary.grade(20).toString(), color: clrScheme.fontPrimary.toString()}}>
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
            style={{color: clrScheme[!isColorPickerHover ? 'fontPrimary' : 'fontAccent'].toString()}}
            onMouseEnter={() => setIsColorPickerHover(true)}
            onMouseLeave={() => setIsColorPickerHover(false)}
        />} >
            {sampleColorSchemes.map((scheme, schemeI) => (
                <ColorPickerListItem key={scheme.label} scheme={scheme} optionVal={schemeI}
                onClick={(v) => handleSchemeHover(v)} onHover={(v) => handleSchemeClick(v)} />
            ))}
        </Dropdown>
    </header>

    <main id='main-content'>
        <PageSection pageRef={navRefs[0]} id='about-section'>
            <img style={{border: `solid 1px ${clrScheme.accent.toString()}`}} src='./resources/profile_kevin.jpg' />
            <p id="profile-group">
                <h3 style={{color: clrScheme.fontAccent.toString()}} id="title">{aboutDetails.title}</h3>
                <h1 id="name">{aboutDetails.name}</h1>
                <h6 style={{color: clrScheme.fontAccent.toString()}} id="subtitle">{aboutDetails.subTitle}</h6>

                {aboutDetails.desc.map((para, paraI) => {
                    return <p key={paraI} style={{marginBottom: 8}}>{
                        para.phrases.map(phrase => {
                            return phrase.lookAt ? <LookAt caption={(phrase.lookAt as LookAtDetail).caption} link={phrase.lookAt.link}>{phrase.text}</LookAt> : phrase.text
                        })    
                    }</p>
                })}
            </p>
        </PageSection>

        <PageSection pageRef={navRefs[1]} id='projects-section' gotoLabel='More Projects' link='/projects'>
            <CardList data={projectCardData} />
        </PageSection>

        <PageSection pageRef={navRefs[2]} id='experience-section' gotoLabel='Show Resume' link="./resources/resume.pdf">
            <CardList data={cardData} />
        </PageSection>
    </main>
</div>
}
