import { YakUIComponent } from './component'

export type DateType = Date | String | Number

/** Calendar Component */
export declare class ElCalendar extends YakUIComponent {
  /** Binding value */
  value: DateType

  /** Specify the display range of the calendar */
  range: DateType[]

  /** First day of week */
  firstDayOfWeek: number
}
