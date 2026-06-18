import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { isSupabaseConfigured } from "./lib/supabase";

const queryClient = new QueryClient();

// Friendly notice when the database hasn't been configured yet.
const SetupNotice = () => (
  <div style={{ maxWidth: 640, margin: "80px auto", padding: 24, lineHeight: 1.7 }}>
    <h1>⚙️ Database not configured</h1>
    <p>
      AthleteInsight needs a Supabase project. Create one, run{" "}
      <code>supabase/schema.sql</code> in its SQL editor, then set{" "}
      <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (see{" "}
      <code>.env.example</code>) locally or in your Vercel project.
    </p>
  </div>
);

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  if (!isSupabaseConfigured) return <SetupNotice />;
  if (loading) return <div style={{ padding: 40 }}>Loading…</div>;
  if (!session) return <Navigate to="/login" replace />;
  return children;
};

const Layout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/users", element: <Users /> },
        { path: "/products", element: <Products /> },
        { path: "/users/:id", element: <User /> },
        { path: "/products/:id", element: <Product /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
