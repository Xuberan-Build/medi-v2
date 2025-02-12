///Users/Worker/plan-it/medi-planit/src/app/(frontend)/questionnaire/loading.tsx
'use client'

import { Suspense } from 'react'
import { Header } from '@/components/layout/Header/index'
import { Footer } from '@/components/layout/Footer/index'
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm'
import Loading from './loading'

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#D9EBF9] to-white">
      <Header />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<Loading />}>
            <QuestionnaireForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
