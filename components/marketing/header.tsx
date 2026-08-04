import { LoginBtn } from "../auth/login-btn";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">ContextDrop</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>
            </div>

            <LoginBtn>
              <Button size="sm">Get Started</Button>
            </LoginBtn>
          </div>
        </div>
      </header>
    )
}