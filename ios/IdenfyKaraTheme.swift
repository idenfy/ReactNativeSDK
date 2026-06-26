import Foundation
import UIKit
import iDenfySDK
import idenfycore

//  Kara dark + gold theme for the iDenfy native SDK.
//
//  The iDenfy dashboard theme does NOT apply to the native SDK — the SDK reads
//  its own static `IdenfyCommonColors` / `*UISettingsV2` properties in code.
//  Setting the master `IdenfyCommonColors` colors cascades to every screen
//  (each per-screen class defaults to these); the per-screen block below only
//  fixes the two cases the masters can't: card surfaces and on-gold button text
//  (both default to `idenfyWhite`, which is also used for camera icons, so it
//  can't be repurposed globally).
//
//  Source of every identifier: idenfy/iDenfyResources (sdk/ios/uicustomization),
//  matched to the SDK version pinned in the podspec (iDenfySDK-Static 9.1.0).

enum KaraIdenfyTheme {
	// Palette — mirrors apps/native/global.css (.dark) with the requested
	// background override. Gold is the single brand accent (the app flattens
	// gold/gold-light/gold-dark to one value).
	private static let background = karaColor("#090710") // app dark bg override
	private static let gold = karaColor("#E1BE6B") // --gold
	private static let text = karaColor("#FAFAFA") // --foreground
	private static let card = karaColor("#1C1C1E") // --card (240 3% 11%)
	private static let onGold = karaColor("#090710") // dark text/icon on gold buttons
	private static let success = karaColor("#16A34A") // --kara-green
	private static let error = karaColor("#EF4444") // --kara-red / --destructive

	@MainActor
	static func apply() {
		applyMasterColors()
		applyToolbar()
		applyScreenOverrides()
	}

	// Master palette — cascades to all screens. High confidence: these names are
	// in the official iDenfy docs + the upstream README example.
	@MainActor
	private static func applyMasterColors() {
		IdenfyCommonColors.idenfyBackgroundColorV2 = background
		IdenfyCommonColors.idenfyMainColorV2 = gold
		IdenfyCommonColors.idenfyMainDarkerColorV2 = gold
		IdenfyCommonColors.idenfySecondColorV2 = text
		IdenfyCommonColors.idenfyGradientColor1V2 = gold
		IdenfyCommonColors.idenfyGradientColor2V2 = gold
		// Splash titles/description/spinner default to idenfyBlackV2 (near-black);
		// flip to light so they read on the dark background.
		IdenfyCommonColors.idenfyBlackV2 = text
		// Status colors → match the app's semantic palette.
		IdenfyCommonColors.idenfyStepSuccessColorV2 = success
		IdenfyCommonColors.idenfyStepErrorColorV2 = error
		IdenfyCommonColors.idenfyRedColorV2 = error
		IdenfyCommonColors.idenfyDarkRedErrorColorV2 = error
		IdenfyCommonColors.idenfyPhotoResultDetailsCardBackgroundColorV2 = card
	}

	@MainActor
	private static func applyToolbar() {
		IdenfyToolbarUISettingsV2.idenfyDefaultToolbarBackgroundColor = background
		// Back/logo/language icons in gold. The logo asset we ship is monochrome,
		// so this tint paints the Kara logo gold.
		IdenfyToolbarUISettingsV2.idenfyDefaultToolbarBackIconTintColor = gold
		IdenfyToolbarUISettingsV2.idenfyDefaultToolbarLogoIconTintColor = gold
		IdenfyToolbarUISettingsV2.idenfyLanguageSelectionToolbarLanguageSelectionIconTintColor = gold
		IdenfyToolbarUISettingsV2.idenfyLanguageSelectionToolbarCloseIconTintColor = gold
	}

	// ponytail: per-screen overrides for the screens the Kara flow actually shows
	// (country+doc joined selection, doc selection fallback, photo result,
	// results, face-auth intro, failed). This is the build-risk surface — if the
	// iOS build fails on an unknown member, a property was renamed in the SDK
	// version; remove the offending line, the masters above still theme the screen.
	@MainActor
	private static func applyScreenOverrides() {
		// Country + document selection (joined — the primary selection screen).
		IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionBackgroundColor = card
		IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewContinueButtonEnabledTextColor = onGold
		IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBackgroundColor = gold
		IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedTextColor = onGold
		IdenfyCountryAndDocumentSelectionViewUISettingsV2.idenfyCountryAndDocumentSelectionViewItemSelectionHighlightedBorderColor = gold

		// Document selection (fallback / non-joined).
		IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewDocumentTableViewBackgroundColor = background
		IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewDocumentTableViewCellBackgroundColor = card
		IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewDocumentTableViewCellHighlightedBackgroundColor = gold
		IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewDocumentTableViewCellHighlightedTextColor = onGold
		IdenfyDocumentSelectionViewUISettingsV2.idenfyDocumentSelectionViewContinueButtonEnabledTextColor = onGold

		// Photo result (retake = flat secondary; continue = gold primary).
		IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewRetakePhotoButtonBackgroundColor = card
		IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewContinueButtonTextColor = onGold
		IdenfyPhotoResultViewUISettingsV2.idenfyPhotoResultViewDetailsCardBackgroundColor = card

		// Identification results / face-auth intro / failed — on-gold button text.
		IdenfyIdentificationResultsViewUISettingsV2.idenfyIdentificationResultsViewRetakeButtonTextColor = onGold
		IdenfyFaceAuthenticationInitialViewUISettingsV2.idenfyFaceAuthenticationInitialViewContinueButtonTextColor = onGold
		IdenfyManualReviewingStatusFailedViewUISettingsV2.idenfyManualReviewingStatusFailedContinueButtonTextColor = onGold
	}

	// Free function (not a UIColor extension) so it can never collide with an
	// SDK-provided UIColor(hexString:) initializer. Accepts "#RRGGBB".
	private static func karaColor(_ hex: String) -> UIColor {
		var hexValue = hex.trimmingCharacters(in: .whitespacesAndNewlines)
		if hexValue.hasPrefix("#") { hexValue.removeFirst() }
		var rgb: UInt64 = 0
		Scanner(string: hexValue).scanHexInt64(&rgb)
		let r = CGFloat((rgb & 0xFF0000) >> 16) / 255
		let g = CGFloat((rgb & 0x00FF00) >> 8) / 255
		let b = CGFloat(rgb & 0x0000FF) / 255
		return UIColor(red: r, green: g, blue: b, alpha: 1)
	}
}
