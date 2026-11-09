
import Foundation
import iDenfySDK
import idenfycore
typealias RNResponse = [String: String]
struct NativeResponseToReactNativeResponseMapper {
    static func map(o: IdenfyIdentificationResult) -> RNResponse {
        var response = RNResponse()
        response["autoIdentificationStatus"] = o.autoIdentificationStatus.rawValue
        response["manualIdentificationStatus"] = o.manualIdentificationStatus.rawValue
        return response
    }
    
    static func mapFaceReauth(o: FaceAuthenticationResult) -> RNResponse {
        var response = RNResponse()
        response["faceAuthenticationStatus"] = o.faceAuthenticationStatus.rawValue
        return response
    }

    static func mapRequestUpdate(o: InformationUpdateStatus) -> RNResponse {
        var response = RNResponse()
        response["informationUpdateStatus"] = o.rawValue
        return response
    }

    static func mapBankCardVerification(o: BankCardVerificationResult) -> RNResponse {
        var response = RNResponse()
        response["bankCardVerificationStatus"] = o.bankCardVerificationStatus.rawValue
        return response
    }
}
