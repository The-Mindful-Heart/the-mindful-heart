import { useState } from "react";
import { Link } from "react-router-dom";

function FaqAnswer({ item }) {
  if (item.answer) {
    return <p className="text-sm leading-7 text-slate-700">{item.answer}</p>;
  }

  const link = item.link;
  const isExternal = link?.external || (link?.href?.startsWith("http") ?? false);

  return (
    <p className="text-sm leading-7 text-slate-700">
      {item.answerPrefix ?? ""}
      {link ? (
        isExternal ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sky-800 underline-offset-2 hover:text-sky-950 hover:underline"
          >
            {link.label}
          </a>
        ) : (
          <Link to={link.href} className="font-medium text-sky-800 underline-offset-2 hover:text-sky-950 hover:underline">
            {link.label}
          </Link>
        )
      ) : null}
      {item.answerSuffix ?? ""}
    </p>
  );
}

function normalizeFaq(data) {
  if (!data) return { title: "FAQ", categories: [] };
  if (Array.isArray(data)) {
    return { title: "FAQ", categories: [{ title: "FAQ", items: data }] };
  }
  return {
    title: data.title ?? "FAQ",
    categories: data.categories ?? [],
  };
}

export default function FaqSection({ data }) {
  const [openCategories, setOpenCategories] = useState(() => new Set());
  const [openQuestionKey, setOpenQuestionKey] = useState(null);
  const { title, categories } = normalizeFaq(data);

  if (!categories.length) return null;

  const toggleCategory = (catIndex) => {
    const wasOpen = openCategories.has(catIndex);
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (wasOpen) next.delete(catIndex);
      else next.add(catIndex);
      return next;
    });
    if (wasOpen) {
      setOpenQuestionKey((current) => (current?.startsWith(`${catIndex}-`) ? null : current));
    }
  };

  return (
    <div className="section-shell mt-10 pb-4">
      <h2 className="font-heading text-2xl text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-8 space-y-4">
        {categories.map((category, catIndex) => {
          const isCategoryOpen = openCategories.has(catIndex);
          const count = category.items?.length ?? 0;

          return (
            <article key={category.title ?? catIndex} className="soft-panel overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => toggleCategory(catIndex)}
                aria-expanded={isCategoryOpen}
              >
                <span className="flex flex-wrap items-baseline gap-2">
                  <span className="font-heading text-lg text-slate-900 sm:text-xl">{category.title}</span>
                  <span className="text-xs font-medium text-slate-500">
                    {count} {count === 1 ? "question" : "questions"}
                  </span>
                </span>
                <span className="shrink-0 text-lg text-sky-700">{isCategoryOpen ? "−" : "+"}</span>
              </button>

              {isCategoryOpen ? (
                <div className="space-y-2 border-t border-slate-200/60 px-3 pb-4 pt-3 sm:px-4">
                  {category.items?.map((item, itemIndex) => {
                    const key = `${catIndex}-${itemIndex}`;
                    const isOpen = openQuestionKey === key;
                    return (
                      <article key={item.question} className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                          onClick={() => setOpenQuestionKey(isOpen ? null : key)}
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm font-medium text-slate-900">{item.question}</span>
                          <span className="shrink-0 text-sky-700">{isOpen ? "−" : "+"}</span>
                        </button>
                        {isOpen ? (
                          <div className="border-t border-slate-200/60 px-4 pb-4 pt-3">
                            <FaqAnswer item={item} />
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}