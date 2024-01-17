import { Priority, Status } from '@/types/types';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const priorities: Priority[] = [
  {
    value: 'Low',
    label: 'Low',
    icon: ArrowDownIcon,
  },
  {
    value: 'Medium',
    label: 'Medium',
    icon: ArrowRightIcon,
  },
  {
    value: 'High',
    label: 'High',
    icon: ArrowTopRightIcon,
  },
  {
    value: 'Critical',
    label: 'Critical',
    icon: ArrowUpIcon,
  },
];
export const statuses: Status[] = [
  {
    value: 'Pending',
    label: 'Pending',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'In Progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'Done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'Cancelled',
    label: 'Cancelled',
    icon: CrossCircledIcon,
  },
];

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];
