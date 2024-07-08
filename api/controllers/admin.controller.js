import Vehicle from "../models/vehicle.model.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";

export const getdetails = async (req, res, next) => {
  try {
    const totalVehicleCount = await Vehicle.countDocuments();
    const totalBookingCount = await Booking.countDocuments();
    const totalUserCount = await User.countDocuments();
    var lastMonthJoinedUsers;

    const currentDate = new Date();

    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

   

    const lastMonthJoinedUsersResult = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonthDate, $lt: currentDate },
        },
      },
      {
        $count: "lastMonthJoinedUsersCount",
      },
    ]);
    if (lastMonthJoinedUsersResult.length > 0) {
        const count = lastMonthJoinedUsersResult[0].lastMonthJoinedUsersCount;
        lastMonthJoinedUsers = count;
    } else {
        lastMonthJoinedUsers = 0;
      }
    res
      .status(200)
      .json({ totalVehicleCount, totalBookingCount, totalUserCount, lastMonthJoinedUsers});
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "error occured" });
  }
};
