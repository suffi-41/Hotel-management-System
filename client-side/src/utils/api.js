const baseUrl = "http://localhost:3333/api/";
//user api url
export const ragistationUrl = `${baseUrl}v1/user/register`;
export const loginUrl = `${baseUrl}v1/user/login`;
export const verifyUrl = `${baseUrl}v1/user/verify`;
export const passwordUrl = `${baseUrl}v1/user/password`;
export const sendOtpUrl = `${baseUrl}v1/user/sendOtp`;
export const resetPasswordUrl = `${baseUrl}v1/user/reset-password`;
export const getUserProfileUrl = `${baseUrl}v1/user/get-user-profile`;

//user update api 
export const editNameUrl = `${baseUrl}v1/user/edit-name`;
export const editAddressUrl = `${baseUrl}v1/user/edit-address`;
export const editDateOfBirthUrl = `${baseUrl}v1/user/edit-date-of-birth`;
export const editPhoneUrl = `${baseUrl}v1/user/edit-phone`;
export const editGenderUrl = `${baseUrl}v1/user/edit-gender`;
export const changePasswordUrl = `${baseUrl}v1/user/change-password`;
export const uploadProfilePicUrl = `${baseUrl}v1/user/upload-profile-pic`;
export const getUserAvatureUrl = `${baseUrl}v1/user/get-user-avature`;
export const blockedAndUnblockedUserUrl = `${baseUrl}v1/user/block-unblock-user`;

//admin access users api
export const getAllusersUrl = `${baseUrl}v1/user/get-all-users`;
export const getUserByIdUrl = `${baseUrl}v1/user/get-user-by-id`;


//employee api url
export const addEmployeeUrl = `${baseUrl}v1/employee/add-employee`;
export const employeeLoginUrl = `${baseUrl}v1/employee/login`;
export const employeePasswordVerificationUrl = `${baseUrl}v1/employee/password-verification`;
export const getAllEmployessUrl = `${baseUrl}v1/employee/get-employees`;
export const updateEmployeeDetialsUrl = `${baseUrl}v1/employee/update-employee-detials`;
export const inActivatedEmployeeUrl = `${baseUrl}v1/employee/inactivate-employee`;
export const inActivatedEmployeesUrl = `${baseUrl}v1/employee/inactivated-employees`;
export const getEmployeeDetialsUrl = `${baseUrl}v1/employee/get-employee-detials`;
export const getEmployeedetailsWithTokenUrl = `${baseUrl}v1/employee/get-employee-details-with-token`
export const updateEmployeeDetialsWithTokenUrl = `${baseUrl}v1/employee/update-employee-detials-with-token`;
export const employeeUploadProfilePicUrl = `${baseUrl}v1/employee/upload-profile-pic`;



// rooms api url
export const addRoomDetialsUrl = `${baseUrl}v1/room/add-room-detials`;
export const getRoomDetialsUrl = `${baseUrl}v1/room`;
export const getOneRoomDetialsUrl = `${baseUrl}v1/room/get-one-room-details`;
export const addRoomImagesUrl = `${baseUrl}v1/room/add-room-images`;
export const findAvailbleRoomsUrl = `${baseUrl}v1/booking/get-available-rooms`;

//booking room api url
export const bookingRoomUrl = `${baseUrl}v1/booking/booking-room`;
export const getUserAllBookingsUrl = `${baseUrl}v1/booking/get-all-guest-bookings`;
export const cancelBookingUrl = `${baseUrl}v1/booking/cancel-booking`;
export const getRoomBookingHistoryUrl = `${baseUrl}v1/booking/get-booking-history`;
export const getBookingDetailsByIdUrl = `${baseUrl}v1/booking/get-booking-details`
// admin 
export const getAllBookingsByGuestIdUrl = `${baseUrl}v1/booking/get-all-bookings-by-guestId`;
export const getAllbookingsUrl = `${baseUrl}v1/booking/get-all-bookings`;

// visualized  for bookings API

export const bookinVisualizedUrl = `${baseUrl}v1/visualized/monthly`;
export const get7DaysBookingVisualizedUrl = `${baseUrl}v1/visualized/last7Days`;
export const get30DaysBookingVisualizedUrl = `${baseUrl}v1/visualized/last30Days`;
export const get3MonthsBookingVisualizedUrl = `${baseUrl}v1/visualized/last3Months`;
export const get6MonthsBookingVisualizedUrl = `${baseUrl}v1/visualized/last6Months`;
export const getLastYearBookingVisualizedUrl = `${baseUrl}v1/visualized/lastYear`;

//Visualized for User API
export const userVizualizedUrl = `${baseUrl}v1/visualized/user`;
export const user7DaysGrowthUrl = `${baseUrl}v1/visualized/last7DaysUsers`;
export const user30DaysGrowthUrl = `${baseUrl}v1/visualized/last30DaysUser`;
export const user3MonthsGrowthUrl = `${baseUrl}v1/visualized/last3MonthsUser`;
export const user6MonthsGrowthUrl = `${baseUrl}v1/visualized/last6MonthsUser`;
export const userLastYearGrowthUrl = `${baseUrl}v1/visualized/lastYearUser`;


//utils
export const getAllCollectionDataLengthUrl = `${baseUrl}v1/utils/get-all-collection-data-length`;



