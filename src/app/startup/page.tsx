import { RefinedStartupSection } from '@/components/sections/RefinedStartupSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup | Keigo Minamida',
  description: 'Wakabar - A startup by Keigo Minamida focused on innovative solutions.',
}

export default function StartupPage() {
  return <RefinedStartupSection />;
}
