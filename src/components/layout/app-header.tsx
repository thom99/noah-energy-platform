export function AppHeader() {
  return (
    <header className="app-topbar">
      <div className="topbar-context">
        <span>Workspace</span>
        <span className="context-divider">/</span>
        <p>Energy operations</p>
      </div>

      <div className="topbar-account">
        <span className="demo-badge">Demo workspace</span>

        <div className="online-status">
          <span className="online-dot" />
          Platform online
        </div>

        <span className="account-avatar">NE</span>
      </div>
    </header>
  );
}