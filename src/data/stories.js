export const heroTypes = [
  { id: 'weapon', label: 'Warrior by Weapon', icon: '⚔️', description: 'Those who fought with sword and shield for freedom' },
  { id: 'writing', label: 'Warrior by Writing', icon: '✍️', description: 'Revolutionary thinkers who used pen as their weapon' },
  { id: 'revolt', label: 'Warrior by Revolt', icon: '🔥', description: 'Leaders who sparked uprisings against oppression' },
  { id: 'words', label: 'Warrior by Words', icon: '💬', description: 'Spiritual giants who transformed minds through wisdom' },
];

export const conditions = [
  { id: 'widow', label: 'Widow', icon: '💔', description: 'Faced the harsh reality of widowhood in their times' },
  { id: 'paralyzed', label: 'Paralyzed', icon: '♿', description: 'Overcame physical disabilities to achieve greatness' },
  { id: 'stressed', label: 'Mentally Stressed', icon: '🧠', description: 'Battled mental trauma while fighting for justice' },
  { id: 'outcast', label: 'Social Outcast', icon: '🚫', description: 'Rejected by society but never gave up their mission' },
  { id: 'discrimination', label: 'Caste/Ashram Discrimination', icon: '⚖️', description: 'Faced systematic oppression based on birth' },
  { id: 'violence', label: 'Victim of Violence', icon: '🩸', description: 'Endured physical violence but emerged stronger' },
];

export const eras = [
  { id: 'ancient', label: 'Ancient India (Before 1000 CE)', period: 'Before 1000 CE', description: 'Era of ancient kingdoms and spiritual awakening' },
  { id: 'medieval', label: 'Medieval India (1000-1707 CE)', period: '1000-1707 CE', description: 'Time of great empires and cultural synthesis' },
  { id: 'colonial', label: 'Colonial Era (1707-1947)', period: '1707-1947', description: 'Struggle against British colonial rule' },
  { id: 'modern', label: 'Modern India (1947-Present)', period: '1947-Present', description: 'Independent India and contemporary heroes' },
];

