export enum IdenfyOnBoardingViewType {
  /**
   * Shows a single onBoarding view before verification process with all upcoming steps
   */
  single = 'single',

  /**
   * Shows an onBoarding view before EVERY step of the verification process with a static instruction list
   */
  multipleStatic = 'multipleStatic',

  /**
   * Does not show any onBoarding view
   */
  none = 'none',
}
