import React, { useState } from 'react'

const BasicFormHandling = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  function handleChange(e){
   if(e.target.id === "fName"){
    console.log(e.target.value);
    setFirstName(e.target.value.toUpperCase());
   }
   if(e.target.id === "lName"){
    console.log(e.target.value);
    setLastName(e.target.value);
   }
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(`${firstName} ${lastName}`);
  }


  return (
    <>
    <h1 className="text-3xl font-bold text-blue-800 text-center">Basic Form Handling in Reactjs</h1>

    <form onSubmit={handleSubmit} className=' flex flex-col w-[90%] max-w-[300px] p-2 mx-auto mt-7  border border-orange-600'>

      <label htmlFor="fName" className=' cursor-pointer'>FirstName</label>
      <input id='fName' placeholder='Enter Your Name' type="text" value={firstName} onChange={handleChange} autoComplete='off' className=' border-2 border-red-700 focus:border-yellow-500 outline-none'/>

      <label htmlFor="lName" className='cursor-pointer'>LastName</label>
      <input id='lName' type="text" value={lastName} onChange={handleChange} autoComplete='off'  className=' border-2 border-red-700 focus:border-yellow-500 outline-none'/>

      <input type="submit" className='border-2 border-red-700 w-fit mx-auto mt-2 p-1 cursor-pointer  ' />

    </form>
    </>
  )
}

export default BasicFormHandling