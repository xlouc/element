import { YakUIComponent } from "./component";

/** Statistic Component */
export declare class ElStatistic extends YakUIComponent {
  /** separator of the statistic */
  separator: string;

  /** decimal of the statistic */
  decimal: string;

  /** precision of the statistic */
  precision: number;

  /** formatter of the statistic */
  formatter: Function;

  /** countup of the statistic */
  countup: boolean;

  /** prefix of the statistic */
  prefix: string;

  /** suffix of the statistic */
  suffix: string;

  /** title of the statistic */
  title: string;

  /** Current value of the statistic */
  value: string | number;

  /** valueStyle of the statistic */
  valueStyle: string | object;
}
