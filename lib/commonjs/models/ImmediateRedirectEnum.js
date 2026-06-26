"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmediateRedirectEnum = void 0;
let ImmediateRedirectEnum = exports.ImmediateRedirectEnum = /*#__PURE__*/function (ImmediateRedirectEnum) {
  /**
   * Immediate redirect won't happen in any case.
   */
  ImmediateRedirectEnum["none"] = "none";
  /**
   * Immediate redirect will happen for error with identifiers:
   * - TOO_MANY_REATTEMPTS_IDENTIFIER
   * - ASSERTION_ERROR_IDENTIFIER
   * - TOKEN_NOT_VALID_IDENTIFIER
   */
  ImmediateRedirectEnum["partial"] = "partial";
  /**
   * Immediate redirect will always happen.
   */
  ImmediateRedirectEnum["full"] = "full";
  return ImmediateRedirectEnum;
}({});
//# sourceMappingURL=ImmediateRedirectEnum.js.map