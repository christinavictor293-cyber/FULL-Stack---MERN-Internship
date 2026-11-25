export function Input({ className = '', ...props }) {
  return <input className={`w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 ${className}`} {...props} />
}
export function Textarea({ className = '', ...props }) {
  return <textarea className={`w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 ${className}`} {...props} />
}
