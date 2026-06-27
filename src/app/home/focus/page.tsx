import FocusSession from "./FocusSession"
import FocusTimeline from "./FocusTimeline"

export default async function FocusPage(){


  return(
    <main className="flex flex-col h-screen p-10">
      <section className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Focus</h1>
          <h2 className="text-muted mt-2">Track deep work and breaks</h2>
        </div>
      </section>

      <section className="mt-2 flex-1 flex gap-4 items-start">
        <FocusSession />
        <FocusTimeline />
      </section>
    </main>
  )
}