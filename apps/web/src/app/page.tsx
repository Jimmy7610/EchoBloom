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
    <div className="flex flex-col min-h-screen bg-surface-950 text-surface-50 selection:bg-brand-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 text-brand-400 font-bold text-2xl tracking-tighter">
              <Sprout className="w-8 h-8" />
              <span>EchoBloom</span>
            </div>
            <div className="hidden md:flex items-center gap-10">
              <a href="#features" className="text-sm font-semibold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">Features</a>
              <a href="#how-it-works" className="text-sm font-semibold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">How it works</a>
              <a href="#pricing" className="text-sm font-semibold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">Pricing</a>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-bold text-surface-300 hover:text-brand-400 transition-all">
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="bg-brand-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/20 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold mb-8 border border-brand-500/20 animate-fade-in shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                AI-POWERED ONBOARDING ANALYTICS
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-surface-50 tracking-tighter mb-8 leading-[0.9] lg:px-12">
                Uncover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Silent Friction</span> in your SaaS.
              </h1>
              <p className="text-xl lg:text-2xl text-surface-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                EchoBloom captures real-time user sentiment and uses AI to turn raw frustration into actionable product growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/signup" 
                  className="w-full sm:w-auto px-10 py-5 bg-brand-600 text-white rounded-2xl font-black text-xl hover:bg-brand-500 transition-all shadow-2xl shadow-brand-500/20 flex items-center justify-center gap-3 group active:scale-95"
                >
                  Start Growing Free
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/login" 
                  className="w-full sm:w-auto px-10 py-5 bg-surface-900 text-surface-50 border border-surface-800 rounded-2xl font-bold text-xl hover:bg-surface-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Live Preview
                </Link>
              </div>
              <div className="mt-20 pt-10 border-t border-surface-800/50 flex flex-wrap items-center justify-center gap-12 text-surface-600">
                <span className="font-black text-2xl tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default">SaaSFLO</span>
                <span className="font-black text-2xl tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default">GROWN</span>
                <span className="font-black text-2xl tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default">BLOOM</span>
                <span className="font-black text-2xl tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default">PULSE</span>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand-600/10 rounded-full blur-[140px]"></div>
            <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px]"></div>
            <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-brand-400/5 rounded-full blur-[100px]"></div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-32 bg-surface-900/50 border-y border-surface-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-surface-50 mb-10 leading-[1.1] tracking-tight">
                  Stop guessing <span className="text-brand-500 italic">why</span> users leave.
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 p-6 bg-surface-900 rounded-3xl border border-surface-800 shadow-xl transition-all hover:border-brand-500/30 group">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20 group-hover:scale-110 transition-transform">
                      <AlertCircle className="w-8 h-8 text-rose-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-surface-50 mb-2">Context Loss</h4>
                      <p className="text-surface-400 leading-relaxed">Traditional surveys reach users days too late. We capture feedback the second frustration happens.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 p-6 bg-surface-900 rounded-3xl border border-surface-800 shadow-xl transition-all hover:border-brand-500/30 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center shrink-0 border border-brand-500/20 group-hover:scale-110 transition-transform">
                      <Zap className="w-8 h-8 text-brand-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-surface-50 mb-2">Analysis Fatigue</h4>
                      <p className="text-surface-400 leading-relaxed">Stop manually tagging comments. Our AI groups pain points into prioritized growth themes automatically.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full group-hover:bg-brand-500/30 transition-all"></div>
                <div className="relative bg-surface-950 p-10 rounded-[2.5rem] shadow-2xl border border-surface-800 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-surface-800"></div>
                       <div className="w-3 h-3 rounded-full bg-surface-800"></div>
                       <div className="w-3 h-3 rounded-full bg-surface-800"></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-4 bg-surface-800 rounded-full w-3/4"></div>
                    <div className="h-48 bg-surface-900 rounded-3xl border border-dashed border-surface-700 flex flex-col items-center justify-center gap-4 group-hover:border-brand-500/50 transition-all">
                      <div className="text-5xl font-black text-rose-500">42%</div>
                      <div className="text-sm font-bold text-surface-500 uppercase tracking-widest">Drop-off at Step 2</div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center text-xl">🌱</div>
                      <div className="flex-1 bg-surface-800/50 rounded-2xl border border-surface-700 p-4 text-sm text-surface-300 font-medium italic">
                        "The setup process feels way too technical for my team."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-5xl font-black text-surface-50 mb-6 tracking-tight">3 minutes to deep insights.</h2>
              <p className="text-xl text-surface-400">EchoBloom fits into your existing stack with zero friction.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-12">
              {[
                { step: '01', title: 'Design', desc: 'Create custom pulses for key friction points.', icon: MessageSquarePlus },
                { step: '02', title: 'Embed', desc: 'Add our <15KB script to your application.', icon: MousePointer2 },
                { step: '03', title: 'Listen', desc: 'Capture in-the-moment user sentiment.', icon: Users },
                { step: '04', title: 'Grow', desc: 'Execute on AI-powered growth themes.', icon: BrainCircuit }
              ].map((item, idx) => (
                <div key={idx} className="relative group text-center">
                  <div className="text-6xl font-black text-surface-900 mb-[-2rem] transition-all group-hover:text-brand-500/10">{item.step}</div>
                  <div className="w-20 h-20 rounded-[2rem] bg-surface-900 border border-surface-800 text-brand-400 flex items-center justify-center mb-8 mx-auto shadow-xl group-hover:scale-110 group-hover:border-brand-500/50 transition-all relative z-10">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-surface-50 mb-4">{item.title}</h3>
                  <p className="text-surface-400 leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features/Benefits */}
        <section id="features" className="py-32 relative overflow-hidden bg-surface-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div className="relative">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <h2 className="text-5xl lg:text-6xl font-black mb-12 leading-[1.05] tracking-tight">Turn noise into <br /><span className="text-brand-500">Intelligence.</span></h2>
                <div className="space-y-12">
                  {[
                    { title: 'AI sentiment scoring', desc: 'Instantly identify negative trends before they lead to mass churn.', icon: BarChart3 },
                    { title: 'Priority growth themes', desc: 'We group recurring complaints so you know exactly what to fix first.', icon: BrainCircuit },
                    { title: 'Zero performance impact', desc: 'Our widget is built for speed. 15KB, async loaded, zero lag.', icon: Zap },
                    { title: 'Full data ownership', desc: 'Export all raw responses to CSV for custom internal reporting.', icon: CheckCircle2 }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="w-16 h-16 rounded-2xl bg-surface-950 flex items-center justify-center shrink-0 border border-surface-800 group-hover:border-brand-500/50 transition-all shadow-xl">
                        <feature.icon className="w-8 h-8 text-brand-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-2xl text-surface-50 mb-2">{feature.title}</h4>
                        <p className="text-surface-400 leading-relaxed text-lg">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="bg-surface-950 p-3 rounded-[3rem] border border-surface-800 shadow-2xl relative z-10">
                  <div className="bg-surface-900 rounded-[2.5rem] p-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-6 flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                    <div className="flex items-center justify-between mb-12">
                      <div className="h-6 w-40 bg-surface-800 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="h-32 bg-surface-950 rounded-3xl p-6 flex flex-col justify-end gap-3 border border-surface-800">
                        <div className="h-2 w-16 bg-surface-800 rounded-full"></div>
                        <div className="h-10 w-12 bg-brand-500/30 rounded-xl border border-brand-500/50"></div>
                      </div>
                      <div className="h-32 bg-surface-950 rounded-3xl p-6 flex flex-col justify-end gap-3 border border-surface-800">
                        <div className="h-2 w-16 bg-surface-800 rounded-full"></div>
                        <div className="h-10 w-12 bg-rose-500/30 rounded-xl border border-rose-500/50"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 bg-surface-800 rounded-full w-full opacity-50"></div>
                      <div className="h-3 bg-surface-800 rounded-full w-5/6 opacity-30"></div>
                      <div className="h-3 bg-surface-800 rounded-full w-4/6 opacity-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-[4rem] p-16 lg:p-28 text-white shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:24px_24px]"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-5xl lg:text-7xl font-black mb-10 tracking-tight leading-[0.95]">Ready to bloom <br />in the dark?</h2>
                <p className="text-xl lg:text-2xl text-brand-100 mb-14 max-w-2xl mx-auto font-medium">
                  Join our public beta today. Start collecting AI-powered insights in under 5 minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link 
                    href="/signup" 
                    className="w-full sm:w-auto px-12 py-6 bg-white text-brand-600 rounded-2xl font-black text-2xl hover:bg-surface-50 transition-all shadow-2xl active:scale-95"
                  >
                    Get EchoBloom Free
                  </Link>
                  <Link 
                    href="/login" 
                    className="w-full sm:w-auto px-12 py-6 bg-brand-500/20 text-white border border-white/20 rounded-2xl font-bold text-2xl hover:bg-brand-500/30 transition-all active:scale-95 backdrop-blur-md"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-surface-800 bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3 text-surface-50 font-black text-2xl tracking-tighter">
              <Sprout className="w-8 h-8 text-brand-500" />
              EchoBloom
            </div>
            <div className="flex flex-wrap items-center justify-center gap-12">
              <Link href="/login" className="text-sm font-bold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">Log In</Link>
              <Link href="/signup" className="text-sm font-bold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">Sign Up</Link>
              <a href="https://github.com/Jimmy7610/EchoBloom" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">GitHub</a>
              <a href="#" className="text-sm font-bold text-surface-400 hover:text-brand-400 transition-all uppercase tracking-widest">Docs</a>
            </div>
            <div className="text-sm font-bold text-surface-600 uppercase tracking-widest">
              © 2026 EchoBloom
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
