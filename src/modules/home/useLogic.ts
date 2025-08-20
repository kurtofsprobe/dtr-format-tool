import { getStatusByPercentage, Status } from "@/common/constants/status";
import { formatDate } from "@/common/utils/dateFormat";
import { useCallback, useMemo, useState } from "react";

type Task = {
  id: string;
  details: string;
  percent: number;
  status: Status;
}

export const useLogic = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [details, setDetails] = useState("");
  const [percent, setPercent] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [report, setReport] = useState('');

  const canAdd = useMemo(
    () => !!date && details.trim().length > 0 && percent >= 0 && percent <= 100,
    [date, details, percent]
  );

  const handleAdd = useCallback(() => {
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
  }, [canAdd, details, percent]);

  const handleRemove = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const generateReport = useCallback((date: string, tasks: Task[]) => {
    const header = date ? formatDate(date) : formatDate(new Date().toISOString().split('T')[0]);
    const body = tasks.map(t => `- ${t.percent}% [${t.status}] ${t.details}`).join('\n');
    return `${header}\nToday\n${body}`;
  },[]);

  return {
    tasks, details, percent, date, report,

    setDetails, setPercent, setDate, setReport,

    canAdd,

    handleAdd, handleRemove, generateReport,
  };
};