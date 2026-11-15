import { BookHeart, CalendarClock, Compass, HandHeart, LibraryBig, UsersRound } from "lucide-react";

const steps = [
  { icon: <Compass size={22} />, title: "Find a story", text: "Browse the shelves and open a book that catches your eye." },
  { icon: <CalendarClock size={22} />, title: "Choose your dates", text: "Borrow an available copy and pick a return date that works." },
  { icon: <HandHeart size={22} />, title: "Pass it along", text: "Return your book so another reader can enjoy it next." },
];
const categories = [
  { icon: <BookHeart size={21} />, title: "Fiction", note: "Worlds to get lost in", color: "bg-[#f7e8d5] text-[#875b2c]" },
  { icon: <LibraryBig size={21} />, title: "Science", note: "Questions & discoveries", color: "bg-[#dfece4] text-[#275b49]" },
  { icon: <UsersRound size={21} />, title: "Kids", note: "Big adventures for little minds", color: "bg-[#e8e2f3] text-[#644d84]" },
];

export function HowItWorks() {
  return <section className="section-space bg-base-200/60"><div className="page-shell"><div className="mx-auto mb-10 max-w-xl text-center"><p className="eyebrow">Simple by design</p><h2 className="section-title">A good read is three steps away.</h2><p className="mt-3 text-sm leading-7 text-base-content/60">BookNook keeps borrowing easy, so you can spend more time reading and less time figuring things out.</p></div><div className="grid gap-5 md:grid-cols-3">{steps.map((step, index) => <div key={step.title} className="step-card"><span className="step-number">0{index + 1}</span><span className="mb-5 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">{step.icon}</span><h3 className="font-display text-xl font-bold">{step.title}</h3><p className="mt-2 text-sm leading-7 text-base-content/60">{step.text}</p></div>)}</div></div></section>;
}

export function CategorySpotlight() {
  return <section className="page-shell section-space"><div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow">A shelf for every mood</p><h2 className="section-title">Follow your curiosity.</h2><p className="mt-4 max-w-md leading-7 text-base-content/60">From faraway worlds to real-world discoveries, find something that fits the moment you are in.</p></div><div className="grid gap-3 sm:grid-cols-3">{categories.map((category) => <div key={category.title} className="category-tile"><span className={`mb-8 grid size-11 place-items-center rounded-xl ${category.color}`}>{category.icon}</span><h3 className="font-display text-xl font-bold">{category.title}</h3><p className="mt-1 text-xs text-base-content/55">{category.note}</p></div>)}</div></div></section>;
}
