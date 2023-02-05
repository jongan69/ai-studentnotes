import React, { useState } from "react";

export default function Dashboard() {
  // AI Response
  const [summary, setSummary] = useState("");

  // AI Parameters
  const [student, setStudent] = useState("");
  const [projectName, setProjectName] = useState("");
  const [notes, setNotes] = useState("");

  // Error Handling
  const [apiError, setApiError] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(completedCode);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/returnSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student,
          projectName,
          notes
        }),
      });
      setIsGenerating(false);
      const data = await res.json();
      setSummary(data.answer);
    } catch (err) {
      setApiError(err)
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="flex flex-col">
              <p>Student Name </p>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <textarea
                rows={1}
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                name="student"
                id="student"
                placeholder="Student Name"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <p>Project Name </p>
              <label htmlFor="projectName" className="sr-only">
                Project Name
              </label>
              <textarea
                rows={1}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                name="projectName"
                id="projectName"
                placeholder="ie: Roblox Game"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <p>Notes</p>
              <label htmlFor="notes" className="sr-only">
                Paste Your Notes Here
              </label>
              <textarea
                rows={20}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                name="notes"
                id="notes"
                placeholder="Paste your notes here"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>




            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${isGenerating
                  ? "cursor-not-allowed opacity-50"
                  : ""
                }`}
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Readme"}
            </button>

          </form>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                summary === ""
                  ? 7
                  : 100
              }
              name="output"
              value={summary}
              onChange={!apiError ? (e) => setSummary(e.target.value) : (e) => setMarkdown(apiError)}
              disabled={summary === ""}
              id="output"
              placeholder="AI Response"
              className={`block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500
              ${!apiError
                  ? "text-gray-900"
                  : "text-red-500"
                }`}
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={summary === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
