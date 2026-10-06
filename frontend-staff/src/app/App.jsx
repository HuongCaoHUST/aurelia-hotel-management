import './app.css';

export function App() {
  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Aurelia Hotel">
        <div className="visual-glow visual-glow-one" />
        <div className="visual-glow visual-glow-two" />

        <header className="brand brand-light">
          <span className="brand-mark">A</span>
          <span>
            <strong>AURELIA</strong>
            <small>HOTEL &amp; RESORT</small>
          </span>
        </header>

      </section>

      <section className="login-panel">
        <div className="login-panel-inner">
          <div className="brand brand-dark">
            <span className="brand-mark">A</span>
            <span>
              <strong>AURELIA</strong>
              <small>STAFF PORTAL</small>
            </span>
          </div>

          <div className="login-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to continue</h2>
            <p>Access your hotel operations workspace.</p>
          </div>

          <form className="login-form">
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@aureliahotel.com"
              autoComplete="email"
            />

            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <button className="text-button" type="button">Forgot password?</button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <label className="remember-row">
              <input type="checkbox" name="remember" />
              <span>Keep me signed in</span>
            </label>

            <button className="login-button" type="button">
              Sign in
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="login-note">
            Need access? <button className="text-button" type="button">Contact your administrator</button>
          </p>

          <p className="copyright">© 2026 Aurelia Hotel Management</p>
        </div>
      </section>
    </main>
  );
}
