import { Router } from "express";
import multer from "multer"
const router = Router();

const storage = multer.diskStorage({});
const uploader = multer({ storage: storage });

// Controller for handling the data and files
import {
  addRoomDetials,
  getRoomDetials,
  updateRoomDetials,
  addRoomImages,
  getOneRoomDetials,
  deleteRoom
} from "../controllers/room.mjs";

 
router.route("/add-room-detials").post(uploader.array("images", 10), addRoomDetials);
router.route("/?").get(getRoomDetials)
router.route("/get-one-room-details/:id").get(getOneRoomDetials);
router.route("/:id").put(updateRoomDetials).delete(deleteRoom);
router.route("/add-room-images").post(uploader.array("images", 10), addRoomImages);

export default router;
