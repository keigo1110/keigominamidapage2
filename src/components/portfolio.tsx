'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
// import { FaTwitter, FaFacebookF, FaGithub, FaPencilAlt, FaYoutube, FaFileAlt, FaWindowMaximize, FaGlobe, FaInstagram, FaBars, FaTimes } from 'react-icons/fa'
import { FaTwitter, FaFacebookF, FaGithub, FaPencilAlt, FaYoutube, FaFileAlt, FaWindowMaximize, FaGlobe, FaBars, FaTimes } from 'react-icons/fa'

const t = (key: string) => key; // ダミーの翻訳関数

export function PortfolioComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // const sections = ['home', 'projects', 'artwork', 'startup', 'experience', 'awards'];
  const sections = ['home', 'projects', 'startup', 'experience', 'awards'];

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold">Keigo Minamida | 南田桂吾</a>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`hover:text-blue-400 transition-colors ${
                  activeSection === section ? 'text-blue-400' : ''
                }`}
              >
                {t(section)}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-95 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="text-2xl py-4 hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSection(section);
                  }}
                >
                  {t(section)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/3 mb-8 md:mb-0"
            >
              <Image
                src="/images/myface.jpg"
                alt="Keigo Minamida"
                width={300}
                height={300}
                className="rounded-full shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-2/3 md:pl-8"
            >
              <h1 className="text-4xl font-bold mb-4">{t('Keigo Minamida')}</h1>
              <p className="text-xl mb-4">{t('First-year Master Course Student')}</p>
              <p className="mb-4">
                <a href="https://www.iii.u-tokyo.ac.jp/" className="hover:text-blue-400 transition-colors">
                  {t('The University of Tokyo')}
                </a>
                <br />
                <a href="https://lab.rekimoto.org/" className="hover:text-blue-400 transition-colors">
                  {t('Rekimoto Laboratory')}
                </a>
              </p>
              <div className="flex space-x-4 mb-8">
                <a href="https://twitter.com/mKeigo1110" className="text-2xl hover:text-blue-400 transition-colors" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100053066043602" className="text-2xl hover:text-blue-400 transition-colors" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://github.com/keigo1110" className="text-2xl hover:text-blue-400 transition-colors" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://qiita.com/keigo1110" className="text-2xl hover:text-blue-400 transition-colors" aria-label="Qiita">
                  <FaPencilAlt />
                </a>
              </div>
              <p className="text-lg mb-4">{t('I am passionate about pioneering new ways for humans to interact with robots and real-world objects, aiming to expand human freedom and editing capabilities. My current research focuses on developing effective methods to process and utilize real-world information to achieve these interactions.')}</p>
              <h3 className="text-2xl font-semibold mb-2">{t('interests')}</h3>
              <ul className="list-disc list-inside mb-4">
                <li>{t('Human Computer Interaction')}</li>
                <li>{t('Robotics')}</li>
                <li>{t('Augmented Humans')}</li>
                <li>{t('3D Gaussian Splatting')}</li>
              </ul>
              <h3 className="text-2xl font-semibold mb-2">{t('education')}</h3>
              <p>{t('Bachelor of Engineering, KINDAI UNIVERSITY')}</p>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('researchProjects')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                title="Recertif"
                description={t('A system that shows the robot\'s work status simply by directing attention to the robot.')}
                image="/images/Recertif.png"
                links={[{ icon: <FaYoutube />, text: 'Demo', url: 'https://www.youtube.com/watch?v=RC4FkGJv0MU' }]}
              />
              <ProjectCard
                title="FSTL (Fractional Score Transfer Learning)"
                description={t('Improved branch trimming techniques.(Slide made by Fujisaki)')}
                image="/images/FSTL.png"
                links={[
                  { icon: <FaFileAlt />, text: 'Paper', url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/' },
                  { icon: <FaWindowMaximize />, text: 'Slide', url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938' }
                ]}
              />
            </div>
          </div>
        </section>

        {/* <section id="artwork" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('artwork')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ArtworkCard
                title={t('artwork1Title')}
                description={t('artwork1Description')}
                image="/images/artwork1.jpg"
                link="https://www.instagram.com/p/artwork1/"
              />
              <ArtworkCard
                title={t('artwork2Title')}
                description={t('artwork2Description')}
                image="/images/artwork2.jpg"
                link="https://www.instagram.com/p/artwork2/"
              />
              <ArtworkCard
                title={t('artwork3Title')}
                description={t('artwork3Description')}
                image="/images/artwork3.jpg"
                link="https://www.instagram.com/p/artwork3/"
              />
            </div>
          </div>
        </section> */}

        <section id="startup" className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('startup')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StartupCard
              name={t('wakabar K.K.')}
              description={t('Supporting Safe Cycling Actions')}
              logo="/images/startup-logo.png"
              website="https://wakabar-cycle.com/"
              />
              <div>
              <h3 className="text-2xl font-semibold mb-4">{t('startupMission')}</h3>
              <p className="text-lg mb-4"><strong>{t('We use IoT to reduce traffic accidents to zero').split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}</strong></p>
              <h3 className="text-2xl font-semibold mb-4">{t('startupAchievements')}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>{t('Government Partnership')}</strong></li>
                <li><strong>{t('Proof-of-concept experiment with an iOS application')}</strong></li>
              </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="otherProjects" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('otherProjects')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title={t('accessControlSystem')}
                description={t('When a student comes to the club room and touches his/her student ID card, he/she is notified and the lights in the room come on automatically.')}
                image="/images/robot_room.png"
                links={[
                  { icon: <FaYoutube />, text: 'Demo (switch)', url: 'https://www.youtube.com/watch?v=XedxYF_UYmQ' },
                  { icon: <FaYoutube />, text: 'Demo (discord)', url: 'https://www.youtube.com/watch?v=oPy740TgO-8' },
                  { icon: <FaYoutube />, text: 'Demo (AA)', url: 'https://www.youtube.com/watch?v=5qL3k0K_MPc' }
                ]}
              />
              <ProjectCard
                title={t('turtlebotManipulation')}
                description={t('I created an interface on ROS 2 to control TURTLEBOT3 by estimating its posture with a camera.')}
                image="/images/bodyop.png"
                links={[{ icon: <FaYoutube />, text: 'Demo', url: 'https://www.youtube.com/watch?v=-y6T3JDFr5Q' }]}
              />
              <ProjectCard
                title={t('unitreeLidar')}
                description={t('I have developed a method to use the Unitree L1 LiDAR without relying on rviz.(on ROS)')}
                image="/images/unilidar.png"
                links={[{ icon: <FaGithub />, text: 'Repository', url: 'https://github.com/keigo1110/unilidar_sdk' }]}
              />
            </div>
          </div>
        </section>

        <section id="experience" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('experience')}</h2>
            <div className="space-y-8">
            <ExperienceCard
                logo="/images/iii.jpg"
                title="iii exhibition 2024"
                position="Project Director"
                date="April, 2024 - November, 2024"
                links={[
                  { text: '付いて離れて Duration Unduration', url: 'https://www.iiiexhibition.com/' },
                  { text: 'なにいう展', url: 'https://iii-exhibition-2024-web.vercel.app/' }
                ]}
              />
            <ExperienceCard
                logo="/images/1000ya.png"
                title="1000sen team"
                position="Hyperlinking figures to the text"
                date="April, 2024 - July, 2024"
                links={[
                  { text: '1850夜 三浦國雄『中国人のトポス』', url: 'https://1000ya.isis.ne.jp/1850.html' },
                  { text: '1849夜 ロビン・ダンバー『ことばの起源』', url: 'https://1000ya.isis.ne.jp/1849.html' },
                  { text: '1848夜 佐々木宏幹『聖と呪力の人類学』', url: 'https://1000ya.isis.ne.jp/1848.html' },
                  { text: '1847夜 ライマン・フランク・ボーム『オズの魔法使い』', url: 'https://1000ya.isis.ne.jp/1847.html' },
                  { text: '1846夜 大貫隆・島薗進・高橋義人・村上陽一郎編『グノーシス 異端と近代』', url: 'https://1000ya.isis.ne.jp/1846.html' }
                ]}
              />
              <ExperienceCard
                logo="/images/ha.png"
                title="ISIS editing school"
                position="51[ha] Editing instructor"
                date="October, 2023 - February, 2024"
                links={[
                  { text: '51[ha] my class name', url: 'https://edist.ne.jp/list/82kanmon_51ha_shusseuo/' },
                  { text: '51[ha] commemorative completion book', url: 'https://edist.ne.jp/list/83kanmon_51ha_book/' },
                  { text: '51[ha] my class planning award', url: 'https://edist.ne.jp/just/kanmon83_hyper_p-1/' }
                ]}
              />
              <ExperienceCard
                logo="/images/shu.png"
                title="ISIS editing school"
                position="51[shu] Editing instructor"
                date="May, 2023 - August, 2023"
                links={[
                  { text: '51[shu] my class name', url: 'https://edist.ne.jp/list/81kanmon_51shu_names/' },
                  { text: '51[shu] commemorative completion book', url: 'https://edist.ne.jp/list/82kanmon_shu_book/' },
                  { text: '51[shu] my class report', url: 'https://edist.ne.jp/post/51syu_ruijisoji/' }
                ]}
              />
            </div>
          </div>
        </section>

        <section id="awards" className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('awards')}</h2>
            <ul className="space-y-4 list-disc list-inside">
              <li>{t('Best presentation award from KINDAI UNIVERSITY faculty of Science and Engineering department of Mechanical Engineering(March, 2024)')}</li>
              <li>{t('Alumni President award from KINDAI UNIVERSITY Alumni Association(March, 2024)')}</li>
              <li>
                <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className="text-blue-400 hover:underline">
                  {t('律相院賞')}
                </a>
                ・
                <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className="text-blue-400 hover:underline">
                  {t('析匠賞')}

                </a>
                {t(' from ISIS editing school(November, 2022)')}
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Keigo Minamida</p>
        </div>
      </footer>
    </div>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  links: { icon: JSX.Element; text: string; url: string }[];
}

function ProjectCard({ title, description, image, links }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
    >
      <Image src={image} alt={title} width={600} height={400} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
            >
              {link.icon}
              <span className="ml-2">{link.text}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ExperienceCard({ logo, title, position, date, links }: { logo: string; title: string; position: string; date: string; links: { text: string; url: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <Image src={logo} alt={title} width={64} height={64} className="rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-300">{position}</p>
          <p className="text-gray-400">{date}</p>
        </div>
      </div>
      <div className="space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            {link.text}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

// function ArtworkCard({ title, description, image, link }: { title: string; description: string; image: string; link: string }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
//     >
//       <Image src={image} alt={title} width={400} height={400} className="w-full h-64 object-cover" />
//       <div className="p-6">
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-300 mb-4">{description}</p>
//         <a
//           href={link}
//           className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded transition-colors"
//         >
//           <FaInstagram />
//           <span className="ml-2">{t('viewOnInstagram')}</span>
//         </a>
//       </div>
//     </motion.div>
//   )
// }

function StartupCard({ name, description, logo, website }: { name: string; description: string; logo: string; website: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <Image src={logo} alt={name} width={80} height={80} className="rounded-full mr-4" />
        <div>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <a
        href={website}
        className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
      >
        <FaGlobe />
        <span className="ml-2">{t('visitWebsite')}</span>
      </a>
    </motion.div>
  )
}