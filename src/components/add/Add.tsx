import { useState } from "react";
import "./add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAthlete, NewAthlete } from "../../lib/athletes";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = ({ setOpen }: Props) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Partial<NewAthlete>>({
    name: "",
    sport: "",
    country: "",
    age: undefined,
    gender: "M",
    status: "clear",
    doping_risk: 0,
    performance_score: 0,
    heart_rate: undefined,
  });
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => createAthlete(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
      queryClient.invalidateQueries({ queryKey: ["athlete-stats"] });
      setOpen(false);
    },
    onError: (e: unknown) => setError((e as Error).message),
  });

  const update = (key: keyof NewAthlete, value: string) => {
    const numeric = ["age", "doping_risk", "performance_score", "heart_rate"];
    setForm((f) => ({
      ...f,
      [key]: numeric.includes(key) ? (value === "" ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.sport) {
      setError("Name and sport are required.");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add New Athlete</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Name *</label>
            <input value={form.name ?? ""} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="item">
            <label>Sport *</label>
            <input value={form.sport ?? ""} onChange={(e) => update("sport", e.target.value)} />
          </div>
          <div className="item">
            <label>Country</label>
            <input value={form.country ?? ""} onChange={(e) => update("country", e.target.value)} />
          </div>
          <div className="item">
            <label>Age</label>
            <input type="number" value={form.age ?? ""} onChange={(e) => update("age", e.target.value)} />
          </div>
          <div className="item">
            <label>Gender</label>
            <select value={form.gender ?? "M"} onChange={(e) => update("gender", e.target.value)}>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="item">
            <label>Status</label>
            <select value={form.status ?? "clear"} onChange={(e) => update("status", e.target.value)}>
              <option value="clear">Clear</option>
              <option value="under_review">Under Review</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          <div className="item">
            <label>Doping Risk (0-100)</label>
            <input type="number" value={form.doping_risk ?? 0} onChange={(e) => update("doping_risk", e.target.value)} />
          </div>
          <div className="item">
            <label>Performance (0-100)</label>
            <input
              type="number"
              value={form.performance_score ?? 0}
              onChange={(e) => update("performance_score", e.target.value)}
            />
          </div>
          <div className="item">
            <label>Resting Heart Rate (bpm)</label>
            <input type="number" value={form.heart_rate ?? ""} onChange={(e) => update("heart_rate", e.target.value)} />
          </div>
          {error && <p style={{ color: "#ff7a7a", gridColumn: "span 2" }}>{error}</p>}
          <button disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving…" : "Add Athlete"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
