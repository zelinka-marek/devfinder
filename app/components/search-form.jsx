import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Form, useSearchParams, useTransition } from "@remix-run/react";

export function SearchForm() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("q");

  const transition = useTransition();
  const searching =
    transition.location &&
    new URLSearchParams(transition.location.search).has("q");

  return (
    <Form role="search" className="w-full max-w-lg md:max-w-xs">
      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {searching ? (
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5" />
          )}
        </div>
        <input
          type="search"
          name="q"
          required
          className="block w-full rounded-lg border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder="Search"
          aria-label="search by username"
          defaultValue={username}
        />
      </div>
    </Form>
  );
}
