"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings = (function () {
    function appSettings() {
    }
    appSettings.apiUrl = function (endPoint) {
        return 'http://api.flygen.com/v1/' + endPoint;
    };
    return appSettings;
}());
exports.appSettings = appSettings;
//# sourceMappingURL=settings.js.map