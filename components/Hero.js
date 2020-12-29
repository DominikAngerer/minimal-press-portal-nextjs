import StoryblokEditable from '../lib/storyblok-editable'

export default function Hero({ blok }) {
    return (
        <section className="text-center mb-32" ref={elem => StoryblokEditable(blok, elem)}>
            <h2 className="text-4xl font-extrabold text-secondary sm:text-5xl md:text-6xl">
                {blok.headline}
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {blok.text}
            </p>
        </section>
    )
  }
  