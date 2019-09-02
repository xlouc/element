import { YakUIComponent, YakUIComponentSize } from "./component";

export type ListLayout = "horizontal" | "vertical";

export type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export interface ListGridType {
  gutter: number;
  column: ColumnCount;
  xs: ColumnCount;
  sm: ColumnCount;
  md: ColumnCount;
  lg: ColumnCount;
  xl: ColumnCount;
  xxl: ColumnCount;
}

/** List Component */
export declare class ElList extends YakUIComponent {
  /** Bordered the list */
  bordered: boolean;

  /** Grid the list */
  grid: ListGridType;

  /** Layout the list */
  layout: ListLayout;

  /** Size the list */
  size: YakUIComponentSize;

  /** Split the list */
  split: boolean;

  /** Header the list */
  header: string;

  /** Footer the list */
  footer: string;
}
