import { useState } from "react";

import ComposePage from "./ComposePage";
import HistoryPage from "./HistoryPage";

function App() {

  const [page, setPage] = useState("compose");

  return (

    <div>

      {/* Navbar */}

      <div className="bg-black text-white flex justify-center gap-6 py-4 shadow-lg">

        <button
          onClick={() => setPage("compose")}
          className={`px-5 py-2 rounded-md font-semibold transition duration-300 ${
            page === "compose"
              ? "bg-blue-700"
              : "hover:bg-blue-700"
          }`}
        >
          Compose
        </button>

        <button
          onClick={() => setPage("history")}
          className={`px-5 py-2 rounded-md font-semibold transition duration-300 ${
            page === "history"
              ? "bg-blue-700"
              : "hover:bg-blue-700"
          }`}
        >
          History
        </button>

      </div>

      {page === "compose"
        ? <ComposePage />
        : <HistoryPage />
      }

    </div>
  );
}

export default App;
