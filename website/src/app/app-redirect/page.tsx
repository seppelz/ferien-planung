export default function AppRedirect() {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://app.ferien-planung.de';
  }
  
  return (
    <div className="redirect-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--state-background-paper)'
    }}>
      <meta httpEquiv="refresh" content="0;url=https://app.ferien-planung.de" />
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        color: 'var(--state-text-primary)'
      }}>Weiterleitung zur App</h1>
      <p style={{
        fontSize: '1.1rem',
        color: 'var(--state-text-secondary)',
        marginBottom: '2rem'
      }}>
        Sie werden zur{' '}
        <a 
          href="https://app.ferien-planung.de"
          style={{
            color: 'var(--state-primary-color)',
            textDecoration: 'none',
            fontWeight: 500
          }}
        >
          Holiday Planner App
        </a>
        {' '}weitergeleitet...
      </p>
    </div>
  );
} 