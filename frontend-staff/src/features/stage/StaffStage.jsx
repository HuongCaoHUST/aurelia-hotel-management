export function StaffStage({ user, onLogout }) {
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email;
  const roles = user?.roles?.map((role) => role.name || role) || [];

  return (
    <main className="staff-stage">
      <header className="stage-header">
        <div className="brand brand-dark">
          <span className="brand-mark">A</span>
          <span>
            <strong>AURELIA</strong>
            <small>STAFF PORTAL</small>
          </span>
        </div>
        <button className="stage-logout" type="button" onClick={onLogout}>Sign out</button>
      </header>

      <section className="stage-content">
        <p className="eyebrow">Login successful</p>
        <h1>Welcome, {fullName}</h1>
        <p className="stage-description">This is a temporary stage for testing the authenticated staff flow.</p>

        <div className="stage-grid">
          <article className="stage-card">
            <span className="stage-card-label">Signed-in account</span>
            <strong>{user?.email}</strong>
          </article>
          <article className="stage-card">
            <span className="stage-card-label">Roles</span>
            <strong>{roles.length ? roles.join(', ') : 'No role returned'}</strong>
          </article>
          <article className="stage-card stage-card-muted">
            <span className="stage-card-label">Next step</span>
            <strong>Staff dashboard coming next</strong>
          </article>
        </div>
      </section>
    </main>
  );
}
