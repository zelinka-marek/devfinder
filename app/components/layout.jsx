import { Logo } from "./logo";
import { SearchForm } from "./search-form";

export function StackedLayout(props) {
  const { children } = props;

  return (
    <div className="min-h-full bg-gray-100">
      <nav>
        <div className="mx-auto max-w-3xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between py-5 md:gap-6">
            <div className="flex shrink-0 items-center px-2 md:px-0">
              <Logo className="h-8 w-auto text-primary-600" />
            </div>
            <div className="flex flex-1 items-center justify-end px-2">
              <SearchForm />
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
