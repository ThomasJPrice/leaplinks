import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-between py-8'>
      <div className='flex gap-8 flex-col items-center'>
        <div className=''>
          <img src="/" alt="LeapLinks logo" className='w-[200px] h-[70px] border border-black' />
        </div>

        {children}
      </div>

      <div className='text-center pt-8'>
        <p className='font-medium mb-1'>Need Help?</p>
        
        <div className='flex gap-2 items-center'>
          <a href="mailto:thomasjprice2@gmail.com" className='underline'>Contact Me</a>
          <p>●</p>
          <a href="/#faqs" className='underline'>FAQs</a>
        </div>
      </div>
    </main>
  )
}

export default AuthLayout