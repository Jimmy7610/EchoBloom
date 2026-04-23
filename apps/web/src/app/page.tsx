import Link from 'next/link'
import { 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  MessageSquarePlus, 
  Zap, 
  Users, 
  BrainCircuit,
  MousePointer2,
  AlertCircle
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <Sprout className="w-6 h-6" />
              <span>EchoBloom</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it works</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                NOW IN PUBLIC BETA
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                Understand why users <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">really</span> drop off.
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                EchoBloom captures in-the-moment user sentiment and uses AI to turn raw feedback into actionable growth strategies. Stop guessing, start growing.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/signup" 
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/login" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  View Demo
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70">
                {/* Placeholder logos */}
                <span className="font-bold text-xl tracking-widest">SaaSFLO</span>
                <span className="font-bold text-xl tracking-widest">GROWN</span>
                <span className="font-bold text-xl tracking-widest">BLOOM</span>
                <span className="font-bold text-xl tracking-widest">PULSE</span>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-violet-400 rounded-full blur-[120px]"></div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                  Most SaaS teams know <span className="text-rose-500 italic">where</span> users drop off, but not <span className="text-indigo-600 italic">why</span>.
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Slow Feedback Loops</h4>
                      <p className="text-sm text-slate-600">Traditional surveys reach users days too late, when the context is lost and frustration has already turned into churn.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Signal vs. Noise</h4>
                      <p className="text-sm text-slate-600">Sorting through raw user comments is slow. Manual analysis can't keep up with the pace of product development.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-200">
                  {/* Mock UI for problem visualization */}
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                    <div className="h-32 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-medium">
                      Funnel Drop-off: 42%
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-rose-100 rounded-full"></div>
                      <div className="h-8 flex-1 bg-rose-50 rounded-lg border border-rose-100 flex items-center px-3 text-xs text-rose-700 font-medium italic">
                        "I was confused here..."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Simple flow, deep insights.</h2>
              <p className="text-lg text-slate-600">EchoBloom fits into your existing stack in minutes, not days.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Create Prompt', desc: 'Define your question, trigger, and widget type.', icon: MessageSquarePlus },
                { step: '02', title: 'Embed Widget', desc: 'Add a 15KB script tag to your onboarding flow.', icon: MousePointer2 },
                { step: '03', title: 'Collect Data', desc: 'Users provide feedback in-the-moment.', icon: Users },
                { step: '04', title: 'AI Analysis', desc: 'Get automated sentiment and theme reports.', icon: BrainCircuit }
              ].map((item, idx) => (
                <div key={idx} className="relative group p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="text-4xl font-black text-indigo-100 mb-4 group-hover:text-indigo-200 transition-colors">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features/Benefits */}
        <section id="features" className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
                <h2 className="text-4xl font-bold mb-8 leading-tight">Turn feedback noise into <br /><span className="text-indigo-400">product intelligence.</span></h2>
                <div className="space-y-8">
                  {[
                    { title: 'Real-time Sentiment', desc: 'Know instantly if a new feature launch is causing frustration.', icon: BarChart3 },
                    { title: 'AI-Powered Themes', desc: 'We automatically group user pain points into actionable themes.', icon: BrainCircuit },
                    { title: 'Performance First', desc: 'Lightweight widget (<15KB) that won\'t slow down your app.', icon: Zap },
                    { title: 'Direct Access', desc: 'Export all raw data to CSV for deep-dive investigations.', icon: CheckCircle2 }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <feature.icon className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{feature.title}</h4>
                        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 p-2 rounded-2xl border border-slate-700 shadow-2xl">
                <div className="bg-slate-900 rounded-xl p-6 overflow-hidden">
                  {/* Dashboard Preview Mockup */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-4 w-32 bg-slate-700 rounded-full"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-indigo-600/20 rounded-full border border-indigo-500/30"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="h-24 bg-slate-800 rounded-xl p-4 flex flex-col justify-end gap-2">
                      <div className="h-2 w-12 bg-slate-700 rounded-full"></div>
                      <div className="h-6 w-8 bg-indigo-400 rounded-full"></div>
                    </div>
                    <div className="h-24 bg-slate-800 rounded-xl p-4 flex flex-col justify-end gap-2">
                      <div className="h-2 w-12 bg-slate-700 rounded-full"></div>
                      <div className="h-6 w-8 bg-rose-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-800 rounded-full w-full"></div>
                    <div className="h-3 bg-slate-800 rounded-full w-5/6"></div>
                    <div className="h-3 bg-slate-800 rounded-full w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 lg:p-20 text-white shadow-2xl shadow-indigo-200">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">Ready to understand <br />your users better?</h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Join our public beta today and start collecting AI-powered insights in minutes. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/signup" 
                  className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl"
                >
                  Create Free Account
                </Link>
                <Link 
                  href="/login" 
                  className="w-full sm:w-auto px-10 py-5 bg-indigo-500/20 text-white border border-indigo-400/30 rounded-2xl font-bold text-xl hover:bg-indigo-500/40 transition-all"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Sprout className="w-5 h-5 text-indigo-600" />
              EchoBloom
            </div>
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">Log In</Link>
              <Link href="/signup" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">Sign Up</Link>
              <a href="https://github.com/Jimmy7610/EchoBloom" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">GitHub</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">Docs</a>
            </div>
            <div className="text-sm text-slate-400">
              © 2026 EchoBloom. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
