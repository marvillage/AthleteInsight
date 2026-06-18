// Hardcoded content for the secondary dashboard tabs (detectors, medical
// records, analytics, etc.) so every sidebar link resolves to a real,
// themed page. The core athletes data is live from Supabase; these panels
// are illustrative.

export type Kpi = { label: string; value: string; tone?: "blue" | "yellow" | "green" | "red" };

export type FeatureConfig = {
  title: string;
  subtitle: string;
  kpis: Kpi[];
  tableTitle: string;
  columns: string[];
  rows: (string | number)[][];
};

export const featureData: Record<string, FeatureConfig> = {
  profile: {
    title: "Moderator Profile",
    subtitle: "Your account and recent monitoring activity.",
    kpis: [
      { label: "Role", value: "Integrity Officer", tone: "blue" },
      { label: "Athletes Monitored", value: "12", tone: "yellow" },
      { label: "Reviews This Month", value: "34", tone: "green" },
      { label: "Open Flags", value: "3", tone: "red" },
    ],
    tableTitle: "Recent Actions",
    columns: ["Date", "Action", "Athlete", "Result"],
    rows: [
      ["2025-06-08", "Reviewed blood profile", "Liam O'Connor", "Flagged"],
      ["2025-06-05", "Closed case", "Amara Diallo", "Cleared"],
      ["2025-06-02", "Ordered retest", "Hiro Tanaka", "Under Review"],
      ["2025-05-30", "Flagged passport anomaly", "Elena Petrova", "Flagged"],
    ],
  },
  training: {
    title: "Training & Resources",
    subtitle: "Anti-doping education modules and compliance guides.",
    kpis: [
      { label: "Modules", value: "18", tone: "blue" },
      { label: "Completed", value: "11", tone: "green" },
      { label: "Certificates", value: "4", tone: "yellow" },
      { label: "Hours Logged", value: "27h", tone: "blue" },
    ],
    tableTitle: "Available Modules",
    columns: ["Module", "Category", "Duration", "Status"],
    rows: [
      ["WADA Prohibited List 2025", "Regulations", "45 min", "Completed"],
      ["Sample Collection Protocol", "Procedure", "30 min", "Completed"],
      ["Biological Passport Basics", "Analysis", "60 min", "In Progress"],
      ["Whereabouts & TUE Rules", "Compliance", "40 min", "Not Started"],
      ["Recognising Manipulation", "Investigation", "50 min", "Not Started"],
    ],
  },
  whistleblower: {
    title: "Whistleblower Reports",
    subtitle: "Confidential tips submitted by athletes and staff.",
    kpis: [
      { label: "Total Tips", value: "27", tone: "blue" },
      { label: "Under Investigation", value: "6", tone: "yellow" },
      { label: "Substantiated", value: "9", tone: "red" },
      { label: "Anonymous", value: "71%", tone: "green" },
    ],
    tableTitle: "Recent Submissions",
    columns: ["Ref", "Date", "Category", "Status"],
    rows: [
      ["WB-1042", "2025-06-09", "Suspected EPO use", "Investigating"],
      ["WB-1039", "2025-06-04", "Coach misconduct", "Substantiated"],
      ["WB-1035", "2025-05-28", "Tampered sample", "Investigating"],
      ["WB-1031", "2025-05-19", "Unauthorised supplier", "Closed"],
    ],
  },
  social: {
    title: "Social Media Monitoring",
    subtitle: "AI-flagged posts indicating possible doping signals.",
    kpis: [
      { label: "Accounts Tracked", value: "146", tone: "blue" },
      { label: "Flagged Posts (30d)", value: "23", tone: "yellow" },
      { label: "High Severity", value: "5", tone: "red" },
      { label: "False Positive Rate", value: "8%", tone: "green" },
    ],
    tableTitle: "Flagged Activity",
    columns: ["Athlete", "Platform", "Signal", "Severity"],
    rows: [
      ["Elena Petrova", "Instagram", "Altitude tent reference", "High"],
      ["Liam O'Connor", "X", "Suspicious supplement promo", "High"],
      ["Noah Schmidt", "TikTok", "Rapid mass-gain claims", "Medium"],
      ["David Mokoena", "Instagram", "Unverified clinic tag", "Medium"],
    ],
  },
  doping: {
    title: "AI Doping Detector",
    subtitle: "Model-driven anomaly scoring across athlete biomarkers.",
    kpis: [
      { label: "Model Accuracy", value: "94.2%", tone: "green" },
      { label: "High-Risk Athletes", value: "3", tone: "red" },
      { label: "Samples Scored", value: "1,284", tone: "blue" },
      { label: "Avg Risk", value: "32%", tone: "yellow" },
    ],
    tableTitle: "Latest Detections",
    columns: ["Athlete", "Marker", "Anomaly Score", "Verdict"],
    rows: [
      ["Elena Petrova", "Hemoglobin spike", "0.86", "Flagged"],
      ["Liam O'Connor", "OFF-score deviation", "0.79", "Flagged"],
      ["David Mokoena", "Steroid metabolite", "0.71", "Flagged"],
      ["Hiro Tanaka", "Reticulocyte %", "0.54", "Review"],
    ],
  },
  weight: {
    title: "Weight Incrementor Detector",
    subtitle: "Detects abnormal mass changes inconsistent with training load.",
    kpis: [
      { label: "Athletes Tracked", value: "12", tone: "blue" },
      { label: "Abnormal Gains", value: "2", tone: "red" },
      { label: "Avg Δ (30d)", value: "+0.4 kg", tone: "yellow" },
      { label: "Confidence", value: "91%", tone: "green" },
    ],
    tableTitle: "Mass Change Alerts",
    columns: ["Athlete", "30-Day Δ", "Expected", "Flag"],
    rows: [
      ["Noah Schmidt", "+4.2 kg", "+0.8 kg", "Abnormal"],
      ["David Mokoena", "+2.9 kg", "+0.6 kg", "Abnormal"],
      ["Marcus Reed", "+0.3 kg", "+0.4 kg", "Normal"],
      ["Chen Wei", "-0.2 kg", "0.0 kg", "Normal"],
    ],
  },
  performance: {
    title: "Performance Spike Detector",
    subtitle: "Flags statistically improbable performance jumps.",
    kpis: [
      { label: "Events Analysed", value: "412", tone: "blue" },
      { label: "Spikes Detected", value: "7", tone: "yellow" },
      { label: "Beyond 3σ", value: "2", tone: "red" },
      { label: "Avg Improvement", value: "2.1%", tone: "green" },
    ],
    tableTitle: "Detected Spikes",
    columns: ["Athlete", "Event", "Improvement", "Severity"],
    rows: [
      ["Hiro Tanaka", "200m Freestyle", "+4.8%", "High"],
      ["Liam O'Connor", "Individual TT", "+3.9%", "High"],
      ["Sofia Marchetti", "400m Hurdles", "+1.7%", "Low"],
      ["Marcus Reed", "100m Sprint", "+1.1%", "Low"],
    ],
  },
  steroid: {
    title: "Steroid Metabolite Detector",
    subtitle: "Urinalysis screening for exogenous steroid metabolites.",
    kpis: [
      { label: "Samples Screened", value: "318", tone: "blue" },
      { label: "Positive", value: "2", tone: "red" },
      { label: "Atypical", value: "4", tone: "yellow" },
      { label: "T/E Ratio Threshold", value: "4:1", tone: "green" },
    ],
    tableTitle: "Screening Results",
    columns: ["Athlete", "Metabolite", "T/E Ratio", "Result"],
    rows: [
      ["David Mokoena", "Nandrolone", "6.2:1", "Positive"],
      ["Noah Schmidt", "Testosterone", "4.6:1", "Atypical"],
      ["Amara Diallo", "—", "1.1:1", "Negative"],
      ["Freya Lindqvist", "—", "0.9:1", "Negative"],
    ],
  },
  passport: {
    title: "Athlete Biological Passport",
    subtitle: "Longitudinal monitoring of haematological markers.",
    kpis: [
      { label: "Profiles", value: "12", tone: "blue" },
      { label: "Atypical Passports", value: "3", tone: "red" },
      { label: "Tests Logged", value: "96", tone: "yellow" },
      { label: "Compliance", value: "100%", tone: "green" },
    ],
    tableTitle: "Passport Status",
    columns: ["Athlete", "HGB (g/dL)", "OFF-Score", "Status"],
    rows: [
      ["Elena Petrova", "17.9", "108", "Atypical"],
      ["Liam O'Connor", "18.4", "112", "Atypical"],
      ["Marcus Reed", "15.1", "92", "Normal"],
      ["Chen Wei", "13.4", "85", "Normal"],
    ],
  },
  urinalysis: {
    title: "Urinalysis Reports",
    subtitle: "Recent urine sample analysis records.",
    kpis: [
      { label: "Samples (30d)", value: "41", tone: "blue" },
      { label: "Adverse Findings", value: "2", tone: "red" },
      { label: "Pending", value: "5", tone: "yellow" },
      { label: "Chain-of-Custody OK", value: "100%", tone: "green" },
    ],
    tableTitle: "Sample Log",
    columns: ["Sample ID", "Athlete", "Collected", "Result"],
    rows: [
      ["U-50231", "David Mokoena", "2025-06-05", "Adverse"],
      ["U-50228", "Noah Schmidt", "2025-05-27", "Atypical"],
      ["U-50224", "Ines Fernandez", "2025-04-30", "Negative"],
      ["U-50220", "Kwame Osei", "2025-04-18", "Negative"],
    ],
  },
  cardio: {
    title: "Cardiovascular Health Reports",
    subtitle: "Resting HR, VO₂max and cardiac screening summaries.",
    kpis: [
      { label: "Avg Resting HR", value: "43 bpm", tone: "blue" },
      { label: "Avg VO₂max", value: "67.1", tone: "green" },
      { label: "ECG Flags", value: "1", tone: "red" },
      { label: "Screenings", value: "12", tone: "yellow" },
    ],
    tableTitle: "Cardiac Screening",
    columns: ["Athlete", "Resting HR", "VO₂max", "ECG"],
    rows: [
      ["Freya Lindqvist", "37", "76.3", "Normal"],
      ["Marcus Reed", "44", "71.2", "Normal"],
      ["Noah Schmidt", "52", "55.8", "Review"],
      ["Chen Wei", "49", "58.2", "Normal"],
    ],
  },
  endocrine: {
    title: "Endocrine Profile Reports",
    subtitle: "Hormonal panels for doping-control investigations.",
    kpis: [
      { label: "Panels Run", value: "58", tone: "blue" },
      { label: "Out of Range", value: "4", tone: "red" },
      { label: "Retests Ordered", value: "3", tone: "yellow" },
      { label: "Normal", value: "93%", tone: "green" },
    ],
    tableTitle: "Hormone Panels",
    columns: ["Athlete", "Testosterone", "Cortisol", "Flag"],
    rows: [
      ["Liam O'Connor", "High", "Low", "Out of Range"],
      ["David Mokoena", "High", "Normal", "Out of Range"],
      ["Amara Diallo", "Normal", "Normal", "Normal"],
      ["Sofia Marchetti", "Normal", "Normal", "Normal"],
    ],
  },
  geospatial: {
    title: "GeoSpatial Analysis",
    subtitle: "Doping-risk clustering by training region.",
    kpis: [
      { label: "Regions", value: "9", tone: "blue" },
      { label: "Hotspots", value: "2", tone: "red" },
      { label: "Athletes Mapped", value: "12", tone: "yellow" },
      { label: "Coverage", value: "100%", tone: "green" },
    ],
    tableTitle: "Regional Risk",
    columns: ["Region", "Athletes", "Avg Risk", "Tier"],
    rows: [
      ["Eastern Europe", "2", "82%", "Hotspot"],
      ["Western Europe", "4", "34%", "Moderate"],
      ["West Africa", "2", "10%", "Low"],
      ["East Asia", "2", "9%", "Low"],
    ],
  },
  "doping-risk": {
    title: "Doping Risk Analysis",
    subtitle: "Aggregate risk trends across the athlete pool.",
    kpis: [
      { label: "Pool Avg Risk", value: "32%", tone: "yellow" },
      { label: "High Risk", value: "3", tone: "red" },
      { label: "Trend (30d)", value: "-4%", tone: "green" },
      { label: "Model Version", value: "v2.3", tone: "blue" },
    ],
    tableTitle: "Risk Tiers",
    columns: ["Tier", "Range", "Athletes", "Action"],
    rows: [
      ["Critical", "70-100%", "3", "Investigate"],
      ["Elevated", "40-69%", "2", "Monitor"],
      ["Low", "0-39%", "7", "Routine"],
    ],
  },
  recovery: {
    title: "Recovery Analysis",
    subtitle: "Sleep, fatigue and recovery-load monitoring.",
    kpis: [
      { label: "Avg Sleep", value: "7.4 h", tone: "blue" },
      { label: "Avg Fatigue", value: "3.6 / 5", tone: "yellow" },
      { label: "Overtraining Flags", value: "2", tone: "red" },
      { label: "Recovered", value: "83%", tone: "green" },
    ],
    tableTitle: "Recovery Status",
    columns: ["Athlete", "Sleep", "Fatigue (RPE)", "Status"],
    rows: [
      ["Noah Schmidt", "5.9 h", "4.6", "Overtrained"],
      ["Hiro Tanaka", "6.4 h", "4.1", "At Risk"],
      ["Chen Wei", "8.2 h", "2.9", "Recovered"],
      ["Marcus Reed", "7.8 h", "3.2", "Recovered"],
    ],
  },
  "performance-analysis": {
    title: "Physical Performance Analysis",
    subtitle: "Performance scores and physiological benchmarks.",
    kpis: [
      { label: "Avg Performance", value: "88 / 100", tone: "green" },
      { label: "Top Performer", value: "Chen Wei", tone: "yellow" },
      { label: "Below Baseline", value: "1", tone: "red" },
      { label: "Athletes", value: "12", tone: "blue" },
    ],
    tableTitle: "Performance Benchmarks",
    columns: ["Athlete", "Score", "VO₂max", "Trend"],
    rows: [
      ["Chen Wei", "92", "58.2", "▲"],
      ["Liam O'Connor", "93", "78.1", "▲"],
      ["Marcus Reed", "91", "71.2", "►"],
      ["Noah Schmidt", "82", "55.8", "▼"],
    ],
  },
};
