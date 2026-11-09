import { IdenfyColorScheme } from 'idenfy-react-native';

export function createSampleColorScheme(): IdenfyColorScheme {
  const mainColor = 0xff6aa82f;
  const mainColorLight = 0xffe8f5d9;
  const secondaryColor = 0xff000000;
  const backgroundColor = 0xffffffff;
  const white = 0xffffffff;

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
  scheme.idenfyLanguageSelectionToolbarLanguageSelectionIconTintColor =
    secondaryColor;
  scheme.idenfyLanguageSelectionToolbarCloseIconTintColor = secondaryColor;

  // Continue button text & spinner color (all screens)
  scheme.idenfyContinueButtonTextColor = secondaryColor;
  scheme.idenfyContinueButtonSpinnerColor = secondaryColor;
  scheme.idenfyRetakeButtonTextColor = secondaryColor;

  // Camera buttons
  scheme.idenfyDocumentCameraPreviewSessionTakePhotoButtonUnFocusedTintColor =
    mainColor;
  scheme.idenfyFaceCameraPreviewSessionTakePhotoButtonUnFocusedTintColor =
    mainColor;
  scheme.idenfyFaceCameraPreviewSessionFaceOvalColor = white;

  // Photo result
  scheme.idenfyPhotoResultCardTitleColor = secondaryColor;
  scheme.idenfyRetakeButtonBackgroundColor = white;
  scheme.idenfyRetakeButtonBorderColor = secondaryColor;

  // Highlighted/selected item colors (all screens)
  scheme.idenfyHighlightedItemBackgroundColor = mainColorLight;
  scheme.idenfyHighlightedItemTextColor = secondaryColor;
  scheme.idenfyHighlightedItemBorderColor = secondaryColor;

  // Manual reviewing
  scheme.idenfyManualReviewingStatusWaitingCommonReviewBoxFinishedTitleColor =
    secondaryColor;
  scheme.idenfyManualReviewingStatusWaitingBackToAccountButtonTextColor =
    secondaryColor;

  return scheme;
}
