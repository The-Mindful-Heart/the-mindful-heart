import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ backTo, backLabel = "Back", items = [], includeHome = true }) {
  const trail = includeHome ? [{ label: "Home", to: "/" }, ...items] : items;

  return (
    <div className="mb-4">
      {backTo ? (
        <Link to={backTo} className="mb-3 inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-sky-800">
          <span aria-hidden>←</span>
          <span>{backLabel}</span>
        </Link>
      ) : null}

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center text-sm">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <Fragment key={`${item.label}-${index}`}>
                {index > 0 ? (
                  <li className="px-2 text-slate-400" aria-hidden>
                    /
                  </li>
                ) : null}
                <li className="inline-flex">
                  {item.to && !isLast ? (
                    <Link to={item.to} className="text-slate-600 transition hover:text-sky-800 hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "font-medium text-slate-900" : "text-slate-600"} aria-current={isLast ? "page" : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}