import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { Webhook } from 'svix'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

async function validateRequest(request) {
  const payloadString = await request.text()
  const headerPayload = await headers()

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id'),
    'svix-timestamp': headerPayload.get('svix-timestamp'),
    'svix-signature': headerPayload.get('svix-signature'),
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders)
}

export async function POST(request) {
  try {
    const payload = await validateRequest(request)

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    if (payload.type === 'user.created') {
      const userEmail = payload.data.email_addresses[0].email_address;

      const { error } = await supabase
        .from('users')
        .insert([{ user_email: userEmail }]);

      if (error) {
        console.error('Error inserting user:', error);
        return Response.json({ message: 'Failed to create user' }, { status: 500 });
      }

      console.log('New user created in Supabase:', userEmail);
      return Response.json({ message: 'User created successfully' });
    } else {
      console.log('Event not handled:', payload.type);
      return Response.json({ message: 'Event not handled' });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return Response.json({ message: 'Error validating or handling webhook' }, { status: 400 });
  }
}