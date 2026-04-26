export interface NavSection {
  id: string
  label: string
  icon: string
  color: 'prime' | 'second' | 'third' | 'fourth' | 'pop'
}

export const navSections: NavSection[] = [
  { id: 'hi',            label: 'Hello',        icon: 'fa-kit fa-jm-icon-cropped',     color: 'prime'  },
  { id: 'work',          label: 'Case Studies',  icon: 'fa-light fa-briefcase',         color: 'second' },
  { id: 'visual-design', label: 'Visual Design', icon: 'fa-light fa-paintbrush-pencil', color: 'pop'    },
  { id: 'resume',        label: 'Resume',        icon: 'fa-light fa-list-timeline',     color: 'third'  },
  { id: 'education',     label: 'Education',     icon: 'fa-light fa-brain-circuit',     color: 'fourth' },
]
