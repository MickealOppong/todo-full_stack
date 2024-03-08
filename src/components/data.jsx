import { IoCalendarNumberOutline, IoCalendarOutline } from "react-icons/io5";
import { TbCalendarDue } from "react-icons/tb";
export const todoView = [
  {
    id: 1,
    icon: <TbCalendarDue />,
    title: 'today'
  },
  {
    id: 2,
    icon: <IoCalendarNumberOutline />,
    title: 'tomorrow'
  },
  {
    id: 3,
    icon: <IoCalendarOutline />,
    title: 'overdue'
  }

]