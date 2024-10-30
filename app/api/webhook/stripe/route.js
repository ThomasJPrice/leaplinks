import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const body = await req.text()

  const nextHeaders = await headers()
  const signature = nextHeaders.get('stripe-signature')

  let data;
  let eventType;
  let event;

  // verify stripe event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  data = event.data
  eventType = event.type


  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        try {
          const customer_email = data.object.customer_details.email

          if (customer_email) {
            await supabase
              .from('users')
              .update({ premium: true })
              .eq('user_email', customer_email)            
            
            // edit supabase to be premium
          }
        } catch (error) {
          console.error('error while updating supabase')
        }


        return NextResponse.json(
          { message: `Successfully received and handled - Checkout Session Complete` },
          { status: 201 }
        );
      }

      default:
    }

    return NextResponse.json(
      { message: "successfully received" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'stripe error: ' + error.message + ' Event type: ' + eventType
    )
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    )
  }
}