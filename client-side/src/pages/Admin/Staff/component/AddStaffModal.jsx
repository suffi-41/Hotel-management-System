import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

//redux
import { actionCreator } from "../../../../redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

const AddStaffModal = ({ closeModal, addStaffDetails }) => {
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const [age, setAge] = useState(null);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return null;
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      email: "",
      dob: "",
      gender: "",
      role: "",
      shift: "",
      salary: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      dob: Yup.date()
        .required("Date of Birth is required")
        .test("age", "Age must be between 18 and 50", (value) => {
          const calculatedAge = calculateAge(value);
          setAge(calculatedAge);
          return calculatedAge >= 18 && calculatedAge <= 50;
        }),
      gender: Yup.string().required("Gender is required"),
      role: Yup.string().required("Role is required"),
      shift: Yup.string().required("Shift is required"),
      address: Yup.object().shape({
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zipCode: Yup.string()
          .matches(/^\d{6}$/, "Zip Code must be 6 digits")
          .required("Zip Code is required"),
        country: Yup.string().required("Country is required"),
      }),
    }),
    onSubmit: async (values) => {
      const response = await addStaffDetails(values);
      const { status, message, _id } = await response;
      if (status) {
        values._id = _id;
        action.AddEmployee(values);
        toast.success(message);
        closeModal(false);
      } else {
        toast.error(message);
      }
    },
  });

  const roleSalaryMap = {
    Manager: 50000,
    Cleaner: 15000,
    Receptionist: 25000,
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 mx-auto flex justify-center items-center backdrop-blur-sm bg-transparent z-20">
      <div
        className="absolute  right-5 cursor-pointer top-5 p-2 rounded-full text-2xl bg-white"
        onClick={() => closeModal(false)}
      >
        <RxCross2 className="text-black" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:max-w-2xl h-full overflow-y-scroll bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl text-black font-bold mb-4 flex items-center gap-2">
          <FaUser /> Add Staff
        </h2>
        <form
          className="flex flex-wrap justify-center gap-2 items-center"
          onSubmit={formik.handleSubmit}
        >
          {/* Full Name */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-left"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              name="fullName"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.fullName}
              </div>
            ) : null}
          </div>

          {/* Mobile Number */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-left"
            >
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              id="mobile"
              name="mobile"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.mobile && formik.errors.mobile
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
            ) : null}
          </div>

          {/* Email */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="email"
              className="text-left block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Date of Birth */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-left"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder="Enter your date of birth"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.dob && formik.errors.dob ? "border-red-500" : ""
              }`}
              onChange={(e) => {
                formik.handleChange(e);
                const newAge = calculateAge(e.target.value);
                setAge(newAge);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.dob}
            />
            {formik.touched.dob && formik.errors.dob ? (
              <div className="text-red-500 text-sm">{formik.errors.dob}</div>
            ) : null}
          </div>

          {/* Age */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-left"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Auto calculated"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.age && formik.errors.age ? "border-red-500" : ""
              }`}
              value={age}
              disabled
            />
          </div>

          {/* Gender */}
          <div className="mb-2 flex-grow text-black">
            <label className="block text-sm font-medium text-left">
              Gender
            </label>
            <div className="flex gap-4 border-2 p-1 rounded-md">
              <label className="flex items-center">
                <input
                  type="radio"
                  id="gender-male"
                  name="gender"
                  value="Male"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === "Male"}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value="Female"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === "Female"}
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value="Female"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === "Other"}
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            ) : null}
          </div>

          {/* Role */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="role"
              className="block text-left text-sm font-medium"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue(
                  "salary",
                  roleSalaryMap[e.target.value] || ""
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Security">Security</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
            ) : null}
          </div>

          {/* Shift */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="shift"
              className="block text-sm font-medium text-left"
            >
              Shift
            </label>
            <select
              id="shift"
              name="shift"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shift}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Noon">Noon</option>
              <option value="Night">Night</option>
            </select>
            {formik.touched.shift && formik.errors.shift ? (
              <div className="text-red-500 text-sm">{formik.errors.shift}</div>
            ) : null}
          </div>

          {/* Salary */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-left"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              readOnly
              className="mt-1 p-2 border rounded-md w-full bg-gray-100"
              value={formik.values.salary}
            />
          </div>

          {/* Address - Street */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-left"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="address.street"
              placeholder="Enter your street"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.address?.street && formik.errors.address?.street
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.street}
            />
            {formik.touched.address?.street && formik.errors.address?.street ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address.street}
              </div>
            ) : null}
          </div>

          {/* Address - City */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-left"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              placeholder="Enter your city"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.address?.city && formik.errors.address?.city
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.city}
            />
            {formik.touched.address?.city && formik.errors.address?.city ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address.city}
              </div>
            ) : null}
          </div>

          {/* Address - State */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-left"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="address.state"
              placeholder="Enter your state"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.address?.state && formik.errors.address?.state
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.state}
            />
            {formik.touched.address?.state && formik.errors.address?.state ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address.state}
              </div>
            ) : null}
          </div>

          {/* Address - Zip Code */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-left"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="address.zipCode"
              placeholder="Enter your zip code"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.address?.zipCode &&
                formik.errors.address?.zipCode
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.zipCode}
            />
            {formik.touched.address?.zipCode &&
            formik.errors.address?.zipCode ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address.zipCode}
              </div>
            ) : null}
          </div>

          {/* Address - Country */}
          <div className="mb-2 flex-grow text-black">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-left"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="address.country"
              placeholder="Enter your country"
              className={`mt-1 p-2 border rounded-md w-full ${
                formik.touched.address?.country &&
                formik.errors.address?.country
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.country}
            />
            {formik.touched.address?.country &&
            formik.errors.address?.country ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address.country}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddStaffModal;
