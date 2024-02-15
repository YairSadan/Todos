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
type IconProps = React.HTMLAttributes<SVGSVGElement>;
export const Icons = {
  ArrowTopRightIcon: (props: IconProps) => (
    <ArrowTopRightIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  ArrowUpIcon: (props: IconProps) => (
    <ArrowUpIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  ArrowRightIcon: (props: IconProps) => (
    <ArrowRightIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  ArrowDownIcon: (props: IconProps) => (
    <ArrowDownIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  QuestionMarkCircledIcon: (props: IconProps) => (
    <QuestionMarkCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  StopwatchIcon: (props: IconProps) => (
    <StopwatchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  CrossCircledIcon: (props: IconProps) => (
    <CrossCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  CheckCircledIcon: (props: IconProps) => (
    <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  ),
  logo: (props: IconProps) => <ListTodoIcon className="h-16 w-16" />,
  spinner: (props: IconProps) => (
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
