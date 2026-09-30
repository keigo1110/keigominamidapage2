import { IndexableSummary } from '@/components/IndexableSummary'
import { RefinedStartupSection } from '@/components/sections/RefinedStartupSection'
import { StartupStructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata = pageMetadata('startup', 'en')

export default function StartupPage() {
  return (
    <>
      <StartupStructuredData />
      <IndexableSummary page="startup" />
      <RefinedStartupSection />
    </>
  );
}
