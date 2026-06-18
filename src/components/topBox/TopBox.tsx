import "./topBox.scss";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAthletes } from "../../lib/athletes";

const riskColor = (v: number) => (v >= 70 ? "#ff8042" : v >= 40 ? "#ffbb28" : "#00c49f");

const TopBox = () => {
  const { data } = useQuery({ queryKey: ["athletes"], queryFn: fetchAthletes });

  const top = [...(data ?? [])]
    .sort((a, b) => b.doping_risk - a.doping_risk)
    .slice(0, 6);

  return (
    <div className="topBox">
      <h1>Highest Risk Athletes</h1>
      <div className="list">
        {top.map((a) => (
          <Link to={`/users/${a.id}`} className="listItem" key={a.id}>
            <div className="user">
              <img src={a.avatar || "/noavatar.png"} alt="" />
              <div className="userTexts">
                <span className="username">{a.name}</span>
                <span className="email">{a.sport}</span>
              </div>
            </div>
            <span className="amount" style={{ color: riskColor(a.doping_risk) }}>
              {a.doping_risk}%
            </span>
          </Link>
        ))}
        {top.length === 0 && <p style={{ color: "#a0a8b8" }}>No athletes yet.</p>}
      </div>
    </div>
  );
};

export default TopBox;
