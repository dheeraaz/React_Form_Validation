import React, {useState} from 'react'
import { useFormik } from 'formik';
import { validationSchemaUsingYup } from '../schemas';

const ValidationUsingFormik = () => {

  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    birthDate: "",
    coding: false,
    reading: false,
    sports: false,

  }

  // const {values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchemaUsingYup,
    // pahila validation schema use garera validate hunxa, ani balla onSubmit ley kaam garxa
    onSubmit: (values, action) => {
      console.log("Congratulations your form has been submitted");
      console.log("Your data: line 30, 05validationUsingFormik.jsx", values);

      // clearing form after submission of data
      action.resetForm();
      return {
    }
    }
  })

  return (
    <>
    <h1 className="text-3xl font-bold text-blue-800 text-center">Form Handling using Formik and Form Validation using YUP</h1>

    <form onSubmit={formik.handleSubmit} className=' flex flex-col w-[90%] max-w-[500px] h-[90%] max-h-[600px] overflow-y-scroll p-2 mx-auto mt-7  border border-orange-600'>
      <div className='flex flex-col '>
        <label htmlFor="fName" className=' cursor-pointer'>FirstName</label>
        <input type="text" name='firstName' value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} id='fName' placeholder='Enter Your First Name' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {(formik.errors?.firstName && formik.touched.firstName) ? ( <p className=' text-red-500'>{formik.errors.firstName}</p> ) : null}
        {/* touched ley, tyo field touch vayepaxi matra error msg show garrxa, else final submission ko time ma matrai error msg show  garxa */}
      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="lName" className=' cursor-pointer'>LastName</label>
        <input type="text" name='lastName' value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} id='lName' placeholder='Enter Your Last Name' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {(formik.errors?.lastName && formik.touched.lastName)? (<p className=' text-red-500'>{formik.errors.lastName}</p>):null}

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="eMail" className=' cursor-pointer'>Email</label>
        <input type="text" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='eMail' placeholder='Enter Your Email' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        { (formik.errors?.email && formik.touched.email) ? <p className=' text-red-500'>{formik.errors.email}</p> : null}

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="pHone" className=' cursor-pointer'>Phone Number</label>
        <input type="text" name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} id='pHone' placeholder='Enter Your Phone Number' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {formik.errors?.phoneNumber && formik.touched.phoneNumber ? <p className=' text-red-500'>{formik.errors.phoneNumber}</p> : null}
 
      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="paSSword" className=' cursor-pointer'>Password</label>
        <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='paSSword' placeholder='Set Your Password' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {formik.errors?.password && formik.touched.password ? <p className=' text-red-500'>{formik.errors.password}</p> : null}

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="confpaSSword" className=' cursor-pointer'>Confirm Paasword</label>
        <input type="password" name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='confpaSSword' placeholder='Retype Your Password' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {formik.errors?.confirmPassword && formik.touched.confirmPassword ? <p className=' text-red-500'>{formik.errors.confirmPassword}</p> : null }

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="aGe" className=' cursor-pointer'>Age</label>
        <input type="number" name='age' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} id='aGe' placeholder='Enter Your Age' autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {formik.errors?.age && formik.touched.age ? <p className=' text-red-500'>{formik.errors.age}</p> : null}

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="genDer" className=' cursor-pointer'>Gender</label>
        <select name="gender" id="genDer" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' border-2 border-red-700 focus:border-yellow-500 outline-none' >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formik.errors?.gender && formik.touched.gender ? <p className=' text-red-500'>{formik.errors.gender}</p> : null}

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="inTerest" className=' cursor-pointer'>Interests</label>
        <label>
          <input type="checkbox" name='coding' value={formik.values.coding} checked={formik.values.coding} onChange={formik.handleChange} onBlur={formik.handleBlur} className='mr-2' />
          Coding
        </label>

        <label>
          <input type="checkbox" name='sports' value={formik.values.sports} checked={formik.values.sports} onChange={formik.handleChange} onBlur={formik.handleBlur} className='mr-2' />
          Sports
        </label>
        <label>
          <input type="checkbox" name='reading' value={formik.values.reading} checked={formik.values.reading} onChange={formik.handleChange} onBlur={formik.handleBlur} className='mr-2' />
          Reading
        </label>

      </div>

      <div className='flex flex-col mt-2'>
        <label htmlFor="DOB" className=' cursor-pointer'>Date of Birth</label>
        <input type="date" name='birthDate' value={formik.values.birthDate} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />
        {formik.errors?.birthDate && formik.touched.birthDate ? <p className=' text-red-500'>{formik.errors.birthDate}</p> : null} 

      </div>


      <button type="submit" className='border-2 border-red-700 w-fit mx-auto mt-2 p-1 cursor-pointer  ' >Submit</button>
    </form>
  </>
  )
}

export default ValidationUsingFormik