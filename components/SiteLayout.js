import Storyblok from '../lib/storyblok'

export default function SiteLayout({ children }) {
  return (
    <>
        <nav className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Logo"/>
                    </div>
                    <div>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="text-secondary px-3 py-2 rounded-sm text-sm font-medium">Press Portal</a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <button className="bg-secondary text-white px-3 py-2 rounded-sm text-sm font-medium">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 ">
            {children}
        </div>
    </>
  )
}
