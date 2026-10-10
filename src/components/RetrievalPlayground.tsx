import { useId, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { PROFILE_DOCUMENTS, retrievePassages } from '../lib/retrieval';
import './RetrievalPlayground.css';

const EXAMPLE_QUESTIONS = [
  { label: 'React experience', question: 'What is his React experience?' },
  { label: 'Python & FastAPI', question: 'What is his Python and FastAPI focus?' },
  { label: 'API foundations', question: 'What are the FastAPI API foundations?' },
  { label: 'Public repository', question: 'Where is the fast-api-backend repository?' },
  { label: 'Try an unknown', question: 'Which certifications has he earned?' },
];

export default function RetrievalPlayground() {
  const componentId = useId();
  const inputId = `${componentId}-query`;
  const helpId = `${componentId}-help`;
  const [query, setQuery] = useState(EXAMPLE_QUESTIONS[0].question);
  const [submittedQuery, setSubmittedQuery] = useState(EXAMPLE_QUESTIONS[0].question);
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const result = useMemo(() => retrievePassages(submittedQuery), [submittedQuery]);

  function search(nextQuery: string) {
    const trimmedQuery = nextQuery.trim();
    if (!trimmedQuery) return;
    setQuery(trimmedQuery);
    setSubmittedQuery(trimmedQuery);
    setActiveSourceId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search(query);
  }

  return (
    <div className="retrieval-playground">
      <div className="retrieval-intro">
        <div>
          <p className="retrieval-eyebrow">A working experiment</p>
          <h3>Search the evidence.</h3>
          <p className="retrieval-intro-copy">
            Explore a small collection of facts about my background and public work.
            See which passages match, then inspect their sources.
          </p>
        </div>
        <span className="retrieval-mode"><span aria-hidden="true" />Browser only</span>
      </div>

      <form className="retrieval-search" onSubmit={handleSubmit}>
        <label htmlFor={inputId}>What would you like to look up?</label>
        <div className="retrieval-input-row">
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-describedby={helpId}
            placeholder="Try React, Python, or a repository name"
            maxLength={200}
            required
          />
          <button className="retrieval-submit" type="submit">
            Find passages <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p id={helpId} className="retrieval-helper">
          Lexical matching: this searches for shared words. No language model or backend is called.
        </p>
      </form>

      <div className="retrieval-presets" aria-label="Example searches">
        <span className="retrieval-presets-label">Try a question</span>
        {EXAMPLE_QUESTIONS.map((example) => (
          <button
            key={example.label}
            type="button"
            className={submittedQuery === example.question ? 'is-selected' : ''}
            onClick={() => search(example.question)}
            aria-pressed={submittedQuery === example.question}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="retrieval-results">
        <div className="retrieval-results-heading">
          <h4>Retrieved passages</h4>
          <p role="status" aria-live="polite" aria-atomic="true">
            {result.status === 'matches'
              ? `${result.matches.length} ${result.matches.length === 1 ? 'passage' : 'passages'} matched`
              : 'No supporting passage found'}
            <span className="retrieval-visually-hidden"> for {submittedQuery}</span>
          </p>
        </div>
        <p className="retrieval-query-caption">Search: <span>{submittedQuery}</span></p>

        {result.status === 'unanswerable' ? (
          <div className="retrieval-empty">
            <span className="retrieval-empty-symbol" aria-hidden="true">∅</span>
            <div>
              <h5>This collection cannot answer that.</h5>
              <p>
                {result.queryTerms.length === 0
                  ? 'Add a specific term, such as React or FastAPI, to search the collection.'
                  : 'There is not enough matching evidence in these excerpts. A missing passage means unknown, so this demo leaves the question unanswered.'}
              </p>
              <button type="button" onClick={() => search(EXAMPLE_QUESTIONS[0].question)}>
                Explore a supported example <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="retrieval-passage-list">
            {result.matches.map((match, index) => {
              const { document } = match;
              const isSourceOpen = activeSourceId === document.id;
              const sourcePanelId = `${componentId}-source-${document.id}`;
              const isExternalSource = document.sourceHref.startsWith('https://');

              return (
                <article className="retrieval-passage" key={document.id}>
                  <div className="retrieval-passage-meta">
                    <span className="retrieval-citation">[{index + 1}]</span>
                    <span>
                      Lexical match · {match.score}/{result.queryTerms.length} query terms
                    </span>
                  </div>
                  <h5>{document.title}</h5>
                  <blockquote>{document.text}</blockquote>
                  <div className="retrieval-passage-footer">
                    <div className="retrieval-matched-terms" aria-label="Matching terms">
                      {match.matchedTerms.map((term) => <span key={term}>{term}</span>)}
                    </div>
                    <button
                      className="retrieval-source-toggle"
                      type="button"
                      aria-expanded={isSourceOpen}
                      aria-controls={sourcePanelId}
                      onClick={() => setActiveSourceId(isSourceOpen ? null : document.id)}
                    >
                      {isSourceOpen ? 'Close source' : 'Inspect source'}
                      <span aria-hidden="true">{isSourceOpen ? '−' : '+'}</span>
                    </button>
                  </div>
                  <div id={sourcePanelId} className="retrieval-source-detail" hidden={!isSourceOpen}>
                    <p>{document.sourceContext}</p>
                    <a
                      href={document.sourceHref}
                      target={isExternalSource ? '_blank' : undefined}
                      rel={isExternalSource ? 'noopener noreferrer' : undefined}
                    >
                      {document.sourceLabel} <span aria-hidden="true">↗</span>
                      {isExternalSource && <span className="retrieval-visually-hidden"> (opens in a new tab)</span>}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <details className="retrieval-method">
        <summary>How this experiment works<span aria-hidden="true">+</span></summary>
        <div className="retrieval-method-body">
          <ol>
            <li><strong>Read the query.</strong> Normalize case and stack names, then remove common words.</li>
            <li><strong>Count the matches.</strong> Rank excerpts by distinct shared terms. At least half the query terms must match.</li>
            <li><strong>Show the evidence.</strong> Return up to three cited excerpts, or an explicit unanswered state.</li>
          </ol>
          <p>
            {PROFILE_DOCUMENTS.length} curated excerpts · local React state · no API request.
            A word match is a retrieval signal, not proof that a claim is true.
          </p>
        </div>
      </details>
    </div>
  );
}
