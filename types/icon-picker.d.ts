import { YakUIComponent, YakUIComponentSize } from "./component";

/** icon-picker Component */
export declare class ElIconPicker extends YakUIComponent {
  /** Controls the size of components in this IconPicker */
  size: YakUIComponentSize;

  /** Whether to display the alpha slider */
  popperClass: string;

  /** Binding value */
  value: string;

  /** Whether IconPicker is disabled */
  disabled: boolean;

  /** data of IconPicker */
  data: Array<string>;

  /** pageSize of IconPicker */
  pageSize: number;

  /** Whether to append the popper menu to body */
  popperAppendToBody: boolean;
}
