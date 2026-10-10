export type RetrievalDocument = {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceHref: string;
  sourceContext: string;
};

export type RetrievalMatch = {
  document: RetrievalDocument;
  matchedTerms: string[];
  score: number;
  coverage: number;
};

export type RetrievalResult = {
  queryTerms: string[];
  matches: RetrievalMatch[];
  status: 'matches' | 'unanswerable';
};

// Curated profile facts and implementation details verified in public code.
// Every retrieved excerpt retains its source for inspection.
export const PROFILE_DOCUMENTS: readonly RetrievalDocument[] = [
  {
    id: 'experience',
    title: 'Engineering background',
    text: 'Himanshu Sharma has 6+ years of software engineering experience. His experience includes React, Java, Spring Boot, and AWS.',
    sourceLabel: 'About Himanshu',
    sourceHref: '#about',
    sourceContext: 'Himanshu’s engineering background and core technologies.',
  },
  {
    id: 'direction',
    title: 'Current AI engineering focus',
    text: 'Himanshu is moving toward full stack AI engineering. His current focus is building with React, Python, FastAPI, and AI.',
    sourceLabel: 'About Himanshu',
    sourceHref: '#about',
    sourceContext: 'Himanshu’s current focus in full stack AI engineering.',
  },
  {
    id: 'fast-api-backend',
    title: 'fast-api-backend · API foundations',
    text: 'fast-api-backend is Himanshu5harma’s public Network Compliance Control Plane repository. It uses Python, FastAPI, SQLAlchemy, and PostgreSQL. Its API foundations include request IDs, structured access logs, liveness and readiness checks, and consistent errors.',
    sourceLabel: 'GitHub · project README',
    sourceHref: 'https://github.com/Himanshu5harma/fast-api-backend/blob/main/README.md',
    sourceContext: 'Project overview and implemented API foundations in the public repository README.',
  },
  {
    id: 'user-management',
    title: 'user-management repository',
    text: 'user-management is Himanshu5harma’s public Java and Spring Boot demo repository. It uses JPA and includes roles, permissions, and JWT authentication.',
    sourceLabel: 'GitHub · user-management',
    sourceHref: 'https://github.com/Himanshu5harma/user-management',
    sourceContext: 'The public Java implementation demonstrates user management and authentication.',
  },
  {
    id: 'request-middleware',
    title: 'Request tracking and access logs',
    text: 'The FastAPI service assigns request IDs and writes structured access logs through request middleware.',
    sourceLabel: 'GitHub · request middleware',
    sourceHref: 'https://github.com/Himanshu5harma/fast-api-backend/blob/main/src/nccp/core/middleware.py',
    sourceContext: 'Inspect how each request receives an identifier and produces an access log.',
  },
  {
    id: 'health-service',
    title: 'API liveness and readiness',
    text: 'The FastAPI service includes liveness and readiness checks, with health behavior implemented in its health service.',
    sourceLabel: 'GitHub · health service',
    sourceHref: 'https://github.com/Himanshu5harma/fast-api-backend/blob/main/src/nccp/health/service.py',
    sourceContext: 'Inspect the health service behind the API’s liveness and readiness checks.',
  },
];

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'by', 'can', 'did',
  'do', 'does', 'for', 'from', 'had', 'has', 'have', 'he', 'her', 'here',
  'him', 'his', 'how', 'i', 'in', 'is', 'it', 'its', 'me', 'my', 'of',
  'on', 'or', 'our', 'she', 'should', 'that', 'the', 'their', 'them',
  'there', 'these', 'they', 'this', 'those', 'to', 'us', 'was', 'we',
  'were', 'what', 'when', 'where', 'which', 'who', 'why', 'will', 'with',
  'would', 'you', 'your',
]);

/** Normalize case and familiar stack spellings; this is not semantic search. */
export function tokenize(text: string): string[] {
  const normalized = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\bfast[\s-]+api\b/g, 'fastapi')
    .replace(/\bspring[\s-]+boot\b/g, 'springboot');

  return [...new Set((normalized.match(/[a-z0-9]+/g) ?? [])
    .filter((term) => !STOP_WORDS.has(term)))];
}

/**
 * Rank by the number of distinct query terms present in each excerpt.
 * A passage must contain at least half the meaningful query terms. Results
 * remain source excerpts, rather than claims that the question is answered.
 */
export function retrievePassages(
  query: string,
  documents: readonly RetrievalDocument[] = PROFILE_DOCUMENTS,
): RetrievalResult {
  const queryTerms = tokenize(query);

  if (queryTerms.length === 0) {
    return { queryTerms, matches: [], status: 'unanswerable' };
  }

  const matches = documents
    .map((document, index) => {
      const documentTerms = new Set(tokenize(`${document.title} ${document.text}`));
      const matchedTerms = queryTerms.filter((term) => documentTerms.has(term));

      return {
        document,
        matchedTerms,
        score: matchedTerms.length,
        coverage: matchedTerms.length / queryTerms.length,
        index,
      };
    })
    .filter((match) => match.score > 0 && match.coverage >= 0.5)
    .sort((first, second) => second.score - first.score || first.index - second.index)
    .slice(0, 3)
    .map(({ index: _index, ...match }) => match);

  return {
    queryTerms,
    matches,
    status: matches.length > 0 ? 'matches' : 'unanswerable',
  };
}
