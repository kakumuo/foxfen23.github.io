import React from 'react'
import { ArrowOutward, ScreenshotMonitor } from '@mui/icons-material'
import './style.css'
import { ColorScheme } from './Details'
import {AppContext} from './app'
import * as MUIcons from '@mui/icons-material'


const CardItem = ({aside, title, desc, taglist, link}:{aside:React.JSX.Element, title:string, desc:string, taglist:string[], link:string}) => {
    const clrScheme = React.useContext<ColorScheme>(AppContext)
    const [isHover, setIsHover] = React.useState(false);  
    
    return<a className='card' style={{
            color: clrScheme.fontPrimary.toString(), 
            borderColor: clrScheme[!isHover ? 'primary' : 'secondary'].toString()
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
    >
        {aside}
        <div>
            <div className='title-group' style={{color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString()}}>
                <h1>{title}</h1>
                <ArrowOutward className='link-arrow' />
            </div>
            <p>{desc}</p>
            <div className="tag-list">{taglist.map((tag, tagI) => 
                <p 
                    style={{
                        backgroundColor: clrScheme.fontAccent.trans(.3).toString(),
                        color: clrScheme.fontAccent.toString()
                    }} 
                    className="tag" key={tagI}
                >{tag}</p>
            )}</div>
        </div>
    </a>
}

export type CardData = {
    title: string, 
    desc: string, 
    tags: string[], 
    link: string
    aside: {type:'text'|'img', val:string}
}

export const CardList = ({data}:{data:CardData[]}) => {
    return <div className='card-list'>
        {data.map((data, dataI) => (
            <CardItem key={dataI}
                aside={data.aside.type == 'img' ? <img className='card-aside-img' src={data.aside.val} /> : <p className='card-aside-text'>{data.aside.val}</p>}
                title={data.title}
                desc={data.desc}
                link={data.link}
                taglist={data.tags}
            />
        ))}
    </div>
}

export const PageSection = ({id, pageRef, gotoLabel=undefined, link, children}:{children:any, id:string, gotoLabel?:string, link?:string, pageRef:React.Ref<any>}) => {
    const clrScheme = React.useContext<ColorScheme>(AppContext)
    const [isHover, setIsHover] = React.useState(false);  
    
    return <section className='page-section'
        ref={pageRef}
        id={id}>
    {children} 

    {gotoLabel && 
        <div className='section-goto'
            style={{
                color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString(), 
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <p>{gotoLabel}</p>
            <span children={<MUIcons.ArrowForward />} />
        </div>
    }
    </section>
}


export const NavLink = ({onClick, link, label, isSelected}:{link:string, label:string, isSelected:boolean, onClick:()=>void}) => {
    const clrScheme = React.useContext<ColorScheme>(AppContext)
    const [isHover, setIsHover] = React.useState(false); 

    return <a  onClick={onClick} 
        style={{color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString()}}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`nav-link ${isSelected ? 'selected' : ''}`}>{label}
        <div style={{color: clrScheme.fontAccent.toString()}} />
    </a>
}

export const SocialLink = ({icon, label, link}:{icon:React.JSX.Element, label:string, link:string}) => {
    const clrScheme = React.useContext<ColorScheme>(AppContext)
    const [isHover, setIsHover] = React.useState(false); 

    return <a 
        style={{color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString()}}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className='other-link' children={icon} 
        title={label}
        href={link}
    />
}

export const LookAt = ({caption, link, children}:{caption?:string, link?:string, children:any}) => {
    const captionRef = React.useRef<HTMLDivElement>(null); 
    const [pos, setPos] = React.useState({x:"0", y:"0"})
    const OFFSET = {x: "10px", y:"(-8%)"}

    const clrScheme = React.useContext<ColorScheme>(AppContext)
    const [isHover, setIsHover] = React.useState(false); 

    const handleMouseEnter = React.useCallback((ev:React.MouseEvent) => {
        if(!captionRef.current) return; 
        if(captionRef.current.classList.contains('hidden')) captionRef.current.classList.remove('hidden')
        
        setIsHover(true)
        setPos({ x: `${ev.clientX}px + ${OFFSET.x}`, y: `${ev.clientY}px + ${OFFSET.y}` });      
    }, [])

    const handleMouseLeave = React.useCallback(() => {
        if(!captionRef.current) return; 

        setIsHover(false)
        if(!captionRef.current.classList.contains('hidden')) captionRef.current.classList.add('hidden')
    }, [])

    const handleMouseMove = React.useCallback((ev:React.MouseEvent) => {
        setPos({ x: `${ev.clientX}px + ${OFFSET.x}`, y: `${ev.clientY}px + ${OFFSET.y}` });
    }, [])

    return <span className='look-at'  
        style={{color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString()}}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}
    >
        <a href={link}>{children}</a>
        {caption && 
        <caption 
            style={{
                top: `calc(${pos.y})`, left: `calc(${pos.x})`,
                backgroundColor: clrScheme.accent.grade(50).toString(),
                borderColor: clrScheme.accent.toString(), 
                color: clrScheme.fontPrimary.toString()
            }} 
            ref={captionRef} className='hidden caption'
        >{caption}</caption>
        }
    </span>
}

export const ColorPickerListItem  = ({scheme, optionVal, onHover, onClick}:{scheme:ColorScheme, optionVal:number, onHover:(val:number)=>void, onClick:(val:number)=>void}) => {
    const clrScheme = React.useContext<ColorScheme>(AppContext)
    const [isHover, setIsHover] = React.useState(false);

    const handleMouseEnter = (val:number) => {
        onHover(val)
        setIsHover(true) 
    }

    const handleMouseLeave= (val:number) => {
        setIsHover(false)
    }
    
    return <div className='color-picker-list-item' 
        style={{
            color: clrScheme.fontPrimary.toString(),
            backgroundColor: clrScheme.primary.grade(isHover ? 50 : 0).toString()
        }}
        onMouseEnter={() => handleMouseEnter(optionVal)}
        onMouseLeave={() => handleMouseLeave(optionVal)}
        onClick={() => onClick(optionVal)}
    >
        <p style={{fontFamily: scheme.labelFont}}>{scheme.label}</p>
        <div className='color-list'>
            <div className='color-display' style={{backgroundColor: scheme.primary.toString()}} />
            <div className='color-display' style={{backgroundColor: scheme.secondary.toString()}} />
            <div className='color-display' style={{backgroundColor: scheme.accent.toString()}} />
            <div className='color-display' style={{backgroundColor: scheme.fontPrimary.toString()}} />
            <div className='color-display' style={{backgroundColor: scheme.fontAccent.toString()}} />
        </div>
    </div>
}

export const Dropdown = ({target, onFocusLost, children}:{target:React.JSX.Element, onFocusLost?:()=>void, children:any}) => {
    const [isHidden, setIsHidden] = React.useState(true); 
    const selfRef = React.useRef<HTMLDivElement>(null);    
    
    React.useEffect(() => {
        const onClickOff = (ev:MouseEvent) => {
            if(selfRef.current && ev.target && !(selfRef.current.contains((ev.target as HTMLDivElement)))){
                setIsHidden(true); 
                onFocusLost && onFocusLost()
            }
        }

        document.addEventListener('click', onClickOff)
    }, [])

    // React.useEffect(() => {
    //     console.log("Changing hidden, new val: ", isHidden)
    // }, [isHidden])

    return <div className='dropdown' ref={selfRef}>
        <div className='dropdown-target' onClick={() => setIsHidden(false)}>
            {target}
        </div>
        <div className='dropdown-content' style={{visibility: isHidden ? 'hidden' : 'unset'}} onClick={() => setIsHidden(true)}>
            {children}
        </div>
    </div>
}
