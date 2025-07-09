import Navigation from '@/components/Navigation';
import SuggestionForm from '@/components/SuggestionForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Target, Users, BookOpen, Award, Crown, Scroll, Flame, Sword, MessageCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 dark:bg-orange-900 dark:text-orange-200">
            <Crown className="h-4 w-4" />
            <span>Our Mission</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 dark:text-white">
            Giving Justice to History's Greatest Souls
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8 dark:text-gray-300">
            This is not just storytelling — this is a mirror of time. Let people walk with those 
            who bled for truth, wrote in fire, and died unheard.
          </p>

          <blockquote className="text-lg italic text-orange-700 bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 dark:text-orange-300 dark:bg-orange-900/20 dark:border-orange-400">
            "No fiction, no fluff — just the <strong>reality of their struggles</strong>, 
            the <strong>brutality of their times</strong>, and their <strong>unshakable resolve</strong>."
          </blockquote>
        </div>

        {/* Story Format Blueprint */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center dark:text-white">
              <Scroll className="h-6 w-6 mr-2 text-orange-600 dark:text-orange-400" />
              Our Story Format Blueprint
            </h2>
            <p className="text-gray-600 mb-6 dark:text-gray-300">Every story follows a consistent emotional structure:</p>
            
            <div className="space-y-4">
              {[
                { step: 1, title: "Historical Context", desc: "The era, prevailing mindset, social conditions, colonial rule, caste/gender biases" },
                { step: 2, title: "Childhood & Early Life", desc: "Birthplace, upbringing, cultural influence, early environment" },
                { step: 3, title: "Sufferings", desc: "Poverty, widowhood, mental trauma, discrimination, societal rejection, shame" },
                { step: 4, title: "Struggles & Stand", desc: "How they evolved — through action, rebellion, speech, art, or sacrifice" },
                { step: 5, title: "Milestone Acts", desc: "Key moments of courage, war, writing, or revolution" },
                { step: 6, title: "Legacy Message", desc: "What they left behind, and why they still matter today" }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 dark:text-white">{item.title}</h4>
                    <p className="text-gray-700 text-sm dark:text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center dark:bg-orange-900">
                  <Heart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Raw & Authentic</h3>
              </div>
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                We tell the complete truth - the pain, the struggle, the brutal reality of their 
                times, and their unshakable resolve. No fiction, no fluff, just the reality 
                that gives them the justice they deserve.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center dark:bg-orange-900">
                  <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Untold Struggles</h3>
              </div>
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                We highlight the personal battles often overlooked by history - widowhood, 
                mental stress, caste discrimination, poverty, and social rejection. These 
                conditions shaped their extraordinary strength.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Types of Warriors */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Types of Warriors We Honor</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                <Sword className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">⚔️ Warrior by Weapon</h4>
                  <p className="text-gray-600 text-sm dark:text-gray-300">Maharana Pratap, Rani Laxmi Bai</p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Those who fought with sword and shield for freedom</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                <BookOpen className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">✍️ Warrior by Writing</h4>
                  <p className="text-gray-600 text-sm dark:text-gray-300">Bhagat Singh, Subramania Bharati</p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Revolutionary thinkers who used pen as their weapon</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                <Flame className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">🔥 Warrior by Revolt</h4>
                  <p className="text-gray-600 text-sm dark:text-gray-300">Birsa Munda, Mangal Pandey</p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Leaders who sparked uprisings against oppression</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                <MessageCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">💬 Warrior by Words</h4>
                  <p className="text-gray-600 text-sm dark:text-gray-300">Kabir Sahab, Swami Vivekananda</p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Spiritual giants who transformed minds through wisdom</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Condition Tags */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Life Conditions We Highlight</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-300">
              These tags bring <strong>raw visibility</strong> to their hidden struggles — not just glory, but pain too.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '💔', label: 'Widow', desc: 'Faced the harsh reality of widowhood' },
                { icon: '♿', label: 'Paralyzed', desc: 'Overcame physical disabilities' },
                { icon: '🧠', label: 'Mentally Stressed', desc: 'Battled mental trauma while fighting' },
                { icon: '🚫', label: 'Social Outcast', desc: 'Rejected by society but never gave up' },
                { icon: '⚖️', label: 'Caste Discrimination', desc: 'Faced systematic oppression' },
                { icon: '🩸', label: 'Victim of Violence', desc: 'Endured violence but emerged stronger' }
              ].map((condition, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <span className="text-lg">{condition.icon}</span>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm dark:text-white">{condition.label}</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{condition.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Makes Us Different */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">What Makes Our Stories Different</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Consistent Emotional Structure</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Every story follows a powerful format: Historical Context → Childhood → Sufferings → 
                    Struggles → Milestone Acts → Legacy. This creates deep emotional connection.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Condition-Based Filtering</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    We categorize heroes by their life conditions - widow, paralyzed, mentally stressed, 
                    social outcast - making their struggles visible and relatable.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Immersive Experience</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Book-like reading with smooth transitions, authentic imagery, and upcoming audio 
                    narration with Indian classical music backgrounds.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Voice Narration Style</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Human-like, emotionally powerful voices inspired by authentic storytelling. 
                    Female voices carry grace and pain; male voices carry power and restraint.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Who We Serve</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Curious Youth</h4>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  Teenagers seeking authentic historical inspiration beyond textbooks
                </p>
              </div>

              <div className="text-center">
                <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Spiritual Seekers</h4>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  Readers wanting to feel the spiritual journey of great souls
                </p>
              </div>

              <div className="text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Educators</h4>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  Teachers looking for deep cultural resources to inspire students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Expansions */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Future Expansions</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                '📱 Mobile App (Android/iOS)',
                '📤 Public Upload Portal ("Submit your grandfather\'s story")',
                '📚 Ancient Wisdom Series – Guru-disciple stories',
                '🏛 Collaboration with museums & archives',
                '🌐 Multi-lingual: Tamil, Marathi, Kannada, Urdu, Bengali',
                '🎵 Full audio experiences with Indian classical music'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                  <span className="text-sm dark:text-white">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggestion Form */}
        <div className="mb-12">
          <SuggestionForm />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
            Ready to Experience Real History?
          </h2>
          <p className="text-gray-600 mb-8 dark:text-gray-300">
            Join us in honoring those who changed the course of history through their 
            courage, sacrifice, and unwavering dedication to truth.
          </p>
          <Link to="/stories">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Stories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;