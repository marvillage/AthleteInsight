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

        <p className="demo">
          Demo account: <strong>demo@athleteinsight.app</strong> / <strong>demo12345</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
