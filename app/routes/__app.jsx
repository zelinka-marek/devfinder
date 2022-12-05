import {
  ArrowPathRoundedSquareIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Form, Outlet, useSearchParams, useTransition } from "@remix-run/react";

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
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
                className="h-8 w-auto"
              />
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
