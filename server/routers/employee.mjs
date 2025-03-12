import express from "express";
const router = express.Router();
import multer from "multer";
import { fetchUser } from "../middleware/fetchUser.mjs"


const storage = multer.diskStorage({});
const uploader = multer({ storage: storage });

import {
    addEmployee,
    employeeCradentialVerify,
    passowrd_verify,
    getAllEmployees,
    updateEmployeeDetials,
    inActivatedEmployee,
    inActivatedEmployees,
    getEmplyeeDetials,
    getEmployeedetailsWithToken,
    updateEmployeeDetialsWithToken,
    uploadProilePic

} from "../controllers/employee.mjs";


router.route('/login').post(employeeCradentialVerify)
router.route('/password-verification').post(passowrd_verify)
router.route('/add-employee').post(addEmployee)
router.route("/get-employees").get(getAllEmployees);
router.route("/update-employee-detials/:id").put(updateEmployeeDetials);
router.route("/inactivate-employee/:id").put(inActivatedEmployee);
router.route("/inactivated-employees").get(inActivatedEmployees);
router.route("/get-employee-detials/:id").get(getEmplyeeDetials)
router.route("/get-employee-details-with-token").get(fetchUser, getEmployeedetailsWithToken)
router.route("/update-employee-detials-with-token").put(fetchUser, updateEmployeeDetialsWithToken)
router.route("/upload-profile-pic").put(uploader.single("image"), fetchUser, uploadProilePic)
export default router;



