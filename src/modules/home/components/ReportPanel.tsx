import React from "react";

type ReportPanelProps = {
  report: string,
  title?: string,
  className?: string;
};

export default function ReportPanel({ report, title = "Output: ", className }: ReportPanelProps) {
  if (!report) return null;

  const handleCopy  = async () => {
    try {
        if (typeof navigator != "undefined" && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(report);
        }
    } catch (err) {
        console.error("failed to copy: ", err);
    }
  };

  return (
    <div className="mt-4">
      <h1>Output:</h1>
      <textarea
        readOnly
        value={report}
        rows={8}
        className="w-full border rounded p-2 font-mono"
      />
      <div className="flex justify-end">
        <button 
          className="btn btn-sm btn-ghost mt-4 flex"
          onClick={handleCopy} 
          disabled={!report}
        >Copy me
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
        </button>
      </div>
    </div>
  );
}