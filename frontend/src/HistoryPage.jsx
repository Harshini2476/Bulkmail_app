import { useEffect, useState } from "react";
import axios from "axios";

function HistoryPage() {

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/history"
      );

      setEmails(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load email history");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (

    <div className="min-h-screen bg-sky-300 p-8">

      <div className="bg-black text-white text-center py-5 rounded-md shadow-lg">

        <h1 className="text-4xl font-bold">
          Email History
        </h1>

      </div>

      <div className="max-w-5xl mx-auto mt-10 space-y-6">

        {loading ? (

          <p className="text-center text-2xl">
            Loading...
          </p>

        ) : emails.length === 0 ? (

          <p className="text-center text-2xl">
            No emails found
          </p>

        ) : (

          emails.map((email, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
            >

              <h2 className="text-2xl font-bold text-blue-950">

                {email.subject}

              </h2>

              <p className="mt-4 text-gray-700">

                {email.body}

              </p>

              <p className="mt-4 text-blue-700 font-medium">

                Recipients:
                {" "}
                {email.recipients.length}

              </p>

              <p className="mt-2 text-green-700 font-medium">

                Status:
                {" "}
                {email.status}

              </p>

              <p className="mt-2 text-gray-500 text-sm">

                {new Date(email.sentAt).toLocaleString()}

              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default HistoryPage;
