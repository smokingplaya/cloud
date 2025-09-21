import { getPhrase } from "@/features/language";
import type { LucideIcon } from "lucide-solid";
import { createResource, Show, type JSX } from "solid-js"

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary",

  href?: string,
  target?: string;
}

export function Button({ href, target, variant = "primary", class: className, ...props }: ButtonProps) {
  const base = "transition rounded-lg p-3 text-xl cursor-pointer flex justify-center items-center";
  const styles = {
    primary: "bg-[#5F5847BF] hover:bg-[#5F5847AD] text-[#E1CB95]",
    secondary: "bg-[#757B62BF] hover:bg-[#757B62AD] text-[#CCD5AE]",
  }

  const classes = `${base} ${styles[variant]} ${className || ""}`;

  if (href)
    return <a href={href} target={target} class={classes} {...props}/>;

  return <button {...props} class={classes}/>;
}

interface LanguageButtonProps extends ButtonProps {
  children: string,
  placeholder: string;
}

export function LanguageButton({ children, placeholder, ...props }: LanguageButtonProps) {
  const [phrase] = createResource(() => getPhrase(children))

  return (
    <Show when={phrase()} fallback={<Button>{placeholder}</Button>}>
      <Button {...props}>{phrase()}</Button>
    </Show>
  )
}

//@ts-ignore sosi hui))
interface ImageButtonProps extends ButtonProps {
  children?: LucideIcon,
}

export function ImageButton({ children: Icon, ...props }: ImageButtonProps) {
  return (
    <Button {...props}>
      {Icon && <Icon />}
    </Button>
  )
}