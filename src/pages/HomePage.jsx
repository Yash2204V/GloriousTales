import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import StoryCard from '@/components/StoryCard';
import SubscriptionForm from '@/components/SubscriptionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Crown, Heart, Star, Users, BookOpen, Award, Scroll, Headphones } from 'lucide-react';
import { heroTypes } from '@/data/stories';
import { storiesAPI } from '@/utils/api';

const HomePage = () => {
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      try {
        const res = await storiesAPI.getFeatured();
        setFeaturedStories(res.stories || []);
      } catch (err) {
        setError(err.message || 'Failed to load featured stories');
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedStories();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 dark:bg-orange-900 dark:text-orange-200">
            <Crown className="h-4 w-4" />
            <span>Authentic Stories of India's Greatest Heroes</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight dark:text-white">
            Glorious Tales
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Stories of Grit & Glory
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
            Experience the raw, unfiltered stories of India's freedom fighters, spiritual giants, 
            revolutionaries, and wisdom legends. Stories that give them the justice they deserve.
          </p>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 mb-8 max-w-4xl mx-auto dark:bg-orange-900/20 dark:border-orange-400">
            <p className="text-lg italic text-orange-800 dark:text-orange-200">
              "This is not just storytelling — this is a mirror of time. Let people walk with those 
              who bled for truth, wrote in fire, and died unheard."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/stories">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Stories
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20">
                <Heart className="h-5 w-5 mr-2" />
                Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Why Our Stories Are Different</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              We tell the complete truth - the pain, the struggle, the brutal reality, and the unshakable resolve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors dark:bg-orange-900 dark:group-hover:bg-orange-800">
                  <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">Authentic & Raw</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No sugar-coating. We present the harsh realities, struggles, and true circumstances of their times.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors dark:bg-orange-900 dark:group-hover:bg-orange-800">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">Untold Struggles</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We highlight the personal battles - widowhood, discrimination, poverty - that shaped their strength.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors dark:bg-orange-900 dark:group-hover:bg-orange-800">
                  <Headphones className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">Immersive Experience</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Read or listen with beautiful narration, smooth transitions, and captivating visuals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Format Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center dark:text-white">
              <Scroll className="h-8 w-8 mr-3 text-orange-600 dark:text-orange-400" />
              Our Story Format Blueprint
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Every story follows a consistent emotional structure that creates deep connection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Historical Context", desc: "The era, social conditions, and prevailing mindset" },
              { step: 2, title: "Childhood & Early Life", desc: "Birthplace, upbringing, and cultural influences" },
              { step: 3, title: "Sufferings", desc: "Personal battles, discrimination, and hardships" },
              { step: 4, title: "Struggles & Stand", desc: "How they evolved through action and sacrifice" },
              { step: 5, title: "Milestone Acts", desc: "Key moments of courage and revolution" },
              { step: 6, title: "Legacy Message", desc: "What they left behind and why they matter today" }
            ].map((item) => (
              <Card key={item.step} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Types Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Types of Warriors</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Each fought in their own way, with their own weapons of choice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroTypes.map((type) => (
              <Link key={type.id} to={`/stories?heroType=${type.id}`}>
                <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-2 dark:text-white dark:group-hover:text-orange-400">
                      {type.label}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Featured Stories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Handpicked stories that showcase the depth of human courage and sacrifice.
              </p>
            </div>
            <Link to="/stories">
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20">
                View All Stories
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-12 text-gray-400">Loading featured stories...</div>
            ) : error ? (
              <div className="col-span-3 text-center py-12 text-red-500">{error}</div>
            ) : featuredStories.length > 0 ? (
              featuredStories.map((story) => (
                <StoryCard key={story._id || story.id} story={story} featured={true} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-400">No featured stories available</div>
            )}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <SubscriptionForm />
        </div>
      </section>
    </div>
  );
};

export default HomePage;