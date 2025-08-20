import { useState } from "react";
import { getStatusByPercentage, Status } from "@/common/constants/status";
import { formatDate } from "@/common/utils/dateFormat";

type Task = {
  id: string;
  details: string;
  percent: number;
  status: Status;
}

export default function MainComponent () {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [details, setDetails] = useState("");
  const [percent, setPercent] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [report, setReport] = useState('');

  const canAdd = !!date && details.trim().length > 0 && percent >= 0 && percent <= 100;

  const handleAdd = () => {
    if (!canAdd) return;

    const pct = Math.max(0, Math.min(100, Math.floor(percent)));

    const task: Task = {
      id: `${Date.now()}`,
      details: details.trim(),
      percent: pct,
      status: getStatusByPercentage(pct),
    };
    setTasks(prev => [...prev, task]);
    setDetails("");
    setPercent(0);
  };

  const handleRemove = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const generateReport = (date: string, tasks: Task[]) => {
    const header = date ? formatDate(date) : formatDate(new Date().toISOString().split('T')[0]);
    const body = tasks.map(t => `- ${t.percent}% [${t.status}] ${t.details}`).join('\n');
    return `${header}\nToday\n${body}`;
  };

  const handleCopy = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
    } catch (err) {
      console.error("failed to copy: ", err);
    }
  }

  return (
  <>
  <div className="flex flex-col min-h-screen">
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row space-x-6 items-center">
        <label htmlFor="">Select Date</label>    
        <input 
          type="date" 
          className="input"
          value={date}
          onChange={e => setDate(e.target.value)}
          />
      </div>

      <div className="flex flex-row space-x-6">
        <div className="flex flex-row space-x-6 items-center">
          <label htmlFor="">Task Details</label>    
          <input 
            type="text" 
            className="input w-full"
            value={details}
            onChange={e => setDetails(e.target.value)}
            placeholder="Study the frontend flow of component"
            />
        </div>
        
        <div className="flex flex-row space-x-6 items-center">
          <label htmlFor="">Progress</label>
          <input 
            type="number" 
            min="0" 
            max="100" 
            className="input w-16"
            value={Number.isNaN(percent) ? 0 : percent}
            onChange={e => setPercent(Number(e.target.value))}  
            />
        </div>

        <div className="flex flex-row items-center space-x-6">
          <button className="btn" onClick={handleAdd} disabled={!canAdd}>+ Add</button>
          <button className="btn btn-md" onClick={() => setReport(generateReport(date, tasks))} disabled={tasks.length===0}>Generate Report</button>
        </div>      
      </div>

      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t.id} className="flex flex-row justify-between rounded border p-2 text-sm">
            <div className="flex items-center">
              {t.percent}% [{t.status}] {t.details}
            </div>
            <div>
              <button className="btn btn-ghost" onClick={() => handleRemove(t.id)} title="Remove">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    {report && (
      <div>
        <textarea
          readOnly
          value={report}
          rows={8}
          className="w-full border rounded p-2 font-mono mt-4"
        />
        <div className="flex justify-end">
          <button 
            className="btn btn-sm btn-ghost mt-4 flex"
            onClick={handleCopy} 
            disabled={!report}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          </button>
        </div>
      </div>
    )}

  </div>
  </>
  );
}