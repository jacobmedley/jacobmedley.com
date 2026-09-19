export interface NavSection {
  id: string
  label: string
  icon: string
  color: 'prime' | 'second' | 'third' | 'fourth' | 'pop'
}

// Icons match legacy index.html #the-menu exactly (fa-thin weights).
export const navSections: NavSection[] = [
  { id: 'hi',            label: 'Hello',         icon: 'fa-kit fa-jm-icon-cropped',           color: 'prime'  },
  { id: 'work',          label: 'Case studies',  icon: 'fa-thin fa-briefcase',                color: 'second' },
  { id: 'full-stack',    label: 'How I work', icon: 'fa-thin fa-fw fa-toolbox',            color: 'pop'    },
  { id: 'resume',        label: 'Experience',        icon: 'fa-thin fa-fw fa-list-timeline',      color: 'third'  },
  { id: 'education',     label: 'Education',     icon: 'fa-thin fa-fw fa-brain-circuit',      color: 'fourth' },
]
