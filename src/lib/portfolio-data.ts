// src/lib/portfolio-data.ts — keep as-is, but add these typed exports:
import {
  AboutMeSectionData,
  ContactUsItems,
  ExperienceItemsData,
  ProductsItems,
  SkillsItems,
} from './mocks';

export const portfolioData = {
  name: 'Hossam Hassan',
  role: 'MEARN Stack Developer',
  experience: '3+ years',
  phone: '+20 1022828316',
  email: 'hossamhassan112003@gmail.com',
  stack: SkillsItems.map((skill) => skill.name),
  projects: ProductsItems.map((p) => p.title).join(', '),
  detailedExperience: ExperienceItemsData.map((e) => e.title),
  socials: ContactUsItems.map((c) => ({ platform: c.text, link: c.link })),
  education: AboutMeSectionData.find((s) => s.title === 'Education')
    ?.details.map((d) => d.text)
    .filter(Boolean),
  github: 'https://github.com/solhx',
  linkedin: 'https://www.linkedin.com/in/hossam-hassan-132055244/',
  whatsapp:
    'https://api.whatsapp.com/send/?phone=%2B201022828316&text&type=phone_number&app_absent=0',
  resume: '/Hossam-Hassan-Resume.pdf',
  site: 'https://hossamhassan.dev',
};

// Re-export mock data for direct use in sections
export { SkillsItems, ProductsItems, ExperienceItemsData, ContactUsItems, AboutMeSectionData };