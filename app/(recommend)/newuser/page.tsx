import React from 'react'
import { Questionnaire } from '@/components/custom/Question'
import Topbar from '@/components/layout/Topbar'
const page = () => {
  return (
    <div>
        <Topbar />
        <Questionnaire />
    </div>
  )
}

export default page