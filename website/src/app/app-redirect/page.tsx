export default function AppRedirect() {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://app.ferien-planung.de';
  }
  
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=https://app.ferien-planung.de" />
      </head>
      <body>
        <p>Redirecting to <a href="https://app.ferien-planung.de">app.ferien-planung.de</a>...</p>
      </body>
    </html>
  );
} 