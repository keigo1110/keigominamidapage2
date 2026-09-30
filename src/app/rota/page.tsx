import { IndexableSummary } from '@/components/IndexableSummary'
import { RotaSection } from '@/components/sections/RotaSection'
import { RotaStructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata = pageMetadata('rota', 'en')

export default function RotaPage() {
  return (
    <>
      <RotaStructuredData />
      <IndexableSummary page="rota" />
      <RotaSection />
    </>
  )
}
