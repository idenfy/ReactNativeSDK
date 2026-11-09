import Foundation
import idenfycore
import iDenfySDK
import idenfyviews

extension UIColor {
    convenience init(argb: Int) {
        let a = CGFloat((argb >> 24) & 0xFF) / 255.0
        let r = CGFloat((argb >> 16) & 0xFF) / 255.0
        let g = CGFloat((argb >> 8) & 0xFF) / 255.0
        let b = CGFloat(argb & 0xFF) / 255.0
        self.init(red: r, green: g, blue: b, alpha: a)
    }
}

class GetSdkConfig {
  static func getAuthToken(config: NSDictionary) -> String {
    let authToken: String = config["authToken"] as! String
    return authToken
  }
  
  @MainActor
  static func getIdenfySettingsFromConfig(config: NSDictionary, authToken: String) -> IdenfySettingsV2 {
    var idenfySettings = IdenfyBuilderV2()
    if let map = config["idenfySettings"] as? NSDictionary {
      
      if let unwrappedSslPinning = map["sslPinning"] as? Bool {
        idenfySettings = idenfySettings.withSSLPinning(unwrappedSslPinning)
      }
      if let unwrappedSelectedLocale = map["selectedLocale"] as? String,
         let forcedLocale = IdenfyLocaleEnum(rawValue: unwrappedSelectedLocale.lowercased()) {
        idenfySettings = idenfySettings.withSelectedLocale(forcedLocale)
      }
      
      if let uiSettingsMap = map["idenfyUISettings"] as? NSDictionary {
        var idenfyUISettingsV2 = IdenfyUIBuilderV2()
        
        if let isAdditionalSupportEnabled = uiSettingsMap["isAdditionalSupportEnabled"] as? Bool {
          idenfyUISettingsV2 = idenfyUISettingsV2.withAdditionalSupportView(isAdditionalSupportEnabled)
        }
        
        if let documentSelectionType = uiSettingsMap["idenfyDocumentSelectionType"] as? String {
          switch documentSelectionType {
          case "navigateOnContinueButton":
            idenfyUISettingsV2.idenfyDocumentSelectionType = .navigateOnContinueButton
          case "navigateOnItemSelection":
            idenfyUISettingsV2.idenfyDocumentSelectionType = .navigateOnTableViewSelection
          default: break
          }
        }
        
        if let onBoardingViewType = uiSettingsMap["idenfyOnBoardingViewType"] as? String {
          switch onBoardingViewType {
          case "multipleStatic":
            idenfyUISettingsV2 = idenfyUISettingsV2.withOnBoadringViewType(.multipleStatic)
          case "none":
            idenfyUISettingsV2 = idenfyUISettingsV2.withOnBoadringViewType(.none)
          default:
            break
          }
        }
        
        if let isLanguageSelectionNeeded = uiSettingsMap["isLanguageSelectionNeeded"] as? Bool {
          idenfyUISettingsV2.isLanguageSelectionNeeded = isLanguageSelectionNeeded
        }
        
        if let instructionsEnum = uiSettingsMap["idenfyInstructionsEnum"] as? String,
           let enumValue = ["dialog": 0, "none": 1][instructionsEnum],
           let forcedEnum = IdenfyInstructionsEnum(rawValue: enumValue) {
          idenfyUISettingsV2 = idenfyUISettingsV2.withInstructions(forcedEnum)
        }
        
        if let resultsUISettingsMap = uiSettingsMap["idenfyIdentificationResultsUISettingsV2"] as? NSDictionary {
          let idenfyIdentificationResultsUISettingsV2 = IdenfyIdentificationResultsUISettingsV2()
          
          idenfyIdentificationResultsUISettingsV2.isShowErrorSpinnerImmediateRedirect = resultsUISettingsMap["isShowErrorSpinnerImmediateRedirect"] as? Bool ?? false
          idenfyIdentificationResultsUISettingsV2.isAdditionalUploadingInformationVisible = resultsUISettingsMap["isAdditionalUploadingInformationVisible"] as? Bool ?? false
          idenfyIdentificationResultsUISettingsV2.isShowSuccessSpinnerImmediateRedirect = resultsUISettingsMap["isShowSuccessSpinnerImmediateRedirect"] as? Bool ?? false
          
          idenfyUISettingsV2.idenfyIdentificationResultsUISettingsV2 = idenfyIdentificationResultsUISettingsV2
        }
        
        if let immediateRedirectEnum = uiSettingsMap["immediateRedirectEnum"] as? String,
           let enumValue = ["none": 0, "partial": 1, "full": 2][immediateRedirectEnum],
           let forcedEnum = ImmediateRedirectEnum(rawValue: enumValue) {
          idenfyUISettingsV2 = idenfyUISettingsV2.withImmediateRedirect(forcedEnum)
        }
        
        idenfyUISettingsV2.mismatchTagsAlert = uiSettingsMap["mismatchTagsAlert"] as? Bool ?? true
        idenfyUISettingsV2.withCountryAndDocumentSelectionJoined = uiSettingsMap["withCountryAndDocumentSelectionJoined"] as? Bool ?? true

        if let useBottomSheetDialogs = uiSettingsMap["useBottomSheetDialogs"] as? Bool {
          idenfyUISettingsV2 = idenfyUISettingsV2.withBottomSheetDialogs(useBottomSheetDialogs)
        }
        
        if let documentFrameVisibility = uiSettingsMap["documentCameraFrameVisibility"] as? NSDictionary,
           let visibilityValue = documentFrameVisibility["value"] as? String {
          switch visibilityValue {
          case "HiddenForAllCountriesAndDocumentTypes":
            idenfyUISettingsV2.documentCameraFrameVisibility = .hiddenForAllCountriesAndDocumentTypes
          case "HiddenForSpecificCountriesAndDocumentTypes":
            if let countriesAndDocuments = documentFrameVisibility["countriesAndDocuments"] as? [String: [String]] {
              let mappedDocuments = countriesAndDocuments.mapValues { $0.compactMap { DocumentTypeEnum(rawValue: $0) } }
              idenfyUISettingsV2.documentCameraFrameVisibility = .hiddenForSpecificCountriesAndDocumentTypes(countryDocumentMap: mappedDocuments)
            }
          default: break
          }
        }
        if let colorSchemeMap = uiSettingsMap["idenfyColorScheme"] as? [String: Any] {
          GetSdkConfig.decodeColorScheme(colorSchemeMap)
        }

        idenfySettings = idenfySettings.withUISettingsV2(idenfyUISettingsV2.build())
      }
    }
    return idenfySettings.withAuthToken(authToken).build()
  }
  
