export const profile = {
  name: 'Himanshu Sharma',
  initials: 'HS',
  role: 'Full Stack AI Engineer',
  github: 'https://github.com/Himanshu5harma',
  repository: 'https://github.com/Himanshu5harma/portfolio',
  introduction: 'Intelligent products. Engineered for production.',
  description: 'Full stack AI engineering with React, Python and FastAPI, grounded in 6+ years of React experience and a background in Java, Spring Boot and AWS.',
} as const

export const projects = [
  {
    id: 'network',
    number: '01',
    category: 'PYTHON / API ENGINEERING',
    title: 'Reliable systems start with the foundation.',
    name: 'Network Compliance Control Plane',
    description: 'A Python API for network compliance, beginning with the essentials: service health, database readiness, request correlation and structured logs.',
    status: 'In development',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy'],
    href: 'https://github.com/Himanshu5harma/fast-api-backend',
    details: ['Implemented: liveness and readiness checks, consistent error responses, and structured request logging.', 'Next: domain models and compliance workflows. The current project is an API foundation, with no AI features yet.'],
    sources: [
      { label: 'Project overview', href: 'https://github.com/Himanshu5harma/fast-api-backend/blob/main/README.md' },
      { label: 'Health implementation', href: 'https://github.com/Himanshu5harma/fast-api-backend/blob/main/src/nccp/health/service.py' },
    ],
  },
  {
    id: 'identity',
    number: '02',
    category: 'JAVA / BACKEND ENGINEERING',
    title: 'A closer look at identity and access.',
    name: 'User Management API',
    description: 'A Spring Boot demo exploring user management, JWT authentication, and relationships between roles and permissions.',
    status: 'Backend demo',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA'],
    href: 'https://github.com/Himanshu5harma/user-management',
    details: ['Implemented: user creation and queries, JWT issuance, and role and permission endpoints.', 'Scope: a public backend demo. Production readiness and an integrated React interface are outside the current project.'],
    sources: [
      { label: 'Authentication controller', href: 'https://github.com/Himanshu5harma/user-management/blob/main/src/main/java/com/demo/usermanagement/controller/AuthController.java' },
      { label: 'Role model', href: 'https://github.com/Himanshu5harma/user-management/blob/main/src/main/java/com/demo/usermanagement/model/Role.java' },
    ],
  },
] as const

export const principles = [
  { number: '01', title: 'Start with the person.', description: 'A good system starts with a clear interaction. I care about the details that make an interface feel understandable and considered.' },
  { number: '02', title: 'Think across the stack.', description: 'Interfaces, API contracts and infrastructure influence each other. I like understanding the path a request takes through a product.' },
  { number: '03', title: 'Keep the evidence close.', description: 'My focus in AI is useful answers with traceable sources, deliberate failure handling, and evaluation that goes beyond a convincing demo.' },
] as const
