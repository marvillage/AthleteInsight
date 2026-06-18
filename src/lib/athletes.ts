import { supabase } from "./supabase";

export type AthleteStatus = "clear" | "under_review" | "flagged";

export type Athlete = {
  id: string;
  created_at: string;
  name: string;
  sport: string;
  country: string | null;
  age: number | null;
  gender: string | null;
  avatar: string | null;
  status: AthleteStatus;
  doping_risk: number; // 0-100
  performance_score: number; // 0-100
  heart_rate: number | null; // resting bpm
  vo2max: number | null;
  hemoglobin: number | null; // g/dL — biological passport marker
  last_test_date: string | null;
  notes: string | null;
};

export type NewAthlete = Omit<Athlete, "id" | "created_at">;

export async function fetchAthletes(): Promise<Athlete[]> {
  const { data, error } = await supabase
    .from("athletes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Athlete[];
}

export async function fetchAthlete(id: string): Promise<Athlete> {
  const { data, error } = await supabase
    .from("athletes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Athlete;
}

export async function createAthlete(athlete: Partial<NewAthlete>): Promise<Athlete> {
  const { data, error } = await supabase
    .from("athletes")
    .insert([athlete])
    .select()
    .single();
  if (error) throw error;
  return data as Athlete;
}

export async function deleteAthlete(id: string): Promise<void> {
  const { error } = await supabase.from("athletes").delete().eq("id", id);
  if (error) throw error;
}

export type AthleteStats = {
  total: number;
  flagged: number;
  underReview: number;
  clear: number;
  avgRisk: number;
  avgPerformance: number;
  bySport: { name: string; value: number }[];
  statusDistribution: { name: string; value: number; color: string }[];
};

export async function fetchStats(): Promise<AthleteStats> {
  const athletes = await fetchAthletes();
  const total = athletes.length;
  const flagged = athletes.filter((a) => a.status === "flagged").length;
  const underReview = athletes.filter((a) => a.status === "under_review").length;
  const clear = athletes.filter((a) => a.status === "clear").length;
  const avg = (xs: number[]) =>
    xs.length ? Math.round(xs.reduce((s, x) => s + x, 0) / xs.length) : 0;

  const sportCounts = new Map<string, number>();
  for (const a of athletes) {
    sportCounts.set(a.sport, (sportCounts.get(a.sport) ?? 0) + 1);
  }

  return {
    total,
    flagged,
    underReview,
    clear,
    avgRisk: avg(athletes.map((a) => a.doping_risk ?? 0)),
    avgPerformance: avg(athletes.map((a) => a.performance_score ?? 0)),
    bySport: [...sportCounts.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value),
    statusDistribution: [
      { name: "Clear", value: clear, color: "#00C49F" },
      { name: "Under Review", value: underReview, color: "#FFBB28" },
      { name: "Flagged", value: flagged, color: "#FF8042" },
    ],
  };
}
