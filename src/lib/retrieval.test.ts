import { describe, expect, it } from 'vitest';
import { PROFILE_DOCUMENTS, retrievePassages, tokenize } from './retrieval';
import type { RetrievalDocument } from './retrieval';

describe('profile retrieval', () => {
  it('recognizes common spellings of the target and existing backend stacks', () => {
    expect(tokenize('What about Fast API, fast-api, Spring Boot and spring-boot?'))
      .toEqual(['about', 'fastapi', 'springboot']);
    expect(retrievePassages('Spring Boot').matches[0].document.id).toBe('experience');
    expect(retrievePassages('Python Fast API focus').matches[0].document.id).toBe('direction');
  });

  it('returns the verified repository source for a repository lookup', () => {
    const result = retrievePassages('Where is the fast-api-backend repository?');

    expect(result.status).toBe('matches');
    expect(result.matches).toHaveLength(1);
    expect(result.matches[0].document.sourceHref)
      .toBe('https://github.com/Himanshu5harma/fast-api-backend/blob/main/README.md');
    expect(result.matches[0].matchedTerms).toEqual(['fastapi', 'backend', 'repository']);
  });

  it('retrieves implemented API foundations with the public README as evidence', () => {
    const result = retrievePassages('What are the FastAPI API foundations?');

    expect(result.matches[0].document.id).toBe('fast-api-backend');
    expect(result.matches[0].matchedTerms).toEqual(['fastapi', 'api', 'foundations']);
    expect(result.matches[0].document.text).toContain('SQLAlchemy');
    expect(result.matches[0].document.text).toContain('consistent errors');
  });

  it('links technical request and health evidence directly to the implementation', () => {
    const requestResult = retrievePassages('request IDs access logs middleware');
    const healthResult = retrievePassages('liveness readiness health service');

    expect(requestResult.matches[0].document.id).toBe('request-middleware');
    expect(requestResult.matches[0].document.sourceHref).toContain('/src/nccp/core/middleware.py');
    expect(healthResult.matches[0].document.id).toBe('health-service');
    expect(healthResult.matches[0].document.sourceHref).toContain('/src/nccp/health/service.py');
  });

  it('gives an explicit unanswered result for unsupported credentials', () => {
    const result = retrievePassages('Which certifications has he earned?');

    expect(result.status).toBe('unanswerable');
    expect(result.matches).toEqual([]);
  });

  it('does not present an isolated shared word as sufficient evidence', () => {
    const result = retrievePassages('React Kubernetes Terraform certifications');

    expect(result.status).toBe('unanswerable');
    expect(result.matches).toHaveLength(0);
  });

  it('handles empty and common-word-only searches without invalid scores', () => {
    for (const query of ['', '   ', 'who is he and what does he do']) {
      expect(retrievePassages(query)).toEqual({
        queryTerms: [],
        matches: [],
        status: 'unanswerable',
      });
    }
  });

  it('shows each query term once so repetition cannot inflate a score', () => {
    const result = retrievePassages('React React React AWS');

    expect(result.queryTerms).toEqual(['react', 'aws']);
    expect(result.matches[0].document.id).toBe('experience');
    expect(result.matches[0].score).toBe(2);
    expect(result.matches[0].coverage).toBe(1);
  });

  it('keeps ranking deterministic and limits the evidence to three passages', () => {
    const documents: RetrievalDocument[] = Array.from({ length: 5 }, (_, index) => ({
      id: `document-${index}`,
      title: 'React evidence',
      text: 'React interface example.',
      sourceLabel: `Source ${index}`,
      sourceHref: '#about',
      sourceContext: 'Test fixture.',
    }));

    expect(retrievePassages('React', documents).matches.map((match) => match.document.id))
      .toEqual(['document-0', 'document-1', 'document-2']);
  });

  it('keeps retrieved text identical to its curated source excerpt', () => {
    const result = retrievePassages('React experience');

    for (const match of result.matches) {
      const source = PROFILE_DOCUMENTS.find((document) => document.id === match.document.id);
      expect(match.document.text).toBe(source?.text);
    }
  });
});
