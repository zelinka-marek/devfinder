import { SearchForm } from "./search-form";

function Logo(props) {
  const { className } = props;

  return (
    <svg
      viewBox="0 0 49 42"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M28.537 1.002V1H1.592v39.908H28.537v-.002c11.01-.17 19.87-9.03 19.87-19.952 0-10.921-8.86-19.782-19.87-19.952Zm-7.156 22.85v3.875c0 3.453-2.822 6.242-6.316 6.242-3.494 0-6.283-2.789-6.283-6.242V14.181c0-3.453 2.789-6.242 6.283-6.242s6.316 2.789 6.316 6.242v9.67Z" />
    </svg>
  );
}

export function StackedLayout(props) {
  const { children } = props;

  return (
    <div className="min-h-full bg-gray-100">
      <nav>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-6 py-5">
            <div className="flex shrink-0 items-center">
              <Logo className="h-8 w-auto text-primary-600" />
            </div>
            <div className="flex flex-1 items-center justify-end">
              <div className="w-full max-w-lg md:max-w-xs">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl space-y-4 px-4 pb-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
