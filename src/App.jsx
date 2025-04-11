import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const questions = {
  bore: [
    { question: 'Jesu li tvoje bore vidljive i kad ne pokazuješ emocije?', options: ['Ne, samo kad se smijem', 'Ponekad', 'Da, stalno su vidljive'] },
    { question: 'Gdje su najizraženije bore?', options: ['Čelo', 'Oko očiju', 'Oko usana i brade'] },
    { question: 'Jesi li već isprobao/la tretmane za bore?', options: ['Ne još', 'Da, ali nije pomoglo', 'Da, i djelomično je pomoglo'] },
    { question: 'Koliko ti je važno da bore nestanu ili se smanje?', options: ['Nije mi jako važno', 'Volio/la bih poboljšanje', 'To mi je jako bitno'] },
    { question: 'Koliko dugo se boriš s borama?', options: ['Tek su se pojavile', '1-2 godine', 'Više od 2 godine'] },
  ],
  // ostale kategorije...
}

const getTreatmentEstimate = (answers) => {
  let score = 0
  answers.forEach(ans => {
    if (ans.includes('stalno') || ans.includes('izražen') || ans.includes('Više od 2 godine') || ans.includes('Vrlo često') || ans.includes('To mi je prioritet')) score += 2
    else if (ans.includes('Povremeno') || ans.includes('1–2 godine') || ans.includes('djelomično') || ans.includes('Važno mi je')) score += 1
  })
  return score >= 6 ? '15+ tretmana' : '10+ tretmana'
}

export default function App() {
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState('')
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const currentQuestions = category ? questions[category] : []
  const progress = ((step + 1) / 5) * 100

  const handleAnswer = (value) => {
    const newAnswers = [...answers]
    newAnswers[step] = value
    setAnswers(newAnswers)
    if (step === 4) {
      const estimate = getTreatmentEstimate(newAnswers)
      setResult(estimate)
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setCategory('')
    setAnswers([])
    setResult(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9fa] p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">
        {!category ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Koji problem želiš riješiti?</h2>
            <div className="grid gap-4">
              {Object.keys(questions).map((key) => (
                <button key={key} className="bg-[#81D8D0] hover:bg-[#6ccac1] text-black py-3 px-6 rounded-xl text-lg capitalize" onClick={() => setCategory(key)}>
                  {key}
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tvoja preporuka</h2>
            <p className="mb-4">Na temelju tvojih odgovora preporučujemo <strong>{result}</strong>.</p>
            <a href="https://tally.so/r/nGKy1o" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#81D8D0] hover:bg-[#6ccac1] text-black py-3 px-6 rounded-xl">Zatraži ponudu</button>
            </a>
            <p className="text-sm mt-4 text-gray-500">Ponuda vrijedi do kraja mjeseca.</p>
            <button className="underline text-sm mt-4 block mx-auto" onClick={reset}>Kreni ispočetka</button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-1">
                {currentQuestions.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? 'bg-[#81D8D0]' : 'bg-gray-300'}`}></div>
                ))}
              </div>
              <span className="text-sm text-gray-500">{step + 1}/5</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">{currentQuestions[step].question}</h2>
                <div className="grid gap-3">
                  {currentQuestions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      className="w-full border border-gray-300 hover:border-[#81D8D0] text-left py-3 px-4 rounded-xl text-black hover:bg-[#f0fdfa]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {step < 4 && (
                  <p className="mt-6 text-sm italic text-gray-400">
                    Sljedeće: {currentQuestions[step + 1].question.split(' ').slice(0, 3).join(' ')}...
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
