import Vue from 'vue'

/** YakUI component common definition */
export declare class YakUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type YakUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type YakUIHorizontalAlignment = 'left' | 'center' | 'right'
