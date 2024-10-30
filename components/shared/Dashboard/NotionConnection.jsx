'use client'

import { Button } from "@/components/ui/button"
import { getUserEmail } from "@/utils/clerk/client"
import { createClient } from "@/utils/supabase/client"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

const NotionConnection = () => {
  const [connectedStatus, setConnectedStatus] = useState(false)

  const { user, isLoaded } = useUser()
  const supabase = createClient()

  if (!isLoaded) return <div>Loading...</div>

  useEffect(() => {
    
    const fetchNotionStatus = async () => {
      if (isLoaded) {
        const user_email = await getUserEmail(user)
        console.log(user_email);
      }
    }

    fetchNotionStatus()
      .catch((error) => {
        console.log(error);
      })
    
  }, []);


  // const user_email = await getUserEmail()

  // const { data: userData, error } = await supabase.from('users').select().single().eq('user_email', user_email)

  // // error / no user state
  // if (!userData || error) {
  //   return (
  //     <div className="flex items-center justify-between">
  //       <div className="space-y-1">
  //         <h3 className="text-lg font-medium">Connection Status</h3>
  //         <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
  //           <span className="w-2 h-2 bg-red-500 rounded-full"></span>
  //           Error fetching Notion status
  //         </p>
  //       </div>

  //       <a href='/dashboard?tab=settings'>
  //         <Button>Retry</Button>
  //       </a>
  //     </div>
  //   )
  // }

  // // if there is a supabase code
  // // ADD test for notion db finding
  // if (userData.notion_oauth_code) {
  //   return (
  //     <div className="flex items-center justify-between">
  //       <div className="space-y-1">
  //         <h3 className="text-lg font-medium">Connection Status</h3>
  //         <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
  //           <span className="w-2 h-2 bg-green-500 rounded-full"></span>
  //           Successfully connected to Notion
  //         </p>
  //       </div>

  //       <a href=''>
  //         <Button>Disconnect</Button>
  //       </a>
  //     </div>
  //   )
  // }


  // unconnected state
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Connection Status</h3>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          {connectedStatus === null ? (
            <>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              Not connected to Notion
            </>
          ) : connectedStatus ? (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Successfully connected to Notion
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Error fetching Notion status
            </>
          )}
        </p>
      </div>

      {connectedStatus === null ? (
        <a href={process.env.NOTION_AUTH_URL}>
          <Button>Connect</Button>
        </a>
      ) : connectedStatus ? (
        <Button>Disconnect</Button>
      ) : (
        <Button onClick={() => window.location.reload()}>Retry</Button>
      )}
    </div>
  )
}

export default NotionConnection