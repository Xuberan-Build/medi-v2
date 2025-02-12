// src/app/(frontend)/page.tsx
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Shield, Clock, DollarSign } from 'lucide-react'
import config from '@/payload.config'

export default async function HomePage() {
  try {
    // Maintain Payload admin access
    const headers = await getHeaders()
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers })

    // Fetch hero image from Payload
    let heroImageUrl = null
    const mediaResponse = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'medicare-hero.png'
        }
      }
    })

    if (mediaResponse?.docs?.[0]?.url) {
      heroImageUrl = mediaResponse.docs[0].url
    }

    return (
      <>
        {/* Admin Access Bar - Only visible when logged in */}
        {user && (
          <div className="bg-slate-900 text-white px-4 py-2 text-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <span>Logged in as {user.email}</span>
              <a
                href="/admin"
                className="text-blue-400 hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Access Admin Panel
              </a>
            </div>
          </div>
        )}

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                    Find Your Perfect Medicare Plan in{' '}
                    <span className="text-primary">5 Minutes</span>
                  </h1>
                  <p className="text-xl text-slate-600 mb-8 max-w-2xl">
                    Answer 7 simple questions and get a personalized recommendation that fits your health needs and budget.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      href="/questionnaire"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition"
                    >
                      Start Free Assessment
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary bg-white border-2 border-primary hover:bg-slate-50 rounded-lg transition"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative h-[400px] w-full">
                    {heroImageUrl ? (
                      <Image
                        src={heroImageUrl}
                        alt="Active senior couple playing pickleball"
                        fill
                        className="object-cover rounded-2xl shadow-2xl"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Licensed Experts</h3>
                  <p className="text-slate-600">Get guidance from our Medicare specialists</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
                  <p className="text-slate-600">Complete in just 5 minutes</p>
                </div>
                <div className="flex flex-col items-center">
                  <DollarSign className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Save Money</h3>
                  <p className="text-slate-600">Find the most cost-effective plan for you</p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-12">Trusted by 10,000+ Medicare Recipients</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "Found the perfect plan for my budget in minutes!",
                    author: "Linda M.",
                    type: "Medicare Advantage"
                  },
                  {
                    quote: "Their questionnaire helped me understand what I really needed.",
                    author: "Robert S.",
                    type: "Medigap"
                  },
                  {
                    quote: "Saved $200/month by switching to a recommended plan.",
                    author: "Patricia K.",
                    type: "Medicare Advantage"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Find Your Ideal Medicare Plan?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get your personalized recommendation in the next 5 minutes.
              </p>
              <Link
                href="/questionnaire"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary bg-white hover:bg-slate-100 rounded-lg transition"
              >
                Start Free Assessment
              </Link>
            </div>
          </section>
        </main>
      </>
    )
  } catch (error) {
    console.error('Error in HomePage:', error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Something went wrong. Please try again later.</p>
      </div>
    )
  }
}
