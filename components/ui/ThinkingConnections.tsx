export default function ThinkingConnections() {
  const lines = [[20,18,37,11],[37,11,59,8],[59,8,78,17],[20,18,12,36],[12,36,20,52],[37,11,31,31],[31,31,38,59],[59,8,68,30],[68,30,62,57],[78,17,85,36],[85,36,79,50],[20,52,38,59],[38,59,62,57],[62,57,79,50]]
  return <svg className="thinking-connections" viewBox="0 0 100 100" preserveAspectRatio="none">{lines.map(([x1,y1,x2,y2], index) => <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />)}</svg>
}
