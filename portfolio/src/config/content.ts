
export const profile = {
  name: 'Muhammad Faaiz Alam',
  role: 'Software Engineering Student | Backend Developer',
  headline: 'Engineering Scalable & Reliable Software Systems.',
  intro: 'Hi, I am Faaiz.',
  description:
    'I build full-stack applications with modern frontend technologies and robust backend systems. My experience includes React, FastAPI, Node.js, PostgreSQL, REST APIs, authentication, and AI-powered integrations.',
  image: '/profile.jpg',
  cv: '/cv.pdf',
  cvName: 'Muhammad_Faaiz_Alam_CV.pdf',
  github: 'https://github.com/mfaaizalam',
  githubUser: 'mfaaizalam',
  linkedin:
    'https://www.linkedin.com/in/muhammad-faaiz-alam-0095bb337/',
};

export const about =
  'I am a Software Engineering undergraduate at NED University of Engineering and Technology (2024–2028), with a CGPA of 3.71. My primary interest lies in backend engineering and software architecture. I enjoy designing APIs, implementing authentication and authorization, modelling data, and integrating services into complete software systems. Through academic, internship and independent projects, I have gained practical experience with FastAPI, Node.js, PostgreSQL and modern development tools. I am continuously exploring scalable architectures, distributed systems and AI-powered applications to become a well-rounded software engineer.';

export const skills = [
  'Python',
  'JavaScript',
  'C++',
  'FastAPI',
  'Node.js',
  'Express.js',
  'REST API Development',
  'PostgreSQL',
  'MongoDB',
  'SQL',
  'JWT Authentication',
  'Role-Based Access Control',
  'React.js',
  'Git & GitHub',
  'Postman',
  'Gemini API',
  'Retrieval-Augmented Generation (RAG)',
  'Polygon',
  'AWS KMS',
];

export const experiences = [
  {
    role: 'Software Engineering Intern',
    company: 'IMD, NED University of Engineering and Technology',
    type: 'Internship',
    period: '2026',
    location: 'Karachi, Pakistan',
    description:
      'Worked on a PC Preventive Maintenance Dashboard to support centralized monitoring and IT operations across university laboratory computers.',
    responsibilities: [
      'Developed backend services using FastAPI for agent-server communication and system monitoring.',
      'Contributed to a centralized dashboard monitoring approximately 60 computers.',
      'Implemented role-based access control for IT Managers, IT Support and IT Staff.',
      'Worked on Excel reporting, software inventory, license tracking and application-level caching.',
      'Tested system compatibility with Windows and Ubuntu environments.'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'REST APIs',
      'React',
      'PostgreSQL',
      'Caching'
    ]
  },

  {
    role: 'Backend Developer',
    company: 'MIYAAR',
    type: 'Industry Project',
    period: '2026',
    location: 'Pakistan',
    description:
      'Contributed to the development of a blockchain-based National Skills Passport platform for issuing and verifying digital skills credentials.',
    responsibilities: [
      'Developed backend services for credential issuance, approval and verification.',
      'Worked with FastAPI and PostgreSQL for backend functionality and data management.',
      'Integrated Polygon blockchain for credential hash anchoring.',
      'Contributed to secure approval workflows using MFA and AWS KMS digital signing.',
      'Supported credential integrity and public verification workflows.'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Polygon',
      'AWS KMS',
      'SHA-256',
      'MFA'
    ]
  }
];

export const projects: {
  title: string;
  kind: string;
  desc: string;
  points: string[];
  tags: string[];
  github?: string;
  live?: string;
}[] = [

  {
    title: 'StackPilot',
    kind: 'AI-Powered Project Management & SDLC Automation',

    desc:
      'An AI-powered platform designed to streamline software development workflows, from project planning and documentation to development management.',

    points: [
      'Implemented a Gemini-powered RAG pipeline for generating Software Requirements Specification (SRS) documents and UML diagrams.',
      'Designed role-based access control for Project Owners, Project Managers and Editors.',
      'Implemented JWT authentication and OTP-based email verification.',
      'Built REST APIs using FastAPI with PostgreSQL integration.',
      'Deployed the frontend on Vercel and backend on Railway.',
    ],

    tags: [
      'Python',
      'FastAPI',
      'React',
      'PostgreSQL',
      'Gemini API',
      'RAG',
      'JWT',
      'Vercel',
      'Railway',
    ],

    github: 'https://github.com/mfaaizalam/StackPilot',
    live: 'https://stackpilot-go.vercel.app',
  },

  {
    title: 'The RedBone',
    kind: 'Software Engineering Intern | IMD, NED University',

   
desc:
  'A full-stack restaurant ordering platform designed to streamline online food ordering, manage customer orders, and automate order notifications through email integration.',

points: [
  'Developed backend services using Node.js and Express.js to handle restaurant ordering workflows.',
  'Designed and integrated REST APIs for menu management and customer order processing.',
  'Implemented MongoDB for storing menu items, customer information, and order records.',
  'Integrated Nodemailer to automate email notifications when customers place orders.',
  'Developed a React-based frontend to provide an interactive restaurant ordering experience.',
  'Connected frontend and backend services to support seamless order submission and processing.',
],

tags: [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Nodemailer',
],

     github: 'https://github.com/mfaaizalam/THE-REDBONE',
    live: 'https://the-redbone.vercel.app/',
  },

  {
    title: 'MIYAAR',
    kind: 'Blockchain-Based National Skills Passport',

    desc:
      'An industry project focused on issuing, approving and verifying digital skills credentials through a secure credential verification system.',

    points: [
      'Developed backend services for credential issuance, approval and verification using FastAPI.',
      'Implemented SHA-256 hashing to maintain credential integrity.',
      'Integrated Polygon blockchain for credential hash anchoring.',
      'Implemented multi-factor authentication and role-based approval workflows.',
      'Integrated AWS KMS for digital signing while keeping personal information off-chain.',
      'Enabled public credential verification through a decentralized application.',
    ],

    tags: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Polygon',
      'AWS KMS',
      'SHA-256',
      'MFA',
    ],
  },

  {
    title: 'EcoGuard',
    kind: 'Forest Ranger Management System',

    desc:
      'A MERN-stack application designed to support forest ranger operations through centralized management, administrative workflows and real-time communication.',

    points: [
      'Developed backend services using Node.js, Express.js and MongoDB.',
      'Implemented role-based access control for different application users.',
      'Integrated WebSockets for real-time communication.',
      'Developed administrative and operational management workflows.',
    ],

    tags: [
      'MongoDB',
      'Express.js',
      'React',
      'Node.js',
      'WebSockets',
      'RBAC',
    ],
  },
];
