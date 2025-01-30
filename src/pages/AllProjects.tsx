import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppContext} from '../app'
import { sampleColorSchemes,ProjectDetails, projectData  } from '../util/Details';
import { ArrowBack, ArrowRight } from '@mui/icons-material';
import { Link } from 'react-router';
import { Tag } from '../util/Components';

const TRANS_SPEED = ".2s"

const COL_WIDTH = ["5%", "30%", "30%", "40%"]
export const AllProjects = () => {
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
    const [linkHover, setLinkHover] = React.useState(false); 
    const [tableHover, setTableHover] = React.useState(false); 
    
    const tableStyle:React.CSSProperties = {
        width: '100%', 
        borderCollapse: 'collapse'
    }

    const linkStyle:React.CSSProperties = {
        textDecoration: 'none', 
        color: clrScheme[linkHover ? 'fontAccent' : 'fontPrimary'].toString(), 
        transition: TRANS_SPEED,
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr', 
        gridTemplateRows: 'auto',
        gap: 8,
        width: '100%'
    }

    return <main style={{
        backgroundColor: clrScheme.primary.toString(),
        width: '100vw',
        minHeight: '100vh',
        overflowY: 'auto',
        padding: 64,
        display: 'grid', 
        gridTemplateColumns: 'auto', 
        gridTemplateRows: 'auto auto 1fr',

        color: clrScheme.fontPrimary.toString()
    }}>

        {/* back button */}
        <Link to={"/"} style={linkStyle}
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
        > 
            <ArrowBack style={{transform: `translateX(${linkHover ? '-50%' : '0'})`, transition: TRANS_SPEED}} />
            <p style={{fontWeight: 'bolder'}}>Kevin Akumuo</p>
        </Link>

        {/* title */}
        <h1 style={{fontSize: 'xxx-large'}}>All Projects</h1>

        {/* Table */}
        <table style={tableStyle}
            onMouseEnter={() => setTableHover(true)}
            onMouseLeave={() => setTableHover(false)}
        >
            <ProjectTableHeader />
            <tbody style={{display: 'table-row-group'}}>
                {projectData.map((proj, projI) => <ProjectTableRow key={projI} project={proj} isLastRow={projI == projectData.length - 1} isGreyOut={tableHover} />)}
            </tbody>
        </table>
    </main>
}

const ProjectTableHeader = ({}:{}) => {
    return <thead style={{verticalAlign: 'bottom'}}>
        <tr style={{display: 'table-row', height: '10px'}}>
            {["Year", "Project", "Made At", "Built With"].map((h, hI) => <th style={{width: COL_WIDTH[hI], textAlign: 'left'}} key={h}>{h}</th>)}
        </tr>
    </thead>
}

const GREY_OUT = .5
const ProjectTableRow = ({project, isLastRow, isGreyOut}:{project:ProjectDetails, isLastRow:boolean, isGreyOut:boolean}) => {
    const clrScheme = sampleColorSchemes[React.useContext(AppContext).schemeI]
    const [linkHover, setLinkHover] = React.useState(false)
    const [isHover, setIsHover] = React.useState(false)

    const rowStyle:React.CSSProperties = {
        borderBottom: !isLastRow ? `solid 1px ${clrScheme.primary.grade(-25).toString()}` : '',
        color: clrScheme.fontPrimary.trans(isHover ? 1 : isGreyOut ? GREY_OUT : 1).toString(),
        transition: TRANS_SPEED,
        height: 30,
        padding: 0, 
        margin: 0
   }

    const techUsedStyle:React.CSSProperties = {
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 8,
        transition: TRANS_SPEED,
        minWidth: COL_WIDTH[3]
    }

    const linkStyle:React.CSSProperties = {
        textDecoration: 'none',
        fontWeight: 'bolder', 
        color: clrScheme[linkHover ? 'fontAccent' : 'fontPrimary'].trans(isHover ? 1 : isGreyOut ? GREY_OUT : 1).toString(), 
        transition: TRANS_SPEED
    }

    const createTag = (t:string) => {
        return <Tag style={{
                backgroundColor: clrScheme.fontAccent.trans(.3).toString(),
                color: clrScheme.fontAccent.trans(isHover ? 1 : isGreyOut ? GREY_OUT : 1).toString(),
                transition: TRANS_SPEED
            }} key={t} label={t} />
    } 

    const tdCommonProp:React.CSSProperties = {}

    return <tr style={rowStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
    >
        <td style={{fontWeight: 'lighter', minWidth: COL_WIDTH[0], ...tdCommonProp}}>{project.year}</td>
        <td style={{minWidth: COL_WIDTH[1], ...tdCommonProp}}>{
            <Link 
                style={linkStyle} to={project.link}
                onMouseEnter={() => setLinkHover(true)}
                onMouseLeave={() => setLinkHover(false)}
            >{project.title}</Link>
        }</td>
        <td style={{fontWeight: 'lighter', minWidth: COL_WIDTH[2], ...tdCommonProp}}>{project.devAt}</td>
        <td><div style={{...techUsedStyle, ...tdCommonProp}}>{project.techUsed.map(t => createTag(t))}</div></td>
    </tr>
}