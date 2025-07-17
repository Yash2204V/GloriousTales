require('dotenv').config();
const mongoose = require('mongoose');
const Story = require('../models/Story');

// --- DYNAMIC SEED STORIES ---
const stories = [
  {
    slug: 'rani-lakshmibai',
    title: 'Rani Lakshmibai',
    subtitle: 'The Warrior Queen of Jhansi',
    description: 'Rani Lakshmibai, born as Manikarnika, was a fearless queen and a central figure in India’s First War of Independence in 1857. She fought valiantly against British rule and became a symbol of resistance, patriotism, and empowerment.',
    image: 'https://th.bing.com/th/id/R.8ee7238c706d68deef2b93ce192af2dd?...',
    heroType: 'warrior',
    era: 'colonial',
    region: 'north',
    gender: 'female',
    birthYear: 1828,
    deathYear: 1858,
    readingTime: '50 min',
    listeningTime: '35 min',
    conditions: ['widow', 'victim-violence'],
    historicalContext: 'In the backdrop of British colonial expansion, Rani Lakshmibai’s defiance against the Doctrine of Lapse and her military leadership during the 1857 rebellion made her a revolutionary figure in the history of India’s freedom struggle.',
    chapters: [
      {
        id: '1',
        title: 'Childhood of Manikarnika',
        content: 'Born in Varanasi, Manikarnika grew up learning swordsmanship, archery, horse riding, and statecraft—skills rarely taught to girls. Her father, a court official, ensured she had an unconventional and empowering upbringing.',
        emotionalTone: 'Inspiring',
        annotation: 'Her early training laid the foundation for her later military genius.'
      },
      {
        id: '2',
        title: 'Becoming the Queen',
        content: 'Married to the King of Jhansi at a young age, she assumed royal responsibilities early. After his death and the British refusal to recognize her adopted son as heir, she declared war on injustice.',
        emotionalTone: 'Emotional',
        annotation: 'She turned personal loss into a national cause.'
      },
      {
        id: '3',
        title: 'Battle for Jhansi',
        content: 'Lakshmibai led a well-organized resistance, commanding her army in male attire, mastering guerrilla tactics, and forming alliances with Tatya Tope and Nana Sahib. Her bravery in the Siege of Jhansi is legendary.',
        emotionalTone: 'Heroic',
        annotation: 'She fought on horseback with her child strapped to her back.'
      },
      {
        id: '4',
        title: 'Her Final Stand',
        content: 'Outnumbered and surrounded, she died fighting the British forces in Gwalior in 1858. Even her enemies praised her courage.',
        emotionalTone: 'Tragic yet Glorious',
        annotation: 'She died as a soldier, with honor and dignity.'
      }
    ],
    quotes: [
      'Main apni Jhansi nahi doongi! (I will not give up my Jhansi!)',
      'If defeated and killed on the field of battle, we shall surely earn eternal glory and salvation.'
    ],
    legacy: 'Her fearless defiance remains a powerful tale of women’s courage in warfare. She is immortalized in poetry, statues, schoolbooks, and hearts of millions.',
    modernRelevance: 'Rani Lakshmibai is a role model for female leadership, resistance against injustice, and the fight for sovereignty.',
    voiceNarrationStyle: 'Bold, determined, with background of marching drums and battlefield ambiance',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  },  
  {
    slug: 'dr-b-r-ambedkar',
    title: 'Dr. B. R. Ambedkar',
    subtitle: 'Father of the Indian Constitution',
    description: 'Dr. B. R. Ambedkar was a jurist, economist, social reformer, and the principal architect of the Indian Constitution. Rising from a background of severe caste discrimination, he became one of the most influential figures in modern Indian history.',
    image: 'https://ambedkarinternationalcenter.org/...jpg',
    heroType: 'writer',
    era: 'modern',
    region: 'west',
    gender: 'male',
    birthYear: 1891,
    deathYear: 1956,
    readingTime: '60 min',
    listeningTime: '40 min',
    conditions: ['caste-discrimination', 'social-outcast'],
    historicalContext: 'Born in British India under the oppressive caste system, Ambedkar dedicated his life to eradicating untouchability, fighting for civil rights, and framing a constitution that guarantees equality and justice.',
    chapters: [
      {
        id: '1',
        title: 'Early Struggles',
        content: 'Ambedkar faced untouchability in schools, was denied access to drinking water, and made to sit on the floor. Yet, he showed extraordinary academic talent.',
        emotionalTone: 'Resilient',
        annotation: 'His determination turned social humiliation into intellectual empowerment.'
      },
      {
        id: '2',
        title: 'Global Education',
        content: 'He earned doctorates from Columbia University and LSE, making him one of the most educated Indians of his time. His thesis on Indian economics and caste broke new ground.',
        emotionalTone: 'Ambitious',
        annotation: 'He believed that education was the key to liberation.'
      },
      {
        id: '3',
        title: 'Dalit Upliftment',
        content: 'He led mass movements for temple entry, access to public water, and political rights for Dalits. His speeches ignited the social justice movement.',
        emotionalTone: 'Revolutionary',
        annotation: 'He organized the Mahad Satyagraha and burned the Manusmriti.'
      },
      {
        id: '4',
        title: 'Framing the Constitution',
        content: 'Ambedkar chaired the drafting committee of the Indian Constitution, embedding liberty, equality, and fraternity into its framework.',
        emotionalTone: 'Visionary',
        annotation: 'He worked tirelessly to make India a secular, democratic republic.'
      },
      {
        id: '5',
        title: 'Conversion to Buddhism',
        content: 'Disillusioned with Hinduism’s caste rigidity, he converted to Buddhism in 1956, inspiring millions to follow the path of Dhamma.',
        emotionalTone: 'Transformative',
        annotation: 'He found dignity and spiritual freedom in Buddhism.'
      }
    ],
    quotes: [
      'I measure the progress of a community by the degree of progress which women have achieved.',
      'Cultivation of mind should be the ultimate aim of human existence.',
      'Be educated, be organized, be agitated.'
    ],
    legacy: 'Dr. Ambedkar remains a global symbol of social justice, equality, and the fight against oppression.',
    modernRelevance: 'His ideals continue to influence Indian law, policy, education, and anti-discrimination movements worldwide.',
    voiceNarrationStyle: 'Calm, scholarly, with soft background of turning pages and gentle instrumental music',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  },  
  {
    slug: 'swami-vivekananda',
    title: 'Swami Vivekananda',
    subtitle: 'The Spiritual Messenger',
    description: 'Swami Vivekananda was a visionary monk who redefined India’s spiritual identity and placed it on the global map. He brought the philosophies of Vedanta and Yoga to the West, igniting a global interest in Indian spirituality. His life was a blend of fierce intellect, deep compassion, and dynamic energy.',
    image: 'https://www.oneindia.com/img/1200x80/2016/01/12-1452583472-swami-vivekananda-600.jpg',
    heroType: 'spiritual',
    era: 'modern',
    region: 'east',
    gender: 'male',
    birthYear: 1863,
    deathYear: 1902,
    readingTime: '45 min',
    listeningTime: '30 min',
    conditions: ['mentally-stressed'],
    historicalContext: 'In an era where India was under British rule and grappling with identity, Swami Vivekananda revived national pride through spiritual awakening and intellectual clarity. He empowered Indians to believe in themselves and inspired the West to explore Eastern philosophies.',
    chapters: [
      {
        id: '1',
        title: 'From Narendranath to Vivekananda',
        content: 'Born in a noble Bengali family, Narendranath Datta showed early brilliance in music, philosophy, and reasoning. His spiritual quest led him to Ramakrishna Paramhansa, whose teachings transformed him into Swami Vivekananda, a seeker with a mission.',
        emotionalTone: 'Spiritual & Curious',
        annotation: 'His inner restlessness found clarity through the divine love of his guru.'
      },
      {
        id: '2',
        title: 'Awakening the West',
        content: 'At the Parliament of the World’s Religions in Chicago (1893), his speech beginning with "Sisters and Brothers of America" earned a standing ovation. He emphasized tolerance, unity, and the universal spirit of Vedanta.',
        emotionalTone: 'Electrifying',
        annotation: 'He became a spiritual rockstar in the West, bridging East and West.'
      },
      {
        id: '3',
        title: 'Mission in India',
        content: 'He returned to India to rouse his countrymen. He called for service to the poor as the highest worship and established the Ramakrishna Mission, dedicated to education, health, and spirituality.',
        emotionalTone: 'Motivational',
        annotation: 'He taught that serving humanity is serving God.'
      },
      {
        id: '4',
        title: 'Final Years & Legacy',
        content: 'Despite declining health, he continued writing, guiding, and inspiring. He passed away at just 39, but not before lighting a spiritual flame that continues to burn.',
        emotionalTone: 'Reflective',
        annotation: 'Even in death, he remained a monk on a mission.'
      }
    ],
    quotes: [
      'Arise, awake, and stop not till the goal is reached.',
      'You cannot believe in God until you believe in yourself.',
      'In a conflict between the heart and the brain, follow your heart.'
    ],
    legacy: 'Vivekananda remains the face of spiritual nationalism and youth empowerment. His birthday is celebrated as National Youth Day in India.',
    modernRelevance: 'His teachings influence leaders, thinkers, and youth across the globe. He taught self-confidence, service, and strength as the pillars of nation-building.',
    voiceNarrationStyle: 'Energetic, passionate, with background of temple bells, soft chants, and occasional thunder to reflect emotional crescendos',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  },  
  {
    slug: 'birsa-munda',
    title: 'Birsa Munda',
    subtitle: 'The Tribal Freedom Fighter',
    description: 'Birsa Munda was a fearless tribal leader, spiritual icon, and freedom fighter who led the Munda Ulgulan (Rebellion) against British rule and the exploitation of tribal communities. Revered as "Dharti Aaba" (Father of the Land), he awakened tribal identity and resistance.',
    image: 'https://cdnimg.prabhatkhabar.com/...jpg',
    heroType: 'rebel',
    era: 'colonial',
    region: 'east',
    gender: 'male',
    birthYear: 1875,
    deathYear: 1900,
    readingTime: '40 min',
    listeningTime: '28 min',
    conditions: ['victim-violence', 'social-outcast'],
    historicalContext: 'During British colonial rule, tribal lands were seized, and their culture was suppressed. Birsa Munda united tribes across Chotanagpur to reclaim their land, identity, and dignity through spiritual and armed resistance.',
    chapters: [
      {
        id: '1',
        title: 'Childhood in the Forests',
        content: 'Born in Ulihatu in present-day Jharkhand, Birsa was deeply connected with nature and tribal customs. He witnessed how colonial laws and Christian missionaries disrupted tribal life.',
        emotionalTone: 'Rooted',
        annotation: 'His early life shaped his deep love for land and justice.'
      },
      {
        id: '2',
        title: 'Becoming Dharti Aaba',
        content: 'By his teenage years, Birsa was seen as a spiritual leader. He declared himself a messenger of God, preaching a new tribal faith and calling for a return to indigenous values and unity.',
        emotionalTone: 'Charismatic',
        annotation: 'He was more than a rebel—he was a prophet.'
      },
      {
        id: '3',
        title: 'The Ulgulan Rebellion',
        content: 'He mobilized thousands against British oppression, landlords, and missionaries. The movement demanded land rights, justice, and independence for tribal people.',
        emotionalTone: 'Fierce',
        annotation: 'His slogan “Abua Raj” (our rule) shook the colonial setup.'
      },
      {
        id: '4',
        title: 'Arrest and Martyrdom',
        content: 'In 1900, at just 25, he was captured and died mysteriously in Ranchi Jail. Though his rebellion was crushed, his legacy survived through tribal movements that followed.',
        emotionalTone: 'Tragic yet Immortal',
        annotation: 'He lit a flame that could not be extinguished.'
      }
    ],
    quotes: [
      'Let the kingdom of the queen be ended and our kingdom be established.',
      'We are sons of the soil; we will not give up our land.',
      'Abua Disum Abua Raj – Our Land, Our Rule.'
    ],
    legacy: 'Birsa is now recognized as a national hero. His image appears on Indian currency, and his birth anniversary is observed as Tribal Pride Day.',
    modernRelevance: 'He symbolizes the fight for tribal rights, ecological harmony, and indigenous pride. His struggle remains relevant in today’s land rights and environmental justice movements.',
    voiceNarrationStyle: 'Earthy, tribal, with drum beats, flute tones, and ambient jungle sounds for authenticity',
    audioUrl: null,
    isPublished: true,
    isFeatured: true,
    createdBy: null
  }  
];

// --- IMPORT FUNCTION ---
async function importStories() {
  console.log(process.env.MONGODB_URI)
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ Connected to MongoDB');
    console.log(`📘 Found ${stories.length} stories to import`);

    for (const story of stories) {
      const result = await Story.findOneAndUpdate(
        { slug: story.slug },
        story,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✅ Imported: ${result.title} (${result.slug})`);
    }

    console.log('🎉 All stories imported successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

importStories();
