import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="loader">
      <LoaderCircle size={32} className="spinner" />
      <p>Loading items...</p>
    </div>
  );
}

export default Loader;