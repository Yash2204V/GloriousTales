import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  MessageSquare, 
  Users, 
  BookOpen,
  BarChart3,
  LogOut,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { adminAPI, storiesAPI, commentsAPI, suggestionsAPI } from '@/utils/api';
import Navigation from '@/components/Navigation';
import { conditions as CONDITIONS_ENUM } from '@/data/stories';

const conditionOptions = [
  { value: 'widow', label: 'Widow' },
  { value: 'paralyzed', label: 'Paralyzed' },
  { value: 'mentally-stressed', label: 'Mentally Stressed' },
  { value: 'social-outcast', label: 'Social Outcast' },
  { value: 'caste-discrimination', label: 'Caste Discrimination' },
  { value: 'victim-violence', label: 'Victim of Violence' },
];

const AdminStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [comments, setComments] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stories');
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const defaultStoryForm = {
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    image: '',
    heroType: '',
    era: '',
    region: '',
    gender: '',
    birthYear: '',
    deathYear: '',
    readingTime: '',
    listeningTime: '',
    conditions: [],
    historicalContext: '',
    chapters: [],
    quotes: [],
    legacy: '',
    modernRelevance: '',
    voiceNarrationStyle: '',
    audioUrl: '',
    isPublished: false,
    isFeatured: false
  };
  const [storyForm, setStoryForm] = useState(defaultStoryForm);

  // Utility to generate slug from title
  function generateSlug(title, existingSlugs = []) {
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/--+/g, '-');
    let slug = baseSlug;
    let counter = 1;
    while (existingSlugs.includes(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch all data in parallel
      const [storiesData, commentsData, suggestionsData, statsData] = await Promise.all([
        storiesAPI.adminGetAll(),
        commentsAPI.adminGetAll(),
        suggestionsAPI.adminGetAll(),
        adminAPI.getDashboardStats()
      ]);

      setStories(storiesData.stories || []);
      setComments(commentsData.comments || []);
      setSuggestions(suggestionsData.suggestions || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    let updatedForm = { ...storyForm, [name]: newValue };
    if (name === 'title') {
      // Generate unique slug from title
      const existingSlugs = stories.map(s => s.slug).filter(s => editingStory ? s !== editingStory.slug : true);
      updatedForm.slug = generateSlug(newValue, existingSlugs);
    }
    setStoryForm(updatedForm);
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    // Validate chapters JSON
    let chapters = storyForm.chapters;
    let quotes = storyForm.quotes;
    try {
      if (typeof chapters === 'string') {
        chapters = JSON.parse(chapters);
        if (!Array.isArray(chapters)) throw new Error();
      }
    } catch {
      setFormError('Chapters must be a valid JSON array.');
      return;
    }
    try {
      if (typeof quotes === 'string') {
        quotes = JSON.parse(quotes);
        if (!Array.isArray(quotes) || !quotes.every(q => typeof q === 'string')) throw new Error();
      }
    } catch {
      setFormError('Quotes must be a valid JSON array of strings.');
      return;
    }
    // Validate Audio URL (optional, but if present must be a valid URL)
    if (storyForm.audioUrl && storyForm.audioUrl !== '' && storyForm.audioUrl !== null) {
      try {
        new URL(storyForm.audioUrl);
      } catch {
        setFormError('Audio URL must be a valid URL or left blank.');
        return;
      }
    }
    try {
      let data;
      const storyPayload = {
        ...storyForm,
        chapters,
        quotes,
        birthYear: parseInt(storyForm.birthYear),
        deathYear: parseInt(storyForm.deathYear),
      };
      if (editingStory) {
        data = await storiesAPI.adminUpdate(editingStory._id, storyPayload);
      } else {
        data = await storiesAPI.adminCreate(storyPayload);
      }
      if (data) {
        toast({ title: 'Success', description: editingStory ? 'Story updated successfully' : 'Story created successfully' });
        setShowStoryForm(false);
        setEditingStory(null);
        setStoryForm(defaultStoryForm);
        fetchData();
      } else {
        setFormError('Failed to save story.');
      }
    } catch (error) {
      setFormError('Failed to save story.');
    }
  };

  const handleCommentAction = async (commentId, action, value) => {
    try {
      await commentsAPI.adminUpdateStatus(commentId, { [action]: value });
      toast({
        title: "Success",
        description: "Comment updated successfully",
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update comment",
        variant: "destructive"
      });
    }
  };

  const handleSuggestionAction = async (suggestionId, status) => {
    try {
      await suggestionsAPI.adminUpdateStatus(suggestionId, { status });
      toast({
        title: "Success",
        description: "Suggestion updated successfully",
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update suggestion",
        variant: "destructive"
      });
    }
  };

  const openStoryForm = (story = null) => {
    if (story) {
      setEditingStory(story);
      setStoryForm({
        title: story.title,
        slug: story.slug,
        subtitle: story.subtitle,
        description: story.description,
        image: story.image,
        heroType: story.heroType,
        era: story.era,
        region: story.region,
        gender: story.gender,
        birthYear: story.birthYear,
        deathYear: story.deathYear,
        readingTime: story.readingTime,
        listeningTime: story.listeningTime,
        conditions: story.conditions || [],
        historicalContext: story.historicalContext,
        chapters: story.chapters || [],
        quotes: story.quotes || [],
        legacy: story.legacy,
        modernRelevance: story.modernRelevance,
        voiceNarrationStyle: story.voiceNarrationStyle,
        audioUrl: story.audioUrl,
        isPublished: story.isPublished,
        isFeatured: story.isFeatured
      });
    } else {
      setEditingStory(null);
      setStoryForm(defaultStoryForm);
    }
    setShowStoryForm(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Glorious Tales Admin
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage stories, comments, and suggestions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="text-gray-600 dark:text-gray-400"
              >
                View Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-950/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Stories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.stories?.total || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.comments?.total || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Suggestions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.suggestions?.total || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.subscriptions?.total || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === 'stories' ? 'default' : 'outline'}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </Button>
          <Button
            variant={activeTab === 'comments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('comments')}
          >
            Comments
          </Button>
          <Button
            variant={activeTab === 'suggestions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions
          </Button>
        </div>

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Stories</h2>
              <Dialog open={showStoryForm} onOpenChange={setShowStoryForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => openStoryForm()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Story
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby="story-form-desc" className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div id="story-form-desc" className="sr-only">
                    Fill out the story details below. All fields are required unless marked optional.
                  </div>
                  <DialogHeader>
                    <DialogTitle>
                      {editingStory ? 'Edit Story' : 'Add New Story'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleStorySubmit} className="space-y-4">
                    {formError && <div className="text-red-600 font-medium mb-2">{formError}</div>}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input value={storyForm.title} onChange={handleInputChange} name="title" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <Input value={storyForm.subtitle} onChange={handleInputChange} name="subtitle" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <Input value={storyForm.image} onChange={handleInputChange} name="image" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea value={storyForm.description} onChange={handleInputChange} name="description" rows={3} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Hero Type</label>
                        <select value={storyForm.heroType} onChange={handleInputChange} name="heroType" className="w-full p-2 border rounded-md" required>
                          <option value="">Select Type</option>
                          <option value="warrior">Warrior</option>
                          <option value="writer">Writer</option>
                          <option value="rebel">Rebel</option>
                          <option value="spiritual">Spiritual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select value={storyForm.gender} onChange={handleInputChange} name="gender" className="w-full p-2 border rounded-md" required>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Birth Year</label>
                        <Input type="number" value={storyForm.birthYear} onChange={handleInputChange} name="birthYear" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Death Year</label>
                        <Input type="number" value={storyForm.deathYear} onChange={handleInputChange} name="deathYear" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Era</label>
                        <Input value={storyForm.era} onChange={handleInputChange} name="era" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Region</label>
                        <Input value={storyForm.region} onChange={handleInputChange} name="region" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reading Time</label>
                      <Input value={storyForm.readingTime} onChange={handleInputChange} name="readingTime" placeholder="e.g., 15 min" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Listening Time</label>
                      <Input value={storyForm.listeningTime} onChange={handleInputChange} name="listeningTime" placeholder="e.g., 10 min" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Conditions</label>
                      <div className="flex flex-wrap gap-4">
                        {conditionOptions.map(opt => (
                          <label key={opt.value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={storyForm.conditions.includes(opt.value)}
                              onChange={handleInputChange}
                              name={`conditions-${opt.value}`}
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Historical Context</label>
                      <Textarea value={storyForm.historicalContext} onChange={handleInputChange} name="historicalContext" rows={3} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Chapters (JSON array)</label>
                      <Textarea value={typeof storyForm.chapters === 'string' ? storyForm.chapters : JSON.stringify(storyForm.chapters, null, 2)} onChange={handleInputChange} name="chapters" rows={4} placeholder='[{"id":"1","title":"Intro","content":"..."}]' />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quotes (JSON array)</label>
                      <Textarea value={typeof storyForm.quotes === 'string' ? storyForm.quotes : JSON.stringify(storyForm.quotes, null, 2)} onChange={handleInputChange} name="quotes" rows={2} placeholder='["Quote 1", "Quote 2"]' />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Legacy</label>
                      <Textarea value={storyForm.legacy} onChange={handleInputChange} name="legacy" rows={3} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Modern Relevance</label>
                      <Textarea value={storyForm.modernRelevance} onChange={handleInputChange} name="modernRelevance" rows={2} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Voice Narration Style</label>
                      <Input value={storyForm.voiceNarrationStyle} onChange={handleInputChange} name="voiceNarrationStyle" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Audio URL</label>
                      <Input value={storyForm.audioUrl} onChange={handleInputChange} name="audioUrl" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="isPublished" checked={storyForm.isPublished} onChange={handleInputChange} name="isPublished" />
                        <label htmlFor="isPublished" className="text-sm font-medium">Publish immediately</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="isFeatured" checked={storyForm.isFeatured} onChange={handleInputChange} name="isFeatured" />
                        <label htmlFor="isFeatured" className="text-sm font-medium">Featured</label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowStoryForm(false)}>Cancel</Button>
                      <Button type="submit">{editingStory ? 'Update Story' : 'Create Story'}</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card key={story._id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{story.title}</h3>
                      <Badge variant={story.isPublished ? 'default' : 'secondary'}>
                        {story.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {story.description}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => openStoryForm(story)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/story/${story._id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Comments</h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{comment.name}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{comment.storyId?.title}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          {comment.rating && (
                            <span>Rating: {comment.rating}/5</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!comment.isApproved && (
                          <Button
                            size="sm"
                            onClick={() => handleCommentAction(comment._id, 'isApproved', true)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        {comment.isApproved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCommentAction(comment._id, 'isApproved', false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Suggestions</h2>
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{suggestion.legendName}</span>
                          <Badge variant="outline">{suggestion.heroType}</Badge>
                          <Badge variant={suggestion.status === 'pending' ? 'secondary' : 'default'}>
                            {suggestion.status}
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{suggestion.description}</p>
                        <div className="text-sm text-gray-500">
                          <p>Suggested by: {suggestion.name} ({suggestion.email})</p>
                          <p>Era: {suggestion.era} • Region: {suggestion.region}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {suggestion.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSuggestionAction(suggestion._id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuggestionAction(suggestion._id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStoriesPage; 