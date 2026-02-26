import { en } from '@/translations/en';

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
        <h2>{en.researchProjects}</h2>

        <article>
          <h3>Incremental Gaussian Splatting</h3>
          <p>{en.IGSDescription}</p>
          <p>{en.siggraphasia}</p>
          <a href="https://doi.org/10.1145/3681756.3697913">Paper</a>
        </article>

        <article>
          <h3>Recertif</h3>
          <p>{en.recertifDescription}</p>
        </article>

        <article>
          <h3>FSTL</h3>
          <p>{en.fstlDescription}</p>
        </article>
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
        <h2>{en.startup}</h2>
        <h3>{en.Companyname}</h3>
        <p>{en.wakabarDescription}</p>
        <p>{en.startupMissionDescription}</p>
        <ul>
          <li>{en.achivement1}</li>
          <li>{en.achivement2}</li>
        </ul>
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
          <li>{en.experience1} - {en.experience1Description} ({en.experience1Date})</li>
          <li>{en.experience2} - {en.experience2Description} ({en.experience2Date})</li>
          <li>{en.experience3} - {en.experience3Description} ({en.experience3Date})</li>
          <li>{en.experience4} - {en.experience4Description} ({en.experience4Date})</li>
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
