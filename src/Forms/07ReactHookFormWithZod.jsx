import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.string().min(1, "You must be at least 18 years old"),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  address: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
  }),
  hobbies: z
    .array(
      z.object({
        name: z.string().min(1, "Hobby name is required"),
      })
    )
    .min(1, "At least one hobby is required"),
  startDate: z.date(),
  subscribe: z.boolean(),
  referral: z.string().default(""),
})

const ReactHookFormWithZod = () => {

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      address: { city: "", state: "" },
      hobbies: [{ name: "" }],
      startDate: new Date(),
      subscribe: false,
      referral: "",
    },resolver:zodResolver(formSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  })


  const onSubmit = (data) => {
    try{
      // do api calling or something
      console.log(data)
    }catch(error){
      console.error("Error", error);
      setError("root", {
        message: error.message
      })
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-800 text-center">Form Handling using React Hook Form and vaidation using Zod</h1>

      <form action="" onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-4 w-[90%] max-w-[500px] p-2 mx-auto mt-7  border border-orange-600'>
        <div className='flex justify-between'>
          <label htmlFor='fName' className=' cursor-pointer w-1/5'>First Name: </label>
          <div className='flex-1'>
            <input {...register("firstName")} id='fName' className='w-full border-2 border-slate-500 outline-none focus:border-blue-600' />

            {errors.firstName && (
              <p className='text-orange-500'>{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor='lName' className='w-1/5 cursor-pointer'>Last Name: </label>
          <div className='flex-1'>
            <input {...register("lastName")} id='lName' className='w-full border-2 border-slate-500 outline-none focus:border-blue-600' />
            {errors.lastName && (<p className='text-orange-500'>{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor='mail' className='w-1/5 cursor-pointer'>Email: </label>
          <input {...register("email")} type='email' id='mail' className='flex-1 border-2 border-slate-500 outline-none focus:border-blue-600' />

          {errors.email && (<p className='text-orange-500'>{errors.email.message}</p>)}

        </div>

        <div className='flex justify-between'>
          <label htmlFor='umer' className='w-1/5 cursor-pointer'>Age: </label>
          <input type="number" {...register("age")}
            id='umer'
            className='flex-1 border-2 border-slate-500 outline-none focus:border-blue-600' />

          {errors.age && (<p className='text-orange-500'>{errors.age.message}</p>)}

        </div>

        <div className='flex justify-between'>
          <label htmlFor='gender' className='w-1/5 cursor-pointer'>Gender: </label>
          <select {...register("gender")} id='gender' className='flex-1 border-2 border-slate-500 outline-none focus:border-blue-600'>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {errors.gender && (<p className='text-orange-500'>{errors.gender.message}</p>)}
        </div>

        <div className='flex justify-between'>
          <label htmlFor="address.city" className='w-1/5 cursor-pointer'>Address: </label>

          <input
            {...register("address.city")}
            placeholder="City"
            id='address.city'
            className='flex-1 border-2 border-slate-500 outline-none focus:border-blue-600'
          />

          {errors.address?.city && (<p className='text-orange-500'>{errors.address.city.message}</p>)}

          <input
            {...register("address.state")}
            placeholder="State"
            id='address.state'
            className='flex-1 ml-3 border-2 border-slate-500 outline-none focus:border-blue-600'
          />
          {errors.address?.state && (
            <p className='text-orange-500'>{errors.address.state.message}</p>
          )}
        </div>

        <div className='flex justify-between'>
          <label htmlFor='date' className='w-1/5 cursor-pointer'>Start Date: </label>
          <div className='flex-1'>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} id='date' className='w-full border-2 border-slate-500 outline-none focus:border-blue-600' /> */}

            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  placeholderText='Select Date'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  id='date'
                  className='w-full border-2 border-slate-500 outline-none focus:border-blue-600'
                />
              )}
            />
          </div>
        </div>


        <div className=''>
          <label htmlFor='hobby' className='w-1/5 cursor-pointer'>Hobbies: </label>
          {fields.map((item, index) => (
            <div key={item.id}>
              <input
                {...register(`hobbies.${index}.name`)}
                placeholder="Hobby Name"
                id='hobby'
                className='mt-3 border-2 border-slate-500 outline-none focus:border-blue-600'
              />
              {errors.hobbies?.[index]?.name && (
                <p style={{ color: "orangered" }}>
                  {errors.hobbies[index].name.message}
                </p>
              )}

              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)} className='px-2 py-1 bg-red-400 ml-2 rounded-md cursor-pointer hover:text-white'>
                  Remove Hobby
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => append({ name: "" })} className='px-2 py-1 bg-slate-400 mt-2 rounded-md cursor-pointer hover:text-white'>
            Add Hobby
          </button>
        </div>


        <div className='flex gap-4 items-center'>
          <label htmlFor="sub" className=' cursor-pointer'>Subscribe to Newsletter: </label>
          <input {...register("subscribe")} type="checkbox" id="sub" className='w-4 h-4' />
        </div>

        {errors.root && <p className='text-red-500'>{errors.root.message}</p>}


        <button type="submit" disabled={isSubmitting} className='border-2 border-blue-500 w-fit px-4 py-1 text-lg font-semibold cursor-pointer hover:bg-blue-400 transition-all duration-200 hover:text-white'>
          {isSubmitting ? "submiiting..." : "submit"}
        </button>

      </form>
    </>

  )
}

export default ReactHookFormWithZod