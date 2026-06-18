import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
import { fetchAthletes } from "../../lib/athletes";

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  clear: { bg: "rgba(0,196,159,0.15)", color: "#00c49f", label: "Clear" },
  under_review: { bg: "rgba(255,187,40,0.15)", color: "#ffbb28", label: "Under Review" },
  flagged: { bg: "rgba(255,128,66,0.18)", color: "#ff8042", label: "Flagged" },
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Athlete",
    width: 180,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src={params.row.avatar || "/noavatar.png"}
          alt=""
          style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }}
        />
        <span>{params.row.name}</span>
      </div>
    ),
  },
  { field: "sport", headerName: "Sport", width: 150 },
  { field: "country", headerName: "Country", width: 120 },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params) => {
      const s = statusStyles[params.row.status] ?? statusStyles.clear;
      return (
        <span
          style={{
            background: s.bg,
            color: s.color,
            padding: "3px 10px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {s.label}
        </span>
      );
    },
  },
  {
    field: "doping_risk",
    headerName: "Doping Risk",
    width: 120,
    renderCell: (params) => {
      const v = params.row.doping_risk ?? 0;
      const color = v >= 70 ? "#ff8042" : v >= 40 ? "#ffbb28" : "#00c49f";
      return <span style={{ color, fontWeight: 600 }}>{v}%</span>;
    },
  },
  { field: "performance_score", headerName: "Performance", width: 120, type: "number" },
  { field: "last_test_date", headerName: "Last Test", width: 130 },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data, error } = useQuery({
    queryKey: ["athletes"],
    queryFn: fetchAthletes,
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Monitored Athletes</h1>
        <button onClick={() => setOpen(true)}>Add New Athlete</button>
      </div>

      {error ? (
        <p style={{ color: "#ff7a7a" }}>Failed to load athletes: {(error as Error).message}</p>
      ) : isLoading ? (
        "Loading…"
      ) : (
        <DataTable slug="users" columns={columns} rows={data ?? []} />
      )}

      {open && <Add setOpen={setOpen} />}
    </div>
  );
};

export default Users;
