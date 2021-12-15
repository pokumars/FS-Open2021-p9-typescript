"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('get all patients- inside router');
    res.json(patientService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const foundPatient = patientService_1.default.findPatientById(id);
        foundPatient ? res.json(foundPatient) : res.status(404).send("No patient of such id was found");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).send(error.message || "Error in attempting to get a single patient");
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        //console.log('raw new  entry', req.body);
        const newEntry = utils_1.default.toNewEntry(req.body);
        const updatedPatient = patientService_1.default.addNewEntryToPatient(newEntry, id);
        //console.log(updatedPatient);
        res.json(updatedPatient);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        console.log('e.message ', e.message);
        //res.status(400).send({error: `${e.messsage}`, test: 'test'});
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).send({ error: e.message });
    }
});
router.post('/', (req, res) => {
    try {
        //create these parses 
        const newPatient = utils_1.default.toNewPatient(req.body);
        const addedPatient = patientService_1.default.addNewPatient(newPatient);
        console.log(addedPatient);
        res.json(addedPatient);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        console.error(e.message);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).send({ error: e.message });
    }
});
exports.default = router;
