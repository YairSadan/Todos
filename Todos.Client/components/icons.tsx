import {
  ArrowTopRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  CrossCircledIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import { ListTodoIcon } from "lucide-react";
type IconProps = React.HTMLAttributes<SVGAElement>;
export const iconMappings = {
  ArrowTopRightIcon: (
    <ArrowTopRightIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  ArrowUpIcon: <ArrowUpIcon className="mr-2 h-4 w-4 text-muted-foreground" />,
  ArrowRightIcon: (
    <ArrowRightIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  ArrowDownIcon: (
    <ArrowDownIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  QuestionMarkCircledIcon: (
    <QuestionMarkCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  StopwatchIcon: (
    <StopwatchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  CrossCircledIcon: (
    <CrossCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  CheckCircledIcon: (
    <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  logo: <ListTodoIcon className="h-16 w-16" />,
  spinner: (props: any) => ( // !todo
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
