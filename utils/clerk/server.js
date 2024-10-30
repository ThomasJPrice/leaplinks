import { currentUser } from "@clerk/nextjs/server";

export async function getUserEmail() {
  const user = await currentUser()

  try {
    return user.emailAddresses[0].emailAddress
  } catch (error) {
    return null
  }
}