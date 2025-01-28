import React from 'react'
import { ArrowOutward } from '@mui/icons-material'
import './style.css'

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

export const PageSection = ({id, title, ref, children}:{children:any, id:string, title:string, ref:React.Ref<HTMLDivElement>}) => {
    return <section className='page-section'
        children={children} 
        title={title}
        ref={ref}
        id={id}
    />
}


export const NavLink = ({onClick, link, label, isSelected}:{link:string, label:string, isSelected:boolean, onClick:()=>void}) => {
    return <a  onClick={onClick}
        className={`nav-link ${isSelected ? 'selected' : ''}`}>{label}
        <div />
    </a>
}