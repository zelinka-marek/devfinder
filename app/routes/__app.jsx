import {
  ArrowPathRoundedSquareIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
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
  const username = searchParams.get("q");

  const transition = useTransition();
  const searching =
    transition.location &&
    new URLSearchParams(transition.location.search).has("q");

  return (
    <Form role="search" className="w-full max-w-lg md:max-w-xs">
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {searching ? (
              <ArrowPathRoundedSquareIcon className="h-5 w-5 animate-spin text-gray-400" />
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <input
            type="search"
            name="q"
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
            aria-label="Search by username"
            defaultValue={username}
          />
        </div>
        <button
          type="submit"
          aria-label="Search"
          disabled={searching}
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-3.5 py-2 text-gray-400 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FunnelIcon className="h-5 w-5" />
        </button>
      </div>
    </Form>
  );
}

export default function AppRoute() {
  return (
    <>
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-2 sm:px-4 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex shrink-0 items-center px-2 md:px-0">
              <Logo className="h-8 w-auto text-indigo-600" />
            </div>
            <div className="flex flex-1 items-center justify-end px-2 md:ml-6">
              <SearchForm />
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
