export interface DatePeriod {
  start: {
    year: number
    month: number
    day?: number
  }
  end: {
    year: number
    month: number
    day?: number
  }
}

export interface Experience {
  id: string
  logo: string
  title: string
  position: string
  period: DatePeriod
  links: ExperienceLink[]
  color: string
  highlight?: string
  status: 'completed' | 'ongoing' | 'planned'
  projectGroup?: string
}

export interface ProcessedExperience extends Experience {
  displayDate: string
  startDate: Date
  endDate: Date
}

export interface ExperienceLink {
  text: string
  url: string
}

export interface TimelineData {
  year: string
  startMonth: number
  endMonth: number
  projectCount: number
}

export interface TimelinePosition {
  startPosition: number
  duration: number
  durationInMonths: number
  isActive?: boolean
  progress?: number
  relativeCurrentPosition?: number
}

export interface ExperienceFilters {
  selectedYear: string | null
}