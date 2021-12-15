"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.EntryTypeNames = exports.HealthCheckRating = void 0;
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["Critical"] = 3] = "Critical";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var EntryTypeNames;
(function (EntryTypeNames) {
    EntryTypeNames["HealthCheck"] = "HealthCheck";
    EntryTypeNames["OccupationalHealthcare"] = "OccupationalHealthcare";
    EntryTypeNames["Hospital"] = "Hospital";
})(EntryTypeNames = exports.EntryTypeNames || (exports.EntryTypeNames = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
