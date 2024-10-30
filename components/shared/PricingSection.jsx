'use client'

import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: 'Standard',
    price: 0,
    features: [
      '1 custom LeapLink',
      'Limited colours & icons',
    ],
  },
  {
    name: 'Premium',
    price: 9,
    features: [
      'Unlimited LeapLinks',
      'Full customisation: colours, icons, backgrounds',
      'Premium support'
    ],
  },
]

export default function PricingSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground">Choose the plan that's right for you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {plan.price === 0 ? 'Free forever' : `£${plan.price} once`}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <a href={`/sign-up?redirect_url=${plan.name === 'Standard' ? '/dashboard' : '/redirect-to-payment'}`} className='w-full'>
                <Button className="w-full">Choose {plan.name}</Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}