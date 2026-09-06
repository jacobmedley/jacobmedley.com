export default function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <i className={`cs-arrow fa-regular ${diagonal ? 'fa-arrow-up-right' : 'fa-arrow-right'}`} aria-hidden="true" />
}
