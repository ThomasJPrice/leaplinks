import { RedirectToSignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const PrivateLayout = async ({ children }) => {
  const user = await currentUser()

  if (!user) {
    return (
      <RedirectToSignIn />
    )
  }

  return (
    <div>{children}</div>
  )
}

export default PrivateLayout