  @MainActor
  static func getFaceAuthSettingsFromConfig(config: NSDictionary) -> IdenfyFaceAuthUISettings {
    let faceAuthUISettings = IdenfyFaceAuthUISettings()
    let map = config["idenfyFaceAuthUISettings"] as? NSDictionary
    
    if let unwrappedIsLanguageSelectionNeeded = map?["isLanguageSelectionNeeded"] as? Bool {
      faceAuthUISettings.isLanguageSelectionNeeded = unwrappedIsLanguageSelectionNeeded
    }
    if let unwrappedSkipOnBoardingView = map?["skipOnBoardingView"] as? Bool {
      faceAuthUISettings.skipOnBoardingView = unwrappedSkipOnBoardingView
    }
    if let colorSchemeMap = map?["idenfyColorScheme"] as? [String: Any] {
      GetSdkConfig.decodeColorScheme(colorSchemeMap)
    }
    return faceAuthUISettings
  }
  
  static func getImmediateRedirectFromConfig(config: NSDictionary) -> Bool {
    return config["withImmediateRedirect"] as? Bool == true
  }

  @MainActor
  static func decodeColorScheme(_ map: [String: Any]?) {
    guard let map = map, !map.isEmpty else { return }

    // Base Colors -> IdenfyCommonColors
    if let value = map["idenfyBackgroundColorV2"] as? Int {
        IdenfyCommonColors.idenfyBackgroundColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyMainColorV2"] as? Int {
        IdenfyCommonColors.idenfyMainColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyMainDarkerColorV2"] as? Int {
        IdenfyCommonColors.idenfyMainDarkerColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfySecondColorV2"] as? Int {
        IdenfyCommonColors.idenfySecondColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyWhite"] as? Int {
        IdenfyCommonColors.idenfyWhite = UIColor(argb: value)
    }
    if let value = map["idenfyBlack"] as? Int {
        IdenfyCommonColors.idenfyBlack = UIColor(argb: value)
    }
    if let value = map["idenfyBlackV2"] as? Int {
        IdenfyCommonColors.idenfyBlackV2 = UIColor(argb: value)
    }
    if let value = map["idenfyPhotoResultDetailsCardBackgroundColorV2"] as? Int {
        IdenfyCommonColors.idenfyPhotoResultDetailsCardBackgroundColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyStepSuccessColorV2"] as? Int {
        IdenfyCommonColors.idenfyStepSuccessColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyStepErrorColorV2"] as? Int {
        IdenfyCommonColors.idenfyStepErrorColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyRedColorV2"] as? Int {
        IdenfyCommonColors.idenfyRedColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyErrorRedColorV2"] as? Int {
        IdenfyCommonColors.idenfyDarkRedErrorColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyErrorLightRedColorV2"] as? Int {
        IdenfyCommonColors.idenfyErrorLightRedColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyGreenColorV2"] as? Int {
        IdenfyCommonColors.idenfyFaceDetectedColor = UIColor(argb: value)
    }
    if let value = map["idenfyGrayColorV2"] as? Int {
        IdenfyCommonColors.idenfyFaceNotDetectedColor = UIColor(argb: value)
    }
    if let value = map["idenfyWarningYellowV2"] as? Int {
        IdenfyCommonColors.idenfyWarningYellowV2 = UIColor(argb: value)
    }
    if let value = map["idenfyWarningLightYellowV2"] as? Int {
        IdenfyCommonColors.idenfyWarningLightYellowV2 = UIColor(argb: value)
    }
    if let value = map["idenfyBackgroundGreenV2"] as? Int {
        IdenfyCommonColors.idenfyBackgroundGreenV2 = UIColor(argb: value)
    }
    if let value = map["idenfyBorderGreenV2"] as? Int {
        IdenfyCommonColors.idenfyBorderGreenV2 = UIColor(argb: value)
    }
    if let value = map["idenfyPurpleColor"] as? Int {
        IdenfyCommonColors.idenfyPurpleV2 = UIColor(argb: value)
    }
    if let value = map["idenfyPurpleTextColor"] as? Int {
        IdenfyCommonColors.idenfyPurpleTextV2 = UIColor(argb: value)
    }
    if let value = map["idenfyPurpleBackgroundColor"] as? Int {
        IdenfyCommonColors.idenfyBackgroundPurpleV2 = UIColor(argb: value)
    }
    if let value = map["idenfyLightBlueColor"] as? Int {
        IdenfyCommonColors.idenfyLightBlueColor = UIColor(argb: value)
    }
    if let value = map["idenfyBlueColor"] as? Int {
        IdenfyCommonColors.idenfyBlueColor = UIColor(argb: value)
    }
    if let value = map["idenfyLightGrayColor"] as? Int {
        IdenfyCommonColors.idenfyLightGrayColor = UIColor(argb: value)
    }

    // Gradient Buttons -> IdenfyButtonsUISettingsV2
    if let value = map["idenfyGradientButtonColorStart"] as? Int {
        IdenfyButtonsUISettingsV2.idenfyGradientButtonColorStart = UIColor(argb: value)
    }
    if let value = map["idenfyGradientButtonColorEnd"] as? Int {
        IdenfyButtonsUISettingsV2.idenfyGradientButtonColorEnd = UIColor(argb: value)
    }

    // Toolbar -> IdenfyToolbarUISettingsV2
    if let value = map["idenfyDefaultAppBarBackgroundColor"] as? Int {
        IdenfyToolbarUISettingsV2.idenfyDefaultToolbarBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyDefaultAppBarIconTintColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyToolbarUISettingsV2.idenfyDefaultToolbarBackIconTintColor = color
        IdenfyToolbarUISettingsV2.idenfyCameraPreviewSessionToolbarBackIconTintColor = color
    }
    IdenfyToolbarUISettingsV2.idenfyDefaultToolbarLogoIconTintColor = nil
    if let value = map["idenfyLanguageSelectionToolbarLanguageSelectionIconTintColor"] as? Int {
        IdenfyToolbarUISettingsV2.idenfyLanguageSelectionToolbarLanguageSelectionIconTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyLanguageSelectionToolbarCloseIconTintColor"] as? Int {
        IdenfyToolbarUISettingsV2.idenfyLanguageSelectionToolbarCloseIconTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyCameraPreviewSessionAppBarBackButtonTintColor"] as? Int {
        IdenfyToolbarUISettingsV2.idenfyCameraPreviewSessionToolbarBackIconTintColor = UIColor(argb: value)
    }

    // Document Camera -> IdenfyDocumentCameraSessionUISettingsV2
    if let value = map["idenfyDocumentCameraPreviewSessionTakePhotoButtonUnFocusedTintColor"] as? Int {
        IdenfyDocumentCameraSessionUISettingsV2.idenfyDocumentCameraPreviewSessionTakePhotoButtonUnFocusedTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyDocumentCameraPreviewSessionTakePhotoButtonFocusedTintColor"] as? Int {
        IdenfyDocumentCameraSessionUISettingsV2.idenfyDocumentCameraPreviewSessionTakePhotoButtonFocusedTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyDocumentCameraPreviewSessionTakePhotoButtonUnFocusedBackgroundColor"] as? Int {
        IdenfyDocumentCameraSessionUISettingsV2.idenfyDocumentCameraPreviewSessionTakePhotoButtonUnFocusedBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyDocumentCameraPreviewSessionTakePhotoButtonFocusedBackgroundColor"] as? Int {
        IdenfyDocumentCameraSessionUISettingsV2.idenfyDocumentCameraPreviewSessionTakePhotoButtonFocusedBackgroundColor = UIColor(argb: value)
    }

    // Face Camera -> IdenfyFaceCameraSessionUISettingsV2
    if let value = map["idenfyFaceCameraPreviewSessionTakePhotoButtonFocusedTintColor"] as? Int {
        IdenfyFaceCameraSessionUISettingsV2.idenfyFaceCameraPreviewSessionTakePhotoButtonFocusedTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyFaceCameraPreviewSessionTakePhotoButtonUnFocusedBackgroundColor"] as? Int {
        IdenfyFaceCameraSessionUISettingsV2.idenfyFaceCameraPreviewSessionTakePhotoButtonUnFocusedBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyFaceCameraPreviewSessionFaceOvalColor"] as? Int {
        IdenfyFaceCameraSessionUISettingsV2.idenfyFaceCameraPreviewSessionFaceOvalColor = UIColor(argb: value)
    }

    // Photo Result -> IdenfyPhotoResultViewUISettingsV2
    if let value = map["idenfyDocumentPhotoResultViewRetakePhotoButtonTextColor"] as? Int {
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewRetakePhotoButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyDocumentPhotoResultViewNextButtonTextColor"] as? Int {
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewContinueButtonTextColor = UIColor(argb: value)
    }
    // Shared continue button text color
    if let value = map["idenfyContinueButtonTextColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewContinueButtonEnabledTextColor = color
        IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewContinueButtonDisabledTextColor = color
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewContinueButtonEnabledTextColor = color
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewContinueButtonDisabledTextColor = color
        IdenfyStaticCameraOnBoardingViewUISettingsV2.idenfyCameraOnBoardingEnabledContinueButtonTextColor = color
        IdenfyStaticCameraOnBoardingViewUISettingsV2.idenfyCameraOnBoardingDisabledContinueButtonTextColor = color
        IdenfyPrivacyPolicyViewUISettingsV2.idenfyPrivacyPolicyAgreeButtonTextColor = color
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewContinueButtonTextColor = color
        IdenfyPdfResultViewUISettingsV2.idenfyPdfResultViewContinueButtonTextColor = color
        IdenfyIdentificationResultsViewUISettingsV2.idenfyIdentificationResultsViewRetakeButtonTextColor = color
        IdenfyIdentificationSuspectedResultsViewUISettingsV2.idenfyIdentificationSuspectedResultsViewContinueButtonTextColor = color
        IdenfyFaceAuthenticationResultsViewUISettingsV2.idenfyFaceAuthenticationResultsViewContinueButtonTextColor = color
        IdenfyFaceAuthenticationInitialViewUISettingsV2.idenfyFaceAuthenticationInitialViewContinueButtonTextColor = color
        IdenfyManualReviewingStatusApprovedViewUISettingsV2.idenfyManualReviewingStatusApprovedContinueButtonTextColor = color
        IdenfyManualReviewingStatusFailedViewUISettingsV2.idenfyManualReviewingStatusFailedContinueButtonTextColor = color
        IdenfyNFCRequiredViewUISettingsV2.idenfyNFCRequiredContinueButtonTextColor = color
        IdenfyNFCReadingTimeOutViewUISettingsV2.idenfyNFCReadingTimeOutContinueButtonTextColor = color
        IdenfyNFCReadingViewUISettingsV2.idenfyNFCReadingContinueButtonTextColor = color
        IdenfyAdditionalSupportViewUISettingsV2.idenfyAdditionalSupportViewContinueButtonTextColor = color
        IdenfyIssuedCountryViewUISettingsV2.idenfyIssuedCountryViewBeginIdentificationButtonTextColor = color
        IdenfyProviderLoginViewUISettingsV2.idenfyProviderLoginViewContinueButtonTextColor = color
        IdenfyMFAGeneralViewUISettingsV2.idenfyMFAGeneralViewContinueButtonTextColor = color
        IdenfyMFACaptchaViewUISettingsV2.idenfyMFACaptchaViewContinueButtonTextColor = color
        IdenfyMFAMethodSelectionViewUISettingsV2.idenfyMFAMethodSelectionViewContinueButtonTextColor = color
        IdenfyInstructionAlertUISettigsV2.idenfyInstructionAlertContinueButtonTextColor = color
        IdenfyCountryMismatchAlertUISettings.idenfyCountryMismatchAlertContinueButtonTextColor = color
        IdenfyMrzNotFoundAlertUISettigsV2.idenfyMrzNotFoundAlertContinueButtonTextColor = color
        IdenfyMismatchFoundAlertUISettigsV2.idenfyMismatchFoundAlertContinueButtonTextColor = color
        IdenfyBankVerificationViewUISettingsV2.idenfyBankVerificationViewContinueButtonEnabledTextColor = color
        IdenfyBankVerificationViewUISettingsV2.idenfyBankVerificationViewContinueButtonDisabledTextColor = color
        IdenfyEmailSMSVerificationViewUISettingsV2.idenfyEmailSMSVerificationViewContinueButtonEnabledTextColor = color
        IdenfyEmailSMSVerificationViewUISettingsV2.idenfyEmailSMSVerificationViewContinueButtonDisabledTextColor = color
        IdenfyQuestionnaireViewUISettingsV2.idenfyQuestionnaireViewContinueButtonEnabledTextColor = color
        IdenfyQuestionnaireViewUISettingsV2.idenfyQuestionnaireViewContinueButtonDisabledTextColor = color
        EIDSessionViewUISettingsV2.idenfyEIDSessionViewContinueButtonTextColor = color
        EIDSessionCodeVerificationViewUISettingsV2.idenfyEIDSessionCodeVerificationViewContinueButtonEnabledTextColor = color
        EIDSessionCodeVerificationViewUISettingsV2.idenfyEIDSessionCodeVerificationViewContinueButtonDisabledTextColor = color
        EIDSessionUploadViewUISettingsV2.idenfyEIDSessionUploadViewContinueButtonEnabledTextColor = color
        EIDSessionUploadViewUISettingsV2.idenfyEIDSessionUploadViewContinueButtonDisabledTextColor = color
        EIDSessionMultipleInputViewUISettingsV2.idenfyEIDSessionMultipleInputViewContinueButtonEnabledTextColor = color
        EIDSessionMultipleInputViewUISettingsV2.idenfyEIDSessionMultipleInputViewContinueButtonDisabledTextColor = color
        EIDSessionCNHUploadViewUISettingsV2.idenfyEIDSessionCNHUploadViewContinueButtonEnabledTextColor = color
        EIDSessionCNHUploadViewUISettingsV2.idenfyEIDSessionCNHUploadViewContinueButtonDisabledTextColor = color
        IdenfyUploadPhotoViewUISettingsV2.idenfyUploadPhotoViewContinuePhotoButtonTextColor = color
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewContinueButtonEnabledTextColor = color
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewContinueButtonDisabledTextColor = color
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewButtonEnabledTextColor = color
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewButtonDisabledTextColor = color
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewButtonEnabledTextColor = color
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewButtonDisabledTextColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewNextButtonTextColor = color
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyAgreeButtonTextColor = color
        IdenfyBankCardVerificationResultsViewUISettingsV2.idenfyBankCardVerificationResultsViewButtonTextColor = color
    }

    // Shared retake button text color
    if let value = map["idenfyRetakeButtonTextColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewRetakePhotoButtonTextColor = color
        IdenfyUploadPhotoViewUISettingsV2.idenfyUploadPhotoViewChooseAnotherPhotoButtonTextColor = color
        IdenfyMrzNotFoundAlertUISettigsV2.idenfyMrzNotFoundAlertRetakePhotoButtonTextColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewRetakeButtonTextColor = color
    }

    // Shared continue button spinner color
    if let value = map["idenfyContinueButtonSpinnerColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyPrivacyPolicyViewUISettingsV2.idenfyPrivacyPolicyAgreeButtonLoadingSpinnerTintColor = color
        IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyBankVerificationViewUISettingsV2.idenfyBankVerificationViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyEmailSMSVerificationViewUISettingsV2.idenfyEmailSMSVerificationViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyQuestionnaireViewUISettingsV2.idenfyQuestionnaireViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyMFACaptchaViewUISettingsV2.idenfyMFACaptchaViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyMFAGeneralViewUISettingsV2.idenfyMFAGeneralViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyMFAMethodSelectionViewUISettingsV2.idenfyMFAMethodSelectionViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyProviderLoginViewUISettingsV2.idenfyProviderLoginViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyProviderSelectionViewUISettingsV2.idenfyProviderSelectionViewContinueButtonLoadingSpinnerTintColor = color
        EIDSessionCodeVerificationViewUISettingsV2.idenfyEIDSessionCodeVerificationViewContinueButtonLoadingSpinnerTintColor = color
        EIDSessionUploadViewUISettingsV2.idenfyEIDSessionUploadViewContinueButtonLoadingSpinnerTintColor = color
        EIDSessionMultipleInputViewUISettingsV2.idenfyEIDSessionMultipleInputViewContinueButtonLoadingSpinnerTintColor = color
        EIDSessionCNHUploadViewUISettingsV2.idenfyEIDSessionCNHUploadViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewCountryLoadingSpinnerTintColor = color
        IdenfyCountrySelectionViewUISettingsV2.idenfyCountrySelectionViewCountryLoadingSpinnerTintColor = color
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewContinueButtonLoadingSpinnerTintColor = color
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewLoadingSpinnerTintColor = color
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyAgreeButtonLoadingSpinnerTintColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewConfirmButtonLoadingSpinnerTintColor = color
    }

    if let value = map["idenfyPhotoResultCardTitleColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewDetailsCardTitleColor = color
        IdenfyInstructionAlertUISettigsV2.idenfyInstructionAlertDetailsCardTitleColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewQuestionCardTitleColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewQuestionCardIconColor = color
    }
    if let value = map["idenfyRetakeButtonBorderColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewRetakePhotoButtonBorderColor = color
        IdenfyUploadPhotoViewUISettingsV2.idenfyUploadPhotoViewChooseAnotherPhotoButtonBorderColor = color
        IdenfyCustomAlertDialogUISettings.idenfyCustomAlertDialogRetakePhotoButtonBorderColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewRetakeButtonBorderColor = color
    }

    // Email/SMS Verification hint card
    if let value = map["idenfyEmailSMSVerificationViewVerifyEmailSMSContainerBorderColor"] as? Int {
        IdenfyEmailSMSVerificationViewUISettingsV2.idenfyEmailSMSVerificationViewEmailPhoneInputInformationCardBorderColor = UIColor(argb: value)
    }
    if let value = map["idenfyEmailSMSVerificationViewVerifyEmailSMSContainerBackgroundColor"] as? Int {
        IdenfyEmailSMSVerificationViewUISettingsV2.idenfyEmailSMSVerificationViewEmailPhoneInputInformationCardBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyEmailSMSVerificationViewVerifyEmailSMSContainerImageTintColor"] as? Int {
        IdenfyEmailSMSVerificationViewUISettingsV2.idenfyEmailSMSVerificationViewEmailPhoneInputInformationCardIconTintColor = UIColor(argb: value)
    }

    // Privacy Policy -> IdenfyPrivacyPolicyViewUISettingsV2
    if let value = map["idenfyPrivacyPolicyCardViewIconTintColor"] as? Int {
        IdenfyPrivacyPolicyViewUISettingsV2.idenfyPrivacyPolicyCardItemIconColor = UIColor(argb: value)
    }
    if let value = map["idenfyPrivacyPolicyContinueButtonTextColor"] as? Int {
        IdenfyPrivacyPolicyViewUISettingsV2.idenfyPrivacyPolicyAgreeButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyPrivacyPolicyCardViewBackgroundColor"] as? Int {
        IdenfyPrivacyPolicyViewUISettingsV2.idenfyPrivacyPolicyCardBackgroundColor = UIColor(argb: value)
    }

    // Document Selection -> IdenfyDocumentSelectionViewUISettingsV2
    if let value = map["idenfyDocumentSelectionViewContinueButtonEnabledTextColor"] as? Int {
        IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewContinueButtonEnabledTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyDocumentSelectionViewContinueButtonDisabledTextColor"] as? Int {
        IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewContinueButtonDisabledTextColor = UIColor(argb: value)
    }

    // Country & Document Selection -> IdenfyCountryAndDocumentSelectionViewUISettingsV2
    if let value = map["idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBackgroundColor"] as? Int {
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBorderColor"] as? Int {
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBorderColor = UIColor(argb: value)
    }
    if let value = map["idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedTextColor"] as? Int {
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyCountryAndDocumentSelectionViewContinueButtonEnabledTextColor"] as? Int {
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewContinueButtonEnabledTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyCountryAndDocumentSelectionViewContinueButtonDisabledTextColor"] as? Int {
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewContinueButtonDisabledTextColor = UIColor(argb: value)
    }

    // Onboarding -> IdenfyStaticCameraOnBoardingViewUISettingsV2
    if let value = map["idenfyCameraStaticOnBoardingViewEnabledButtonTitleColor"] as? Int {
        IdenfyStaticCameraOnBoardingViewUISettingsV2.idenfyCameraOnBoardingEnabledContinueButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyCameraStaticOnBoardingViewDisabledButtonTitleColor"] as? Int {
        IdenfyStaticCameraOnBoardingViewUISettingsV2.idenfyCameraOnBoardingDisabledContinueButtonTextColor = UIColor(argb: value)
    }

    // Identification Results -> IdenfyIdentificationResultsViewUISettingsV2
    if let value = map["idenfyIdentificationResultsViewRetakeButtonTextColor"] as? Int {
        IdenfyIdentificationResultsViewUISettingsV2.idenfyIdentificationResultsViewRetakeButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewSuccessStepTextColor"] as? Int {
        IdenfyIdentificationResultsViewUISettingsV2.idenfyIdentificationResultsViewSuccessStepTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewErrorStepTextColorV2"] as? Int {
        IdenfyIdentificationResultsViewUISettingsV2.idenfyIdentificationResultsViewErrorStepTextColorV2 = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewDocumentStepLoadingSpinnerAccentColor"] as? Int {
        IdenfyIdentificationResultsViewUISettingsV2.idenfyIdentificationResultsViewDocumentStepLoadingSpinnerAccentColor = UIColor(argb: value)
    }

    // Splash Screen -> IdenfySplashScreenViewUISettingsV2
    if let value = map["idenfySplashScreenViewTitleTextColor"] as? Int {
        IdenfySplashScreenViewUISettingsV2.idenfySplashScreenViewTitleTextColor = UIColor(argb: value)
    }
    if let value = map["idenfySplashScreenViewDescriptionTextColor"] as? Int {
        IdenfySplashScreenViewUISettingsV2.idenfySplashScreenViewDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfySplashScreenViewLoadingSpinnerTintColor"] as? Int {
        IdenfySplashScreenViewUISettingsV2.idenfySplashScreenViewSpinnerTintColor = UIColor(argb: value)
    }

    // Bottom Sheet -> IdenfyBottomSheetUISettingsV2
    if let value = map["idenfyBottomSheetBackgroundColor"] as? Int {
        IdenfyBottomSheetUISettingsV2.idenfyBottomSheetBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBottomSheetDragHandleColor"] as? Int {
        IdenfyBottomSheetUISettingsV2.idenfyBottomSheetDragHandleColor = UIColor(argb: value)
    }

    // Custom Alert Dialog
    if let value = map["idenfyCustomAlertDialogBackgroundColor"] as? Int {
        IdenfyCustomAlertDialogUISettings.idenfyCustomAlertDialogBackgroundColor = UIColor(argb: value)
    }

    // Retake Button Background
    if let value = map["idenfyRetakeButtonBackgroundColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewRetakePhotoButtonBackgroundColor = color
        IdenfyUploadPhotoViewUISettingsV2.idenfyUploadPhotoViewChooseAnotherPhotoButtonBackgroundColor = color
        IdenfyCustomAlertDialogUISettings.idenfyCustomAlertDialogRetakePhotoButtonBackgroundColor = color
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewRetakeButtonBackgroundColor = color
    }

    // Country Mismatch Alert
    if let value = map["idenfyIdentificationResultsViewCountryMismatchAlertBackgroundColorV2"] as? Int {
        IdenfyCountryMismatchAlertUISettings.idenfyCountryMismatchAlertViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewCountryMismatchAlertTitleTextColorV2"] as? Int {
        IdenfyCountryMismatchAlertUISettings.idenfyCountryMismatchAlertTitleTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewCountryMismatchAlertDescriptionTextColorV2"] as? Int {
        IdenfyCountryMismatchAlertUISettings.idenfyCountryMismatchAlertDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewCountryMismatchAlertContinueButtonTextColorV2"] as? Int {
        IdenfyCountryMismatchAlertUISettings.idenfyCountryMismatchAlertContinueButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyIdentificationResultsViewCountryMismatchAlertBackButtonTextColorV2"] as? Int {
        IdenfyCountryMismatchAlertUISettings.idenfyCountryMismatchAlertBackButtonTextColor = UIColor(argb: value)
    }

    // Highlighted Item Shortcut
    if let value = map["idenfyHighlightedItemBackgroundColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBackgroundColor = color
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardSelectedBackgroundColor = color
    }
    if let value = map["idenfyHighlightedItemTextColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedTextColor = color
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardSelectedTextColor = color
    }
    if let value = map["idenfyHighlightedItemBorderColor"] as? Int {
        let color = UIColor(argb: value)
        IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBorderColor = color
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardSelectedBorderColor = color
    }

    // Bank Card Camera View
    if let value = map["idenfyBankCardCameraViewLoadingSpinnerColor"] as? Int {
        IdenfyBankCardCameraViewUISettingsV2.idenfyBankCardCameraViewLoadingSpinnerColor = UIColor(argb: value)
    }

    // Bank Card Onboarding View
    if let value = map["idenfyBankCardOnBoardingViewBackgroundColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewTitleTextColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewTitleTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewDescriptionTextColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewCardIconTintColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardIconTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewCardBorderColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardBorderColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewCardBackgroundColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewCardSelectedBorderColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardSelectedBorderColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewCardSelectedBackgroundColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardSelectedBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewCardSelectedTextColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewCardSelectedTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewContinueButtonDisabledBackgroundColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewContinueButtonDisabledBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewContinueButtonDisabledTextColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewContinueButtonDisabledTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardOnBoardingViewContinueButtonEnabledTextColor"] as? Int {
        IdenfyBankCardOnboardingViewUISettingsV2.idenfyBankCardOnboardingViewContinueButtonEnabledTextColor = UIColor(argb: value)
    }

    // Bank Card Selection View
    if let value = map["idenfyBankCardSelectionViewBackgroundColor"] as? Int {
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardSelectionViewButtonDisabledBackgroundColor"] as? Int {
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewButtonDisabledBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardSelectionViewButtonDisabledTextColor"] as? Int {
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewButtonDisabledTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardSelectionViewButtonEnabledTextColor"] as? Int {
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewButtonEnabledTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardSelectionViewButtonTextColor"] as? Int {
        IdenfyBankCardSelectionViewUISettingsV2.idenfyBankCardSelectionViewSpinnerTextColor = UIColor(argb: value)
    }

    // Bank Card Upload View
    if let value = map["idenfyBankCardUploadViewBackgroundColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadViewDescriptionTextColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadViewClickToUploadTextColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewClickToUploadTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadViewUploadIconTintColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewUploadIconTintColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadViewButtonDisabledBackgroundColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewButtonDisabledBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadViewButtonDisabledTextColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewButtonDisabledTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadViewButtonEnabledTextColor"] as? Int {
        IdenfyBankCardUploadViewUISettingsV2.idenfyBankCardUploadViewButtonEnabledTextColor = UIColor(argb: value)
    }

    // Bank Card Upload Review View
    if let value = map["idenfyBankCardUploadReviewViewBackgroundColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewDescriptionTextColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewQuestionCardBackgroundColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewQuestionCardBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewQuestionCardIconColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewQuestionCardIconColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewQuestionCardTitleColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewQuestionCardTitleColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewNextButtonTextColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewNextButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewRetakeButtonTextColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewRetakeButtonTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardUploadReviewViewButtonTextColor"] as? Int {
        IdenfyBankCardUploadReviewViewUISettingsV2.idenfyBankCardUploadReviewViewTitleTextColor = UIColor(argb: value)
    }

    // Bank Card Verification Privacy Policy View
    if let value = map["idenfyBankCardVerificationPrivacyPolicyViewBackgroundColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationPrivacyPolicyCommonInformationTitleTextColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyCommonInformationTitleTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationPrivacyPolicyCommonInformationDescriptionTextColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyCommonInformationDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationPrivacyPolicyCardViewTextColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyCardItemTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationPrivacyPolicyCardViewBackgroundColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyCardBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationPrivacyPolicyCardViewIconTintColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyCardItemIconColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationPrivacyPolicyContinueButtonTextColor"] as? Int {
        IdenfyBankCardVerificationPrivacyPolicyViewUISettingsV2.idenfyBankCardVerificationPrivacyPolicyAgreeButtonTextColor = UIColor(argb: value)
    }

    // Bank Card Verification Results View
    if let value = map["idenfyBankCardVerificationResultsViewBackgroundColor"] as? Int {
        IdenfyBankCardVerificationResultsViewUISettingsV2.idenfyBankCardVerificationResultsViewBackgroundColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationResultsCommonInformationTitleTextColor"] as? Int {
        IdenfyBankCardVerificationResultsViewUISettingsV2.idenfyBankCardVerificationResultsViewTitleTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationResultsCommonInformationDescriptionTextColor"] as? Int {
        IdenfyBankCardVerificationResultsViewUISettingsV2.idenfyBankCardVerificationResultsViewDescriptionTextColor = UIColor(argb: value)
    }
    if let value = map["idenfyBankCardVerificationResultsContinueButtonTextColor"] as? Int {
        IdenfyBankCardVerificationResultsViewUISettingsV2.idenfyBankCardVerificationResultsViewButtonTextColor = UIColor(argb: value)
    }
  }
}
