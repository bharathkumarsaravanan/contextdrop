import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
    return(
        <footer className="border-t">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />

                <span className="font-semibold">ContextDrop</span>
              </div>

              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Save project knowledge once. Generate AI-ready context
                instantly.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                How It Works
              </a>

              <Link 
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
              </Link>

              <Link 
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
              </Link>

              <Link 
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                  Contact
              </Link>
            </div>
          </div>
        </div>
        <div className=" bg-border" />
        <div className="flex mx-auto max-w-6xl px-6 py-4 flex-col gap-2 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>© 2026 ContextDrop</p>

          <p>Built for ChatGPT, Claude, Gemini & Cursor</p>
        </div>
      </footer>
    )
}