'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, FileText, Headphones, MessageSquare, Youtube, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import { Label } from "@/components/ui/label"


export default function LandingPage() {
  // State for the first form
  const [form1Data, setForm1Data] = useState({ firstName: '', lastName: '', email: '' })
  const [form1Status, setForm1Status] = useState({ loading: false, success: false, error: null })

  // State for the second form
  const [form2Data, setForm2Data] = useState({ firstName: '', lastName: '', email: '' })
  const [form2Status, setForm2Status] = useState({ loading: false, success: false, error: null })

  const YOUR_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRWfTuTyMhWRP7ClxDbbYFfF9Q8_8-nqA5qPQ2ekzGHfVQ9HXwCQtf9CvPv_eSy5gecA/exec'

  // Generic submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: any, setStatus: Function) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      await fetch(YOUR_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Apps Script POST from browser if not handling CORS in script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Note: 'no-cors' mode means we CANNOT read the response status or body directly.
      // We have to assume success if the fetch doesn't throw an error.
      // Add better error handling/feedback if your Apps Script supports CORS and returns proper responses.
      setStatus({ loading: false, success: true, error: null })

    } catch (error: any) {
      console.error('Error submitting form:', error)
      setStatus({ loading: false, success: false, error: 'Submission failed. Please try again.' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#202F36] text-white w-full overflow-x-hidden">
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#202F36] text-white">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Image src="/images/anthive-logo.png" width={120} height={40} alt="AntHive Logo" className="h-24 w-auto" />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-white/80">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-white/80">
                How It Works
              </Link>
              <Button className="bg-sky-400 text-white hover:bg-sky-500">Join Waitlist</Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#202F36] text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Learn Smarter with{" "}
                    <span className="text-gradient bg-gradient-to-r from-white to-gray-300">AntHive</span>
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                   Challenge your friends. Collaborate in real time. Make studying social and competitive.
AntHive lets you extract content from PDFs, YouTube videos, or audio—and instantly turn it into notes, flashcards, summaries, and quizzes with AI. Host live quiz battles with classmates, track your progress on leaderboards, and turn every study session into a friendly competition.
                  </p>
                </div>
                <div className="flex flex-col space-y-2 min-[400px]:flex-row min-[400px]:space-y-0 min-[400px]:space-x-4">
                  <div className="grid w-full gap-2">
                    {form1Status.success ? (
                      <div className="p-6 border rounded-lg bg-[#202F36] border-white/10 shadow-xl text-center">
                        <h3 className="text-xl font-medium text-green-400">Thank You!</h3>
                        <p className="text-white/80">You've been added to the waitlist.</p>
                      </div>
                    ) : (
                      <form onSubmit={(e) => handleSubmit(e, form1Data, setForm1Status)} className="grid gap-4 p-6 border rounded-lg bg-[#202F36] border-white/10 shadow-xl">
                        <h3 className="text-xl font-medium">Join the Waitlist</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="firstName1" className="text-white/80">First Name</Label>
                            <Input
                              id="firstName1"
                              value={form1Data.firstName}
                              onChange={(e) => setForm1Data({ ...form1Data, firstName: e.target.value })}
                              type="text"
                              placeholder="John"
                              className="bg-[#202F36] border-white/20 text-white placeholder:text-white/50 h-10"
                              required
                              disabled={form1Status.loading}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="lastName1" className="text-white/80">Last Name</Label>
                            <Input
                              id="lastName1"
                              value={form1Data.lastName}
                              onChange={(e) => setForm1Data({ ...form1Data, lastName: e.target.value })}
                              type="text"
                              placeholder="Doe"
                              className="bg-[#202F36] border-white/20 text-white placeholder:text-white/50 h-10"
                              required
                              disabled={form1Status.loading}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email1" className="text-white/80">Email</Label>
                          <Input
                            id="email1"
                            value={form1Data.email}
                            onChange={(e) => setForm1Data({ ...form1Data, email: e.target.value })}
                            type="email"
                            placeholder="john.doe@example.com"
                            className="bg-[#202F36] border-white/20 text-white placeholder:text-white/50 h-10"
                            required
                            disabled={form1Status.loading}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-sky-400 text-white hover:bg-sky-500 h-10" disabled={form1Status.loading}>
                          {form1Status.loading ? 'Submitting...' : 'Join Waitlist'}
                        </Button>
                        {form1Status.error && <p className="text-xs text-red-400 text-center">{form1Status.error}</p>}
                        {!form1Status.error && <p className="text-xs text-white/60 text-center">Be the first to know when we launch</p>}
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                <div className="absolute w-full h-full bg-[#202F36]/20 rounded-full blur-3xl"></div>
                <div className="relative">
                  <Image
                    src="/images/pencil-anthive.png"
                    width={200}
                    height={200}
                    alt="Creative Learning"
                    className="absolute -top-10 -left-10 w-32 h-32 floating z-10"
                  />
                  <Image
                    src="/images/document-anthive.png"
                    width={200}
                    height={200}
                    alt="Smart Documents"
                    className="absolute -bottom-10 -right-10 w-32 h-32 floating floating-delay-1 z-10"
                  />
                  <div className="relative h-[350px] w-[300px] sm:h-[450px] sm:w-[350px] lg:h-[500px] lg:w-[400px] bg-[#202F36] backdrop-blur-sm rounded-xl p-6 flex items-center justify-center shadow-2xl border border-white/10">
                    <Image
                      src="/images/anthive-3d-model.png"
                      width={300}
                      height={300}
                      alt="AntHive Interface"
                      className="w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16 bg-[#202F36] border-y border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="text-4xl font-bold text-white">10x</div>
                <p className="text-white/70">Faster Learning</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="text-4xl font-bold text-white">24/7</div>
                <p className="text-white/70">Access Anywhere</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="text-4xl font-bold text-white">100%</div>
                <p className="text-white/70">AI-Powered</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="text-4xl font-bold text-white">5+</div>
                <p className="text-white/70">Study Formats</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-[#202F36]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#202F36] px-3 py-1 text-sm text-white border border-white/10">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Everything You Need to Study Smarter
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AntHive transforms how you learn with powerful AI tools designed to make studying more efficient and
                  effective.
                </p>
              </div>
            </div>

            {/* Feature Showcase Image */}
            <div className="mx-auto max-w-5xl py-12">
              <div className="relative w-full overflow-hidden rounded-xl shadow-2xl border border-white/10">
                <Image
                  src="/images/anthive-features-composite.png"
                  width={1200}
                  height={675}
                  alt="AntHive App Features"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="flex gap-4 items-start p-6 rounded-lg bg-[#202F36] shadow-sm card-hover border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">PDF Text Extraction</h3>
                  <p className="text-white/70">
                    Extract text from any PDF document and convert it into organized study materials.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Instant
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Accurate
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-lg bg-[#202F36] shadow-sm card-hover border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <Youtube className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">YouTube Integration</h3>
                  <p className="text-white/70">
                    Turn YouTube videos into notes, flashcards, and quizzes automatically.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Time-saving
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Educational
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-lg bg-[#202F36] shadow-sm card-hover border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <Headphones className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Audio Learning</h3>
                  <p className="text-white/70">
                    Convert your study materials into podcast-style audio for on-the-go learning.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Mobile
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Convenient
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-lg bg-[#202F36] shadow-sm card-hover border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Smart Flashcards</h3>
                  <p className="text-white/70">
                    AI-generated flashcards that adapt to your learning style and progress.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Adaptive
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Personalized
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-lg bg-[#202F36] shadow-sm card-hover border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Interactive Quizzes</h3>
                  <p className="text-white/70">
                    Test your knowledge with AI-generated quizzes based on your study materials.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Interactive
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Engaging
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-lg bg-[#202F36] shadow-sm card-hover border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Streamlined Study Hub</h3>
                  <p className="text-white/70">
                    All your study materials organized in one beautiful, intuitive interface.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Organized
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#202F36] px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                      Intuitive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-[#202F36] border-y border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#202F36] px-3 py-1 text-sm text-white border border-white/10">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Simple, Powerful, Effective
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AntHive makes it easy to transform any learning material into effective study tools.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 border rounded-xl p-8 bg-[#202F36] shadow-md card-hover relative border-white/10">
                <div className="absolute -top-5 -right-5">
                  <Image
                    src="/images/document-anthive.png"
                    width={80}
                    height={80}
                    alt="Document"
                    className="w-16 h-16 floating"
                  />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-white">Upload Content</h3>
                <p className="text-center text-white/70">
                  Upload PDFs, link YouTube videos, or record audio directly in the app.
                </p>
                <ul className="space-y-2 text-sm text-left w-full text-white/90">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Drag & drop files</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Paste YouTube URLs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Record audio notes</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-4 border rounded-xl p-8 bg-[#202F36] shadow-md card-hover relative border-white/10">
                <div className="absolute -top-5 -right-5">
                  <Image
                    src="/images/pencil-anthive.png"
                    width={80}
                    height={80}
                    alt="Pencil"
                    className="w-16 h-16 floating floating-delay-1"
                  />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-white">AI Processing</h3>
                <p className="text-center text-white/70">
                  Our AI analyzes and transforms your content into various study formats.
                </p>
                <ul className="space-y-2 text-sm text-left w-full text-white/90">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Smart content extraction</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Automatic organization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Format conversion</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-4 border rounded-xl p-8 bg-[#202F36] shadow-md card-hover relative border-white/10">
                <div className="absolute -top-5 -right-5">
                  <Image
                    src="/images/text-image-anthive.png"
                    width={80}
                    height={80}
                    alt="Interface"
                    className="w-16 h-16 floating floating-delay-2"
                  />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#202F36]">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-white">Study Smarter</h3>
                <p className="text-center text-white/70">
                  Access your personalized study materials anytime, anywhere, on any device.
                </p>
                <ul className="space-y-2 text-sm text-left w-full text-white/90">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Flashcards & quizzes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Audio summaries</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span>Collaborative study</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#202F36] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Learning?</h2>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the AntHive waitlist today and be the first to experience the future of learning.
                </p>
              </div>
              <div className="mx-auto w-full max-w-md space-y-4 mt-8">
                {form2Status.success ? (
                  <div className="p-6 border rounded-lg bg-[#202F36] border-white/10 shadow-2xl text-center">
                    <h3 className="text-xl font-medium text-green-400">Thank You!</h3>
                    <p className="text-white/80">You've been added to the waitlist.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSubmit(e, form2Data, setForm2Status)} className="grid gap-4 p-6 border rounded-lg bg-[#202F36] border-white/10 shadow-2xl">
                    <h3 className="text-xl font-medium">Join the Waitlist</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName2" className="text-white/80">First Name</Label>
                        <Input
                          id="firstName2"
                          value={form2Data.firstName}
                          onChange={(e) => setForm2Data({ ...form2Data, firstName: e.target.value })}
                          type="text"
                          placeholder="John"
                          className="bg-[#202F36] border-white/20 text-white placeholder:text-white/50 h-10"
                          required
                          disabled={form2Status.loading}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName2" className="text-white/80">Last Name</Label>
                        <Input
                          id="lastName2"
                          value={form2Data.lastName}
                          onChange={(e) => setForm2Data({ ...form2Data, lastName: e.target.value })}
                          type="text"
                          placeholder="Doe"
                          className="bg-[#202F36] border-white/20 text-white placeholder:text-white/50 h-10"
                          required
                          disabled={form2Status.loading}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email2" className="text-white/80">Email</Label>
                      <Input
                        id="email2"
                        value={form2Data.email}
                        onChange={(e) => setForm2Data({ ...form2Data, email: e.target.value })}
                        type="email"
                        placeholder="john.doe@example.com"
                        className="bg-[#202F36] border-white/20 text-white placeholder:text-white/50 h-10"
                        required
                        disabled={form2Status.loading}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-sky-400 text-white hover:bg-sky-500 h-10" disabled={form2Status.loading}>
                      {form2Status.loading ? 'Submitting...' : 'Join Waitlist'}
                    </Button>
                    {form2Status.error && <p className="text-xs text-red-400 text-center">{form2Status.error}</p>}
                    {!form2Status.error && <p className="text-xs text-white/60 text-center">Be the first to know when we launch</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-white/10 bg-[#202F36] text-white py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Image src="/images/anthive-logo.png" width={120} height={40} alt="AntHive Logo" className="h-24 w-auto" />
          </div>
          <p className="text-sm text-white/60">© {new Date().getFullYear()} AntHive. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-white/60 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/60 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
