import { IdenfyColorScheme } from 'idenfy-react-native';

export function createSampleColorScheme(): IdenfyColorScheme {
  const mainColor = 0xFF6AA82F;
  const secondaryColor = 0xFF000000;
  const backgroundColor = 0xFFFFFFFF;
  const white = 0xFFFFFFFF;

  const scheme = new IdenfyColorScheme();
  // Base colors
  scheme.idenfyMainColorV2 = mainColor;
  scheme.idenfyMainDarkerColorV2 = mainColor;
  scheme.idenfySecondColorV2 = secondaryColor;
  scheme.idenfyBackgroundColorV2 = backgroundColor;

  // Gradient button
  scheme.idenfyGradientButtonColorStart = mainColor;
  scheme.idenfyGradientButtonColorEnd = mainColor;

  // Toolbar
  scheme.idenfyDefaultAppBarIconTintColor = secondaryColor;
  scheme.idenfyLanguageSelectionToolbarLanguageSelectionIconTintColor = secondaryColor;
  scheme.idenfyLanguageSelectionToolbarCloseIconTintColor = secondaryColor;

  // Continue button text & spinner color (all screens)
  scheme.idenfyContinueButtonTextColor = secondaryColor;
  scheme.idenfyContinueButtonSpinnerColor = secondaryColor;
  scheme.idenfyRetakeButtonTextColor = secondaryColor;

  // Camera buttons
  scheme.idenfyDocumentCameraPreviewSessionTakePhotoButtonUnFocusedTintColor = mainColor;
  scheme.idenfyFaceCameraPreviewSessionTakePhotoButtonUnFocusedTintColor = mainColor;
  scheme.idenfyFaceCameraPreviewSessionFaceOvalColor = white;

  // Photo result
  scheme.idenfyPhotoResultCardTitleColor = secondaryColor;
  scheme.idenfyRetakeButtonBackgroundColor = white;
  scheme.idenfyRetakeButtonBorderColor = secondaryColor;

  // Country/doc selection highlighted cell
  scheme.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBorderColor = secondaryColor;
  scheme.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBackgroundColor = mainColor;
  scheme.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedTextColor = secondaryColor;

  // Manual reviewing
  scheme.idenfyManualReviewingStatusWaitingCommonReviewBoxFinishedTitleColor = secondaryColor;
  scheme.idenfyManualReviewingStatusWaitingBackToAccountButtonTextColor = secondaryColor;

  return scheme;
}
