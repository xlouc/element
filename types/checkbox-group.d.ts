import { YakUIComponent, YakUIComponentSize } from './component'

/** Checkbox Group Component */
export declare class ElCheckboxGroup extends YakUIComponent {
  /** Size of checkbox buttons or bordered checkboxes */
  size: YakUIComponentSize

  /** Whether the nesting checkboxes are disabled */
  disabled: boolean

  /** Minimum number of checkbox checked */
  min: number

  /** Maximum number of checkbox checked */
  max: number

  /** Font color when button is active */
  textColor: string

  /** Border and background color when button is active */
  fill: string
}
