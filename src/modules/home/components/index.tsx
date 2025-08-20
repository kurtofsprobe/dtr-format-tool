import { useLogic } from "../useLogic";
import ReportPanel from "./ReportPanel";
import TaskList from "./TaskList";

export default function MainComponent () {
  const {
    tasks, details, percent, date, report,
    setDetails, setPercent, setDate, setReport,
    canAdd, handleAdd, handleRemove, generateReport,
  } = useLogic();

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
  <div className="min-h-screen w-full max-w-screen-md mx-auto px-4 overflow-x-hidden">
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-3">
        <label htmlFor="">Select Date</label>    
        <input 
          type="date" 
          className="input min-w-0"
          value={date}
          onChange={e => setDate(e.target.value)}
          />
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <label htmlFor="">Task Details</label>    
          <input 
            type="text" 
            className="input w-full min-w-0"
            value={details}
            onChange={e => setDetails(e.target.value)}
            placeholder="Study the frontend flow of component"
            />
        </div>
        
        <div className="flex items-center gap-3">
          <label htmlFor="">Progress</label>
          <input 
            type="number" 
            min="0" 
            max="100" 
            className="input w-20"
            value={Number.isNaN(percent) ? 0 : percent}
            onChange={e => setPercent(Number(e.target.value))}  
            />
        </div>

        <div className="flex items-center gap-3">
          <button className="btn" onClick={handleAdd} disabled={!canAdd}>+ Add</button>
          <button className="btn btn-md" onClick={() => setReport(generateReport(date, tasks))} disabled={tasks.length===0}>Generate Report</button>
        </div>      
      </div>

      <TaskList tasks={tasks} onRemove={handleRemove}/>

    </div>
    <ReportPanel report={report} />
  </div>
  </>
  );
}