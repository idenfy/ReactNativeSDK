package com.idenfyreactnative.domain.utils

import com.facebook.react.bridge.ReadableMap
import com.idenfy.idenfySdk.api.ui.IdenfyFaceAuthUISettings
import com.idenfy.idenfySdk.api.initialization.IdenfySettingsV2
import com.idenfy.idenfySdk.api.models.DocumentCameraFrameVisibility
import com.idenfy.idenfySdk.api.models.IdenfyOnBoardingViewTypeEnum
import com.idenfy.idenfySdk.api.models.ImmediateRedirectEnum
import com.idenfy.idenfySdk.api.ui.IdenfyIdentificationResultsUISettingsV2
import com.idenfy.idenfySdk.api.ui.IdenfyUISettingsV2
import com.idenfy.idenfySdk.idenfycore.models.documentTypeData.DocumentTypeEnum
import com.idenfy.idenfySdk.CoreSdkInitialization.IdenfyLocaleEnum

internal object GetSdkDataFromConfig {
  fun getSdkTokenFromConfig(config: ReadableMap): String {
    return config.getString("authToken")!!
  }


  fun getIdenfySettingsFromConfig(config: ReadableMap): IdenfySettingsV2 {
    val idenfySettings = IdenfySettingsV2()

    if (config.hasKey("idenfySettings") && !config.isNull("idenfySettings")) {
      val map = config.getMap("idenfySettings")!!

      if (map.hasKey("sslPinning") && !map.isNull("sslPinning")) {
        idenfySettings.sslPinning = map.getBoolean("sslPinning")
      }

      if (map.hasKey("selectedLocale") && !map.isNull("selectedLocale")) {
        val locale = map.getString("selectedLocale") ?: ""
        idenfySettings.selectedLocale = IdenfyLocaleEnum.valueOf(locale).locale
      }

      if (map.hasKey("idenfyUISettings") && !map.isNull("idenfyUISettings")) {
        val uiSettingsMap = map.getMap("idenfyUISettings") ?: return idenfySettings
        val idenfyUISettingsV2 = IdenfyUISettingsV2()

        if (uiSettingsMap.hasKey("isAdditionalSupportEnabled") && !uiSettingsMap.isNull("isAdditionalSupportEnabled")) {
          idenfyUISettingsV2.isAdditionalSupportEnabled =
            uiSettingsMap.getBoolean("isAdditionalSupportEnabled")
        }

        if (uiSettingsMap.hasKey("idenfyDocumentSelectionType") && !uiSettingsMap.isNull("idenfyDocumentSelectionType")) {
          val enum =
            uiSettingsMap.getString("idenfyDocumentSelectionType")?.camelToSnakeCase() ?: ""
          idenfyUISettingsV2.idenfyDocumentSelectionType =
            com.idenfy.idenfySdk.api.models.IdenfyDocumentSelectionTypeEnum.valueOf(enum)
        }

        if (uiSettingsMap.hasKey("idenfyOnBoardingViewType") && !uiSettingsMap.isNull("idenfyOnBoardingViewType")) {
          val enum = uiSettingsMap.getString("idenfyOnBoardingViewType")?.camelToSnakeCase() ?: ""
          idenfyUISettingsV2.idenfyOnBoardingViewTypeEnum =
            IdenfyOnBoardingViewTypeEnum.valueOf(enum)
        }

        if (uiSettingsMap.hasKey("isLanguageSelectionNeeded") && !uiSettingsMap.isNull("isLanguageSelectionNeeded")) {
          idenfyUISettingsV2.isLanguageSelectionNeeded =
            uiSettingsMap.getBoolean("isLanguageSelectionNeeded")
        }

        if (uiSettingsMap.hasKey("idenfyInstructionsEnum") && !uiSettingsMap.isNull("idenfyInstructionsEnum")) {
          val enum = uiSettingsMap.getString("idenfyInstructionsEnum")?.uppercase() ?: ""
          idenfyUISettingsV2.idenfyInstructionsType =
            com.idenfy.idenfySdk.camerasession.commoncamerasession.presentation.model.IdenfyInstructionsType.valueOf(
              enum
            )
        }

        if (uiSettingsMap.hasKey("idenfyIdentificationResultsUISettingsV2") && !uiSettingsMap.isNull(
            "idenfyIdentificationResultsUISettingsV2"
          )
        ) {
          val resultsUISettingsMap =
            uiSettingsMap.getMap("idenfyIdentificationResultsUISettingsV2") ?: return idenfySettings
          val idenfyIdentificationResultsUISettingsV2 = IdenfyIdentificationResultsUISettingsV2()

          if (resultsUISettingsMap.hasKey("isShowErrorSpinnerImmediateRedirect") && !resultsUISettingsMap.isNull(
              "isShowErrorSpinnerImmediateRedirect"
            )
          ) {
            idenfyIdentificationResultsUISettingsV2.isShowErrorSpinnerImmediateRedirect =
              resultsUISettingsMap.getBoolean("isShowErrorSpinnerImmediateRedirect")
          }

          if (resultsUISettingsMap.hasKey("isAdditionalUploadingInformationVisible") && !resultsUISettingsMap.isNull(
              "isAdditionalUploadingInformationVisible"
            )
          ) {
            idenfyIdentificationResultsUISettingsV2.isAdditionalUploadingInformationVisible =
              resultsUISettingsMap.getBoolean("isAdditionalUploadingInformationVisible")
          }

          if (resultsUISettingsMap.hasKey("isShowSuccessSpinnerImmediateRedirect") && !resultsUISettingsMap.isNull(
              "isShowSuccessSpinnerImmediateRedirect"
            )
          ) {
            idenfyIdentificationResultsUISettingsV2.isShowSuccessSpinnerImmediateRedirect =
              resultsUISettingsMap.getBoolean("isShowSuccessSpinnerImmediateRedirect")
          }

          idenfyUISettingsV2.idenfyIdentificationResultsUISettingsV2 =
            idenfyIdentificationResultsUISettingsV2
        }

        if (uiSettingsMap.hasKey("immediateRedirectEnum") && !uiSettingsMap.isNull("immediateRedirectEnum")) {
          val enum = uiSettingsMap.getString("immediateRedirectEnum")?.camelToSnakeCase() ?: ""
          idenfyUISettingsV2.immediateRedirectEnum = ImmediateRedirectEnum.valueOf(enum)
        }

        if (uiSettingsMap.hasKey("skipInternalPrivacyPolicyView") && !uiSettingsMap.isNull("skipInternalPrivacyPolicyView")) {
          idenfyUISettingsV2.skipInternalPrivacyPolicyView =
            uiSettingsMap.getBoolean("skipInternalPrivacyPolicyView")
        }

        if (uiSettingsMap.hasKey("documentCameraFrameVisibility") && !uiSettingsMap.isNull("documentCameraFrameVisibility")) {
          val visibilityMap =
            uiSettingsMap.getMap("documentCameraFrameVisibility")!!
          val visibilityValue = visibilityMap.getString("value")

          idenfyUISettingsV2.documentFrameVisibility = when (visibilityValue) {
            "HiddenForAllCountriesAndDocumentTypes" -> DocumentCameraFrameVisibility.HiddenForAllCountriesAndDocumentTypes
            "HiddenForSpecificCountriesAndDocumentTypes" -> {
              val countriesAndDocuments: Map<String, List<String>> = visibilityMap.getMap("countriesAndDocuments")?.toHashMap() as? Map<String, List<String>>
                ?: emptyMap<String, List<String>>()
              val updatedMap: Map<String, List<DocumentTypeEnum>> = countriesAndDocuments.mapValues { entry ->
                entry.value.mapNotNull {
                  try {
                    DocumentTypeEnum.valueOf(it)
                  } catch (e: IllegalArgumentException) {
                    null
                  }
                }
              }
              DocumentCameraFrameVisibility.HiddenForSpecificCountriesAndDocumentTypes(updatedMap)
            }
            else -> null
          }
        }
        idenfySettings.idenfyUISettingsV2 = idenfyUISettingsV2
      }
    }
    return idenfySettings
  }

  fun getFaceAuthSettingsFromConfig(config: ReadableMap): IdenfyFaceAuthUISettings {
    val faceAuthUISettings = IdenfyFaceAuthUISettings()
    val map = config.getMap("idenfyFaceAuthUISettings")

    if (map?.getBoolean("isLanguageSelectionNeeded") != null) {
      faceAuthUISettings.isLanguageSelectionNeeded = map.getBoolean("isLanguageSelectionNeeded")
    }
    if (map?.getBoolean("skipOnBoardingView") != null) {
      faceAuthUISettings.skipOnBoardingView = map.getBoolean("skipOnBoardingView")
    }
    return faceAuthUISettings
  }

  fun getImmediateRedirectFromConfig(config: ReadableMap): Boolean {
    return if (config.hasKey("withImmediateRedirect")) {
      config.getBoolean("withImmediateRedirect")
    } else {
      false
    }
  }

  private fun String.camelToSnakeCase(): String {
    return "(?<=[a-zA-Z])[A-Z]".toRegex().replace(this) {
      "_${it.value}"
    }.uppercase()
  }
}