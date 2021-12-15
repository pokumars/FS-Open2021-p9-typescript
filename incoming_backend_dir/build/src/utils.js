"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const types_1 = require("./types");
/**
 * Parses req.object and makes sure that all passed values are of the right type or else throws an error with a message.
 * The errors are declared in the parsers of the individual fields so you wont fiond them directly in this functions
 *
 * @param object the request.object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object) => {
    const newPatient = {
        name: parseGenericStringType(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseGenericStringType(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseGenericStringType(object.occupation, 'occupation'),
        entries: []
    };
    //console.log(newPatient);
    return newPatient;
};
const toNewEntry = (object) => {
    //console.log(`toNewEntry switch case object.type ${object.type}`);
    switch (object.type) {
        case "HealthCheck":
            return toHealthCheckEntry(object);
        case "Hospital":
            return toHospitalEntry(object);
        case "OccupationalHealthcare":
            return toOccupationalHealthcareEntry(object);
        default:
            //console.log('the errored new entry - ',object);
            throw new Error("Srvr error -This did not match any of the Entry types.");
    }
};
const parseDate = (date) => {
    /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
    if (!date || !(0, exports.isString)(date) || !isDate(date)) {
        throw new Error("rvr error - Incorrect or missing date: " + date);
    }
    return date;
};
const parseGender = (gndr) => {
    /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
    if (!gndr || !(0, exports.isString)(gndr) || !isGender(gndr)) {
        throw new Error("Srvr error -Incorrect or missing gender: " + gndr);
    }
    return gndr;
};
const isString = (text) => {
    //look up 'Type guards'  to understand what the 'parameterName is Type' means
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gndr) => {
    //look up 'Type guards'  to understand what the 'parameterName is Type' means
    //https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
    return Object.values(types_1.Gender).includes(gndr);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating) => {
    //look up 'Type guards'  to understand what the 'parameterName is Type' means
    //https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
    return Object.values(types_1.HealthCheckRating).includes(rating);
};
const parseHealthCheckRating = (rating) => {
    /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
    if (!rating || Number.isNaN(rating) || !isHealthCheckRating(rating)) {
        throw new Error("Srvr error -Incorrect or missing HealthCheckRating: " + rating);
    }
    return rating;
};
const parseDiagnosisCodes = (codes) => {
    const sanitizedCodes = [];
    //DiagnosisCodes is optional so if it is empty or undefined, then we just return an empty array
    if (codes.length === 0 || codes === undefined || codes === null)
        return sanitizedCodes;
    codes.forEach(code => {
        if (!code || !(0, exports.isString)(code)) {
            throw new Error("Srvr error -Incorrect or missing Diagnosis code: " + code);
        }
        else if (diagnoses_1.default.findIndex(d => d.code === code) == -1) {
            throw new Error("Srvr error -This diagnosis code does not exist in our database of diagnosis codes - " + code);
        }
        else {
            sanitizedCodes.push(code);
        }
    });
    return sanitizedCodes;
};
/**
 * @param genericString The string being tested
 * @param nameOfValue the name of it so we can write it in error codes. e.g if nameOfValue is description, we can write 'incorrect or missing description'
 * @returns
 */
const parseGenericStringType = (genericString, nameOfValue) => {
    /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
    if (!genericString || !(0, exports.isString)(genericString)) {
        console.trace('parseGenericStringType error console trace');
        throw new Error(`Srvr error - "${nameOfValue}" value incorrect or missing. ` + genericString);
    }
    return genericString;
};
const parseDischarge = (date, criteria) => {
    const discharge = {
        date: parseDate(date),
        criteria: parseGenericStringType(criteria, 'criteria (of Discharge type)')
    };
    return discharge;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHospitalEntry = (object) => {
    const newHospitalEntry = {
        description: parseGenericStringType(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseGenericStringType(object.specialist, 'specialist name'),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: "Hospital",
        //discharge is optional so if it is empty or undefined, then we just return undefined
        discharge: object.discharge ? parseDischarge(object.discharge.date, object.discharge.criteria) : undefined,
    };
    return newHospitalEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHealthCheckEntry = (object) => {
    const newHealthCheckEntry = {
        description: parseGenericStringType(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseGenericStringType(object.specialist, 'specialist name'),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return newHealthCheckEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toOccupationalHealthcareEntry = (object) => {
    const newOccupationalHealthcareEntry = {
        description: parseGenericStringType(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseGenericStringType(object.specialist, 'specialist name'),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: "OccupationalHealthcare",
        employerName: parseGenericStringType(object.employerName, 'employerName'),
    };
    if (object.sickLeave && typeof object === "object" && object.sickLeave.startDate && object.sickLeave.endDate) {
        return Object.assign(Object.assign({}, newOccupationalHealthcareEntry), { sickLeave: {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate)
            } });
    }
    return newOccupationalHealthcareEntry;
};
exports.default = {
    toNewPatient, toNewEntry
};
