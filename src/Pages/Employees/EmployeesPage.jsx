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

const EmployeesPage = () => {
  const [showModel, setShowModel] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);
  const [previewData, setPreviewData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState(loadData()); // Initially load data from localStorage
  const [filteredData, setFilteredData] = useState(employees); // Filtered data based on search
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false); 

  const navigate = useNavigate()

  useEffect(() => {
    // Check if data already exists in localStorage
    const storedData = localStorage.getItem('employees');
    if (!storedData) {
      // If not, set the initial data to localStorage
      const initialData = [
        {
          id: 1,
          name: "Basant Saed",
          role: "Software",
          email: "basantsaed718@gmail.com",
          startDate: "2022-01-01",
          phone: "01100588939",
          active: true,
          image: Image,
        },
        {
          id: 2,
          name: "Ahmed Ali",
          role: "IT",
          email: "Ahmed@gmail.com",
          startDate: "2024-02-15",
          phone: "987-654-3210",
          active: false,
          image: Image,
        },
        {
          id: 3,
          name: "saed Ali",
          role: "IT",
          email: "saed@gmail.com",
          startDate: "2024-03-10",
          phone: "555-123-4567",
          active: activeStatus,
          image: Image,
        },
      ];
      localStorage.setItem('employees', JSON.stringify(initialData));
    }
  }, []);

    // Load employee data from localStorage
    function loadData() {
      const storedData = localStorage.getItem('employees');
      return storedData ? JSON.parse(storedData) : [];
    }

    useEffect(() => {
      const employees = loadData();
      setFilteredData(employees);
    }, []); 
    

  // Function to show modal
  const handleAddEmployee = () => {
    setShowModel(true); // Show modal
  };
  // Function to reload data from localStorage and update state
  const reloadData = () => {
    const updatedEmployees = loadData(); 
    setEmployees(updatedEmployees);     
    setFilteredData(updatedEmployees); 
  };

  // Function to close modal
  const handleCloseModal = () => {
      setShowModel(false);
      reloadData(); 
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  
    // Calculate the index of the first and last items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    // Get the data for the current page
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    // Calculate total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    // Handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
        
    // Handle employee deletion click
    const handleDeleteClick = (id) => {
      setEmployeeToDelete(id);
      setShowDeletePopup(true);
    };
  
    // Confirm employee deletion
    const confirmDelete = () => {
      const updatedData = filteredData.filter(employee => employee.id !== employeeToDelete);
      setFilteredData(updatedData);
      localStorage.setItem('employees', JSON.stringify(updatedData));
      setShowDeletePopup(false);
      setEmployeeToDelete(null);
    };
  
    // Cancel deletion action
    const cancelDelete = () => {
      setShowDeletePopup(false);
      setEmployeeToDelete(null);
    };
  
    // Handle search input
    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);
      const filtered = employees.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
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
      setImage(null);
      setImageName("");
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
    // Navigate to employee profile page
    const handleRowClick = (item) => {
      navigate(`profile/${item.id}`, { state: { itemData: item } });
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
    
      // Create the new employee object using the form state
      const newEmployee = {
        id: new Date().getTime(), // Generate a unique ID (you can use another method if preferred)
        name: name,
        role: role, 
        email: email,
        startDate: startDate, 
        phone: phone,
        active: activeStatus,
        image: image,
      };
    
      // Load existing employees from localStorage
      const employees = loadData();
    
      // Add the new employee to the existing array
      employees.push(newEmployee);
    
      // Save the updated array back to localStorage
      localStorage.setItem('employees', JSON.stringify(employees));
    
      // Optionally, update the state to trigger a re-render and reset the form
      setEmployees(employees);
    
      // Reset form state after submission
      resetForm()
      alert("Employee added successfully!");
      setShowModel(false); // Close modal after adding employee
      reloadData()
    };
    
  return (
    <div className="container p-4 h-full bg-secoundColor ">
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-4">
        <div className="relative w-full flex items-center md:w-3/4">
          <input
            type="text"
            placeholder="Search employees"
            className="w-full p-3 pl-14 border rounded-full"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" >
            <SearchIcon />
          </div>
        </div>
        <button
          onClick={handleAddEmployee}
          className="w-full font-medium flex  items-center justify-center gap-3 md:w-1/4 bg-mainColor text-white p-3 rounded-full"
        > <FaPlus />
          New Employees
        </button>
      </div>

      {/* Stepper */}
      {showModel && (
        <div className="modal p-4 z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto hide-scrollbar scrollPage">
          <div className="modal-content flex flex-col gap-3 bg-white rounded-xl shadow-lg w-full md:w-2/4">

            <div className="flex justify-between items-center p-4 border-b-2">
              <h3 className="text-lg font-semibold">Add New Employee</h3>
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

      {/* Table for Employee List */}
      <div className="w-full overflow-x-auto sm:max-w-full">
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Email</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Start Date</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Active</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-black text-center font-TextFontLight text-xs sm:text-sm lg:text-base xl:text-lg pb-3 overflow-hidden">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-xl text-mainColor font-TextFontMedium">
                  No Employees Found
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr className="w-full border-b-2 font-light cursor-pointer" key={item.id} onClick={() => handleRowClick(item)}>
                  <td className="min-w-[200px] sm:min-w-[150px] sm:w-3/12 lg:w-4/12 py-2 flex items-center gap-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {item.name}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">{item.role}</td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">{item.email}</td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">{item.phone}</td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">{item.startDate}</td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">
                    {item.active ? (
                      <span className="text-secoundColor bg-[#5C980F] p-1 rounded-full">✔</span>
                    ) : (
                      <span className="text-secoundColor bg-[#BF0000] p-1 rounded-full">✘</span>
                    )}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-black text-xs sm:text-sm lg:text-lg overflow-hidden">
                  <span className="flex justify-center"><RiDeleteBinLine onClick={(e) => {e.stopPropagation();  // Prevent row click event 
                      handleDeleteClick(item.id); }}  size={24} className="text-[#B8B8B8]"/></span>
                  </td>
                </tr>
              ))
            )}
          </tbody>                
        </table>


        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          {/* Previous Button */}
          <button
            className={`p-2 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-white border-2 border-gray-400 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={20} className="text-gray-400" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-md font-medium border-2 ${currentPage === index + 1 ? 'border-mainColor bg-secoundColor text-mainColor' : 'border-gray-400 bg-white text-gray-600'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            className={`p-2 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-white border-2 border-gray-400 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {showDeletePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this employee?
                </p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-600 text-white py-2 px-4 rounded-md w-full hover:bg-red-700 transition-all"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md w-full hover:bg-gray-500 transition-all"
                  >
                    No, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

      </div>


    </div>
  );
};

export default EmployeesPage;
