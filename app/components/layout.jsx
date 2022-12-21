import { Logo } from "./logo";
import { SearchForm } from "./search-form";

export function StackedLayout(props) {
  const { children } = props;

  return (
    <div>
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-2 sm:px-4 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex shrink-0 items-center px-2 md:px-0">
              <Logo className="h-8 w-auto text-primary-600" />
            </div>
            <div className="flex flex-1 items-center justify-end px-2 md:ml-6">
              <SearchForm />
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-4 lg:px-8">
        {children}
      </main>
    </div>
  );
}
