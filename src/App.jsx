import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { questions } from './questions-data'




import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const questions = {
  bore: [
    { question: 'Jesu li tvoje bore vidljive i kad ne pokazuješ emocije?', options: ['Ne, samo kad se smijem', 'Ponekad', 'Da, stalno su vidljive'] },
    { question: 'Gdje su najizraženije bore?', options: ['Čele', 'Oko očiju', 'Oko usana i brade'] },
    { question: 'Jesi li već isprobao/la tretmane za bore?', options: ['Ne još', 'Da, ali nije pomoglo', 'Da, i djelomično je pomoglo'] },
    { question: 'Koliko ti je važno da bore nestanu ili se smanje?', options: ['Nije mi jako važno', 'Volio/la bih poboljšanje', 'To mi je jako bitno'] },
    { question: 'Koliko dugo se boriš s borama?', options: ['Tek su se pojavile', '1-2 godine', 'Više od 2 godine'] },
  ],
    podocnjaci: [
    { question: 'Koliko dugo imaš problema s podočnjacima?', options: ['Manje od 6 mjeseci', '1–2 godine', 'Više od 2 godine'] },
    { question: 'Kako bi opisao/la podočnjake?', options: ['Blagi i povremeni', 'Tamni i često prisutni', 'Tamni i natečeni stalno'] },
    { question: 'Jesi li već nešto pokušao/la?', options: ['Ne još', 'Kreme i serumi', 'Tretmane kod stručnjaka'] },
    { question: 'Koliko utječu na tvoje samopouzdanje?', options: ['Ne smetaju mi', 'Povremeno me smetaju', 'Smeta me svaki dan'] },
    { question: 'Koliko si spreman/na uložiti u rješenje?', options: ['Tek želim istražiti', 'Uložio/la bih umjereno', 'Spreman/na sam ozbiljno se posvetiti'] },
  ],
  celulit: [
    { question: 'Koliko dugo imaš celulit?', options: ['Godinu dana ili manje', 'Više od 2 godine', 'Oduvijek'] },
    { question: 'Gdje se najviše vidi?', options: ['Bedra', 'Stražnjica', 'Trbuh i bokovi'] },
    { question: 'Kakav je?', options: ['Vidljiv samo kad pritisnem kožu', 'Vidljiv kad sjedim', 'Vidljiv i u stajanju'] },
    { question: 'Jesi li već nešto probao/la?', options: ['Kreme', 'Masaže', 'Profesionalne tretmane'] },
    { question: 'Koliko te frustrira?', options: ['Ne previše', 'Povremeno', 'Svakodnevno mi smeta'] },
  ],
  strije: [
    { question: 'Koliko su stare tvoje strije?', options: ['Nastale nedavno', 'Starije od godinu dana', 'Imaš ih oduvijek'] },
    { question: 'Koje su boje?', options: ['Ružičaste', 'Bijele', 'Kombinacija'] },
    { question: 'Gdje se nalaze?', options: ['Trbuh', 'Bedra i stražnjica', 'Ruke i leđa'] },
    { question: 'Jesi li ih pokušao/la tretirati?', options: ['Nisam još', 'Prirodnim metodama', 'Stručnim tretmanima'] },
    { question: 'Kako se osjećaš kad ih vidiš u ogledalu?', options: ['Prihvaćam ih', 'Želim ih smanjiti', 'Želim da nestanu'] },
  ],
  oziljci: [
    { question: 'Gdje se nalazi ožiljak koji želiš tretirati?', options: ['Lice', 'Tijelo', 'Više različitih mjesta'] },
    { question: 'Kakav je ožiljak?', options: ['Površinski i svijetao', 'Crven ili pigmentiran', 'Dubok ili ispupčen'] },
    { question: 'Koliko je star ožiljak?', options: ['Manje od 6 mjeseci', '1–2 godine', 'Više od 2 godine'] },
    { question: 'Kako si ga do sada pokušao/la ukloniti?', options: ['Nisam ništa', 'Prirodni pripravci', 'Profesionalni tretmani'] },
    { question: 'Koliko bi ti značilo da ga ublažimo?', options: ['Zadovoljan/na sam i s malim poboljšanjem', 'Važno mi je', 'To mi je prioritet'] },
  ],
  podbradak: [
    { question: 'Koliko je izražen tvoj podbradak?', options: ['Jedva primjetan', 'Primjetan na fotografijama', 'Vidljiv u svakodnevici'] },
    { question: 'Imaš li višak kilograma?', options: ['Ne', 'Nešto malo', 'Da'] },
    { question: 'Je li podbradak tu oduvijek ili se pojavio kasnije?', options: ['Oduvijek', 'Nakon debljanja', 'Nakon 30-e godine'] },
    { question: 'Jesi li pokušao/la vježbe, masaže ili tretmane?', options: ['Ne još', 'Da, bez većih rezultata', 'Da, s djelomičnim uspjehom'] },
    { question: 'Koliko te estetski smeta?', options: ['Nimalo', 'Povremeno', 'Vrlo često'] },
  ],
  trbuh: [
    { question: 'Koliko je opušten trbuh?', options: ['Blago', 'Umjereno', 'Jako'] },
    { question: 'Imaš li višak kože ili samo masno tkivo?', options: ['Više masnoće', 'Više kože', 'Kombinacija'] },
    { question: 'Jesi li rodila ili naglo smršavio/la?', options: ['Ne', 'Rodila sam', 'Naglo smršavio/la'] },
    { question: 'Koliko dugo želiš riješiti taj problem?', options: ['Tek razmišljam', 'Nekoliko mjeseci', 'Godinama'] },
    { question: 'Koliko si spreman/na uložiti u rješenje?', options: ['Samo informativno', 'Umjereno', 'Spreman/na sam se ozbiljno posvetiti'] },
  ],
  lice: [
    { question: 'Imaš li osjećaj da ti lice "visi"?', options: ['Ne', 'Povremeno', 'Da, jako'] },
    { question: 'Kako bi opisao/la tonus kože?', options: ['Napeto', 'Malo opušteno', 'Vidljivo opušteno'] },
    { question: 'Koja ti je zona najproblematičnija?', options: ['Čeljust', 'Obrazi', 'Sve ukupno'] },
    { question: 'Jesi li već radio/la tretmane zatezanja?', options: ['Ne još', 'Jednom ili dva puta', 'Redovito'] },
    { question: 'Koliko ti je važno da lice izgleda zategnuto i svježe?', options: ['Nije jako', 'Volio/la bih poboljšanje', 'Vrlo važno'] },
  ]
}



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
