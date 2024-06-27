import React, { useState } from 'react'
import * as Yup from 'yup'
// import { object, string, number, date, InferType } from 'yup';


function ValidationUsingYUP() {
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

  const [errors, setErrors] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid Email format").required("Email is required"),
    phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone Number must be 10 digits").required("Phone Number is Required"), //here, custom regex is provided
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[!@#$%^&*()_+{}<>?:"]/, "password must contain atleast one symbol")
      .matches(/[0-9]/, "password must contain atleast one number")
      .matches(/[A-Z]/, "password must contain atleast one uppercase")
      .matches(/[a-z]/, "password must contain atleast one lowercase")
      .required("password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password must match")
    .required("Confirm password is required"),
    age: Yup.number().typeError("Age must be a number")
    .min(18, "Your age must be at least 18 years old")
    .max(100, "Your age cannot be older than 100 years")
    .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array().min(1, "Select at least one interests").required("Select at least one interests"),
    birthDate: Yup.date().required("Date of birth is required"),
  })

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(formData)
  // }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{
      // validating schema with our form data
      //setting aboutEarly: false, if it is set true(or not given), the function return as soon as it gets first error
      await validationSchema.validate(formData, {abortEarly:false});
      // if validation is successful
      console.log("Form Submitted", formData)
    }catch(err){
      console.log(err.inner);
      let newErrors = {};
      err.inner.forEach((item)=>{
        newErrors[item.path] = item.message;
      })

      setErrors(newErrors);
    }
  }

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

export default ValidationUsingYUP