export const regions = [
  { id: 'north', label: 'North India', description: 'Punjab, Delhi, Uttar Pradesh, Rajasthan' },
  { id: 'south', label: 'South India', description: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh' },
  { id: 'east', label: 'East India', description: 'West Bengal, Odisha, Jharkhand, Bihar' },
  { id: 'west', label: 'West India', description: 'Maharashtra, Gujarat, Goa' },
  { id: 'central', label: 'Central India', description: 'Madhya Pradesh, Chhattisgarh' },
  { id: 'northeast', label: 'Northeast India', description: 'Assam, Manipur, Nagaland, Mizoram' },
];

export const stories = [
  {
    id: 'rani-lakshmibai',
    title: 'Rani Lakshmibai',
    subtitle: 'The Warrior Queen of Jhansi',
    heroType: 'weapon',
    conditions: ['widow'],
    era: 'colonial',
    region: 'central',
    gender: 'female',
    birthYear: 1828,
    deathYear: 1858,
    description: 'The fearless Queen who fought against British colonial rule and became a symbol of resistance and women\'s power. A 25-year-old widow who stood against the mighty British Empire with her infant son strapped to her back.',
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    readingTime: '25 min',
    listeningTime: '18 min',
    historicalContext: 'The British East India Company was systematically annexing Indian kingdoms through the Doctrine of Lapse. Any kingdom without a male heir would be absorbed into British territory, destroying centuries of Indian sovereignty.',
    chapters: [
      {
        id: 1,
        title: 'The Making of a Warrior',
        content: `In the heart of Varanasi, in 1828, was born Manikarnika Tambe, who would later become the legendary Rani Lakshmibai. Her childhood was unlike that of other girls of her time. While most girls were confined to household duties, Manikarnika learned swordsmanship, horsemanship, and the art of war from her father, Moropant Tambe.

The British East India Company was tightening its grip on Indian territories through the infamous Doctrine of Lapse. Any kingdom without a male heir would be annexed by the British. This was the harsh reality that would shape Lakshmibai's destiny.

At the tender age of 14, she was married to Maharaja Gangadhar Rao of Jhansi. She became Lakshmibai, the Queen of Jhansi, but her happiness was short-lived. The couple's first child died in infancy, leaving them heartbroken.

The pain of losing a child in those times was not just personal grief - it was a political catastrophe. Without an heir, Jhansi would fall into British hands. This was the brutal reality of colonial rule - even personal tragedies became tools of imperial expansion.`,
        annotation: 'The Doctrine of Lapse was a policy that allowed the British to annex any Indian state if the ruler died without a natural heir. It was a systematic tool of colonial expansion that destroyed hundreds of Indian kingdoms.',
        emotionalTone: 'Building tension and foreboding'
      },
      {
        id: 2,
        title: 'The Tragedy That Forged Steel',
        content: `In 1853, tragedy struck when Maharaja Gangadhar Rao fell seriously ill. On his deathbed, he adopted a son, Anand Rao, who was renamed Damodar Rao, ensuring Jhansi would have an heir. But the British, under Lord Dalhousie, refused to recognize the adoption.

When Gangadhar Rao died, Lakshmibai was merely 25 years old. The British immediately moved to annex Jhansi under the Doctrine of Lapse. Captain Alexander Skene, the British political agent, coldly informed the young widow that she must surrender her kingdom.

"Main apni Jhansi nahi dungi!" (I will not give up my Jhansi!) - These words, spoken with fierce determination, would echo through history. A 25-year-old widow, with an infant son, stood against the might of the British Empire.

The British offered her a pension and asked her to leave the fort. They expected submission from a grieving widow. They had no idea they were dealing with a lioness who would rather die than surrender her motherland.

For months, she fought legal battles, sending petitions to the Governor-General. But the British had already decided Jhansi's fate. They wanted its strategic location and its treasury. A widow's tears meant nothing to them.`,
        annotation: 'Lakshmibai was widowed at 25 and had to fight not just for her kingdom, but for her son\'s rightful inheritance. The British systematically ignored Indian customs and laws to justify their annexations.',
        emotionalTone: 'Grief transforming into defiant rage'
      },
      {
        id: 3,
        title: 'The Final Stand',
        content: `The siege of Jhansi began in March 1858. For two weeks, Lakshmibai defended her fort with a small army of loyal soldiers. She fought with her infant son Damodar strapped to her back, wielding swords in both hands.

The British brought cannons, modern rifles, and thousands of soldiers. Lakshmibai had courage, a few hundred loyal warriors, and the righteousness of her cause. The walls of Jhansi fort bore witness to one of the most heroic defenses in human history.

When the walls of Jhansi were breached, she escaped with her son and a few faithful followers. She rode to Gwalior to join forces with other rebels. But the British were relentless in their pursuit.

On June 17, 1858, near Gwalior, Rani Lakshmibai fought her final battle. Dressed as a man, with her son tied to her back, she fought valiantly until a British trooper's bullet found its mark. She was just 29 years old.

Even her enemy, Sir Hugh Rose, paid tribute: "The rebel queen was the bravest and best military leader of the rebels. Her life was one of the most remarkable in the history of nations."

She died as she lived - with a sword in her hand and her son safe on her back. The British had won the battle, but Lakshmibai had won immortality.`,
        annotation: 'Lakshmibai died fighting at age 29, becoming a symbol of resistance that inspired India\'s freedom movement for the next 90 years. Her sacrifice proved that the spirit of freedom could never be conquered.',
        emotionalTone: 'Epic heroism and tragic sacrifice'
      }
    ],
    quotes: [
      "Main apni Jhansi nahi dungi! (I will not give up my Jhansi!)",
      "Har Har Mahadev! Victory to Lord Shiva!",
      "A warrior's death is better than a coward's life.",
      "My Jhansi will never bow to foreign rule!"
    ],
    legacy: 'Rani Lakshmibai remains one of the most revered figures in Indian history, symbolizing courage, patriotism, and women\'s empowerment. Her story continues to inspire millions of Indians, especially women, to stand up against injustice. She proved that true strength comes not from physical power, but from an unbreakable spirit and love for one\'s motherland.',
    modernRelevance: 'In today\'s world, Lakshmibai\'s story resonates with every woman fighting against oppression, every parent protecting their child\'s future, and every person standing up to powerful bullies. Her legacy reminds us that sometimes, the greatest victory is in refusing to surrender your principles.',
    audioUrl: null,
    voiceNarrationStyle: 'Powerful female voice with grace and strength, background of war drums and traditional Indian instruments during battle scenes'
  },
  {
    id: 'bhagat-singh',
    title: 'Bhagat Singh',
    subtitle: 'The Revolutionary Thinker',
    heroType: 'writing',
    conditions: ['stressed'],
    era: 'colonial',
    region: 'north',
    gender: 'male',
    birthYear: 1907,
    deathYear: 1931,
    description: 'The young revolutionary who used both pen and action to awaken India against British colonialism. At 23, he chose the gallows over a life of submission, becoming the voice of India\'s youth.',
    image: 'https://images.pexels.com/photos/8036657/pexels-photo-8036657.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    readingTime: '30 min',
    listeningTime: '22 min',
    historicalContext: 'British colonial rule had reached its peak of exploitation. The Jallianwala Bagh massacre had shown the true face of British "civilization." Young Indians were torn between Gandhi\'s non-violence and the need for immediate action against tyranny.',
    chapters: [
      {
        id: 1,
        title: 'The Making of a Revolutionary',
        content: `Born in 1907 in a Sikh family in Punjab, Bhagat Singh grew up witnessing the horrors of British colonial rule. The Jallianwala Bagh massacre of 1919, when he was just 12 years old, left an indelible mark on his young mind.

Unlike many freedom fighters who relied solely on non-violence, Bhagat Singh believed that sometimes violence was necessary to shake people out of their slumber. He was deeply influenced by socialist ideologies and read extensively about revolution, nationalism, and atheism.

At 18, he joined the Hindustan Republican Association, later renamed Hindustan Socialist Republican Association (HSRA). He was not just a man of action but also a profound thinker who wrote extensively about the need for complete independence and social equality.

The young Bhagat Singh was haunted by the images of innocent people being gunned down at Jallianwala Bagh. He would often say, "They may kill me, but they cannot kill my ideas." This was not just bravado - it was the philosophy that would guide his short but impactful life.

While his contemporaries were content with demanding dominion status, Bhagat Singh demanded complete independence. While others spoke of gradual change, he believed in revolution. He was not just fighting the British - he was fighting the very idea that Indians were inferior.`,
        annotation: 'Bhagat Singh was influenced by the Russian Revolution and Marxist ideology, making him one of India\'s first socialist revolutionaries. He believed that political freedom without economic equality was meaningless.',
        emotionalTone: 'Intellectual awakening and burning passion for justice'
      },
      {
        id: 2,
        title: 'The Awakening Gesture',
        content: `On April 8, 1929, Bhagat Singh and Batukeshwar Dutt threw bombs in the Central Legislative Assembly in Delhi. They could have easily escaped, but they chose to stay and get arrested. Their purpose was not to kill but to "make the deaf hear."

The bombs were deliberately thrown in empty areas. They were not meant to kill - they were meant to wake up a sleeping nation. After throwing the bombs, they shouted "Inquilab Zindabad!" (Long Live Revolution!) and surrendered themselves.

"It is easy to kill individuals but you cannot kill the ideas. Great empires crumbled while the ideas survived," Bhagat Singh wrote from prison. He used his trial as a platform to expose British brutalities and articulate his vision for independent India.

During his 2 years in prison, he wrote extensively, penning essays on religion, nationalism, and socialism. His essay "Why I am an Atheist" remains one of the most powerful philosophical writings by any Indian revolutionary.

In prison, he was not just a prisoner - he was a teacher, a philosopher, and a visionary. He read voraciously, wrote constantly, and debated endlessly with fellow prisoners. The British had imprisoned his body, but his mind soared free, inspiring millions.

He wrote to his father: "I am fortunate that I am dying for such a glorious cause. There could be no greater pride for me." These were not the words of a terrorist, but of a patriot who had found his purpose.`,
        annotation: 'The Assembly bombing was a carefully planned symbolic act to draw attention to their cause, not to harm anyone. Bhagat Singh used his trial to educate the nation about the true nature of British rule.',
        emotionalTone: 'Strategic brilliance mixed with philosophical depth'
      },
      {
        id: 3,
        title: 'The Ultimate Sacrifice',
        content: `On March 23, 1931, at the age of just 23, Bhagat Singh was hanged along with his comrades Rajguru and Sukhdev. Their execution was carried out secretly at night, and their bodies were cremated by the jail authorities to prevent public demonstrations.

His last words were reported to be from a Punjabi poem: "The flames of revolution will rise from my ashes." Even facing death, he maintained his composure and revolutionary fervor.

Before his execution, he wrote to his father: "I am fortunate that I am dying for such a glorious cause. There could be no greater pride for me." His martyrdom at such a young age made him an eternal symbol of sacrifice and patriotism.

The British thought that by killing Bhagat Singh, they would kill the revolutionary spirit. They were wrong. His death ignited a fire that would burn for the next 16 years until India gained independence.

Today, "Inquilab Zindabad" (Long Live Revolution), his famous slogan, continues to inspire movements for justice across the world. He proved that age is no barrier to greatness, and that ideas are more powerful than bullets.

Bhagat Singh did not just die for India - he died for the idea that no human being should bow before another, that justice is worth any sacrifice, and that freedom is the birthright of every person.`,
        annotation: 'Bhagat Singh\'s execution at 23 made him a martyr and symbol of youth power in India\'s freedom struggle. His writings and philosophy influenced generations of revolutionaries worldwide.',
        emotionalTone: 'Tragic heroism and eternal inspiration'
      }
    ],
    quotes: [
      "Inquilab Zindabad! (Long Live Revolution!)",
      "They may kill me, but they cannot kill my ideas.",
      "Revolution is an inalienable right of mankind.",
      "It is easy to kill individuals but you cannot kill the ideas.",
      "I am fortunate that I am dying for such a glorious cause."
    ],
    legacy: 'Bhagat Singh remains the most beloved revolutionary in Indian history, especially among youth. His combination of action and intellectual depth continues to inspire social justice movements worldwide. He showed that true revolution begins in the mind and that the pen can be mightier than the sword.',
    modernRelevance: 'In an age of social media activism and youth movements, Bhagat Singh\'s example reminds us that real change requires both thought and action, both courage and sacrifice. His atheistic rationalism and socialist ideals remain relevant in contemporary debates about equality and justice.',
    audioUrl: null,
    voiceNarrationStyle: 'Strong, passionate male voice with intellectual depth, background of revolutionary songs and period-appropriate sounds'
  },
  {
    id: 'birsa-munda',
    title: 'Birsa Munda',
    subtitle: 'The Tribal Liberator',
    heroType: 'revolt',
    conditions: ['outcast', 'discrimination'],
    era: 'colonial',
    region: 'east',
    gender: 'male',
    birthYear: 1875,
    deathYear: 1900,
    description: 'The tribal leader who led the largest tribal uprising against British colonial rule and fought for indigenous rights. He died at 25, but his rebellion forced the British to recognize tribal land rights.',
    image: 'https://images.pexels.com/photos/8111162/pexels-photo-8111162.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    readingTime: '20 min',
    listeningTime: '15 min',
    historicalContext: 'British colonial policies had destroyed traditional tribal systems of community land ownership. The zamindari system reduced indigenous people to bonded laborers on their own ancestral lands, while Christian missionaries systematically eroded tribal culture and identity.',
    chapters: [
      {
        id: 1,
        title: 'The Son of the Forest',
        content: `Born in 1875 in Ulihatu village in present-day Jharkhand, Birsa Munda belonged to the Munda tribe. His childhood was marked by extreme poverty and the systematic exploitation of tribal lands by British colonial policies and local landlords.

The British had introduced the zamindari system, which destroyed the traditional tribal system of community land ownership. Tribal lands were being taken over by outsiders, and the indigenous people were reduced to bonded laborers on their own ancestral lands.

Birsa witnessed his people being forced to work as coolies, their forests being cleared for timber, and their traditional way of life being systematically destroyed. The British also encouraged Christian missionaries to convert tribals, further eroding their cultural identity.

For centuries, the Munda people had lived in harmony with nature, following their own customs and worshipping their own gods. The British saw this as "primitive" and "uncivilized." They wanted to "modernize" the tribals by destroying everything that made them who they were.

Young Birsa saw his grandfather's generation being humiliated, his father's generation being exploited, and his own generation being enslaved. The pain of watching his people lose their dignity was unbearable. But unlike others who accepted their fate, Birsa decided to fight back.`,
        annotation: 'The British zamindari system destroyed tribal community land ownership, making indigenous people strangers on their own land. This was cultural genocide disguised as administrative reform.',
        emotionalTone: 'Deep anguish and growing determination'
      },
      {
        id: 2,
        title: 'The Awakening of a Leader',
        content: `As a young man, Birsa experienced a spiritual awakening and declared himself a messenger of God sent to liberate his people. He preached against the exploitation by landlords, missionaries, and the colonial government.

"Abua raj seter jana, maharani raj tundu jana" (Our kingdom will come, the queen's kingdom will end) became his rallying cry. He called for the establishment of "Munda Raj" (Munda rule) and the expulsion of all foreign influences.

Birsa organized the Munda people and other tribes, forming a united front against oppression. He established schools, promoted tribal culture, and created a parallel government structure. His followers saw him as "Dharti Aba" (Father of the Earth) and believed he possessed divine powers.

He taught his people that they were not inferior to anyone. Their culture was not primitive - it was ancient and wise. Their connection to the earth was not backwardness - it was enlightenment. Their community spirit was not weakness - it was strength.

Birsa's message was simple but revolutionary: "We are the children of this soil. This land belongs to us. We will not be slaves in our own home." He gave his people something they had lost - pride in their identity and hope for their future.`,
        annotation: 'Birsa\'s spiritual leadership combined religious reform with political rebellion, making him a unique figure in Indian history. He understood that cultural revival was essential for political liberation.',
        emotionalTone: 'Spiritual awakening and growing confidence'
      },
      {
        id: 3,
        title: 'The Final Resistance',
        content: `The Munda rebellion reached its peak between 1899-1900. Birsa led armed attacks on police stations, churches, and landlords' properties. The British were shocked by the intensity and organization of the tribal resistance.

The rebellion spread across present-day Jharkhand, Bihar, Odisha, and West Bengal. Thousands of tribals joined the movement, armed with traditional weapons against the British military.

However, Birsa was betrayed and captured in 1900. He died in Ranchi jail at the young age of 25, under mysterious circumstances. The British claimed he died of cholera, but many believe he was poisoned.

His death sparked further unrest, and the British were forced to pass the Chotanagpur Tenancy Act in 1908, which provided some protection for tribal land rights.

Birsa's rebellion was not just about land - it was about dignity, identity, and the right to exist as a free people. He showed that even the most marginalized communities could stand up to the mightiest empire if they had courage and unity.

Though he died young, Birsa had achieved something remarkable. He had awakened his people to their own power. He had forced the British to acknowledge tribal rights. Most importantly, he had proved that the human spirit could never be completely conquered.`,
        annotation: 'Birsa\'s rebellion forced the British to recognize tribal land rights, leading to the Chotanagpur Tenancy Act of 1908. His sacrifice laid the foundation for tribal rights movements that continue today.',
        emotionalTone: 'Epic resistance and meaningful sacrifice'
      }
    ],
    quotes: [
      "Abua raj seter jana, maharani raj tundu jana (Our kingdom will come, the queen's kingdom will end)",
      "The white man's religion is not for us",
      "Dharti Aba will liberate his children",
      "We are the children of this soil"
    ],
    legacy: 'Birsa Munda is revered as one of India\'s greatest tribal leaders. His fight for indigenous rights and environmental protection resonates strongly with contemporary movements for tribal welfare and environmental conservation. He proved that leadership can emerge from the most marginalized communities.',
    modernRelevance: 'In today\'s world of environmental destruction and indigenous rights violations, Birsa\'s message is more relevant than ever. His fight for tribal land rights and cultural preservation continues to inspire environmental activists and indigenous rights movements worldwide.',
    audioUrl: null,
    voiceNarrationStyle: 'Earthy, powerful voice with tribal music and forest sounds in background'
  },
  {
    id: 'kabir-das',
    title: 'Kabir Das',
    subtitle: 'The Mystic Poet',
    heroType: 'words',
    conditions: ['outcast', 'discrimination'],
    era: 'medieval',
    region: 'north',
    gender: 'male',
    birthYear: 1440,
    deathYear: 1518,
    description: 'The fearless mystic poet who challenged religious orthodoxy and social inequality through his powerful verses. Born into a weaver family, he became one of India\'s greatest philosophers without formal education.',
    image: 'https://images.pexels.com/photos/8036849/pexels-photo-8036849.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    readingTime: '35 min',
    listeningTime: '26 min',
    historicalContext: 'Medieval India was torn between rigid Hindu caste hierarchies and Islamic orthodoxy. Religious leaders from both sides exploited common people through meaningless rituals and superstitions. Social mobility was impossible, and questioning religious authority was considered blasphemy.',
    chapters: [
      {
        id: 1,
        title: 'The Weaver Philosopher',
        content: `Born around 1440 in Varanasi to a Muslim weaver family, Kabir Das grew up witnessing the rigid caste system and religious conflicts of medieval India. Despite being illiterate, he possessed extraordinary spiritual insight and poetic genius.

Kabir challenged both Hindu and Islamic orthodoxies with equal fervor. He refused to be confined by religious boundaries and criticized the ritualistic practices, idol worship, and meaningless ceremonies of both religions.

"Pothi padh padh jag mua, pandit bhaya na koye, dhai akhar prem ka, padhe so pandit hoye" (Reading books, the world died, but none became learned; whoever reads the two and a half letters of love, becomes the true scholar) - This verse encapsulated his philosophy that true knowledge comes from love and direct experience, not from bookish learning.

In a society where your birth determined your worth, Kabir declared that all humans were equal in the eyes of God. In a world where religious leaders claimed monopoly over truth, Kabir said that God could be found in every heart.

His workshop was his temple, his loom was his prayer mat, and his verses were his sermons. While pandits and mullahs fought over scriptures, Kabir found God in the simple act of weaving cloth and serving humanity.`,
        annotation: 'Despite being illiterate, Kabir became one of India\'s greatest philosophers, showing that wisdom transcends formal education. His verses were composed orally and passed down through generations.',
        emotionalTone: 'Gentle wisdom challenging established power'
      },
      {
        id: 2,
        title: 'The Fearless Critic',
        content: `Kabir's verses were revolutionary for his time. He openly criticized the caste system, religious hypocrisy, and social inequality. His dohas (couplets) spread like wildfire among the common people, especially the oppressed lower castes.

"Jati na pucho sadhu ki, puch lijiye gyan, mol karo talwar ka, pada rahan do myan" (Don't ask about a saint's caste, ask about his knowledge; value the sword, leave the sheath behind) - Through such verses, he attacked the caste-based discrimination prevalent in society.

He also fearlessly criticized religious leaders: "Mala to kar mein phire, jeebh phire mukh mahi, manua to chahun dis phire, yeh to sumiran nahi" (The rosary rotates in the hand, the tongue rotates in the mouth, but the mind wanders in all directions - this is not true remembrance).

His boldness made him enemies among both Hindu and Muslim religious establishments, but he continued his mission undeterred. He was threatened, ostracized, and declared a heretic, but he never stopped speaking truth to power.

Kabir's courage was not the courage of a warrior with a sword - it was the courage of a truth-teller with nothing to lose. He had no wealth, no political power, no army. All he had was his integrity and his verses. And that was enough to shake the foundations of religious orthodoxy.`,
        annotation: 'Kabir\'s criticism of both Hindu and Muslim religious practices made him controversial but also universally relevant. His verses became the voice of the oppressed masses.',
        emotionalTone: 'Fearless confrontation with authority'
      },
      {
        id: 3,
        title: 'The Eternal Voice',
        content: `Kabir's influence extended far beyond his lifetime. His disciples, both Hindu and Muslim, preserved his teachings. The Kabir Panth (sect) was formed, and his verses became part of Sikh scripture, the Guru Granth Sahib.

"Guru Govind dou khade, kake lagoon paaye, balihari guru aapne, jin Govind diyo bataye" (Both Guru and God stand before me, whose feet should I touch first? I sacrifice myself to my Guru, who showed me God) - This verse shows his reverence for the teacher who guides toward truth.

When Kabir died in 1518, legend says that both Hindus and Muslims claimed his body. When they lifted the shroud, they found only flowers - half taken by Hindus to Varanasi, half by Muslims to Maghar. This story symbolizes how his message transcended religious boundaries.

His final message was simple yet profound: "Kabira khada bazaar mein, mange sabki khair, na kahu se dosti, na kahu se bair" (Kabir stands in the marketplace, wishing well for all, neither friendship nor enmity with anyone).

Kabir proved that the greatest revolution is the revolution of consciousness. He showed that one person with truth and courage can challenge entire systems of oppression. His legacy reminds us that real change begins when we stop accepting injustice as normal.

Today, when religious fundamentalism and social inequality still plague our world, Kabir's voice remains as relevant as ever. His message of universal love, social equality, and spiritual freedom continues to inspire seekers of truth across all boundaries.`,
        annotation: 'Kabir\'s teachings influenced multiple religions and continue to promote unity and spiritual equality across communities. His philosophy of universal brotherhood remains timeless.',
        emotionalTone: 'Transcendent wisdom and eternal relevance'
      }
    ],
    quotes: [
      "Dukh mein sumiran sab kare, sukh mein kare na koye, jo sukh mein sumiran kare, toh dukh kahe ko hoye",
      "Bura jo dekhan main chala, bura na milya koye, jo mann khoja apna, to mujhse bura na koye",
      "Sai itna dijiye, jaame kutumb samaye, main bhi bhookha na rahun, sadhu na bhookha jaye",
      "Pothi padh padh jag mua, pandit bhaya na koye"
    ],
    legacy: 'Kabir\'s teachings of universal brotherhood, equality, and direct spiritual experience continue to inspire social reformers and spiritual seekers. His verses remain relevant in contemporary discussions about religious harmony and social justice. He proved that wisdom and courage can emerge from the humblest origins.',
    modernRelevance: 'In our age of religious conflicts and social media echo chambers, Kabir\'s message of questioning authority, seeking truth, and treating all humans as equal is more needed than ever. His example shows that real change comes from inner transformation, not external revolution.',
    audioUrl: null,
    voiceNarrationStyle: 'Wise, contemplative voice with traditional Indian classical music and sounds of weaving loom'
  },
  {
    id: 'savitribai-phule',
    title: 'Savitribai Phule',
    subtitle: 'The Pioneer Educator',
    heroType: 'words',
    conditions: ['discrimination', 'violence'],
    era: 'colonial',
    region: 'west',
    gender: 'female',
    birthYear: 1831,
    deathYear: 1897,
    description: 'India\'s first female teacher who fought against caste discrimination and pioneered women\'s education. She faced daily violence for teaching girls and lower-caste children, but never gave up her mission.',
    image: 'https://images.pexels.com/photos/8111299/pexels-photo-8111299.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    readingTime: '28 min',
    listeningTime: '20 min',
    historicalContext: '19th century India considered women intellectually inferior and forbidden from education. The idea of a woman teaching was blasphemous. Lower castes were denied education entirely, and any attempt to educate them was met with violent opposition from orthodox society.',
    chapters: [
      {
        id: 1,
        title: 'The Unlikely Revolutionary',
        content: `Born in 1831 in a Mali (gardener) family in Maharashtra, Savitribai Phule was married at the age of 9 to Jyotirao Phule. In a society where girls were not allowed to step out of their homes, let alone get educated, Savitribai was illiterate at the time of her marriage.

However, her husband Jyotirao was a social reformer who believed in women's education. He taught Savitribai to read and write, making her one of the first literate women in Maharashtra. But Jyotirao had a bigger vision - he wanted Savitribai to become a teacher.

The idea of a woman teaching was revolutionary and blasphemous in 19th century India. Women were considered intellectually inferior and were forbidden from acquiring knowledge, especially if they belonged to lower castes. But Savitribai was determined to break these barriers.

When Jyotirao first suggested that she should teach, Savitribai was terrified. She knew the consequences - social ostracism, physical violence, and complete rejection by society. But she also understood the importance of education. She had experienced the power of literacy in her own life.

The transformation from an illiterate child bride to a confident teacher was not easy. Savitribai had to overcome not just external opposition, but also her own fears and doubts. She had to believe in herself when the entire world told her she was worthless.`,
        annotation: 'In 19th century India, the idea of women teaching was considered against natural law and social order. Savitribai\'s journey from illiteracy to becoming India\'s first female teacher was truly revolutionary.',
        emotionalTone: 'Personal transformation against overwhelming odds'
      },
      {
        id: 2,
        title: 'The Pioneer of Education',
        content: `On January 3, 1848, Savitribai opened the first school for girls in Pune. She became India's first female teacher, facing tremendous opposition from orthodox society. Upper-caste men would throw stones, cow dung, and filth at her as she walked to school.

Savitribai would carry an extra sari to change into when she reached school, as her clothes would be soiled by the attackers. But she never gave up. "Education is the milk of a lioness, whoever drinks it will roar," she would tell her students.

She and Jyotirao established 18 schools for girls and lower-caste children. They also opened a care center for pregnant rape victims and started the first home for upper-caste widows. Savitribai personally cared for these marginalized women, defying all social norms.

Every day was a battle. Orthodox Brahmins declared that her schools were polluting society. They organized boycotts against anyone who supported her work. They threatened violence against her students' families. But Savitribai persisted.

She understood that education was not just about reading and writing - it was about dignity, self-respect, and the power to question injustice. She was not just teaching alphabets - she was teaching her students to dream of a better world.

Her students were not just learning lessons - they were learning to believe in themselves. For the first time in their lives, these girls and lower-caste children were told that they were intelligent, capable, and worthy of respect.`,
        annotation: 'Savitribai established 18 schools, becoming the architect of women\'s education in India, facing daily physical attacks for her work. Her courage laid the foundation for modern Indian education.',
        emotionalTone: 'Daily courage in the face of systematic violence'
      },
      {
        id: 3,
        title: 'The Social Revolutionary',
        content: `Savitribai's work extended beyond education. She fought against the practice of child marriage, widow head shaving, and Sati. She organized women's rights meetings and formed the first women's rights organization in India.

During the plague epidemic of 1897, she and Jyotirao opened a clinic for plague patients. When Jyotirao died of plague, 60-year-old Savitribai continued the work alone. She herself contracted plague while serving patients and died on March 10, 1897.

Her last poem reflected her life's mission: "Go, get education, be self-reliant, be industrious, work, gather wisdom and riches, all gets lost without knowledge, we become animal without wisdom, be wise and be a human being."

She died as she lived - serving humanity and fighting for justice, without expecting any recognition or reward. Her funeral was attended by thousands of people whose lives she had touched - students, teachers, widows, and social reformers.

Savitribai proved that real revolution begins with education. She showed that one person's courage can change the destiny of an entire society. She demonstrated that the greatest service to humanity is to help others discover their own potential.

Her legacy is not just in the schools she built or the students she taught - it is in the idea that every human being, regardless of gender or caste, has the right to education, dignity, and self-determination.`,
        annotation: 'Savitribai died serving plague victims, embodying her lifelong commitment to serving marginalized communities. Her sacrifice established the principle that education is a fundamental human right.',
        emotionalTone: 'Ultimate sacrifice for the greater good'
      }
    ],
    quotes: [
      "Education is the milk of a lioness, whoever drinks it will roar",
      "Go, get education, be self-reliant, be industrious",
      "Without knowledge, we become animals; with wisdom, we become human",
      "All gets lost without knowledge"
    ],
    legacy: 'Savitribai Phule is considered the mother of women\'s education in India. Her pioneering work laid the foundation for women\'s rights movements and educational reforms that continue today. She proved that education is the most powerful tool for social transformation.',
    modernRelevance: 'In a world where millions of girls still lack access to education, Savitribai\'s example reminds us that education is not a privilege but a right. Her courage in facing violence for teaching others continues to inspire educators and activists worldwide.',
    audioUrl: null,
    voiceNarrationStyle: 'Gentle but determined female voice with background sounds of children learning and traditional Marathi music'
  },
  // ADD YOUR NEW STORY HERE - Example template:
  {
    id: 'new-hero-example',
    title: 'Hero Name',
    subtitle: 'Hero Description',
    heroType: 'weapon', // Choose from: weapon, writing, revolt, words
    conditions: ['discrimination'], // Choose from available conditions
    era: 'colonial', // Choose from: ancient, medieval, colonial, modern
    region: 'north', // Choose from: north, south, east, west, central, northeast
    gender: 'male', // male or female
    birthYear: 1800,
    deathYear: 1900,
    description: 'Brief compelling description of the hero and their significance...',
    image: 'https://images.pexels.com/photos/XXXXXXX/pexels-photo-XXXXXXX.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false, // true for featured stories
    readingTime: '25 min',
    listeningTime: '18 min',
    historicalContext: 'The historical background and context of their times...',
    chapters: [
      {
        id: 1,
        title: 'Chapter Title',
        content: `Chapter content with multiple paragraphs...

Each paragraph should be separated by double line breaks.

This creates proper formatting when displayed.`,
        annotation: 'Historical context or explanation for this chapter...',
        emotionalTone: 'The emotional tone of this chapter'
      }
      // Add more chapters as needed
    ],
    quotes: [
      "Famous quote 1",
      "Famous quote 2"
    ],
    legacy: 'Their lasting impact and significance...',
    modernRelevance: 'How their story relates to today\'s world...',
    audioUrl: null, // Will be added when audio is available
    voiceNarrationStyle: 'Description of the planned audio narration style...'
  }
];

export const getStoryById = (id) => stories.find(story => story.id === id);

export const getFilteredStories = (filters) => {
  return stories.filter(story => {
    if (filters.heroType && story.heroType !== filters.heroType) return false;
    if (filters.era && story.era !== filters.era) return false;
    if (filters.region && story.region !== filters.region) return false;
    if (filters.gender && story.gender !== filters.gender) return false;
    if (filters.conditions && filters.conditions.length > 0) {
      const hasCondition = filters.conditions.some(condition => 
        story.conditions.includes(condition)
      );
      if (!hasCondition) return false;
    }
    return true;
  });
};

export const getFeaturedStories = () => stories.filter(story => story.featured);

export const getStoriesByHeroType = (heroType) => stories.filter(story => story.heroType === heroType);

export const getStoriesByCondition = (condition) => stories.filter(story => story.conditions.includes(condition));

export const getStoriesByEra = (era) => stories.filter(story => story.era === era);

export const getStoriesByRegion = (region) => stories.filter(story => story.region === region);