const results = [
  { stat: '47%', label: 'New Sales',         icon: 'fa-light fa-arrow-trend-up'   },
  { stat: '20%', label: 'Revenue',            icon: 'fa-light fa-chart-line-up'    },
  { stat: '27%', label: 'Lead Generation',   icon: 'fa-light fa-arrow-trend-up'   },
  { stat: '66%', label: 'Timeline Reduction', icon: 'fa-light fa-arrow-trend-down' },
]

export default function ResultsBanner() {
  return (
    <div className="bg-prime text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {results.map(({ stat, label, icon }) => (
            <div key={label}>
              <i className={`${icon} text-4xl mb-3 text-prime-light block`} aria-hidden="true" />
              <p className="text-5xl font-bold leading-none">{stat}</p>
              <p className="text-xs uppercase tracking-widest mt-2 text-prime-light">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
