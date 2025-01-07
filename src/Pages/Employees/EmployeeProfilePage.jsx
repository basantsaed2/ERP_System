import { useState, useEffect, useRef } from 'react';
import SearchIcon from "../../assets/Icons/SearchIcon";
import { FaPlus } from "react-icons/fa6";
import Image from '../../assets/Image.png';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link , useNavigate} from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import {ChangeIcon} from "../../assets/Icons/AllIcons";
import { CheckBoxIcon } from "../../assets/Icons/AllIcons";
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const EmployeeProfilePage =()=>{

    const location = useLocation(); 
    const itemData = location.state?.itemData;
    const employeeId= location.state?.itemData.id;
    const [showModel, setShowModel] = useState(false);
    const [employeeData, setEmployeeData] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);

    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [startDate, setStartDate] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState("");
    const [employees, setEmployees] = useState(loadData());
    const [filteredData, setFilteredData] = useState(employees);
    const fileInputRef = useRef(null);
        
    // Function to load employees from localStorage
    function loadData() {
        const storedData = localStorage.getItem('employees');
        return storedData ? JSON.parse(storedData) : [];
    };

    useEffect(() => {
        const employees = loadData();
        setFilteredData(employees); // Populate filteredData with employees
      }, [employees]); 

    // Fetch employee data when employeeId is available
    useEffect(() => {
    if (employeeId) {
        const employees = loadData(); // Load employees from localStorage
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
        setEmployeeData(employee);
        setName(employee.name);
        setPhone(employee.phone);
        setEmail(employee.email);
        setRole(employee.role);
        setStartDate(employee.startDate);
        setImage(employee.image);
        setActiveStatus(employee.active);
        }
    }
    }, [employeeId]);
        
    const handleOpenModal = (id) => {
        // Fetch employee data from localStorage
        const employees = JSON.parse(localStorage.getItem('employees')) || []; // Fetch all employee data
        const employee = employees.find(emp => emp.id === id); // Find employee by ID
    
        if (employee) {
          setEmployeeData(employee);
          setShowModel(true);
        } else {
          console.log("Employee not found");
        }
      };

      const reloadData = () => {
        const updatedEmployees = loadData();
        setEmployees(updatedEmployees);    
        setFilteredData(updatedEmployees);
      };
    
      const handleCloseModal = () => {
        setShowModel(false);
        reloadData(); 
        window.location.reload(); 
    };
  
      // Handle next step (add employee or navigate)
      const handleNextStep = () => {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          const newEmployee = { name, phone, email, role, startDate, image, active: activeStatus };
          employees.push(newEmployee); // Add the new employee to the data array
          localStorage.setItem('employees', JSON.stringify(employees)); // Save to localStorage
          alert("Employee added successfully");
          setShowModel(false);
          resetForm();
        }
      }; 
      // Handle previous step
      const handlePrevStep = () => {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
        }
      };
    
      // Handle image upload
      const handleImageUpload = (e) => { 
        const file = e.target.files[0];
        if (file) {
          setImage(URL.createObjectURL(file)); // Set the image preview
          setImageName(file.name); // Set the image name
        }
      };   
      // Remove image
      const handleRemoveImage = () => {
        setImage(null); // Remove image
        setImageName(""); // Remove image name
      };  
      // Change image (trigger file input click)
      const handleChangeImage = () => {
        if (fileInputRef && fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the previous value
          fileInputRef.current.click(); // Trigger file input click
        } else {
          console.error("fileInputRef is not set correctly.");
        }
      };
      const handleClick = (e) => {
        const isChecked = e.target.checked; // Checked status
        setActiveStatus(isChecked ? true : false); // Set paymentActive as 1 (true) or 0 (false)
      };

      // Reset form values
      const resetForm = () => {
        setName("");
        setPhone("");
        setEmail("");
        setRole("");
        setStartDate("");
        setImage(null);
        setPreviewData(null);
        setActiveStatus(false)
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
     
        const updatedEmployee = {
            id: employeeData.id, // Use the existing employee's ID
            name: name,
            role: role,
            email: email,
            startDate: startDate,
            phone: phone,
            active: activeStatus,
            image: image,
        };
     
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employeeIndex = employees.findIndex((emp) => emp.id === employeeData.id);
     
        if (employeeIndex !== -1) {
            // Update employee data
            employees[employeeIndex] = updatedEmployee;
     
            // Save to localStorage
            localStorage.setItem('employees', JSON.stringify(employees));
     
            // Update the state to reflect changes
            setEmployeeData(updatedEmployee);
            setName(updatedEmployee.name);
            setRole(updatedEmployee.role);
            setEmail(updatedEmployee.email);
            setPhone(updatedEmployee.phone); 
            setStartDate(updatedEmployee.startDate);
            setImage(updatedEmployee.image); 
            setActiveStatus(updatedEmployee.active);
     
            alert("Employee updated successfully!");
            setShowModel(false);
        } else {
            alert("Employee not found!");
        }
     };
     
    return(
        <>
        <div className="p-4 flex flex-col gap-5">
            <div className="w-full flex justify-between flex-col md:flex-row gap-3">
                <div>
                    <h1 className="flex items-center gap-2 text-fithColor"><strong className="text-black text-xl">Employees</strong> <FaChevronRight/> {name}</h1>
                </div>
                <div className="w-full lg:w-1/4">
                     <button
                        onClick={() => handleOpenModal(employeeData.id)}
                        className="w-full font-medium flex  items-center justify-center gap-3 bg-mainColor text-white p-3 rounded-full"
                    > Edit Employee
                    </button>
                </div>
            </div>

            <div className="p-4 rounded-lg bg-secoundColor">

                <div className="bg-thirdColor font-semibold rounded-lg p-4 w-full">
                    <h1>Summary</h1>
                </div>

                <div className="flex flex-col gap-5 p-4">

                    <div className="flex gap-5">
                        <div className="w-1/4 text-[#747474] font-semibold">
                            <h1>Employee</h1>
                        </div>
                        <div className="w-3/4 flex gap-2 items-center">
                            <img src={image} alt={name} className="w-8 h-8 rounded-full"/>
                            <h1>{name}</h1>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-1/4 text-[#747474] font-semibold">
                            <h1>Role</h1>
                        </div>
                        <div className="w-3/4 flex gap-2 items-center">
                            <h1>{role}</h1>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-1/4 text-[#747474] font-semibold">
                            <h1>E-mail</h1>
                        </div>
                        <div className="w-3/4 flex gap-2 items-center">
                            <h1>{email}</h1>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-1/4 text-[#747474] font-semibold">
                            <h1>Phone</h1>
                        </div>
                        <div className="w-3/4 flex gap-2 items-center">
                            <h1>{phone}</h1>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">

                <div className="w-full lg:w-1/2 p-4 rounded-lg bg-secoundColor">

                    <div className="bg-thirdColor font-semibold rounded-lg p-4 w-full">
                        <h1>Date</h1>
                    </div>

                    <div className="flex gap-5 p-4">
                        <div className="w-2/4 text-[#747474] font-semibold">
                            <h1>Start Date</h1>
                        </div>
                        <div className="w-3/4 flex gap-2 items-center">
                            <h1>{startDate}</h1>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full lg:w-1/2 p-4 rounded-lg bg-secoundColor">

                    <div className="bg-thirdColor font-semibold rounded-lg p-4 w-full">
                        <h1>Active</h1>
                    </div>

                    <div className="flex gap-5 p-4">
                        <div className="w-2/4 text-[#747474] font-semibold">
                            <h1>Status</h1>
                        </div>
                        <div className="w-3/4 flex gap-2 items-center">
                            <CheckBoxIcon checked={activeStatus}/>
                        </div>
                    </div>

                </div>

                
            </div>

            {showModel && (
                <div className="modal p-4 z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto hide-scrollbar scrollPage">
                <div className="modal-content flex flex-col gap-3 bg-white rounded-xl shadow-lg w-full md:w-2/4">

                    <div className="flex justify-between items-center p-4 border-b-2">
                    <h3 className="text-lg font-semibold">Edit Employee</h3>
                    <button
                        onClick={handleCloseModal}
                        className="text-xl font-bold"
                    >
                        &times;
                    </button>
                    </div>

                    <div className="stepper flex fixed items-center justify-between w-full relative">
                        {[1, 2, 3].map((step, index) => {
                            // Define step names
                            const stepNames = ["Personal data", "Image", "Preview"];
                            return (
                            <div key={step} className="relative flex items-center justify-center w-full">
                                {/* Line Before Circle */}
                                {index > 0 && (
                                <div
                                    className={`absolute left-0 right-1/2 top-1/3 -translate-y-1/2 h-1 border-t-2 ${currentStep >= step ? "border-mainColor" : "border-[#CACACA]"} border-dashed`}
                                    style={{ zIndex: 1 }}
                                ></div>
                                )}

                                <div className="flex flex-col items-center">
                                {/* Circle */}
                                <div
                                    className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentStep === step
                                    ? "text-white shadow-lg border-mainColor"
                                    : currentStep > step
                                    ? "bg-mainColor border-mainColor text-white"
                                    : "bg-[#747474] border-[#747474] text-[#747474]"
                                    } border-2`}
                                >
                                    {currentStep === step && (
                                        <div className="w-8 h-8 bg-mainColor rounded-full flex items-center justify-center">
                                        <span className="text-xs text-gray-500"></span>
                                        </div>
                                    )}
                                </div>

                                {/* Step Name */}
                                <span className="mt-3 text-sm text-center">
                                    {stepNames[index]}
                                </span>
                                </div>

                                {/* Line After Circle */}
                                {index < 2 && (
                                <div
                                    className={`absolute left-1/2 right-0 top-1/3 -translate-y-1/2 h-1 border-t-2 ${currentStep > step ? "border-mainColor" : "border-[#CACACA]"} border-dashed `}
                                    style={{ zIndex: 1 }}
                                ></div>
                                )}
                            </div>
                            );
                        })}
                    </div>

                    {/* Step 1: Form Fields */}
                    {currentStep === 1 && (
                    // <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 px-8 py-2">
                        {/* Name Input */}
                        <div className="flex flex-col">
                        <label className="font-semibold flex items-center">
                            Name<span className="text-mainColor ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Employee Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-mainColor p-2 pl-4 rounded-full"
                        />
                        </div>

                        {/* Start Date Input */}
                        <div className="flex flex-col">
                        <label className="font-semibold flex items-center">
                            Start Date<span className="text-mainColor ml-1">*</span>
                        </label>
                        <input
                            type="date"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-mainColor p-2 pl-4 rounded-full"
                        />
                        </div>

                        {/* Role Select */}
                        <div className="flex flex-col">
                            <label className="font-semibold flex items-center">
                                Role<span className="text-mainColor ml-1">*</span>
                            </label>
                            <select
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-mainColor p-2 pl-4 rounded-full"
                            >
                                <option value="" disabled>Select a role</option>
                                <option value="IT">IT</option>
                                <option value="Software">Software</option>
                                <option value="Data Entry">Data Entry</option>
                            </select>
                            </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                        <label className="font-semibold flex items-center">
                            E-Mail<span className="text-mainColor ml-1">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Employee Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-mainColor p-2 pl-4 rounded-full"
                        />
                        </div>

                        {/* Phone Input */}
                        <div className="flex flex-col">
                        <label className="font-semibold flex items-center">
                            Phone<span className="text-mainColor ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Employee Phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-mainColor p-2 pl-4 rounded-full"
                        />
                        </div>
                        </div>

                    // </form>
                    )}

                    {/* Step 2: Upload Image */}
                    {currentStep === 2 && (
                    <div className="p-4">
                        <h1 className="mb-3 font-bold">Add Image</h1>
                        <div className="p-3 border-2 border-dashed rounded-md border-[#B8B8B8] flex flex-col items-center">

                                <input
                                type="file"
                                onChange={handleImageUpload} // Use onChange to handle file selection
                                className="hidden"
                                ref={fileInputRef} // Attach the ref here
                                />
                        
                        {/* Conditional rendering for uploaded image */}
                        {!image ? (
                            <>
                            {/* Button to trigger file input */}
                            <label  upload="true" required={false} onClick={handleChangeImage} className="cursor-pointer flex flex-col items-center">
                                <RiImageAddLine className="text-mainColor font-bold mb-2" size={32} /> {/* Icon */}
                                <span className="flex items-center gap-4 text-white bg-mainColor rounded-full px-4 py-2 font-semibold">
                                <FaPlus /> {/* Icon */} Add Image
                                </span>
                            </label>
                            </>
                            ) : (
                            <>
                            {/* Display uploaded image */}
                            <div className="flex sm:flex-col md:flex-row gap-5 w-full">

                                <div className="flex justify-center w-full md:w-1/2">
                                    <img src={image} alt="Uploaded" className="w-full rounded-md" />
                                </div>

                                <div className="flex flex-col justify-between gap-3 w-full md:w-1/2">
                                    <div>
                                    <p className="font-semibold text-gray-700">{imageName}</p>
                                    </div>

                                    {/* Buttons to change and remove image */}
                                    <div className="flex gap-4 mb-5">
                                    <button
                                        onClick={handleChangeImage}
                                        className="text-[#747474] rounded-full flex items-center gap-2"
                                    >
                                        <ChangeIcon />
                                        Change
                                    </button>
                                    <button
                                        onClick={handleRemoveImage}
                                        className="text-[#747474] rounded-full flex items-center gap-2"
                                    >
                                        <RiDeleteBinLine className="text-mainColor" />
                                        Remove
                                    </button>
                                    </div>


                                </div>


                            </div>
                            </>
                        )}
                        </div>
                    </div>
                    )}


                    {/* Step 3: Preview */}
                    {currentStep === 3 && (
                    <div className="p-4 flex flex-col gap-2">
                        {/* Employee Summary Section */}
                        <div className="rounded-lg bg-secoundColor">
                        <div className="bg-thirdColor font-semibold rounded-lg p-2 w-full">
                            <h1>Summary</h1>
                        </div>
                        <div className="flex flex-col gap-3 p-2 md:p-4">
                            
                            {/* Employee Name & Image */}
                            <div className="flex gap-10">
                            <div className="w-1/4 text-sm text-[#747474] font-semibold">
                                <h1>Employee</h1>
                            </div>
                            <div className="w-3/4 flex gap-2 items-center">
                                {image && <img src={image} alt={name} className="w-8 h-8 rounded-full" />}
                                <h1>{name}</h1>
                            </div>
                            </div>

                            {/* Role */}
                            <div className="flex gap-10">
                            <div className="w-1/4 text-sm text-[#747474] font-semibold">
                                <h1>Role</h1>
                            </div>
                            <div className="w-3/4">
                                <h1>{role}</h1>
                            </div>
                            </div>

                            {/* Email */}
                            <div className="flex gap-10">
                            <div className="w-1/4 text-sm text-[#747474] font-semibold">
                                <h1>E-mail</h1>
                            </div>
                            <div className="w-3/4">
                                <h1>{email}</h1>
                            </div>
                            </div>

                            {/* Phone */}
                            <div className="flex gap-10">
                            <div className="w-1/4 text-sm text-[#747474] font-semibold">
                                <h1>Phone</h1>
                            </div>
                            <div className="w-3/4">
                                <h1>{phone}</h1>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Date & Status Sections */}
                        <div className="flex flex-col lg:flex-row gap-3">

                        {/* Start Date */}
                        <div className="w-full lg:w-1/2 rounded-lg bg-secoundColor">
                            <div className="bg-thirdColor font-semibold rounded-lg p-2 w-full">
                            <h1>Date</h1>
                            </div>
                            <div className="flex gap-5 p-2 md:p-4">
                            <div className="w-2/4 text-[#747474] text-sm font-semibold">
                                <h1>Start Date</h1>
                            </div>
                            <div className="w-3/4">
                                <h1>{startDate}</h1>
                            </div>
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="w-full lg:w-1/2 rounded-lg bg-secoundColor">
                            <div className="bg-thirdColor font-semibold rounded-lg p-2 w-full">
                            <h1>Active</h1>
                            </div>
                            <div className="flex items-center gap-5 p-2 md:p-4">
                            <div className="w-2/4 text-[#747474] text-sm font-semibold">
                                <h1>Status</h1>
                            </div>
                            <div className="w-2/4 flex gap-2 items-center">
                                <CheckBoxIcon handleClick={handleClick} checked={activeStatus} />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}

                {/* Buttons */}
                <div className="flex p-4 pt-0 justify-between">
                {/* Previous Button */}
                {currentStep > 1 && (
                    <button
                    onClick={handlePrevStep}
                    className="bg-white text-[#747474] border border-[#747474] px-6 py-2 rounded-full font-semibold"
                    disabled={currentStep === 1}
                    >
                    Back
                    </button>
                )}

                {/* Next / Apply Button */}
                <button
                    onClick={currentStep === 3 ? handleSubmit : handleNextStep} // Conditional to call submit on Step 3
                    className={`${
                    currentStep === 3 ? 'bg-mainColor' : 'bg-mainColor'
                    } text-white px-6 py-2 rounded-full font-semibold ml-auto`}
                >
                    {currentStep === 3 ? "Apply" : "Next"} {/* Apply on Step 3, Next on other steps */}
                </button>
                </div>
                </div>
                </div>
            )}

        </div>
        </>
    )
}

export default EmployeeProfilePage;