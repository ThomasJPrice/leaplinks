import LinksPage from '@/components/shared/Dashboard/LinksPage'
import SettingsPage from '@/components/shared/Dashboard/SettingsPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUserEmail } from '@/utils/clerk/server'
import { createClient } from '@/utils/supabase/server'
import { UserButton, UserProfile } from '@clerk/nextjs'
import { cookies } from 'next/headers'
import { toast } from 'react-hot-toast'

async function handleNotionCode(code) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
  
    const user_email = await getUserEmail()
  
    await supabase
      .from('users')
      .update({
        notion_oauth_code: code
      })
      .eq('user_email', user_email)
  
    console.log('Successfully updated code:', code, 'to', user_email);  
  } catch (error) {
    console.log(error);
  }
}

const DashboardHome = async (params) => {
  const searchParams = await params.searchParams

  if (searchParams?.code) {
    handleNotionCode(searchParams.code)
  }

  return (
    <main className='max-w-[1024px] px-4 mx-auto'>

      <nav className='flex justify-between items-center gap-4 py-4'>
        <img src="/" alt="LeapLinks logo" className='w-[100px] h-[35px] border border-black' />

        {/* account info */}
        <UserButton />
      </nav>

      <Tabs defaultValue={`${searchParams.tab ? searchParams.tab : 'links'}`}>
        <TabsList>
          <TabsTrigger value='links'>Links</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>

        <section>
          <TabsContent value='links'>
            <LinksPage />
          </TabsContent>
          <TabsContent value='settings'>
            <SettingsPage />
          </TabsContent>
        </section>
      </Tabs>
    </main>
  )
}

export default DashboardHome