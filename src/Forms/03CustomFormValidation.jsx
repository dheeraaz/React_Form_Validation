import React, { useEffect, useState } from 'react'

function CustomFormValidation() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];

    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter((value) => value !== name)
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    })
  }

  function isValidEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  function validPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function validAge(age) {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  }


  function validateForm() {
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email formats";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "password is required";
    } else if (!validPassword(formData.password)) {
      newErrors.password = "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "password must match"
    }

    if (!formData.age) {
      newErrors.age = "age is required"
    } else if (!validAge(formData.age)) {
      newErrors.age = "You must be at least 18 years old and not older than 100 years"
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Select at least one interests";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)
    console.log("---------------*1")

    const isValid = validateForm();

    if (isValid) {
      console.log("form submitted")
    } else {
      console.log("Form validation Failed")
    }
  }

  useEffect(() => {
    console.log("from useEffect Hook: rendered every time error state is changed")
    console.log(errors)
  }, [errors])

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-800 text-center">Custom Form Validation in Reactjs</h1>

      <form onSubmit={handleSubmit} className=' flex flex-col w-[90%] max-w-[500px] h-[90%] max-h-[600px] overflow-y-scroll p-2 mx-auto mt-7  border border-orange-600'>
        <div className='flex flex-col '>
          <label htmlFor="fName" className=' cursor-pointer'>FirstName</label>
          <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} id='fName' placeholder='Enter Your First Name' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.firstName && <p className=' text-red-500'>{errors.firstName}</p>}
        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="lName" className=' cursor-pointer'>LastName</label>
          <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} id='lName' placeholder='Enter Your Last Name' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.lastName && <p className=' text-red-500'>{errors.lastName}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="eMail" className=' cursor-pointer'>Email</label>
          <input type="email" name='email' value={formData.email} onChange={handleChange} id='eMail' placeholder='Enter Your Email' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.email && <p className=' text-red-500'>{errors.email}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="pHone" className=' cursor-pointer'>Phone Number</label>
          <input type="text" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} id='pHone' placeholder='Enter Your Phone Number' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.phoneNumber && <p className=' text-red-500'>{errors.phoneNumber}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="paSSword" className=' cursor-pointer'>Password</label>
          <input type="password" name='password' value={formData.password} onChange={handleChange} id='paSSword' placeholder='Set Your Password' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.password && <p className=' text-red-500'>{errors.password}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="confpaSSword" className=' cursor-pointer'>Confirm Paasword</label>
          <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} id='confpaSSword' placeholder='Retype Your Password' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.confirmPassword && <p className=' text-red-500'>{errors.confirmPassword}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="aGe" className=' cursor-pointer'>Age</label>
          <input type="number" name='age' value={formData.age} onChange={handleChange} id='aGe' placeholder='Enter Your Age' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.age && <p className=' text-red-500'>{errors.age}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="genDer" className=' cursor-pointer'>Gender</label>
          <select name="gender" id="genDer" value={formData.gender} onChange={handleChange} className=' border-2 border-red-700 focus:border-yellow-500 outline-none' >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors?.gender && <p className=' text-red-500'>{errors.gender}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="inTerest" className=' cursor-pointer'>Interests</label>
          <label>
            <input type="checkbox" name='coding' onChange={handleCheckBoxChange} checked={formData.interests.includes("coding")} className='mr-2' />
            Coding
          </label>

          <label>
            <input type="checkbox" name='sports' onChange={handleCheckBoxChange} checked={formData.interests.includes("sports")} className='mr-2' />
            Sports
          </label>
          <label>
            <input type="checkbox" name='reading' onChange={handleCheckBoxChange} checked={formData.interests.includes("reading")} className='mr-2' />
            Reading
          </label>
          {errors?.interests && <p className=' text-red-500'>{errors.interests}</p>}

        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor="DOB" className=' cursor-pointer'>Date of Birth</label>
          <input type="date" name='birthDate' value={formData.birthDate} onChange={handleChange} className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
          {errors?.birthDate && <p className=' text-red-500'>{errors.birthDate}</p>}

        </div>


        <button type="submit" className='border-2 border-red-700 w-fit mx-auto mt-2 p-1 cursor-pointer  ' >Submit</button>
      </form>
    </>
  )
}

export default CustomFormValidation