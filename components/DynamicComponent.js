import Hero from '../components/Hero'
import NavigationCards from '../components/NavigationCards'

const Components = {
  'hero': Hero,
  'navigation_cards': NavigationCards,
}

const Placeholder = ({componentName}) => (
    <div className="py-4 border border-red-200 bg-red-100">
        <p className="text-red-700 italic text-center">The component <strong>{componentName}</strong> has not been created yet.</p>
    </div>
)

const DynamicComponent = ({blok}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return (
      <Component blok={blok}/>
    )
  }
  return <Placeholder componentName={blok.component}/>
}

export default DynamicComponent