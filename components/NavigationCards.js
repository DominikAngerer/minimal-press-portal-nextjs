import Link from 'next/link'

const NavigationCard = ({blok}) => (
    <Link href={`${blok.link.linktype !== 'url'? '/' : ''}${blok.link.cached_url}`}>
        <a target={`${blok.link.linktype !== 'url'? '_self' : '_blank'}`} className="border border-gray-300 rounded-md divide-y divide-gray-200 shadow-none transition-shadow hover:shadow-lg">
            <div className="text-xl font-semibold text-secondary px-4 py-5 sm:px-6">
                {blok.headline}
            </div>
            <div className="px-4 py-5 sm:px-6">
                {blok.text}
            </div>
            <div className="px-4 py-4 sm:px-6 text-right text-secondary">
                Access {blok.headline}
                <svg className="ml-2 inline-block w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </a>
    </Link>
)

export default function NavigationCards({ blok }) {
    return (
      <section className="my-24">
            <div className="grid grid-cols-2 gap-12">
                {blok.cards.map((blok) => (
                    <NavigationCard blok={blok} key={blok._uid} />
                ))}
            </div>
      </section>
    )
  }
  