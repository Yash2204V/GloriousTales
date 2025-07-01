import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, MapPin, Heart, Headphones } from 'lucide-react';
import { heroTypes, conditions, eras, regions } from '@/data/stories';

const StoryCard = ({ story, featured = false }) => {
  const heroType = heroTypes.find(type => type.id === story.heroType);
  const era = eras.find(e => e.id === story.era);
  const region = regions.find(r => r.id === story.region);
  const storyConditions = conditions.filter(c => story.conditions.includes(c.id));

  return (
    <Link to={`/story/${story.id}`} className="block group">
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        featured ? 'ring-2 ring-orange-200' : ''
      }`}>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-orange-600 text-white">
                <Heart className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {heroType?.icon} {heroType?.label}
            </Badge>
          </div>
          {story.audioUrl && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-orange-600 text-white">
                <Headphones className="h-3 w-3 mr-1" />
                Audio
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                {story.title}
              </h3>
              <p className="text-sm text-orange-600 font-medium">{story.subtitle}</p>
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {story.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {storyConditions.slice(0, 2).map(condition => (
                <Badge key={condition.id} variant="outline" className="text-xs">
                  {condition.icon} {condition.label}
                </Badge>
              ))}
              {storyConditions.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{storyConditions.length - 2} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{era?.period}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{region?.label}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{story.readingTime}</span>
                </div>
                {story.listeningTime && (
                  <div className="flex items-center space-x-1">
                    <Headphones className="h-3 w-3" />
                    <span>{story.listeningTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StoryCard;