const corridors = [
  'M4 8H36V20H22V32H8V44H20', 'M42 8H64V18H52V30H40',
  'M72 8H94V30H80V20', 'M4 20H14', 'M30 8V4',
  'M28 38V26H34', 'M62 26H72V40H92V50H82',
  'M4 54H14V66H28V80H16V92H4', 'M8 76H18',
  'M36 70V90H48V78H60V94H76', 'M34 96H26',
  'M70 62H84V72H96V92H86V82H74V72H62',
  'M46 62V68H56', 'M94 38V42', 'M4 34V38',
  'M38 20V36', 'M80 54V60H94', 'M50 4V10',
]

export default function RoadmapMaze() {
  return <svg className="roadmap-maze" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    {corridors.map(d => <path key={d} d={d} />)}
  </svg>
}
