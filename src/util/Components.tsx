import React from 'react'
import { ArrowOutward, ScreenshotMonitor } from '@mui/icons-material'
import '../style.css'
import { ColorScheme, sampleColorSchemes } from './Details'
import {AppContext} from '../app'
import * as MUIcons from '@mui/icons-material'
import { Link } from 'react-router'


const GREY_OUT = .5
export const Tag = ({label, style}:{label:string, style?:React.CSSProperties}) => {
    return <p style={{...style, fontWeight: '400'}} className="tag" >{label}</p>
}

const CardItem = ({greyOut, aside, title, desc, taglist, link}:{aside:{type:'text'|'img', val:string}, greyOut:boolean, title:string, desc:string, taglist:string[], link?:string}) => {
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
    const [isHover, setIsHover] = React.useState(false);  

    return <a className='card' style={{
            color: clrScheme.fontPrimary.trans(isHover ? 1 : greyOut ? GREY_OUT : 1).toString(), 
            borderColor: clrScheme[!isHover ? 'primary' : 'secondary'].toString()
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        href={link}
    >
        {aside.type == 'img' ?
             <img style={{opacity: isHover ? 1 : greyOut ? GREY_OUT : 1 }} className='card-aside-img' src={aside.val} /> 
             : <p  style={{color: clrScheme.fontAccent.trans(isHover ? 1 : greyOut ? GREY_OUT : 1).toString()}}  className='card-aside-text'>{aside.val}</p>
        }
        <div>
            <div className='title-group' style={{color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].trans(isHover ? 1 : greyOut ? GREY_OUT : 1).toString()}}>
                <h1>{title}</h1>
                {link ? <ArrowOutward className='link-arrow' /> : <></>}
            </div>
            <p>{desc}</p>
            <div className="tag-list">{taglist.map((tag, tagI) =>
                <Tag 
                    style={{
                        backgroundColor: clrScheme.fontAccent.trans(.3).toString(),
                        color: clrScheme.fontAccent.trans(isHover ? 1 : greyOut ? GREY_OUT : 1).toString()
                    }} 
                    key={tagI}
                    label={tag}
                /> 
            )}</div>
        </div>
    </a>
}

export type CardData = {
    title: string, 
    desc: string, 
    tags: string[], 
    link?: string
    aside: {type:'text'|'img', val:string}
}

export const CardList = ({data}:{data:CardData[]}) => {
    const [hover, setHover] = React.useState(false); 

    return <div className='card-list'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        {data.map((data, dataI) => (
            <CardItem key={dataI}
                greyOut={hover}
                aside={data.aside}
                title={data.title}
                desc={data.desc}
                link={data.link}
                taglist={data.tags}
            />
        ))}
    </div>
}

export const PageSection = ({id, pageRef, gotoLabel=undefined, link, children}:{children:any, id:string, gotoLabel?:string, link?:string, pageRef:React.Ref<any>}) => {
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
    const [isHover, setIsHover] = React.useState(false);  
    
    return <section className='page-section'
        ref={pageRef}
        id={id}>
    {children} 

    {gotoLabel && 
        <Link className='section-goto'
            style={{
                color: clrScheme[!isHover ? 'fontPrimary' : 'fontAccent'].toString(), 
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            to={link ? link : ''}
            onClick={(ev) => {
                if(link == undefined || !link.match(/.*\..../)) return; 

                ev.preventDefault(); 
                window.open(link)
            }}
            resource={link ? link : ''}
        >
            <p>{gotoLabel}</p>
            <span children={<MUIcons.ArrowForward />} />
        </Link>
    }
    </section>
}


export const NavLink = ({onClick, link, label, isSelected}:{link:string, label:string, isSelected:boolean, onClick:()=>void}) => {
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
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
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
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

export const LookAt = ({caption, outerStyle={}, innerStyle={}, link, children}:{caption?:string, link?:string, children:any, outerStyle?:React.CSSProperties, innerStyle?:React.CSSProperties}) => {
    const captionRef = React.useRef<HTMLDivElement>(null); 
    const [pos, setPos] = React.useState({x:0, y:0});
    const [hoverTimeout, setHoverTimeout] = React.useState(setTimeout(()=>{}, 1))
    const HOVER_TIME = 1000 * .2
    const OFFSET = {x: 20, y: 20}; // Changed to numbers for easier calculations

    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI];
    const [isHover, setIsHover] = React.useState({val: false})
    const [show, setShow] = React.useState(false); 

    const handleMouseEnter = (ev:React.MouseEvent) => { 
        setIsHover({val: true})       
        updateCaptionPosition(ev.clientX, ev.clientY);
        
        clearTimeout(hoverTimeout)            
        setHoverTimeout(setTimeout(() => {
            if(!isHover.val)
                setShow(true)
        }, HOVER_TIME))

    }

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout)   
        setShow(false);
        setIsHover({val: false})
    }

    const handleMouseMove = (ev:React.MouseEvent) => {        
        updateCaptionPosition(ev.clientX, ev.clientY);
    }

    const updateCaptionPosition = (mouseX: number, mouseY: number) => {
        if (!captionRef.current) return;

        const captionWidth = captionRef.current.offsetWidth;
        const captionHeight = captionRef.current.offsetHeight;

        // Calculate new positions
        let newX = mouseX + OFFSET.x;
        let newY = mouseY + OFFSET.y;

        // Check boundaries
        if (newX + captionWidth > window.innerWidth) {
            newX = window.innerWidth - captionWidth - 10; // 10px padding from right
        }
        if (newY + captionHeight > window.innerHeight) {
            newY = window.innerHeight - captionHeight - 10; // 10px padding from bottom
        }

        setPos({ x: newX, y: newY });
    };

    return (
        <span className='look-at'  
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onMouseMove={handleMouseMove}
        >
            <a style={{color: clrScheme[!isHover.val ? 'fontPrimary' : 'fontAccent'].toString(), fontWeight: 'bold', textDecoration: 'none', cursor: link ? 'pointer' : 'auto', ...outerStyle}} href={link}>
                {children}
            </a>
            
            {caption && 
                <caption 
                    style={{
                        zIndex: 4,
                        top: pos.y, 
                        left: pos.x,
                        backgroundColor: clrScheme.accent.toString(),
                        borderColor: clrScheme.accent.toString(), 
                        color: clrScheme.accent.grade(200).toString(),
                    }} 
                    ref={captionRef} 
                    className={`${!show ? 'hidden' : ''} caption`}
                >
                    {caption}
                </caption>
            }
        </span>
    );
};


export const ColorPickerListItem  = ({scheme, optionVal, onHover, onClick}:{scheme:ColorScheme, optionVal:number, onHover:(val:number)=>void, onClick:(val:number)=>void}) => {
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
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
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
    
    React.useEffect(() => {
        const onClickOff = (ev:MouseEvent) => {
            if(selfRef.current && ev.target && !(selfRef.current.contains((ev.target as HTMLDivElement)))){
                setIsHidden(true); 
                onFocusLost && onFocusLost()
            }
        }

        document.addEventListener('click', onClickOff)
    }, [])

    return <div className='dropdown' ref={selfRef}>
        <div className='dropdown-target' onClick={() => setIsHidden(false)}>
            {target}
        </div>
        <div className='dropdown-content' style={{visibility: isHidden ? 'hidden' : 'unset',
            border: `solid 2px ${clrScheme.primary.grade(20).toString()}`
        }} onClick={() => setIsHidden(true)}>
            {children}
        </div>
    </div>
}


export const IconMyAnimeList = (props:any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>

  <path fill="currentColor" d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404l-1.989-2.458l-.02 5.285H.001L0 7.247h2.203l1.865 2.545l2.015-2.546l2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779c.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687c.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033l.038-1.81h2.309zm3.992-2.099v6.627l3.107.032l-.43 1.775h-4.807V7.187l2.13.03z"></path>

</svg>
  )