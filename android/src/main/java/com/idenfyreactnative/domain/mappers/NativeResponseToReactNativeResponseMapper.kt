package com.idenfyreactnative.domain.mappers

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.idenfy.idenfySdk.api.response.*
import com.idenfy.idenfySdk.api.response.IdenfyIdentificationResult
import com.idenfy.idenfySdk.api.response.InformationUpdateStatus
import com.idenfy.idenfySdk.api.response.BankCardVerificationResult

internal class NativeResponseToReactNativeResponseMapper {

    fun map(o: IdenfyIdentificationResult): WritableMap {
        val map = Arguments.createMap()
        map.putString("autoIdentificationStatus", o.autoIdentificationStatus.status)
        map.putString("manualIdentificationStatus", o.manualIdentificationStatus.status)
        return map
    }

    fun mapFaceReauth(o: FaceAuthenticationStatus): WritableMap {
            val map = Arguments.createMap()
            map.putString("faceAuthenticationStatus", o.status)
            return map
        }

    fun mapRequestUpdate(o: InformationUpdateStatus): WritableMap {
        val map = Arguments.createMap()
        map.putString("informationUpdateStatus", o.name)
        return map
    }

    fun mapBankCardVerification(o: BankCardVerificationResult): WritableMap {
        val map = Arguments.createMap()
        map.putString("bankCardVerificationStatus", o.bankCardVerificationStatus.name)
        return map
    }
}
