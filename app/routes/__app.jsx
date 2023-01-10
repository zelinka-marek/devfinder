import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Form, Outlet, useNavigation, useSearchParams } from "@remix-run/react";
import { Logo } from "~/components/logo";

function SearchForm() {
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
          className="block w-full rounded-md border-gray-300 pl-10 text-sm focus:border-primary-500 focus:ring-primary-500"
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
      <header className="bg-white shadow">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo className="block h-8 w-auto shrink-0 text-primary-600" />
            </div>
            <nav className="ml-6 flex flex-1 items-center justify-end">
              <div className="w-full md:max-w-xs">
                <SearchForm />
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
