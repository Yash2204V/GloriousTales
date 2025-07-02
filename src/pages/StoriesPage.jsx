import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import StoryCard from '@/components/StoryCard';
import FilterPanel from '@/components/FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { getFilteredStories, stories } from '@/data/stories';

const StoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    heroType: searchParams.get('heroType') || null,
    era: searchParams.get('era') || null,
    region: searchParams.get('region') || null,
    gender: searchParams.get('gender') || null,
    conditions: searchParams.get('conditions')?.split(',').filter(Boolean) || [],
  });

  const filteredStories = getFilteredStories(filters).filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.heroType) params.set('heroType', filters.heroType);
    if (filters.era) params.set('era', filters.era);
    if (filters.region) params.set('region', filters.region);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.conditions && filters.conditions.length > 0) {
      params.set('conditions', filters.conditions.join(','));
    }
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      heroType: null,
      era: null,
      region: null,
      gender: null,
      conditions: [],
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.heroType) count++;
    if (filters.era) count++;
    if (filters.region) count++;
    if (filters.gender) count++;
    if (filters.conditions && filters.conditions.length > 0) count += filters.conditions.length;
    return count;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">All Stories</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover the authentic tales of India's greatest heroes and their incredible journeys.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search stories by name, description, or subtitle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredStories.length} of {stories.length} stories
            {searchTerm && (
              <span className="ml-1">
                for "<span className="font-medium">{searchTerm}</span>"
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-20">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-50 bg-white overflow-y-auto dark:bg-gray-900">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold dark:text-white">Filters</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          )}

          {/* Stories Grid */}
          <div className="flex-1">
            {filteredStories.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 dark:text-white">No stories found</h3>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Try adjusting your search terms or filters to find more stories.
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;