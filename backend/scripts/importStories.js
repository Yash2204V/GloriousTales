const mongoose = require('mongoose');
const Story = require('../models/Story');
require('dotenv').config();

// --- DYNAMIC SEED STORIES ---
const stories = [
  {
    slug: 'rani-lakshmibai',
    title: 'Rani Lakshmibai',
    subtitle: 'The Warrior Queen of Jhansi',
    description: 'A symbol of resistance to British rule, Rani Lakshmibai led her troops with unmatched courage during the 1857 Rebellion.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Rani_Lakshmibai.jpg',
    heroType: 'warrior',
    era: 'colonial',
    region: 'north',
    gender: 'female',
    birthYear: 1828,
    deathYear: 1858,
    readingTime: '30 min',
    listeningTime: '22 min',
    conditions: ['widow', 'victim-violence'],
    historicalContext: 'The 1857 Rebellion marked the first major resistance against British colonial rule. Rani Lakshmibai became a beacon of hope for Indian freedom fighters.',
    chapters: [
      {
        id: '1',
        title: 'Early Life',
        content: 'Born as Manikarnika in Varanasi, she was trained in martial arts and horse riding from a young age. Her spirit and intellect set her apart.',
        emotionalTone: 'Inspiring',
        annotation: 'Her upbringing defied the norms for women of her era.'
      },
      {
        id: '2',
        title: 'The Rebellion',
        content: 'After her husband’s death, she refused to cede Jhansi to the British. She led her army into battle, becoming a legend for her valor and leadership.',
        emotionalTone: 'Heroic',
        annotation: 'Her leadership inspired both men and women to join the fight.'
      }
    ],
    quotes: [
      'Main apni Jhansi nahi doongi! (I will not give up my Jhansi!)',
      'If defeated and killed on the field of battle, we shall surely earn eternal glory and salvation.'
    ],
    legacy: 'Rani Lakshmibai remains a national icon of bravery and women’s empowerment in India.',
    modernRelevance: 'Her story inspires women and freedom fighters to this day.',
    voiceNarrationStyle: 'Bold, determined, with background of marching drums',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  },
  {
    slug: 'dr-b-r-ambedkar',
    title: 'Dr. B. R. Ambedkar',
    subtitle: 'Father of the Indian Constitution',
    description: 'A visionary leader who fought against social discrimination and drafted the Indian Constitution.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Dr._Bhimrao_Ambedkar.jpg',
    heroType: 'writer',
    era: 'modern',
    region: 'west',
    gender: 'male',
    birthYear: 1891,
    deathYear: 1956,
    readingTime: '40 min',
    listeningTime: '28 min',
    conditions: ['caste-discrimination', 'social-outcast'],
    historicalContext: 'Born into a Dalit family, Ambedkar faced severe discrimination but rose to become a scholar, reformer, and architect of modern India.',
    chapters: [
      {
        id: '1',
        title: 'Struggle for Education',
        content: 'Despite facing untouchability, Ambedkar excelled in academics, earning doctorates from Columbia and the London School of Economics.',
        emotionalTone: 'Resilient',
        annotation: 'His education was a tool for social change.'
      },
      {
        id: '2',
        title: 'Drafting the Constitution',
        content: 'Ambedkar chaired the drafting committee, ensuring justice, equality, and liberty for all citizens.',
        emotionalTone: 'Visionary',
        annotation: 'He laid the foundation for a modern, inclusive India.'
      }
    ],
    quotes: [
      'I measure the progress of a community by the degree of progress which women have achieved.',
      'Cultivation of mind should be the ultimate aim of human existence.'
    ],
    legacy: 'Ambedkar’s work led to the abolition of untouchability and the establishment of social justice in India.',
    modernRelevance: 'He is a symbol of equality and human rights worldwide.',
    voiceNarrationStyle: 'Calm, scholarly, with soft background of turning pages',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  },
  {
    slug: 'swami-vivekananda',
    title: 'Swami Vivekananda',
    subtitle: 'The Spiritual Messenger',
    description: 'A spiritual leader who introduced Indian philosophies of Vedanta and Yoga to the Western world.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Swami_Vivekananda-1893-09-signed.jpg',
    heroType: 'spiritual',
    era: 'modern',
    region: 'east',
    gender: 'male',
    birthYear: 1863,
    deathYear: 1902,
    readingTime: '25 min',
    listeningTime: '18 min',
    conditions: ['mentally-stressed'],
    historicalContext: 'Vivekananda’s teachings came at a time of colonial rule and cultural crisis in India.',
    chapters: [
      {
        id: '1',
        title: 'Chicago Address',
        content: 'In 1893, he delivered his famous speech at the Parliament of the World’s Religions, promoting tolerance and universal brotherhood.',
        emotionalTone: 'Uplifting',
        annotation: 'His words resonated across the globe.'
      },
      {
        id: '2',
        title: 'Spiritual Awakening',
        content: 'He inspired millions to embrace their spiritual heritage and work for the upliftment of society.',
        emotionalTone: 'Motivational',
        annotation: 'He bridged the gap between East and West.'
      }
    ],
    quotes: [
      'Arise, awake, and stop not till the goal is reached.',
      'You cannot believe in God until you believe in yourself.'
    ],
    legacy: 'Vivekananda’s message of strength and self-realization continues to inspire youth and spiritual seekers.',
    modernRelevance: 'He is celebrated as a youth icon and a bridge between cultures.',
    voiceNarrationStyle: 'Energetic, passionate, with background of temple bells',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  },
  {
    slug: 'birsa-munda',
    title: 'Birsa Munda',
    subtitle: 'The Tribal Freedom Fighter',
    description: 'A tribal leader who led the Munda Rebellion against British rule and fought for the rights of indigenous people.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Birsa_Munda.jpg',
    heroType: 'rebel',
    era: 'colonial',
    region: 'east',
    gender: 'male',
    birthYear: 1875,
    deathYear: 1900,
    readingTime: '20 min',
    listeningTime: '15 min',
    conditions: ['victim-violence', 'social-outcast'],
    historicalContext: 'The Munda Rebellion (Ulgulan) was a significant tribal uprising against colonial oppression and exploitation.',
    chapters: [
      {
        id: '1',
        title: 'Early Life and Awakening',
        content: 'Birsa grew up witnessing the exploitation of his people. He became a spiritual and social leader, uniting the tribes.',
        emotionalTone: 'Empowering',
        annotation: 'He was revered as a messiah by his followers.'
      },
      {
        id: '2',
        title: 'The Ulgulan',
        content: 'He led the Ulgulan (Great Tumult), challenging British authority and fighting for tribal land rights.',
        emotionalTone: 'Defiant',
        annotation: 'His movement shook the foundations of colonial rule.'
      }
    ],
    quotes: [
      'Let the kingdom of the queen be ended and our kingdom be established.',
      'We are sons of the soil, we will not give up our land.'
    ],
    legacy: 'Birsa Munda is remembered as a hero of the tribal and indigenous rights movement in India.',
    modernRelevance: 'His legacy lives on in the fight for indigenous rights and social justice.',
    voiceNarrationStyle: 'Earthy, powerful, with tribal drum beats',
    audioUrl: null,
    isPublished: true,
    isFeatured: false,
    createdBy: null
  }
];

async function importStories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/glorious-tales');
    console.log('Connected to MongoDB');
    console.log(`Found ${stories.length} stories to import`);
    for (const story of stories) {
      const result = await Story.findOneAndUpdate(
        { slug: story.slug },
        story,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Imported: ${result.title} (${result.slug})`);
    }
    await mongoose.disconnect();
    console.log('All stories imported successfully!');
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

importStories(); 