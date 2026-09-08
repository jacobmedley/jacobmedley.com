export default function Arrow({ external = false }: { external?: boolean }) {
  return <i className={`cs-arrow fa-thin ${external ? 'fa-arrow-up-right-from-square' : 'fa-arrow-right'}`} aria-hidden="true" />
}
