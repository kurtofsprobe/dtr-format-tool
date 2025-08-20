import TaskItem, { Task } from "./TaskItem";

export default function TaskList({
  tasks,
  onRemove,
}: {
  tasks: Task[],
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onRemove={onRemove} />     
      ))}
    </div>
  )
}