import React, { useState } from 'react'

function MoreFormHandling() {

  const [formData, setFormData] = useState({
    fName: "",
    email: "",
    jobs: "student",
    genderr: "MALE",
    fav_language: [],
  })

  function handleChange(e) {
    // console.log(e)
    if (e.target.name === "fav_language") {
      let copy = { ...formData }
      if (e.target.checked) {
        // console.log(formData[e.target.name])
        copy.fav_language.push(e.target.value);
        setFormData(() => ({
          ...formData,
          fav_language: copy.fav_language,
        }))
      } else {
        copy.fav_language = copy.fav_language.filter(item => item !== e.target.value);
        setFormData(() => ({
          ...formData,
          fav_language: copy.fav_language,
        }))

      }
    } else {
      setFormData(() => ({
        ...formData,
        [e.target.name]: e.target.value
      }))
    }
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-800 text-center">More Form Handling in Reactjs</h1>

      <form onSubmit={handleSubmit} className=' flex flex-col w-[90%] max-w-[500px] p-2 mx-auto mt-7  border border-orange-600'>
        <label htmlFor="fName" className=' cursor-pointer'>FirstName</label>
        <input type="text" name='fName' id='fName' onChange={handleChange} placeholder='Enter Your Name' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />

        <label htmlFor="emailA" className='cursor-pointer'>Email</label>
        <input type="text" name='email' id='emailA' onChange={handleChange} autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none' />

        <label htmlFor="jobS">Occupations</label>
        <select name="jobs" id="jobS" onChange={handleChange} className=' border-2 border-red-700 focus:border-yellow-500 outline-none' >
          <option value="student">Student</option>
          <option value="farmer" >Farmer</option>
          <option value="officer">Officer</option>
        </select>

        <label htmlFor="gender">Gender</label>
        <div className=' border border-red-500 flex flex-col gap-2'>
          <div>
            <input type="radio" id="male" name="genderr" value="MALE" onChange={handleChange} checked={formData.genderr === "MALE"} />
            <label htmlFor="male" className=' ml-2'>Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="genderr" value="FEMALE" onChange={handleChange} checked={formData.genderr === "FEMALE"} />
            <label htmlFor="female" className=' ml-2'>Female</label>
          </div>
          <div>
            <input type="radio" id="other" name="genderr" value="OTHER" onChange={handleChange} checked={formData.genderr === "OTHER"} />
            <label htmlFor="other" className=' ml-2'>Other</label>
          </div>
        </div>

        <label htmlFor="languages">Languages</label>
        <div className=' border border-red-500 flex flex-col gap-2'>
          <div>
            <input type="checkbox" id="html" name="fav_language" value="HTML" onChange={handleChange} />
            <label htmlFor="html" className=' ml-2'>Html</label>
          </div>
          <div>
            <input type="checkbox" id="css" name="fav_language" value="CSS" onChange={handleChange} />
            <label htmlFor="css" className=' ml-2'>CSS</label>
          </div>
          <div>
            <input type="checkbox" id="javascript" name="fav_language" value="JAVASCRIPT" onChange={handleChange} />
            <label htmlFor="javascript" className=' ml-2'>Javascript</label>
          </div>
        </div>

        <input type="submit" className='border-2 border-red-700 w-fit mx-auto mt-2 p-1 cursor-pointer  ' />

      </form>

      <div className='flex flex-col w-[90%] max-w-[500px] p-2 mx-auto mt-7  border-4 border-orange-600'>
        <p>Name: {formData.fName}</p>
        <p>Email: {formData.email}</p>
        <p>Ocuupations: {formData.jobs}</p>
        <p>Gender: {formData.genderr}</p>
        <p>Languages: {formData.fav_language.join(" ")}</p>
      </div>
    </>
  )
}

export default MoreFormHandling