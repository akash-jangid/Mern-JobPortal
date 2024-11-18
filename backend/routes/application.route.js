import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// Correct HTTP methods
router.route("/apply/:id").post(isAuthenticated, applyJob); // POST for applying
router.route("/get").get(isAuthenticated, getAppliedJobs); // GET for fetching applied jobs
router.route("/:id/applicants").get(isAuthenticated, getApplicants); // GET for fetching applicants
router.route("/status/:id/update").post(isAuthenticated, updateStatus); // POST for updating status

export default router;
