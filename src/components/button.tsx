import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./trips/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.03] active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-400/30",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/20 hover:from-red-400 hover:to-pink-500 hover:shadow-red-400/30",
        outline:
          "border border-cyan-400/40 bg-white/5 text-cyan-200 hover:bg-cyan-500/10 hover:text-white backdrop-blur-sm",
        secondary:
          "bg-white/10 text-cyan-100 hover:bg-white/20 border border-white/10 backdrop-blur-md",
        ghost:
          "text-cyan-300 hover:bg-cyan-500/10 hover:text-white transition-colors",
        link:
          "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300",
        hero:
          "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-105",
        sunset:
          "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-400/40 transition-all duration-300 hover:scale-105",
        travel:
          "bg-gradient-to-r from-cyan-400 to-sky-500 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-sky-400 hover:shadow-cyan-400/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
