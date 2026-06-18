import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Single from "../../components/single/Single";
import { fetchAthlete } from "../../lib/athletes";
import "./user.scss";

const statusLabel: Record<string, string> = {
  clear: "Clear",
  under_review: "Under Review",
  flagged: "Flagged",
};

const User = () => {
  const { id } = useParams();

  const { isLoading, data: athlete, error } = useQuery({
    queryKey: ["athlete", id],
    queryFn: () => fetchAthlete(id as string),
    enabled: !!id,
  });

  if (isLoading) return <div className="user">Loading…</div>;
  if (error || !athlete)
    return <div className="user" style={{ color: "#ff7a7a" }}>Athlete not found.</div>;

  // Illustrative weekly biomarker trend derived from the athlete's current values.
  const base = athlete.heart_rate ?? 45;
  const perf = athlete.performance_score ?? 80;
  const chartData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((name, i) => ({
    name,
    "Heart Rate": base + ((i * 3) % 7) - 3,
    Performance: Math.max(0, perf - 6 + ((i * 5) % 11)),
  }));

  return (
    <div className="user">
      <Single
        id={0}
        img={athlete.avatar || "/noavatar.png"}
        title={athlete.name}
        info={{
          Sport: athlete.sport,
          Country: athlete.country ?? "—",
          Age: athlete.age ?? "—",
          Gender: athlete.gender ?? "—",
          Status: statusLabel[athlete.status] ?? athlete.status,
          "Doping Risk": `${athlete.doping_risk}%`,
          Performance: `${athlete.performance_score}/100`,
          "Resting HR": athlete.heart_rate ? `${athlete.heart_rate} bpm` : "—",
          "VO₂ max": athlete.vo2max ?? "—",
          Hemoglobin: athlete.hemoglobin ? `${athlete.hemoglobin} g/dL` : "—",
          "Last Test": athlete.last_test_date ?? "—",
        }}
        chart={{
          dataKeys: [
            { name: "Heart Rate", color: "#8884d8" },
            { name: "Performance", color: "#82ca9d" },
          ],
          data: chartData,
        }}
        activities={[
          { time: athlete.last_test_date ?? "—", text: "Most recent anti-doping sample collected" },
          {
            time: "Risk model",
            text: `Doping risk assessed at ${athlete.doping_risk}% — status: ${
              statusLabel[athlete.status] ?? athlete.status
            }`,
          },
          ...(athlete.notes ? [{ time: "Note", text: athlete.notes }] : []),
        ]}
      />
    </div>
  );
};

export default User;
