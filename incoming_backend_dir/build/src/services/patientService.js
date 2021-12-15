"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPatientById = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, dateOfBirth, name, gender, occupation }) => {
        return { id, dateOfBirth, name, gender, occupation };
    });
};
const addNewPatient = (newPatient) => {
    const patientToAdd = Object.assign(Object.assign({}, newPatient), { id: (0, uuid_1.v1)() });
    patients_1.default.push(patientToAdd);
    return patientToAdd;
};
/**
 *
 * @param newEntry
 * @param patientId
 * @returns a patient updated with the entry
 */
const addNewEntryToPatient = (newEntry, patientId) => {
    const entryToAdd = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v1)() });
    //find patient's index
    const index = patients_1.default.findIndex(element => element.id == patientId);
    //update value at that index
    patients_1.default[index].entries.push(entryToAdd);
    return patients_1.default[index];
};
const findPatientById = (id) => {
    if (!id || !(0, utils_1.isString)(id)) {
        throw new Error("Incorrect typeof or missing id: " + id);
    }
    const returnedPatient = patients_1.default.find(p => p.id === id);
    return returnedPatient ? Object.assign({}, returnedPatient) : undefined;
};
exports.findPatientById = findPatientById;
exports.default = {
    getNonSensitivePatients,
    addNewPatient,
    findPatientById: exports.findPatientById,
    addNewEntryToPatient
};
