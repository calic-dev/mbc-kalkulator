
import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { questions } from './questions-data'

const getTreatmentEstimate = (answers) => {
  let score = 0
  answers.forEach(ans => {
    if (ans.includes('stalno') || ans.includes('izražen') || ans.includes('Više od 2 godine') || ans.includes('Vrlo često') || ans.includes('To mi je prioritet')) score += 2
    else if (ans.includes('Povremeno') || ans.includes('1–2 godine') || ans.includes('djelomično') || ans.includes('Važno mi je')) score += 1
  })
  return score >= 6 ? '15+ tretmana' : '10+ tretmana'
}

const getDaysRemaining = () => {
  const today = new Date()
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  return Math.ceil((endOfMonth - today) / (1000 * 60 * 60 * 24))
}

export default function TreatmentCalculator() {
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState('')
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [daysLeft, setDaysLeft] = useState(0)
  const [started, setStarted] = useState(false)

  const currentQuestions = category ? questions[category] : []

  useEffect(() => {
    setDaysLeft(getDaysRemaining())
  }, [])

  const resetForm = () => {
    setStep(0)
    setCategory('')
    setAnswers([])
    setResult(null)
    setStarted(false)
  }

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

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1)
  }

  if (!started) {
    return (
      <Card className="max-w-xl mx-auto mt-10 p-6 bg-white text-black text-center rounded-2xl shadow-md">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Nisi siguran/a koliko tretmana je dovoljno da riješiš svoj problem?</h1>
          <p className="text-lg mb-6">Ispuni kviz i saznaj!</p>
          <Button className="bg-[#81D8D0] text-black hover:bg-[#6ccac1]" onClick={() => setStarted(true)}>Kreni</Button>
        </CardContent>
      </Card>
    )
  }

  if (!category) {
    return (
      <Card className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-2xl shadow-md text-black">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Koji problem želiš riješiti?</h2>
          <Select onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className="w-full bg-white border border-black text-black text-lg">
              <SelectValue placeholder="Odaberi problem..." />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {Object.keys(questions).map((key) => (
                <SelectItem key={key} value={key} className="capitalize text-lg">
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    )
  }

  if (result) {
    return (
      <Card className="max-w-xl mx-auto mt-10 p-6 text-center bg-white text-black border border-[#81D8D0] shadow-xl rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-2">Preporuka tretmana</h2>
          <p className="text-lg mb-4">Na temelju tvojih odgovora, preporučujemo <strong>{result}</strong>.</p>
          <p className="mb-4">Srećom, trenutno imamo <strong>proljetnu akciju</strong> s <strong>50% popusta</strong> na sve pakete! Iskoristi priliku do kraja mjeseca.</p>
          <a href="https://tally.so/r/nGKy1o" target="_blank" rel="noopener noreferrer">
            <Button
              className="mt-4 bg-[#81D8D0] text-black hover:bg-[#6ccac1]"
              onClick={() => window.open('https://tally.so/r/nGKy1o', '_blank')}>Zatraži ponudu</Button>
          </a>
          <p className="mt-4 text-sm text-gray-600">Ponuda vrijedi još <strong>{daysLeft} dana</strong></p>
          <Button variant="ghost" className="mt-4 underline text-sm" onClick={resetForm}>Kreni ispočetka</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-2xl shadow-md text-black">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-6">{currentQuestions[step].question}</h2>
        <Progress value={(step + 1) * 20} className="mb-4 bg-[#e0f7f5]" />
        <RadioGroup onValueChange={handleAnswer} value={answers[step] || ''}>
          {currentQuestions[step].options.map((opt, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value={opt} id={`option-${idx}`} />
              <Label htmlFor={`option-${idx}`} className="text-lg">{opt}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={step === 0}>Prethodno pitanje</Button>
        </div>
      </CardContent>
    </Card>
  )
}
