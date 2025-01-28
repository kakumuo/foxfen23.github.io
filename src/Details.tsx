
type ProjectDetails = {
    title:string, 
    desc:string, 
    link:string, 
    thumbnail:string, 
    techUsed:string[], 
    devAt:string, 
    year:number, 
}

export const projectData: ProjectDetails[] = [
    {
      title: "EcoTrack",
      desc: "A mobile app for tracking personal carbon footprint and suggesting eco-friendly alternatives.",
      link: "https://github.com/username/ecotrack",
      thumbnail: "https://placehold.co/600x400/EEE/31343C",
      techUsed: ["React Native", "Node.js", "MongoDB", "AWS"],
      devAt: "Green Solutions Inc.",
      year: 2024
    },
    {
      title: "MindfulMe",
      desc: "A web-based meditation and mindfulness platform with guided sessions and progress tracking.",
      link: "https://mindfulme.app",
      thumbnail: "https://placehold.co/100x400/EEE/31343C",
      techUsed: ["Vue.js", "Express", "PostgreSQL", "Docker"],
      devAt: "Wellness Tech Startup",
      year: 2023
    },
    {
      title: "SmartHome Hub",
      desc: "An IoT solution for integrating and controlling various smart home devices through a single interface.",
      link: "https://smarthomehub.io",
      thumbnail: "https://example.com/images/smarthomehub-thumb.jpg",
      techUsed: ["Python", "Raspberry Pi", "MQTT", "React", "GraphQL"],
      devAt: "ConnectedLiving Labs",
      year: 2025
    },
    {
      title: "CodeMentor AI",
      desc: "An AI-powered coding assistant and tutor for beginner programmers.",
      link: "https://github.com/username/codementor-ai",
      thumbnail: "https://example.com/images/codementor-thumb.png",
      techUsed: ["Python", "TensorFlow", "Flask", "Angular", "OpenAI API"],
      devAt: "EduTech Innovations",
      year: 2024
    },
    {
      title: "UrbanFarmer",
      desc: "A mobile app for managing urban gardens and connecting local food producers with consumers.",
      link: "https://urbanfarmer.app",
      thumbnail: "https://example.com/images/urbanfarmer-thumb.jpg",
      techUsed: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
      devAt: "Sustainable City Solutions",
      year: 2023
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
      startDate: new Date('2022-03-15'),
      jobTitle: 'Senior Full Stack Developer',
      location: 'Bringa',
      desc: 'Led a team of developers in creating scalable web applications for fintech clients. Implemented microservices architecture and improved system performance by 40%.',
      techUsed: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
      jobLink: 'https://example.com/senior-fullstack-dev'
    },
    {
      startDate: new Date('2019-07-01'),
      endDate: new Date('2022-03-14'),
      jobTitle: 'Frontend Developer',
      location: 'FedCorp',
      desc: 'Developed responsive user interfaces for e-commerce platforms. Collaborated with UX designers to implement pixel-perfect designs and improve user engagement.',
      techUsed: ['Vue.js', 'JavaScript', 'SASS', 'Webpack', 'Jest'],
      jobLink: 'https://example.com/frontend-dev'
    },
    {
      startDate: new Date('2019-01-10'),
      endDate: new Date('2019-06-30'),
      jobTitle: 'Junior Software Engineer',
      location: 'Space Industries',
      desc: 'Assisted in the development of backend services for a social media analytics tool. Implemented RESTful APIs and contributed to database optimization.',
      techUsed: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Git'],
      jobLink: 'https://example.com/junior-software-engineer'
    }
];


export type ColorScheme =  {
  label:string, 
  labelFont:string, 
  primary:Color, 
  secondary: Color, 
  accent: Color, 
  fontPrimary: Color, 
  fontAccent: Color
}

class Color {
  hex:string = "";
  constructor(hex:string) {
      if(hex.length == 7){
          hex = hex.substring(1, 7)
      }

      this.hex = hex; 
  }

  grade(val:number):Color{
      
      return new Color(""); 
  }

  trans(val:number):Color{
      
      return new Color(""); 
  }

  toString():string {
      return "#" + this.hex; 
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
    fontPrimary: new Color("#333333"),
    fontAccent: new Color("#ffffff")
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
