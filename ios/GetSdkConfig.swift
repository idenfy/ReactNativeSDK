import Foundation
import idenfycore
import iDenfySDK

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
        
        if let onBoardingViewType = uiSettingsMap["idenfyOnBoardingViewType"] as? String,
           let enumValue = ["single": 0, "multipleStatic": 1, "none": 2][onBoardingViewType],
           let forcedEnum = IdenfyOnBoardingViewTypeEnum(rawValue: enumValue) {
          idenfyUISettingsV2 = idenfyUISettingsV2.withOnBoadringViewType(forcedEnum)
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
        
        idenfyUISettingsV2.skipInternalPrivacyPolicyView = uiSettingsMap["skipInternalPrivacyPolicyView"] as? Bool ?? false
        
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
        idenfySettings = idenfySettings.withUISettingsV2(idenfyUISettingsV2.build())
      }
    }
    return idenfySettings.withAuthToken(authToken).build()
  }
  
  static func getFaceAuthSettingsFromConfig(config: NSDictionary) -> IdenfyFaceAuthUISettings {
    let faceAuthUISettings = IdenfyFaceAuthUISettings()
    let map = config["idenfyFaceAuthUISettings"] as? NSDictionary
    
    if let unwrappedIsLanguageSelectionNeeded = map?["isLanguageSelectionNeeded"] as? Bool {
      faceAuthUISettings.isLanguageSelectionNeeded = unwrappedIsLanguageSelectionNeeded
    }
    if let unwrappedSkipOnBoardingView = map?["skipOnBoardingView"] as? Bool {
      faceAuthUISettings.skipOnBoardingView = unwrappedSkipOnBoardingView
    }
    return faceAuthUISettings
  }
  
  static func getImmediateRedirectFromConfig(config: NSDictionary) -> Bool {
    return config["withImmediateRedirect"] as? Bool == true
  }
}
