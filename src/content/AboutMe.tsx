import React from "react"

type AboutItem = {
    title:string, 
    description:string, 
    imagePath:string
}

const aboutItemList:AboutItem[] = [
    {
        title: 'Education', 
        description: `I graduated from the New Jersey Institute of Technology (NJIT) with a Bachelor of Science in Computer Science and a minor in Applied Mathematics.
         During my time at NJIT, I delved into various courses, including Data Structures and Algorithms, Database Systems, Intensive Programming in Linux, and Introduction to Artificial Intelligence.`,
        // imagePath: "/resources/njit.jpg"
        imagePath: "/resources/placeholder1.jpg"
    }, 
    {
        title: 'Experience', 
        description: `My professional journey has been diverse, starting from my internship days to my current role as an Applications Developer II at United Parcel Service (UPS).
                    At UPS, I've had the opportunity to contribute to the development of applications managing millions of contact and account details for sales and marketing purposes. 
                    From crafting daily ETL processes to working with Apache Karaf containers and conducting knowledge transfer sessions, I've worn multiple hats and embraced every challenge with enthusiasm.
                    In addition to my role at UPS, I've also served as an Undergraduate Teaching Assistant at NJIT, where I mentored students in Java and C++, and volunteered as an ACM Tutor, assisting students in various CS courses. 
                    These experiences have not only honed my technical skills but also strengthened my ability to communicate complex concepts effectively.`, 
        // imagePath: "/resources/experience.jpg"
        imagePath: "/resources/placeholder2.jpg"
    }
]

export const AboutMe = () => {
    const [curPageIndex, setCurPageIndex] = React.useState(0)

    const handleNextPage = (asc:boolean) => {
        if(asc)
            setCurPageIndex((curPageIndex + 1) % aboutItemList.length)
        else 
            setCurPageIndex((curPageIndex - 1) % aboutItemList.length)
    }

    return <div style={{display: 'grid', gridTemplateColumns: "auto 10%"}}>
        <main style={{position: "relative"}}>
            <img style={{width: "80vw", height: "80vh",objectFit: "cover", filter: "contrast(100%) saturate(20%)"}} src={aboutItemList[curPageIndex].imagePath} alt="" />
            <div style={{position: "absolute", bottom:"0", left: "0", margin: "50px", width: "40vw"}}>
                <h2 style={{color: "white", fontWeight: "bold", fontSize: "50px"}}>{aboutItemList[curPageIndex].title}</h2>
                <p style={{color: "white", fontWeight: "bold", fontSize: "20px"}}>{aboutItemList[curPageIndex].description}</p>
            </div>
        </main>
        <aside style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <button onClick={()=>handleNextPage(true)}>Prev</button>
            {aboutItemList.map((_, itemI) => <p>{curPageIndex == itemI ? "[X]" : "[ ]"}</p>)}
            <button onClick={()=>handleNextPage(true)} >Next</button>
        </aside>
    </div>
}