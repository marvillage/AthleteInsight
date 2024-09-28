import { useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Athlete Name",
    width: 250,
  },
  {
    field: "messagePreview",
    type: "string",
    headerName: "Message Preview",
    width: 300,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 150,
    // Possible values: "Unread", "Read", "Replied"
  },
  {
    field: "lastMessageTime",
    headerName: "Last Message Time",
    width: 200,
    type: "string",
  },
  {
    field: "isConfidential",
    headerName: "Confidential",
    width: 150,
    type: "boolean",
    // Shows whether the chat is marked as confidential
  },
  {
    field: "reportStatus",
    headerName: "Reported",
    width: 150,
    type: "boolean",
    // Whether the conversation has been flagged/reported
  },
  {
    field: "chatType",
    headerName: "Chat Type",
    width: 150,
    type: "string",
    // Example values: "One-on-One", "Group"
  },
  {
    field: "athleteRole",
    headerName: "Athlete Role",
    width: 200,
    type: "string",
    // Example values: "Olympian", "Professional", "Amateur"
  },
  {
    field: "securityLevel",
    headerName: "Security Level",
    width: 150,
    type: "string",
    // Example values: "High", "Medium", "Low"
  },
  {
    field: "isActive",
    headerName: "Active",
    width: 150,
    type: "boolean",
    // Indicates if the chat is currently active
  },
  
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      <div className="info">
        <h1>Chats</h1>
        <button onClick={() => setOpen(true)}>Add New Chat</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
