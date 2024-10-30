export async function getUserEmail(user) {
  console.log(user);
  

  try {
    return user.emailAddresses[0].emailAddress
  } catch (error) {
    return null
  }
}