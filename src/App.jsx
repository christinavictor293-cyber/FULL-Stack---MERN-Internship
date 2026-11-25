import { useState } from 'react'
import {
  Lightbulb, LayoutDashboard, Plus, FolderOpen, FileText, Search, Bell,
  Menu, X, ArrowUpRight, Sparkles, CheckCircle2, Clock3, ScanSearch,
  ChevronRight, Trash2, CircleHelp, LogOut, Layers3, ChartNoAxesColumnIncreasing,
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader } from './components/ui/card'
import { Input, Textarea } from './components/ui/input'

const starterIdeas = [
  { id: 1, title: 'Smart Attendance System', category: 'Education', description: 'A face recognition based attendance system for classrooms.', features: ['Face recognition', 'Attendance tracking', 'Monthly reports'], similarity: 35, matches: ['Attendance tracking'], date: 'Nov 24, 2026' },
  { id: 2, title: 'AI Study Planner', category: 'Education', description: 'A planner that creates study schedules based on student goals.', features: ['Study schedule', 'Progress tracking', 'AI recommendations'], similarity: 78, matches: ['Progress tracking', 'AI recommendations'], date: 'Nov 23, 2026' },
  { id: 3, title: 'Smart Parking Finder', category: 'Technology', description: 'Helps drivers find available parking spaces nearby.', features: ['Live availability', 'Location tracking', 'Slot booking'], similarity: 12, matches: ['Location tracking'], date: 'Nov 21, 2026' },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Submit Idea', icon: Plus },
  { label: 'My Ideas', icon: FolderOpen },
  { label: 'Reports', icon: FileText },
]

function getSimilarity(features, ideas) {
  const input = features.map((item) => item.trim().toLowerCase()).filter(Boolean)
  let best = { similarity: 0, matches: [], title: '' }
  ideas.forEach((idea) => {
    const matches = input.filter((feature) => idea.features.some((oldFeature) => oldFeature.toLowerCase() === feature))
    const similarity = input.length ? Math.round((matches.length / input.length) * 100) : 0
    if (similarity > best.similarity) best = { similarity, matches, title: idea.title }
  })
  return best
}

function Sidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:static lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white"><Lightbulb size={22} /></div>
          <div><p className="text-lg font-bold tracking-tight text-slate-900">InnovateCheck</p><p className="text-xs text-slate-400">Idea assessment</p></div>
        </div>
        <button className="text-slate-400 lg:hidden" onClick={() => setMobileOpen(false)}><X size={20} /></button>
      </div>
      <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[.15em] text-slate-400">Workspace</p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = activePage === item.label
          return <button key={item.label} onClick={() => { setActivePage(item.label); setMobileOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <Icon size={18} />{item.label}{active && <ChevronRight size={15} className="ml-auto" />}
          </button>
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-indigo-50 p-4">
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600"><Sparkles size={18} /></div>
        <p className="text-sm font-bold text-slate-800">Have a new idea?</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Check how your features compare with existing ideas.</p>
        <button onClick={() => { setActivePage('Submit Idea'); setMobileOpen(false) }} className="mt-3 text-xs font-bold text-indigo-700">Submit an idea <span aria-hidden="true">→</span></button>
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 px-2 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">CV</div>
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">Student Account</p><p className="text-xs text-slate-400">Free workspace</p></div>
        <LogOut size={16} className="text-slate-400" />
      </div>
    </aside>
  </>
}

function Navbar({ setMobileOpen, activePage }) {
  return <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8">
    <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={20} /></button><div><p className="text-xs text-slate-400">Workspace / {activePage}</p><h1 className="text-lg font-bold text-slate-900">{activePage}</h1></div></div>
    <div className="flex items-center gap-2"><button aria-label="Notifications" className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"><Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" /></button><div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">CV</div></div>
  </header>
}

function StatCard({ title, value, note, icon: Icon, tone }) {
  return <Card><CardContent className="flex items-start justify-between gap-3 pt-5"><div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-400">{note}</p></div><div className={`rounded-xl p-3 ${tone}`}><Icon size={20} /></div></CardContent></Card>
}

function StatusBadge({ similarity }) {
  const label = similarity >= 60 ? 'High similarity' : similarity >= 30 ? 'Moderate' : 'Low similarity'
  const color = similarity >= 60 ? 'bg-rose-50 text-rose-700' : similarity >= 30 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{label}</span>
}

function Dashboard({ ideas, setActivePage, setSelectedIdea }) {
  const assessed = ideas.length
  const unique = ideas.filter((idea) => idea.similarity < 30).length
  const similar = ideas.filter((idea) => idea.similarity >= 60).length
  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Welcome back! Here's what's happening with your ideas.</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Your idea workspace</h2></div><Button onClick={() => setActivePage('Submit Idea')}><Plus size={17} /> Submit new idea</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Ideas submitted" value={assessed + 21} note="Across your workspace" icon={Lightbulb} tone="bg-indigo-50 text-indigo-600" />
      <StatCard title="Ideas assessed" value={assessed} note="Demo assessment records" icon={ScanSearch} tone="bg-sky-50 text-sky-600" />
      <StatCard title="Low similarity" value={unique} note="Potentially distinct ideas" icon={CheckCircle2} tone="bg-emerald-50 text-emerald-600" />
      <StatCard title="High similarity" value={similar} note="Worth reviewing further" icon={ChartNoAxesColumnIncreasing} tone="bg-rose-50 text-rose-600" />
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Card><CardHeader><div className="flex items-center justify-between"><div><h3 className="font-bold text-slate-900">Recent assessments</h3><p className="mt-1 text-xs text-slate-400">Your latest submitted project ideas</p></div><button onClick={() => setActivePage('My Ideas')} className="text-xs font-bold text-indigo-600">View all</button></div></CardHeader><CardContent className="pt-4"><div className="space-y-1">{ideas.slice(0, 4).map((idea) => <button key={idea.id} onClick={() => { setSelectedIdea(idea); setActivePage('Reports') }} className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left hover:bg-slate-50"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Layers3 size={18} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{idea.title}</p><p className="mt-1 text-xs text-slate-400">{idea.category} · {idea.date}</p></div><div className="text-right"><p className="text-sm font-bold text-slate-800">{idea.similarity}%</p><StatusBadge similarity={idea.similarity} /></div></button>)}</div></CardContent></Card>
      <Card><CardHeader><h3 className="font-bold text-slate-900">How it works</h3><p className="mt-1 text-xs text-slate-400">Three simple steps to review an idea</p></CardHeader><CardContent className="space-y-4 pt-4">{[{ n:'01', title:'Submit your idea', text:'Enter a project title and its main features.', icon:Plus },{ n:'02', title:'Compare features', text:'The demo checks features against sample ideas.', icon:ScanSearch },{ n:'03', title:'Review the report', text:'See matching features and a similarity score.', icon:FileText }].map((step) => { const Icon = step.icon; return <div key={step.n} className="flex gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={18} /></div><div><p className="text-sm font-semibold text-slate-800">{step.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{step.text}</p></div></div> })}</CardContent></Card>
    </div>
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><CircleHelp size={18} className="mt-0.5 shrink-0" /><p className="text-xs leading-5"><strong>Demo note:</strong> This frontend uses sample ideas and a simple feature-matching calculation. It does not yet connect to MongoDB or use an AI similarity model.</p></div>
  </div>
}

function SubmitIdea({ ideas, setIdeas, setSelectedIdea, setActivePage }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Education')
  const [description, setDescription] = useState('')
  const [features, setFeatures] = useState('')
  const [error, setError] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    const featureList = features.split(',').map((item) => item.trim()).filter(Boolean)
    if (!title.trim() || !description.trim() || featureList.length === 0) { setError('Please enter the title, description and at least one feature.'); return }
    const result = getSimilarity(featureList, ideas)
    const newIdea = { id: Date.now(), title: title.trim(), category, description: description.trim(), features: featureList, similarity: result.similarity, matches: result.matches, matchedIdea: result.title, date: 'Just now' }
    setIdeas([newIdea, ...ideas])
    setSelectedIdea(newIdea)
    setActivePage('Reports')
  }
  return <div className="mx-auto max-w-3xl space-y-5"><div><p className="text-sm text-slate-500">Tell us what you are planning to build.</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Submit a project idea</h2></div><Card><CardHeader><h3 className="font-bold text-slate-900">Idea details</h3><p className="mt-1 text-xs text-slate-400">Add a few details so the platform can compare your idea.</p></CardHeader><CardContent><form onSubmit={handleSubmit} className="mt-5 space-y-5"><div><label className="mb-2 block text-sm font-semibold text-slate-700">Project title</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Smart Campus Navigation" /></div><div><label className="mb-2 block text-sm font-semibold text-slate-700">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"><option>Education</option><option>Technology</option><option>Healthcare</option><option>Environment</option><option>Other</option></select></div><div><label className="mb-2 block text-sm font-semibold text-slate-700">Project description</label><Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly explain the problem your project solves..." /></div><div><label className="mb-2 block text-sm font-semibold text-slate-700">Main features</label><Textarea rows={3} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Enter features separated by commas. Example: Login, Location tracking, Notifications" /><p className="mt-2 text-xs text-slate-400">Separate each feature with a comma.</p></div>{error && <p className="text-sm font-medium text-rose-600">{error}</p>}<div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={() => { setTitle(''); setDescription(''); setFeatures(''); setError('') }}>Clear form</Button><Button type="submit"><ScanSearch size={17} /> Assess my idea</Button></div></form></CardContent></Card></div>
}

function MyIdeas({ ideas, setSelectedIdea, setActivePage, setIdeas }) {
  const [search, setSearch] = useState('')
  const filtered = ideas.filter((idea) => idea.title.toLowerCase().includes(search.toLowerCase()))
  return <div className="space-y-5"><div><p className="text-sm text-slate-500">Browse the ideas submitted in this session.</p><h2 className="mt-1 text-2xl font-bold text-slate-900">My ideas</h2></div><Card><CardContent className="pt-5"><div className="relative mb-4"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><Input className="pl-10" placeholder="Search project ideas..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>{filtered.length === 0 ? <p className="py-10 text-center text-sm text-slate-400">No ideas found.</p> : <div className="divide-y divide-slate-100">{filtered.map((idea) => <div key={idea.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Lightbulb size={18} /></div><div className="min-w-0 flex-1"><p className="font-semibold text-slate-800">{idea.title}</p><p className="mt-1 text-xs text-slate-400">{idea.category} · {idea.date}</p></div><div className="flex items-center gap-3"><div className="text-right"><p className="text-sm font-bold text-slate-800">{idea.similarity}%</p><StatusBadge similarity={idea.similarity} /></div><Button size="sm" variant="secondary" onClick={() => { setSelectedIdea(idea); setActivePage('Reports') }}>View report</Button>{idea.date === 'Just now' && <button title="Delete idea" onClick={() => setIdeas(ideas.filter((item) => item.id !== idea.id))} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>}</div></div>)}</div>}</CardContent></Card></div>
}

function Reports({ selectedIdea, ideas, setSelectedIdea }) {
  const idea = selectedIdea || ideas[0]
  if (!idea) return <Card><CardContent className="py-12 text-center"><FileText className="mx-auto mb-3 text-slate-300" size={32} /><p className="font-semibold text-slate-700">No assessment report yet</p><p className="mt-1 text-sm text-slate-400">Submit an idea to generate a report.</p></CardContent></Card>
  return <div className="space-y-5"><div><p className="text-sm text-slate-500">Review the feature comparison for your project.</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Assessment report</h2></div><Card><CardContent className="pt-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Project assessed</p><h3 className="mt-2 text-xl font-bold text-slate-900">{idea.title}</h3><p className="mt-1 text-sm text-slate-500">{idea.category} · {idea.date}</p></div><StatusBadge similarity={idea.similarity} /></div><div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-[auto_1fr] sm:items-center"><div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-[9px] border-indigo-100 bg-white"><span className="text-3xl font-bold text-indigo-700">{idea.similarity}%</span><span className="text-[10px] font-semibold uppercase text-slate-400">Similarity</span></div><div><p className="font-bold text-slate-900">{idea.similarity >= 60 ? 'High feature overlap' : idea.similarity >= 30 ? 'Some feature overlap' : 'Low feature overlap'}</p><p className="mt-2 text-sm leading-6 text-slate-500">{idea.similarity === 0 ? 'No exact feature matches were found in the current sample list.' : `${idea.matches.length} of your ${idea.features.length} features matched an existing sample idea.`} This score is based on exact feature-name matching in this demo.</p></div></div><div className="mt-6 grid gap-5 md:grid-cols-2"><div><h4 className="mb-3 text-sm font-bold text-slate-800">Your submitted features</h4><div className="space-y-2">{idea.features.map((feature) => <div key={feature} className="flex items-center gap-2 rounded-xl border border-slate-100 px-3 py-2.5 text-sm"><CheckCircle2 size={16} className={idea.matches.includes(feature) ? 'text-amber-500' : 'text-emerald-500'} />{feature}<span className="ml-auto text-xs text-slate-400">{idea.matches.includes(feature) ? 'Matched' : 'No match'}</span></div>)}</div></div><div><h4 className="mb-3 text-sm font-bold text-slate-800">Matching features</h4>{idea.matches.length ? <div className="space-y-2">{idea.matches.map((feature) => <div key={feature} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">{feature}</div>)}</div> : <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-400">No matching features found.</div>}<p className="mt-4 text-xs leading-5 text-slate-400">{idea.matchedIdea ? `Closest sample idea: ${idea.matchedIdea}` : 'Compared with the available sample ideas.'}</p></div></div><div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4"><p className="text-sm font-bold text-indigo-900">Assessment suggestion</p><p className="mt-1 text-sm leading-6 text-indigo-800">{idea.similarity >= 60 ? 'Review the matching features and consider how your project can provide a different approach or additional value.' : 'Your submitted features show limited overlap with the sample ideas. Continue refining your project and document what makes it different.'}</p></div></CardContent></Card><div><h3 className="mb-3 text-sm font-bold text-slate-800">Choose another report</h3><div className="flex flex-wrap gap-2">{ideas.map((item) => <button key={item.id} onClick={() => setSelectedIdea(item)} className={`rounded-xl border px-3 py-2 text-xs font-semibold ${idea.id === item.id ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}>{item.title}</button>)}</div></div></div>
}

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [ideas, setIdeas] = useState(starterIdeas)
  const [selectedIdea, setSelectedIdea] = useState(starterIdeas[0])
  const [mobileOpen, setMobileOpen] = useState(false)
  function renderPage() {
    if (activePage === 'Submit Idea') return <SubmitIdea ideas={ideas} setIdeas={setIdeas} setSelectedIdea={setSelectedIdea} setActivePage={setActivePage} />
    if (activePage === 'My Ideas') return <MyIdeas ideas={ideas} setSelectedIdea={setSelectedIdea} setActivePage={setActivePage} setIdeas={setIdeas} />
    if (activePage === 'Reports') return <Reports selectedIdea={selectedIdea} ideas={ideas} setSelectedIdea={setSelectedIdea} />
    return <Dashboard ideas={ideas} setActivePage={setActivePage} setSelectedIdea={setSelectedIdea} />
  }
  return <div className="min-h-screen bg-[#f7f8fc] text-slate-800"><div className="flex min-h-screen"><Sidebar activePage={activePage} setActivePage={setActivePage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className="min-w-0 flex-1"><Navbar setMobileOpen={setMobileOpen} activePage={activePage} /><main className="mx-auto max-w-[1500px] p-4 md:p-8"><div className="mb-6 flex items-center gap-2 text-xs text-slate-400"><span>InnovateCheck</span><ChevronRight size={13} /><span className="font-semibold text-slate-600">{activePage}</span></div>{renderPage()}<footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400">© 2026 InnovateCheck · Idea Similarity Assessment Platform</footer></main></div></div></div>
}
