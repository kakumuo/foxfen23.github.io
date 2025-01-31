import React from "react";
import { LookAt } from "./Components";

export type ProjectDetails = {
    title:string, 
    desc:string, 
    link?:string, 
    thumbnail:string, 
    techUsed:string[], 
    devAt?:string, 
    devAtDesc?:string,
    year:number, 
}

export const projectData: ProjectDetails[] = [
    {
      title: "PopGen",
      desc: "A browser plugin to autofill listings on Depop",
      link: "https://github.com/kakumuo/inventory-sync/tree/popgen",
      thumbnail: "/resources/popgen.png",
      techUsed: ["React", "Typescript", "LLM (LLaVA)"],
      // devAt: "Personal Project",
      // devAtDesc: "Developed this on my free time as a means of exploring new technologies", 
      year: 2025
    },
    {
      title: "Shortcuts.io",
      desc: "A simple shortcut logging application for different programs. Hosted locally through Apache.",
      link: "https://github.com/kakumuo/shortcuts-app",
      thumbnail: "/resources/shortcuts.png",
      techUsed: ["React", "Typescript", "MongoDB", "Apache"],
      // devAt: "Wellness Tech Startup",
      // devAtDesc: "Wellness Tech Startup company details go here", 
      year: 2024
    },
    {
      title: "SSIS Jenkins Pipeline",
      desc: "Create a Jenkins pipeline to automatically push SSIS and Stored Procedures to development and production MSSQL Servers.",
      // link: "https://smarthomehub.io",
      thumbnail: "/resources/jenkins.png",
      techUsed: ["Jenkins", "Groovy", "Powershell"],
      devAt: "United Parcel Service",
      devAtDesc: "Premier package delivery company and a leading provider of global supply chain management solutions.", 
      year: 2023
    },
    {
      title: "CPS Contacts",
      desc: "Developed an ETL Pipeline to push over 200M UPS MyChoice Contact and Account details to Salesforce for sales and claims purposes.",
      // link: "https://github.com/username/codementor-ai",
      thumbnail: "/resources/upsmychoice.png",
      techUsed: ["SSIS", "Java", "Python", "SQL", "Salesforce", "Maven"],
      devAt: "United Parcel Service",
      devAtDesc: "Premier package delivery company and a leading provider of global supply chain management solutions.", 
      year: 2022
    },
    {
      title: "DigiBadge",
      desc: "Developed a proof of concept for a digital mobile badge system. Developed during UPS Intern Hackathon. Presented findings to UPS CE/IO.",
      // link: "https://urbanfarmer.app",
      thumbnail: "/resources/digitalbadge.png",
      techUsed: ["AWS", "Axure RP8", "Swift", "Firebase", "React" ],
      devAt: "United Parcel Service",
      devAtDesc: "Premier package delivery company and a leading provider of global supply chain management solutions.", 
      year: 2019
    }, 
    {
      title: "Walkability Metric",
      desc: "Developed plugin for Rhino to measure walkability of different locations using GIS data. Presented findings to KPF Architecture Firm.",
      // link: "https://urbanfarmer.app",
      thumbnail: "/resources/walkability.png",
      techUsed: ["Rhino", "Python"],
      devAt: "New Jersey Institute of Technology (NJIT)",
      devAtDesc: "New Jersey polytechnic university offering more than 125 undergraduate and graduate degree programs in six specialized schools", 
      year: 2019
    }
];


export type ExperienceDetails = {
    startDate:Date, 
    endDate?:Date, 
    jobTitle:string, 
    location:string, 
    desc:string, 
    techUsed:string[], 
    jobLink:string,
}

export const experienceData: ExperienceDetails[] = [
  {
    startDate: new Date('2020-10-01'),
    endDate: undefined, // Current position as of the given date
    jobTitle: 'Application Developer',
    location: 'UPS',
    desc: 'Promoted from Software Developer I. Worked on Marketing Automation applications and the greater CIDH application. Developed various SSIS pipelines, conducted knowledge transfer sessions, and worked with interns. Performed various maintenance tasks including monthly audits, fixing issues, and implementing systematic alerting. Involved in Linux server migration, preference updates, and Openshift training.',
    techUsed: ['Marketo', 'SSDT', 'MSSQL', 'JBoss Fuse', 'GIT', 'SQL', 'Java', 'Everbridge', 'Openshift', 'Docker', 'TFS'],
    jobLink: ''
  },
  {
    startDate: new Date('2019-06-01'),
    endDate: new Date('2019-09-01'),
    jobTitle: 'Summer Intern',
    location: 'UPS',
    desc: 'Worked on the Marketing Automation Application, handling lead and account records. Improved bulk upload processes, presented at a hackathon, and developed Jenkins pipelines. Participated in Agile coaching and ceremonies.',
    techUsed: ['Maven', 'Camel', 'JBoss Fuse', 'MSSQL', 'Marketo', 'Jenkins', 'Groovy', 'Nexus', 'TFS', 'SonarQube', 'AWS', 'Swift', 'Firebase', 'Angular', 'React'],
    jobLink: ''
  },
  {
    startDate: new Date('2017-09-01'),
    endDate: new Date('2018-12-01'),
    jobTitle: 'Undergraduate Teaching Assistant',
    location: 'NJIT',
    desc: 'Served as a teaching assistant for CS113, CS114, and CS115 courses. Responsibilities included grading assignments, leading lab sections, creating exam prep materials, and providing office hours support. Taught Java and C++ based Data Structures and Algorithms courses.',
    techUsed: ['Java', 'C++'],
    jobLink: ''
  },
  {
    startDate: new Date('2017-09-01'),
    endDate: new Date('2017-12-01'),
    jobTitle: 'ACM Volunteer Tutor',
    location: 'NJIT',
    desc: 'Assisted over 40 students throughout the year on various computer science courses including Data Structures and Algorithms, Operating Systems, Introduction to Linux Systems, and Introduction to Computer Systems.',
    techUsed: [],
    jobLink: ''
  }
];


