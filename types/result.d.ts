import { YakUIComponent } from "./component";

export type ExceptionStatusType = "404" | "500" | "403";
export type ResultStatusType = "success" | "error" | "info" | "warning";

/** Result Component */
export declare class ElResult extends YakUIComponent {
  /** The title of result */
  title: string;

  /** The subTitle of result */
  subTitle: string;

  /** The status of result */
  status: ExceptionStatusType | ResultStatusType;

  /** The icon of result */
  icon: string;
}
