import { getUserEmail } from "@/utils/clerk/server"
import { redirect } from "next/navigation"

const RedirectToPayment = async () => {
  const userEmail = await getUserEmail()
  
  redirect(`${process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK}?prefilled_email=${userEmail}`)
  

  return (
    <div>Redirecting...</div>
  )
}

export default RedirectToPayment