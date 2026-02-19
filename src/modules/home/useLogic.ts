import { formatDate } from "@/common/utils/dateFormat";
import { useCallback, useMemo, useState } from "react";

type Task = {
  id: string;
  details: string;
}

export const useLogic = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<string>('');
  const [report, setReport] = useState('');

  const canAdd = useMemo(
    () => !!date && details.trim().length > 0,
    [date, details]
  );

  const handleAdd = useCallback(() => {
    if (!canAdd) return;
    const task: Task = {
      id: `${Date.now()}`,
      details: details.trim(),
    };
    setTasks(prev => [...prev, task]);
    setDetails("");
  }, [canAdd, details]);

  const handleRemove = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const generateReport = useCallback((date: string, tasks: Task[]) => {
    const header = date ? formatDate(date) : formatDate(new Date().toISOString().split('T')[0]);
    const body = tasks.map(t => `- ${t.details}`).join('\n');
    return `${header}\nToday\n${body}`;
  },[]);

  return {
    tasks, details, date, report,

    setDetails, setDate, setReport,

    canAdd,

    handleAdd, handleRemove, generateReport,
  };
};