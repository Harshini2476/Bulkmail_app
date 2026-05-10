import { useState } from "react";
import axios from "axios";

function ComposePage() {

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState("");

  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {

    if (!subject || !body || !recipients) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/send-email",
        {
          subject,
          body,
          recipients: recipients
            .split(",")
            .map((email) => email.trim()),
        }
      );

      alert(response.data.message);

      setSubject("");
      setBody("");
      setRecipients("");

    } catch (error) {

      console.log(error);

      alert("Failed to send email");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-sky-300">

      {/* Header */}

      <div className="bg-black text-white text-center py-5">

        <h1 className="text-4xl font-bold">
          BulkMail
        </h1>

      </div>

      {/* Subtitle */}

      <div className="bg-blue-950 text-white text-center py-4">

        <p className="text-xl">
          We can help your business with sending multiple emails at once
        </p>

      </div>

      {/* Drag Drop */}

      <div className="bg-blue-700 text-white text-center py-4">

        <h2 className="text-3xl font-semibold">
          Drag and Drop
        </h2>

      </div>

      {/* Main Section */}

      <div className="flex flex-col items-center py-10 px-4">

        {/* Subject */}

        <input
          type="text"
          placeholder="Enter email subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-[80%] max-w-5xl p-4 rounded-md border border-gray-400 outline-none text-black text-lg bg-white shadow-md mb-6"
        />

        {/* Email Body */}

        <textarea
          rows="10"
          placeholder="Enter the email text ....."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-[80%] max-w-5xl rounded-md border border-gray-400 p-5 outline-none text-black text-lg bg-white shadow-lg"
        ></textarea>

        {/* Upload */}

        <div className="border-4 border-dashed border-gray-300 mt-10 px-12 py-8 bg-sky-300">

          <input
            type="file"
            className="bg-white text-black"
          />

        </div>

        {/* Recipients */}

        <input
          type="text"
          placeholder="Enter recipient emails separated by commas"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          className="w-[80%] max-w-5xl p-4 rounded-md border border-gray-400 outline-none text-black text-lg bg-white shadow-md mt-8"
        />

        <p className="mt-4 text-xl text-gray-800 font-medium">

          Total Emails in the file: {
            recipients
              ? recipients.split(",").length
              : 0
          }

        </p>

        {/* Button */}

        <button
          onClick={sendEmail}
          disabled={loading}
          className="mt-8 bg-blue-950 hover:bg-black text-white px-10 py-4 rounded-md text-xl font-semibold shadow-lg transition duration-300"
        >

          {loading ? "Sending..." : "Send"}

        </button>

      </div>

    </div>
  );
}

export default ComposePage;
