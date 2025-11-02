import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="relative bg-white shadow-sm lg:hidden">
      <div className="mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="-ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-shrink-0">
             <h1 className="text-xl font-bold text-primary">LeadGen AI</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;