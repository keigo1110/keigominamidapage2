import { en } from '@/translations/en';
import {
  isComingSoonLink,
  publications,
  researchLinkLabel,
  researchProjects,
  resolveLocalized,
} from '@/data/research';
import {
  WAKABAR_APP_STORE_URL,
  WAKABAR_APP_URL,
  WAKABAR_CORPORATE_URL,
  WAKABAR_TOUR_URL,
} from '@/data/wakabar';

export function SSRContent() {
  return (
    <div aria-hidden="true" className="sr-only">
      <header>
        <h1>{en.name}</h1>
        <p>{en.roll}</p>
        <p>{en.school}</p>
        <p>{en.Lab}</p>
        <p>{en.university} - {en.location}</p>
      </header>

      <section>
        <h2>About</h2>
        <p>{en.statement}</p>
      </section>

      <section>
        <h2>Publications</h2>
        {publications.map((publication) => {
          const title = resolveLocalized(publication.title, 'en').replace(/\.$/, '')
          const authors = resolveLocalized(publication.authors, 'en').map((author) => author.name).join(', ')
          const venue = resolveLocalized(publication.venue, 'en')
          const location = resolveLocalized(publication.location, 'en')

          return (
            <article key={publication.id}>
              <h3>{title}</h3>
              <p>{authors}</p>
              <p>{venue}, {location}</p>
              {publication.descriptionKey ? <p>{en[publication.descriptionKey]}</p> : null}
              {publication.url ? <a href={publication.url}>Paper</a> : null}
              {publication.arxivUrl ? <a href={publication.arxivUrl}>arXiv</a> : null}
            </article>
          )
        })}
      </section>

      <section>
        <h2>{en.researchProjects}</h2>
        {researchProjects.map((project) => (
          <article key={project.id}>
            <h3>{project.title}</h3>
            <p>{en[project.descriptionKey]}</p>
            <p>{resolveLocalized(project.venue, 'en')}</p>
            {project.links
              .filter((link) => !isComingSoonLink(link))
              .map((link) => (
                <a key={link.type} href={link.url}>{researchLinkLabel(link.type, (key) => en[key])}</a>
              ))}
          </article>
        ))}
      </section>

      <section>
        <h2>{en.artwork}</h2>

        <article>
          <h3>{en.artwork1Title}</h3>
          <p>{en.artwork1Description}</p>
        </article>

        <article>
          <h3>{en.artwork2Title}</h3>
          <p>{en.artwork2Description}</p>
        </article>

        <article>
          <h3>{en.artwork3Title}</h3>
          <p>{en.artwork3Description}</p>
        </article>

        <article>
          <h3>{en.artwork4Title}</h3>
          <p>{en.artwork4Description}</p>
        </article>

        <article>
          <h3>{en.artwork5Title}</h3>
          <p>{en.artwork5Description}</p>
        </article>

        <article>
          <h3>{en.artwork6Title}</h3>
          <p>{en.artwork6Description}</p>
        </article>

        <article>
          <h3>{en.artwork7Title}</h3>
          <p>{en.artwork7Description}</p>
        </article>
      </section>

      <section>
        <h2>{en.otherProjects}</h2>

        <article>
          <h3>LexiAtlas</h3>
          <p>Select a word in text to instantly retrieve dictionary definitions, thesaurus entries, multilingual translations, and etymology</p>
          <a href="https://wordtree-one.vercel.app/">Demo</a>
          <a href="https://github.com/keigo1110/wordtree">Repository</a>
        </article>

        <article>
          <h3>{en.oProject8}</h3>
          <p>{en.oProject8Description}</p>
          <a href="https://keigo1110.github.io/kAIgi-download/">{en.visitProjectWebsite}</a>
        </article>
      </section>

      <section>
        <h2>{en.startup}</h2>
        <h3>{en.Companyname}</h3>
        <p>{en.wakabarDescription}</p>
        <p>{en.startupMissionDescription}</p>
        <ul>
          <li>{en.achivement1}</li>
          <li>{en.achivement2}</li>
        </ul>
        <a href={WAKABAR_APP_STORE_URL}>App Store</a>
        <a href={WAKABAR_APP_URL}>{en.wakabarAppSite}</a>
        <a href={WAKABAR_TOUR_URL}>{en.wakabarTourSite}</a>
        <a href={WAKABAR_CORPORATE_URL}>{en.wakabarMainSite}</a>
      </section>

      <section>
        <h2>{en.awards}</h2>
        <ul>
          <li>{en.award1}</li>
          <li>{en.award2}</li>
          <li>{en.award3no1} {en.award3no2} {en.award3no3}</li>
          <li>{en.award4no1} {en.award4no2} {en.award4no3} {en.award4no4}</li>
        </ul>
      </section>

      <section>
        <h2>{en.experience}</h2>
        <ul>
          <li>{en.experience7} - {en.experience7Description} ({en.experience7Date})</li>
          <li>{en.experience1} - {en.experience1Description} ({en.experience1Date})</li>
          <li>{en.experience2} - {en.experience2Description} ({en.experience2Date})</li>
          <li>{en.experience3} - {en.experience3Description} ({en.experience3Date})</li>
          <li>{en.experience4} - {en.experience4Description} ({en.experience4Date})</li>
          <li>{en.experience8} - {en.experience8Description} ({en.experience8Date})</li>
          <li>{en.experience5} - {en.experience5Description} ({en.experience5Date})</li>
          <li>{en.experience6} - {en.experience6Description} ({en.experience6Date})</li>
        </ul>
      </section>

      <section>
        <h2>{en.interests}</h2>
        <ul>
          <li>{en.interest1}</li>
          <li>{en.interest2}</li>
          <li>{en.interest3}</li>
          <li>{en.interest4}</li>
        </ul>
      </section>

      <footer>
        <h2>{en.contact}</h2>
        <p>Email: mkeigo1110@gmail.com</p>
        <nav>
          <a href="https://twitter.com/keigominamida">Twitter</a>
          <a href="https://www.instagram.com/namida1110/">Instagram</a>
          <a href="https://www.linkedin.com/in/keigominamida/">LinkedIn</a>
          <a href="https://github.com/keigo1110">GitHub</a>
          <a href="https://sora.chatgpt.com/profile/namida1110">Sora</a>
        </nav>
      </footer>
    </div>
  );
}
