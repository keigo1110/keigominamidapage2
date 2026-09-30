import { IndexableSummary } from '@/components/IndexableSummary'
import { ArtworkSection } from '@/components/sections/ArtworkSection'
import { OtherProjectsSection } from '@/components/sections/OtherProjectsSection'
import { ArtworkStructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata = pageMetadata('artwork', 'en')

export default function ArtworkPage() {
  return (
    <>
      <ArtworkStructuredData />
      <IndexableSummary page="artwork" />
      <ArtworkSection />
      <OtherProjectsSection />
    </>
  );
}
