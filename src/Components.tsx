import React from 'react'
import { ArrowOutward, ScreenshotMonitor } from '@mui/icons-material'
import './style.css'
import { ColorScheme } from './Details'

const CardItem = ({aside, title, desc, taglist, link}:{aside:React.JSX.Element, title:string, desc:string, taglist:string[], link:string}) => {
    return<a className='card'>
        {aside}
        <div>
            <div className='title-group'>
                <h1>{title}</h1>
                <ArrowOutward className='link-arrow' />
            </div>
            <p>{desc}</p>
            <div className="tag-list">{taglist.map((tag, tagI) => <p className="tag" key={tagI}>{tag}</p>)}</div>
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

export const PageSection = ({id, pageRef, children}:{children:any, id:string, pageRef:React.Ref<any>}) => {
    return <section className='page-section'
        children={children} 
        ref={pageRef}
        id={id}
    />
}


export const NavLink = ({onClick, link, label, isSelected}:{link:string, label:string, isSelected:boolean, onClick:()=>void}) => {
    return <a  onClick={onClick}
        className={`nav-link ${isSelected ? 'selected' : ''}`}>{label}
        <div />
    </a>
}

export const LookAt = ({caption, link, children}:{caption?:string, link?:string, children:any}) => {
    const captionRef = React.useRef<HTMLDivElement>(null); 
    const [pos, setPos] = React.useState({x:"0", y:"0"})
    const OFFSET = {x: "10px", y:"(-8%)"}

    const handleMouseEnter = React.useCallback((ev:React.MouseEvent) => {
        if(!captionRef.current) return; 
        if(captionRef.current.classList.contains('hidden')) captionRef.current.classList.remove('hidden')

        setPos({ x: `${ev.clientX}px + ${OFFSET.x}`, y: `${ev.clientY}px + ${OFFSET.y}` });      
    }, [])

    const handleMouseLeave = React.useCallback(() => {
        if(!captionRef.current) return; 
        if(!captionRef.current.classList.contains('hidden')) captionRef.current.classList.add('hidden')
    }, [])

    const handleMouseMove = React.useCallback((ev:React.MouseEvent) => {
        setPos({ x: `${ev.clientX}px + ${OFFSET.x}`, y: `${ev.clientY}px + ${OFFSET.y}` });
    }, [])

    return <a className='look-at' href={link} 
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}
    >
        <span>{children}</span>
        {caption && <caption style={{top: `calc(${pos.y})`, left: `calc(${pos.x})`}} ref={captionRef} className='hidden'>{caption}</caption>}
    </a>
}

export const ColorPickerListItem  = ({scheme, optionVal, onHover, onClick}:{scheme:ColorScheme, optionVal:number, onHover:(val:number)=>void, onClick:(val:number)=>void}) => {
    return <div className='color-picker-list-item' onMouseOver={() => onHover(optionVal)} onClick={() => onClick(optionVal)}>
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

export const Dropdown = ({target, children}:{target:React.JSX.Element, children:any}) => {
    const [isHidden, setIsHidden] = React.useState(true); 
    const selfRef = React.useRef<HTMLDivElement>(null); 
    
    React.useEffect(() => {
        const onClickOff = (ev:MouseEvent) => {
            if(selfRef.current && ev.target && !(selfRef.current.contains((ev.target as HTMLDivElement))))
                setIsHidden(true); 
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
