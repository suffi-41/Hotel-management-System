import { Router } from "express";
const router = Router();

import {
    getAllCollectionDataLength
} from "../controllers/utils.mjs"

router.route("/get-all-collection-data-length").get(getAllCollectionDataLength)
export default router;