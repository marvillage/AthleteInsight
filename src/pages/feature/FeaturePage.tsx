import { useParams } from "react-router-dom";
import { featureData } from "./featureData";
import "./feature.scss";

const FeaturePage = () => {
  const { slug } = useParams();
  const config = slug ? featureData[slug] : undefined;

  if (!config) {
    return (
      <div className="feature">
        <h1 className="title">Module</h1>
        <p className="subtitle">This module is not available.</p>
      </div>
    );
  }

  return (
    <div className="feature">
      <h1 className="title">{config.title}</h1>
      <p className="subtitle">{config.subtitle}</p>

      <div className="kpis">
        {config.kpis.map((kpi) => (
          <div className={`kpi tone-${kpi.tone ?? "blue"}`} key={kpi.label}>
            <span className="kpiValue">{kpi.value}</span>
            <span className="kpiLabel">{kpi.label}</span>
          </div>
        ))}
      </div>

      <div className="tableCard">
        <h2>{config.tableTitle}</h2>
        <table>
          <thead>
            <tr>
              {config.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {config.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturePage;
