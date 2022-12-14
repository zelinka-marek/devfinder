import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Form, useSearchParams, useNavigation } from "@remix-run/react";

export function SearchForm() {
  const [searchParams] = useSearchParams();
  const login = searchParams.get("q");

  const navigation = useNavigation();
  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

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