export type ParagraphText = {
  text:string, 
  lookAt?:{
    caption: string
    link?: string
  }
}

export type Paragraph = {
  phrases:ParagraphText[]
}

export const aboutDetails = {
  title: 'Backend Developer',
  name: 'Kevin Akumuo', 
  subTitle: 'Developing Since 2015',
  desc: [
    {
      phrases: [
        { text: "Experienced software developer with a strong background in" },
        { text: " Backend ", lookAt: { caption: "Working on server-side software, which focuses on everything you can't see on a website" } },
        { text: " and " },
        { text: " ETL ", lookAt: { caption: "Extract Transform and Load" } },
        { text: "development. Currently working as a " },
        { text: "Applicaiton Developer II at UPS", lookAt: { caption: "Current Role", link: "https://www.ups.com/us/en/home" } },
        { text: ", where I've been instrumental in developing and improving critical processes for managing large-scale customer data." }
      ]
    },
    {
      phrases: [
        { text: "Committed to continuous learning and applying cutting-edge solutions to complex business problems in the rapidly evolving field of software development." }
      ]
    }
  ]  
}


export type ColorScheme =  {
  label:string, 
  labelFont:string, 
  
  primary:Color, // any color
  secondary: Color, // bit lighter than primary, unless white, then a bit darker
  accent: Color, // primary compliment, visible over primary
  fontPrimary: Color, // negation of primary
  fontAccent: Color // fontPrimary compliment
}
class Color {
  hex: string = "";
  r: number = 0;
  g: number = 0;
  b: number = 0;
  a: number = 1;

  constructor(hex: string) {
    if (hex.startsWith("#")) {
      hex = hex.substring(1);
    }

    if (hex.length === 6) {
      this.hex = hex;
      this.hexToRGB();
    } else {
      throw new Error("Invalid hex color format. Must be #RRGGBB or RRGGBB.");
    }
  }

  private hexToRGB() {
    // Convert the hex string to RGB values
    this.r = parseInt(this.hex.substring(0, 2), 16);
    this.g = parseInt(this.hex.substring(2, 4), 16);
    this.b = parseInt(this.hex.substring(4, 6), 16);
  }

  grade(val: number): Color {
    // Calculate perceived brightness
    const brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    
    // Determine if the color is light (brightness > 128)
    const isLight = brightness > 128;
    
    // Adjust brightness by scaling RGB values
    const adjust = (channel: number) => {
      const adjustment = isLight ? -val : val;
      return Math.min(255, Math.max(0, channel + adjustment));
    };
    
    const newR = adjust(this.r);
    const newG = adjust(this.g);
    const newB = adjust(this.b);
  
    // Convert back to hex
    const toHex = (channel: number) =>
      channel.toString(16).padStart(2, "0");
  
    const newHex = `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
    return new Color(newHex);
  }
  

  trans(val: number): Color {
    // Adjust transparency (alpha value)
    const newAlpha = Math.min(1, Math.max(0, val));
    const newColor = new Color(this.hex);
    newColor.a = newAlpha;
    return newColor;
  }

  toString(): string {
    // Format as "rgb(r, g, b)" or "rgba(r, g, b, a)"
    if (this.a === 1) {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    } else {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a.toFixed(2)})`;
    }
  }
}

export const sampleColorSchemes: ColorScheme[] = [
  {
    label: "Ocean Breeze",
    labelFont: "'Courier New', Courier, monospace",
    primary: new Color("#3498db"),
    secondary: new Color("#2c3e50"),
    accent: new Color("#e74c3c"),
    fontPrimary: new Color("#333333"),
    fontAccent: new Color("#ffffff")
  },
  {
    label: "Forest Harmony",
    labelFont: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    primary: new Color("#2ecc71"),
    secondary: new Color("#34495e"),
    accent: new Color("#e67e22"),
    fontPrimary: new Color("#2c3e50"),
    fontAccent: new Color("#ecf0f1")
  },
  {
    label: "Sunset Glow",
    labelFont: "'Montserrat', sans-serif",
    primary: new Color("#e74c3c"),
    secondary: new Color("#f39c12"),
    accent: new Color("#9b59b6"),
    fontPrimary: new Color("#2c3e50"),
    fontAccent: new Color("#ecf0f1")
  },
  {
    label: "Minimalist Mono",
    labelFont: "'Open Sans', sans-serif",
    primary: new Color("#ffffff"),
    secondary: new Color("#f1f1f1"),
    accent: new Color("#333333"),
    fontPrimary: new Color("#777777"),
    fontAccent: new Color("#111122")
  },
  {
    label: "Neon Nights",
    labelFont: "'Orbitron', sans-serif",
    primary: new Color("#000000"),
    secondary: new Color("#1a1a1a"),
    accent: new Color("#00ff00"),
    fontPrimary: new Color("#ffffff"),
    fontAccent: new Color("#00ff00")
  }
];
