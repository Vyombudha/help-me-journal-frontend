import { SignInButton } from "@clerk/react"
import { IconBook2, IconFolder, IconMoodSmile } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

const FEATURES = [
  {
    icon: IconFolder,
    title: "Projects",
    body: "Group your work the way it actually happens — one project per goal, one place to see everything inside it.",
  },
  {
    icon: IconBook2,
    title: "Containers",
    body: "Split a project into journal entries or technical notes, whichever the moment calls for.",
  },
  {
    icon: IconMoodSmile,
    title: "Moods",
    body: "Tag a container with how it felt to work on. Patterns show up later that you'd never have written down on purpose.",
  },
]

const STEPS = [
  {
    number: "1",
    title: "Sign in",
    body: "One click, no new password to remember.",
  },
  {
    number: "2",
    title: "Start a project",
    body: "Name the thing you're working on or thinking through.",
  },
  {
    number: "3",
    title: "Journal inside it",
    body: "Add containers as you go — a note here, a reflection there.",
  },
]

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-heading text-lg font-medium">
          Help Me Journal
        </span>
        <SignInButton>
          <Button variant="outline">Sign in</Button>
        </SignInButton>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-heading text-4xl leading-tight font-medium text-balance md:text-5xl">
            Plan the work. Journal the thinking behind it.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Most planning tools throw away the messy part, why you made a call?
            how it felt? what almost went differently? Help Me Journal keeps
            that next to the project it belongs to.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <SignInButton>
              <Button size="lg">Get started</Button>
            </SignInButton>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See how it works
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-secondary/40 p-8">
          <img
            src="/journal_illustration.svg"
            alt=""
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="font-heading text-2xl font-medium md:text-3xl">
          Three pieces, one place
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-card p-6 ring-1 ring-foreground/10"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-medium">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20"
      >
        <h2 className="font-heading text-2xl font-medium md:text-3xl">
          How it works
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ number, title, body }) => (
            <div key={number}>
              <span className="font-heading text-3xl font-medium text-primary">
                {number}
              </span>
              <h3 className="mt-3 font-heading text-base font-medium">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
          <h2 className="font-heading text-2xl font-medium md:text-3xl">
            Your next project is one entry away from being understood.
          </h2>
          <SignInButton>
            <Button size="lg" variant="secondary" className="mt-8">
              Get started
            </Button>
          </SignInButton>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
        Help Me Journal
      </footer>
    </div>
  )
}
