export type Status =
| 'Not Started'
| 'Planning'
| 'Implementation'
| 'Code Review'
| 'QA'
| 'UAT'
| 'Confirmation'
| 'Release';

export const STATUS_MAP: Array<{ min: number; max: number; label: Status }> = [
  { min: 0, max: 0, label: 'Not Started' },
  { min: 1, max: 10, label: 'Planning' },
  { min: 11, max: 70, label: 'Implementation' },
  { min: 71, max: 75, label: 'Code Review' },
  { min: 76, max: 85, label: 'QA' },
  { min: 86, max: 90, label: 'UAT' },
  { min: 91, max: 95, label: 'Confirmation' },
  { min: 96, max: 100, label: 'Release' },
];

export function getStatusByPercentage(pct: number): Status {
  const match = STATUS_MAP.find(s => pct >= s.min && pct <= s.max);
  return (match?.label ?? 'NOT STARTED') as Status;
}