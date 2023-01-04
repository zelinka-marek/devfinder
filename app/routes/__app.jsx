import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Form, Outlet, useSearchParams, useTransition } from "@remix-run/react";

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

function SearchForm() {
  const [searchParams] = useSearchParams();
  const login = searchParams.get("q");

  const transition = useTransition();
  const isSearching =
    transition.location &&
    new URLSearchParams(transition.location.search).has("q");

  return (
    <Form role="search">
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {isSearching ? (
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5" />
          )}
        </div>
        <input
          type="search"
          name="q"
          required
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder="Search"
          aria-label="search by login"
          defaultValue={login}
        />
      </div>
    </Form>
  );
}

export default function AppRoute() {
  return (
    <div className="min-h-full bg-gray-100">
      <nav>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-6 py-5">
            <div className="flex shrink-0 items-center">
              <Logo className="h-8 w-auto text-primary-500" />
            </div>
            <div className="flex flex-1 items-center justify-end">
              <div className="w-full max-w-lg md:max-w-xs">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
