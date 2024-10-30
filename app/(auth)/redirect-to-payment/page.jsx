import { auth } from "@clerk/nextjs/server"

const RedirectToPayment = async () => {
  const { getToken } = await auth()
  const email = await getToken({ template: 'testToken' })
  
  console.log(email);
  

  return (
    <div>Redirecting...</div>
  )
}

export default RedirectToPayment