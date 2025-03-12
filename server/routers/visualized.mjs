import { Router } from "express"
const router = Router();

import {
    last7Days,
    last30Days,
    last3Months,
    last6Months,
    lastYear,
    bookingDataVisualized,
    //user
    userVizualized,
    last7DaysUsers,
    lastMonthUsers,
    last3MonthsUsers,
    last6MonthsUsers,
    lastYearUsers




} from "../controllers/Visualized.mjs"

//bookings
router.route("/last7Days").get(last7Days)
router.route("/last30Days").get(last30Days)
router.route("/last3Months").get(last3Months)
router.route("/last6Months").get(last6Months)
router.route("/lastYear").get(lastYear)
router.route("/monthly").get(bookingDataVisualized)


//users
router.route("/user").get(userVizualized)
router.route("/last7DaysUsers").get(last7DaysUsers)
router.route("/lastMonthUsers").get(lastMonthUsers)
router.route("/last3MonthsUsers").get(last3MonthsUsers)
router.route("/last6MonthsUsers").get(last6MonthsUsers)
router.route("/lastYearUsers").get(lastYearUsers)


export default router;