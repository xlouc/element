import { YakUIComponent } from "./component";

export interface TreemapData {
  id?: any;
  label?: string;
  isLeaf?: boolean;
  children?: TreemapData[];
}

export interface TreemapProps {
  label: string;
  isLeaf: string;
  children: string;
}

/** Treemap Component */
export declare class ElTreemap<D extends TreemapData> extends YakUIComponent {
  /** Treemap data */
  data: D[];

  /** Unique identity key name for nodes, its value should be unique across the whole Treemap */
  nodeKey: string;

  /** Configuration options, see the following table */
  props: TreemapProps;

  foldable: boolean;
  rowSpace: number;
  nodeSpace: number;
}
