import multer from "multer"
import { uploadFileInCloudinary } from "../config/cloudUploaded.mjs"
import Room from "../models/Room.mjs"


export const addRoomDetials = async (req, res) => {
    try {
        const data = await req.body;
        if (!data) {
            return res.status(400).json({ status: false, message: "room detials are required" })
        }
        const files = await req.files;
        const images = [];

        if (!files) {
            return res.status(400).json({ status: false, message: "Room images are required" })
        }

        for (const file of files) {
            const result = await uploadFileInCloudinary(file.path)
            images.push(result);
        }
        data.images = images;
        const room = new Room(data);
        const result = await room.save();
        if (result) {
            return res.status(200).json({ status: true, message: "room detials added,suceessfully", id: result._id })
        }
        return res.status(200).json({ status: true, message: "room detials not added" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })

    }
}

export const getRoomDetials = async (req, res) => {
    try {
        const rooms = await Room.find();
        if (rooms.length > 0) {
            return res.status(200).json({ status: true, rooms })
        }
        return res.status(200).json({ status: true, message: "Not found" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}


// update rooms detials
export const updateRoomDetials = async (req, res) => {
    try {
        const roomId = await req?.params?.id;
        const { type, price, capacity, description, status } = await req.body;
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,  // Room ID to search for
            {
                $set: {
                    type,
                    price,
                    status,
                    capacity,
                    description
                },
            },
            { new: true }  // Return the updated document after the operation
        );
        if (!updatedRoom) {
            return res.status(401).json({ status: true, message: "room not found" })
        }
        const result = updatedRoom.save();
        if (result) {
            return res.status(200).json({ status: true, message: "room detials updated" })
        }
        return res.status(200).json({ status: true, message: "room detials not updated" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}

// add room images 
export const addRoomImages = async (req, res) => {
    try {
        const { roomId } = await req?.body;
        const files = await req.files;
        if (!files && files.length == 0) {
            return res.status(400).json({ status: false, message: "Room images are required" })
        }
        const rooms = await Room.findById(roomId, { images: 1 });
        if (!rooms) {
            return res.status(401).json({ status: true, message: "room not found" })
        }

        const { images } = rooms;

        for (const file of files) {
            const result = await uploadFileInCloudinary(file.path)
            images.push(result);
        }

        const result = await rooms.save();
        if (result) {
            return res.status(200).json({ status: true, message: "room images updated" })
        }
        return res.status(200).json({ status: true, message: "room images not updated, try again!" })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: "Some error occupied!" })
    }
}

export const getOneRoomDetials = async (req, res) => {
    try {
        const { id } = req?.params;
        const room = await Room.findById(id);
        if (!room) {
            return res.status(401).json({ status: true, message: "room not found" })
        }
        return res.status(200).json({ status: true, room })

    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: "Some error occupied!" })
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req?.params;
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(200).json({ status: false, message: "Room not deleted, please try again!" })
        }
        return res.status(200).json({ status: true, message: "Room deleted" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied!" })
    }
}

