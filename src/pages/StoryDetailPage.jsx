import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  Headphones, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Quote,
  Heart,
  Share2,
  Scroll,
  Globe
} from 'lucide-react';
import { getStoryById, heroTypes, conditions, eras, regions } from '@/data/stories';

const StoryDetailPage = () => {
  const { id } = useParams();
  const story = getStoryById(id);
  const [activeTab, setActiveTab] = useState('read');
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  if (!story) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-8">The story you're looking for doesn't exist.</p>
          <Link to="/stories">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const heroType = heroTypes.find(type => type.id === story.heroType);
  const era = eras.find(e => e.id === story.era);
  const region = regions.find(r => r.id === story.region);
  const storyConditions = conditions.filter(c => story.conditions.includes(c.id));

  const handleListenMode = () => {
    setActiveTab('listen');
    setShowAudioPlayer(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/stories" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Stories</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <div className="aspect-[21/9] overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {heroType?.icon} {heroType?.label}
                </Badge>
                {storyConditions.slice(0, 2).map(condition => (
                  <Badge key={condition.id} variant="outline" className="bg-white/20 text-white border-white/30">
                    {condition.icon} {condition.label}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-2">{story.title}</h1>
              <p className="text-xl text-orange-200">{story.subtitle}</p>
            </div>
          </div>

          {/* Historical Context */}
          {story.historicalContext && (
            <Card className="mb-6 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Scroll className="h-5 w-5 mr-2 text-orange-600" />
                  Historical Context
                </h3>
                <p className="text-gray-700 leading-relaxed italic">
                  {story.historicalContext}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Story Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Story Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{story.birthYear} - {story.deathYear}</span>
                    <span className="text-gray-400">•</span>
                    <span>{era?.period}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{region?.label}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="capitalize">{story.gender}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{story.readingTime} read</span>
                    {story.listeningTime && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span>{story.listeningTime} listen</span>
                      </>
                    )}
                  </div>
                  {story.voiceNarrationStyle && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Headphones className="h-4 w-4" />
                      <span className="text-xs">{story.voiceNarrationStyle}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Life Conditions</h3>
                <div className="space-y-2">
                  {storyConditions.map(condition => (
                    <div key={condition.id} className="flex items-center space-x-2 text-sm">
                      <span className="text-lg">{condition.icon}</span>
                      <div>
                        <span className="text-gray-700 font-medium">{condition.label}</span>
                        {condition.description && (
                          <p className="text-xs text-gray-500">{condition.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {storyConditions.length === 0 && (
                    <p className="text-sm text-gray-500">No specific hardships documented.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 flex-1 sm:flex-none"
              onClick={() => setActiveTab('read')}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Read Story
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50 flex-1 sm:flex-none"
              onClick={handleListenMode}
            >
              <Headphones className="h-5 w-5 mr-2" />
              Listen Story
            </Button>
            <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="read" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Read</span>
            </TabsTrigger>
            <TabsTrigger value="listen" className="flex items-center space-x-2">
              <Headphones className="h-4 w-4" />
              <span>Listen</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="read" className="mt-8">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <p className="text-xl text-gray-700 leading-relaxed italic">
                  {story.description}
                </p>
              </div>

              {story.chapters.map((chapter, index) => (
                <Card key={chapter.id} className="mb-8">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{chapter.title}</h2>
                      {chapter.emotionalTone && (
                        <Badge variant="outline" className="text-xs text-orange-600">
                          {chapter.emotionalTone}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {chapter.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {chapter.annotation && (
                      <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-600 rounded-r-lg">
                        <p className="text-sm text-orange-800 italic">
                          <strong>Historical Context:</strong> {chapter.annotation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Quotes Section */}
              {story.quotes && story.quotes.length > 0 && (
                <Card className="mb-8 bg-gradient-to-br from-orange-50 to-yellow-50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Quote className="h-6 w-6 mr-2 text-orange-600" />
                      Memorable Quotes
                    </h3>
                    <div className="space-y-4">
                      {story.quotes.map((quote, index) => (
                        <blockquote key={index} className="border-l-4 border-orange-600 pl-4">
                          <p className="text-lg text-gray-800 italic">"{quote}"</p>
                          <footer className="text-sm text-orange-600 mt-2">— {story.title}</footer>
                        </blockquote>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Legacy Section */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Heart className="h-6 w-6 mr-2 text-red-500" />
                    Legacy & Impact
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {story.legacy}
                  </p>
                  
                  {story.modernRelevance && (
                    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Modern Relevance
                      </h4>
                      <p className="text-blue-800 text-sm">
                        {story.modernRelevance}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listen" className="mt-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Headphones className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Audio Experience</h3>
                  <p className="text-gray-600">
                    Listen to this story with immersive narration and background music.
                  </p>
                  {story.voiceNarrationStyle && (
                    <p className="text-sm text-orange-600 mt-2 italic">
                      Voice Style: {story.voiceNarrationStyle}
                    </p>
                  )}
                </div>
                
                {story.audioUrl ? (
                  <div>
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => setShowAudioPlayer(true)}
                    >
                      <Headphones className="h-5 w-5 mr-2" />
                      Start Listening
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Duration: {story.listeningTime}
                    </p>
                  </div>
                ) : (
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <p className="text-orange-800 mb-4">
                      Audio version coming soon! We're working on creating an immersive audio experience 
                      with authentic Indian classical music and professional narration.
                    </p>
                    <div className="text-sm text-orange-700 mb-4">
                      <p><strong>Planned Audio Features:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Human-like emotional narration</li>
                        <li>Background sounds: bansuri, tanpura, tabla</li>
                        <li>Chapter-wise audio navigation</li>
                        <li>Rewind 10s, highlight line features</li>
                      </ul>
                    </div>
                    <Button
                      variant="outline"
                      className="border-orange-600 text-orange-600 hover:bg-orange-50"
                      onClick={() => setActiveTab('read')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Instead
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Audio Player */}
      {showAudioPlayer && story.audioUrl && (
        <AudioPlayer
          story={story}
          isVisible={showAudioPlayer}
        />
      )}
    </div>
  );
};

export default StoryDetailPage;