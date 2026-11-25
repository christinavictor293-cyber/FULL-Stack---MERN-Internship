import { forwardRef } from 'react'

const Button = forwardRef(function Button({ className = '', variant = 'primary', size = 'md', ...props }, ref) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-indigo-100'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
  }
  const sizes = { sm: 'px-3 py-2 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-5 py-3 text-sm' }
  return <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
})
export { Button }
