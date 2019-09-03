import { YakUIComponent } from "./component";

export interface SkeletonAvatarProps {
  size: "large" | "small" | "default" | number;
  shape: "circle" | "square";
}

type widthUnit = number | string;

export interface SkeletonParagraphProps {
  width: widthUnit | Array<widthUnit>;
  rows: number;
}

/** Skeleton Component */
export declare class ElSkeleton extends YakUIComponent {
  /** The active of skeleton */
  active: boolean;

  /** The loading of skeleton */
  loading: boolean;

  /** The avatar of skeleton */
  avatar: SkeletonAvatarProps;

  /** The title of skeleton */
  title: boolean | number | string;

  /** The paragraph of skeleton */
  paragraph: SkeletonParagraphProps;
}
