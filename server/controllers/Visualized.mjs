import Booking from "../models/Booking.mjs";
import User from "../models/User.mjs";
export const last7Days = async (req, res) => {
    try {
        const last7Days = await Booking.aggregate([
            {
                $match: {
                    checkInDate: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$checkInDate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        if (!last7Days) {
            return res.status(404).json({ status: false, message: "No data found" })
        }
        const labels = last7Days.map((entry) => entry._id);
        const counts = last7Days.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const last30Days = async (req, res) => {
    try {
        const last30Days = await Booking.aggregate([
            {
                $match: {
                    checkInDate: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$checkInDate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        if (!last30Days) {
            return res.status(404).json({ status: false, message: "No data found" })
        }
        const labels = last30Days.map((entry) => entry._id);
        const counts = last30Days.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const last3Months = async (req, res) => {
    try {
        const last3Months = await Booking.aggregate([
            {
                $match: {
                    checkInDate: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$checkInDate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        if (!last3Months) {
            return res.status(404).json({ status: false, message: "No data found" })
        }
        const labels = last3Months.map((entry) => entry._id);
        const counts = last3Months.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const last6Months = async (req, res) => {
    try {
        const last6Months = await Booking.aggregate([
            {
                $match: {
                    checkInDate: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$checkInDate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        if (!last6Months) {
            return res.status(404).json({ status: false, message: "No data found" })
        }
        const labels = last6Months.map((entry) => entry._id);
        const counts = last6Months.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

export const lastYear = async (req, res) => {
    try {
        const lastYear = await Booking.aggregate([
            {
                $match: {
                    checkInDate: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$checkInDate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        if (!lastYear) {
            return res.status(404).json({ status: false, message: "No data found" })
        }
        const labels = lastYear.map((entry) => entry._id);
        const counts = lastYear.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

//inside

export const bookingDataVisualized = async (req, res) => {
    try {
        const { status } = req?.query; // Get status from query params
        const matchStage = status ? { status } : {}; // Filter by status if provided
        const bookings = await Booking.aggregate([
            {
                $match: matchStage // Apply status filter
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$checkInDate" },
                        month: { $month: "$checkInDate" }
                    },
                    totalBookings: { $sum: 1 },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
            }
        ]);
        if (!bookings) {
            return res.status(201).json({ status: false, message: "some error occupied!" })
        }
        return res.status(201).json({ status: true, bookings })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//users
// Visualized User by admin
export const userVizualized = async (req, res) => {
    try {
        const usersByMonthYear = await User.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" }, // Extract year from createdAt
                        month: { $month: "$createdAt" } // Extract month from createdAt
                    },
                    totalUsers: { $sum: 1 } // Count users for each month/year
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
            }
        ]);
        if (usersByMonthYear) {
            return res.status(200).json({ status: true, usersByMonthYear })
        }
        return res.status(401).json({ status: false, message: "Internal server error, please try again leter!" })
    } catch (error) {
        console.log(error)
    }

}

export const last7DaysUsers = async (req, res) => {
    try {
        const last7Days = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        if (!last7Days) {
            return res.status(201).json({ status: false, message: "some error occupied!" })
        }

        const labels = last7Days.map((entry) => entry._id);
        const counts = last7Days.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const lastMonthUsers = async (req, res) => {
    try {
        const lastMonth = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        if (!lastMonth) {
            return res.status(201).json({ status: false, message: "some error occupied!" })
        }

        const labels = lastMonth.map((entry) => entry._id);
        const counts = lastMonth.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



export const last3MonthsUsers = async (req, res) => {
    try {
        const last3Months = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        if (!last3Months) {
            return res.status(201).json({ status: false, message: "some error occupied!" })
        }

        const labels = last3Months.map((entry) => entry._id);
        const counts = last3Months.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



export const last6MonthsUsers = async (req, res) => {
    try {
        const last6Months = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        if (!last6Months) {
            return res.status(201).json({ status: false, message: "some error occupied!" })
        }

        const labels = last6Months.map((entry) => entry._id);
        const counts = last6Months.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const lastYearUsers = async (req, res) => {
    try {
        const lastYear = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        if (!lastYear) {
            return res.status(201).json({ status: false, message: "some error occupied!" })
        }

        const labels = lastYear.map((entry) => entry._id);
        const counts = lastYear.map((entry) => entry.count);
        return res.status(200).json({ status: true, labels, counts })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
