import FocusSession from "./FocusSession"
import FocusTimeline from "./FocusTimeline"

import { getFocusCategory } from "../../actions/focus"

import { getFocusSessionByDate } from "../../actions/focusSession";

export default async function FocusPage(){

  const categories = await getFocusCategory();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySessions = await getFocusSessionByDate(today);

  return(
    <main className="flex flex-col max-h-screen p-10">
      <section className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Focus</h1>
          <h2 className="text-muted mt-2">Track deep work and breaks</h2>
        </div>
      </section>

      <section className="mt-2 flex-1 flex gap-4 min-h-0 max-h-11/12"> {/* temporary solution, to make both same height */}
        <FocusSession categories={categories} todaySessions={todaySessions}/>
        <FocusTimeline todaySessions={todaySessions} />
      </section>
    </main>
  )
}