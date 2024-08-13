import React from 'react'
import './App.css'

// import { BasicFormHandling } from './Forms'
// import { MoreFormHandling } from './Forms'
// import { CustomFormValidation } from './Forms/'
// import { ValidationUsingYUP } from './Forms/'
// import { ValidationUsingFormik } from './Forms/'
// import { ReactHookForm } from './Forms/'
import { ReactHookFormWithZod } from './Forms/'
function App() {

  return (
    <>
      {/* <BasicFormHandling /> */}
      {/* < MoreFormHandling /> */}
      {/* < CustomFormValidation /> */}
      {/* < ValidationUsingYUP /> */}
      {/* < ValidationUsingFormik /> */}
      {/* <ReactHookForm /> */}
      <ReactHookFormWithZod />
    </>
  )
}

export default App
