import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Already signed in → go to dashboard.
  useEffect(() => {
    if (session) navigate("/", { replace: true });
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error);
    else navigate("/", { replace: true });
  };

  // One-click guest access — signs in with the seeded demo account so the
  // dashboard (and its row-level-secured data) works with no typing.
  const handleGuest = async () => {
    setError(null);
    setLoading(true);
    const { error } = await signIn("demo@athleteinsight.app", "demo12345");
    setLoading(false);
    if (error) setError(error);
    else navigate("/", { replace: true });
  };

  return (
    <div className="login">
      <div className="loginCard">
        <img src="/logo.svg" alt="AthleteInsight" className="logo" />
        <h1>AthleteInsight</h1>
        <p className="subtitle">Athlete Integrity & Anti-Doping Monitoring</p>

        {!isSupabaseConfigured && (
          <div className="notice">
            Database not configured. Set <code>VITE_SUPABASE_URL</code> and{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> to enable login.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading || !isSupabaseConfigured}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="guestBtn"
          onClick={handleGuest}
          disabled={loading || !isSupabaseConfigured}
        >
          Continue as Guest (Demo)
        </button>

        <p className="demo">
          Guest mode signs you in as <strong>demo@athleteinsight.app</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
