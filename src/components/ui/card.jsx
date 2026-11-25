export function Card({ className = '', children }) {
  return <section className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm ${className}`}>{children}</section>
}
export function CardHeader({ className = '', children }) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>
}
export function CardContent({ className = '', children }) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>
}
