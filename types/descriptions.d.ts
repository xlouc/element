import { YakUIComponent, YakUIComponentSize } from "./component";

export type DescriptionsLayout = "horizontal" | "vertical";

/** Descriptions Component */
export declare class ElDescriptions extends YakUIComponent {
  /** Eitle of the descriptions */
  title: string;
  /** Bordered of the descriptions */
  bordered: boolean;
  /** Column of the descriptions */
  column: number | object;
  /** Size of the descriptions */
  size: YakUIComponentSize;
  /** Layout of the descriptions */
  layout: DescriptionsLayout;
  /** Colon of the descriptions */
  colon: boolean;
}
