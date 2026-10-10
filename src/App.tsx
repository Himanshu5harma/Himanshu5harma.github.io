function App() {
  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.16em', marginBottom: '2rem' }}>
          HIMANSHU SHARMA
        </p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1.1 }}>
          Coming <span className="serif">soon.</span>
        </h1>
        <p style={{ marginTop: '1.5rem', color: 'var(--muted)' }}>
          Portfolio in progress.
        </p>
      </div>
    </main>
  )
}

export default App
