import React, { useState, useEffect, useRef } from 'react';
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
  Settings,
  Info,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { adminAPI, storiesAPI, commentsAPI, suggestionsAPI } from '@/utils/api';
import Navigation from '@/components/Navigation';
import { conditions as CONDITIONS_ENUM, heroTypes, eras, regions } from '@/data/stories';

const conditionOptions = [
  { value: 'widow', label: 'Widow' },
  { value: 'paralyzed', label: 'Paralyzed' },
  { value: 'mentally-stressed', label: 'Mentally Stressed' },
  { value: 'social-outcast', label: 'Social Outcast' },
  { value: 'caste-discrimination', label: 'Caste Discrimination' },
  { value: 'victim-violence', label: 'Victim of Violence' },
];

// Add a helper for tooltips
const Tooltip = ({ text }) => (
  <span className="ml-1 text-gray-400 cursor-pointer group relative">
    <HelpCircle className="inline w-4 h-4" />
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 z-10 transition-opacity pointer-events-none">
      {text}
    </span>
  </span>
);

// Multi-step form steps
const steps = [
  'Basic Info',
  'Details',
  'Content',
  'Extras',
  'Review'
];

const fieldGroups = [
  // Step 1: Basic Info
  [
    { label: 'Title', name: 'title', required: true },
    { label: 'Subtitle', name: 'subtitle', required: true },
    { label: 'Image URL', name: 'image', required: true },
    { label: 'Hero Type', name: 'heroType', required: true, type: 'select', options: [
      { value: '', label: 'Select Type' },
      { value: 'warrior', label: 'Warrior' },
      { value: 'writer', label: 'Writer' },
      { value: 'rebel', label: 'Rebel' },
      { value: 'spiritual', label: 'Spiritual' },
    ] },
    { label: 'Gender', name: 'gender', required: true, type: 'select', options: [
      { value: '', label: 'Select Gender' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ] },
  ],
  // Step 2: Details
  [
    { label: 'Birth Year', name: 'birthYear', required: true, type: 'number' },
    { label: 'Death Year', name: 'deathYear', required: true, type: 'number' },
    { label: 'Era', name: 'era', required: true },
    { label: 'Region', name: 'region', required: true },
    { label: 'Reading Time', name: 'readingTime', required: true, placeholder: 'e.g., 15 min' },
    { label: 'Listening Time', name: 'listeningTime', placeholder: 'e.g., 10 min' },
    { label: 'Conditions', name: 'conditions', type: 'checkbox-group', options: conditionOptions },
  ],
  // Step 3: Content
  [
    { label: 'Description', name: 'description', required: true, type: 'textarea' },
    { label: 'Historical Context', name: 'historicalContext', required: true, type: 'textarea' },
    { label: 'Chapters (JSON array)', name: 'chapters', required: true, type: 'textarea', tooltip: 'Enter a JSON array of chapter objects. Example: [{"id":"1","title":"Intro","content":"..."}]' },
    { label: 'Quotes (JSON array)', name: 'quotes', type: 'textarea', tooltip: 'Enter a JSON array of strings. Example: ["Quote 1", "Quote 2"]' },
    { label: 'Legacy', name: 'legacy', required: true, type: 'textarea' },
    { label: 'Modern Relevance', name: 'modernRelevance', type: 'textarea' },
  ],
  // Step 4: Extras
  [
    { label: 'Voice Narration Style', name: 'voiceNarrationStyle' },
    { label: 'Audio URL', name: 'audioUrl', tooltip: 'Must be a valid URL or left blank.' },
    { label: 'Publish immediately', name: 'isPublished', type: 'checkbox' },
    { label: 'Featured', name: 'isFeatured', type: 'checkbox' },
  ],
];

// Template for story input
const storyTemplate = `Title: \nSubtitle: \nImage URL: \nHero Type: \nGender: \nBirth Year: \nDeath Year: \nEra: \nRegion: \nReading Time: \nListening Time: \nConditions: \nDescription: \nHistorical Context: \nChapters: \nQuotes: \nLegacy: \nModern Relevance: \nVoice Narration Style: \nAudio URL: \nPublish: \nFeatured: `;

const parseStoryInput = (input) => {
  const lines = input.split(/\r?\n/);
  const data = {};
  let currentKey = null;
  for (let line of lines) {
    if (/^\w[\w ]*:/i.test(line)) {
      const idx = line.indexOf(':');
      currentKey = line.slice(0, idx).trim();
      data[currentKey] = line.slice(idx + 1).trim();
    } else if (currentKey) {
      data[currentKey] += '\n' + line.trim();
    }
  }
  return data;
};

const mapParsedToStoryForm = (parsed) => {
  return {
    title: parsed['Title'] || '',
    slug: '', // will be generated
    subtitle: parsed['Subtitle'] || '',
    description: parsed['Description'] || '',
    image: parsed['Image URL'] || '',
    heroType: parsed['Hero Type'] || '',
    era: parsed['Era'] || '',
    region: parsed['Region'] || '',
    gender: parsed['Gender'] || '',
    birthYear: parsed['Birth Year'] || '',
    deathYear: parsed['Death Year'] || '',
    readingTime: parsed['Reading Time'] || '',
    listeningTime: parsed['Listening Time'] || '',
    conditions: parsed['Conditions'] ? parsed['Conditions'].split(',').map(s => s.trim()).filter(Boolean) : [],
    historicalContext: parsed['Historical Context'] || '',
    chapters: parsed['Chapters'] ? (() => { try { return JSON.parse(parsed['Chapters']); } catch { return parsed['Chapters']; } })() : [],
    quotes: parsed['Quotes'] ? (() => { try { return JSON.parse(parsed['Quotes']); } catch { return parsed['Quotes']; } })() : [],
    legacy: parsed['Legacy'] || '',
    modernRelevance: parsed['Modern Relevance'] || '',
    voiceNarrationStyle: parsed['Voice Narration Style'] || '',
    audioUrl: parsed['Audio URL'] || '',
    isPublished: /yes|true|1/i.test(parsed['Publish'] || ''),
    isFeatured: /yes|true|1/i.test(parsed['Featured'] || ''),
  };
};

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
  const [storyInput, setStoryInput] = useState(storyTemplate);
  const [previewForm, setPreviewForm] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState({});
  const formRef = useRef();

  const validateStep = () => {
    const group = fieldGroups[currentStep];
    let error = '';
    for (const field of group) {
      if (field.required && !storyForm[field.name]) {
        error = `${field.label} is required.`;
        break;
      }
      if (field.name === 'audioUrl' && storyForm.audioUrl) {
        try { new URL(storyForm.audioUrl); } catch { error = 'Audio URL must be a valid URL.'; break; }
      }
      if (field.name === 'chapters' && storyForm.chapters) {
        try {
          const chapters = typeof storyForm.chapters === 'string' ? JSON.parse(storyForm.chapters) : storyForm.chapters;
          if (!Array.isArray(chapters)) throw new Error();
        } catch { error = 'Chapters must be a valid JSON array.'; break; }
      }
      if (field.name === 'quotes' && storyForm.quotes) {
        try {
          const quotes = typeof storyForm.quotes === 'string' ? JSON.parse(storyForm.quotes) : storyForm.quotes;
          if (!Array.isArray(quotes) || !quotes.every(q => typeof q === 'string')) throw new Error();
        } catch { error = 'Quotes must be a valid JSON array of strings.'; break; }
      }
    }
    setFormError(error);
    return !error;
  };

  const handleNext = () => {
    setTouched({ ...touched, [currentStep]: true });
    if (validateStep()) setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleFieldChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    let updatedForm = { ...storyForm };
    if (field.type === 'checkbox-group') {
      const val = field.options.find(opt => `conditions-${opt.value}` === name)?.value;
      if (checked) {
        updatedForm.conditions = [...(updatedForm.conditions || []), val];
      } else {
        updatedForm.conditions = (updatedForm.conditions || []).filter(v => v !== val);
      }
    } else if (type === 'checkbox') {
      updatedForm[name] = checked;
    } else {
      updatedForm[name] = value;
    }
    if (name === 'title') {
      const existingSlugs = stories.map(s => s.slug).filter(s => editingStory ? s !== editingStory.slug : true);
      updatedForm.slug = generateSlug(value, existingSlugs);
    }
    setStoryForm(updatedForm);
  };

  const handleStoryInputPreview = () => {
    const parsed = parseStoryInput(storyInput);
    const mapped = mapParsedToStoryForm(parsed);
    // Trim all string fields
    Object.keys(mapped).forEach(key => {
      if (typeof mapped[key] === 'string') {
        mapped[key] = mapped[key].trim();
      }
    });
    // Generate slug only if title is non-empty
    if (!mapped.title) {
      setFormError('Title is required and cannot be empty.');
      setShowPreview(false);
      return;
    }
    const existingSlugs = stories.map(s => s.slug);
    mapped.slug = generateSlug(mapped.title, existingSlugs);
    setPreviewForm(mapped);
    setShowPreview(true);
  };

  const handleStoryInputSubmit = async () => {
    setFormError('');
    if (!previewForm) return;
    // Validate required fields
    const requiredFields = ['title','subtitle','description','image','heroType','era','region','gender','birthYear','deathYear','readingTime','historicalContext','chapters','legacy'];
    for (const field of requiredFields) {
      if (!previewForm[field] || (Array.isArray(previewForm[field]) && previewForm[field].length === 0)) {
        setFormError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        return;
      }
    }
    // Validate chapters and quotes
    let chapters = previewForm.chapters;
    let quotes = previewForm.quotes;
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
    // Validate Audio URL
    if (previewForm.audioUrl && previewForm.audioUrl !== '' && previewForm.audioUrl !== null) {
      try { new URL(previewForm.audioUrl); } catch { setFormError('Audio URL must be a valid URL or left blank.'); return; }
    }
    try {
      let data;
      // Always generate slug from trimmed title
      const existingSlugs = stories.map(s => s.slug);
      const slug = generateSlug(previewForm.title.trim(), existingSlugs);
      if (!slug) {
        setFormError('Slug could not be generated. Please provide a valid title.');
        return;
      }
      const storyPayload = {
        ...previewForm,
        slug,
        chapters,
        quotes,
        birthYear: parseInt(previewForm.birthYear),
        deathYear: parseInt(previewForm.deathYear),
      };
      data = await storiesAPI.adminCreate(storyPayload);
      if (data) {
        toast({ title: 'Success', description: 'Story created successfully' });
        setShowStoryForm(false);
        setEditingStory(null);
        setStoryForm(defaultStoryForm);
        setStoryInput(storyTemplate);
        setPreviewForm(null);
        setShowPreview(false);
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
                    Fill out the story details below using the template format. All fields are required unless marked optional.
                  </div>
                  {/* Helper section for valid options */}
                  <div className="mb-4 p-3 bg-orange-50 dark:bg-gray-900 border border-orange-200 dark:border-gray-700 rounded text-sm text-gray-800 dark:text-gray-200">
                    <div className="mb-2 font-semibold">Valid Options:</div>
                    <div className="mb-1"><span className="font-bold">Hero Type:</span> {heroTypes.map(ht => <span key={ht.id} className="inline-block mr-2">{ht.id} <span className="text-gray-500">({ht.label})</span></span>)}</div>
                    <div className="mb-1"><span className="font-bold">Conditions:</span> {conditionOptions.map(c => <span key={c.id} className="inline-block mr-2">{c.id} <span className="text-gray-500">({c.label})</span></span>)}</div>
                    <div className="mb-1"><span className="font-bold">Era:</span> {eras.map(e => <span key={e.id} className="inline-block mr-2">{e.id} <span className="text-gray-500">({e.label})</span></span>)}</div>
                    <div><span className="font-bold">Region:</span> {regions.map(r => <span key={r.id} className="inline-block mr-2">{r.id} <span className="text-gray-500">({r.label})</span></span>)}</div>
                  </div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                    Paste or fill the details below. Use the format shown. You can copy the template and fill in your values.
                  </div>
                  <Textarea
                    value={storyInput}
                    onChange={e => setStoryInput(e.target.value)}
                    rows={20}
                    className="w-full font-mono"
                  />
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setShowStoryForm(false)}>Cancel</Button>
                    <Button type="button" onClick={handleStoryInputPreview}>Preview</Button>
                  </div>
                  {showPreview && previewForm && (
                    <div className="mt-6 border-t pt-4">
                      <div className="font-bold mb-2">Preview</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {Object.entries(previewForm).map(([key, val]) => (
                          <div key={key}><span className="font-semibold">{key}:</span> {Array.isArray(val) ? JSON.stringify(val) : String(val)}</div>
                        ))}
                      </div>
                      {formError && <div className="text-red-600 font-medium mb-2">{formError}</div>}
                      <div className="flex justify-end mt-2">
                        <Button type="button" onClick={handleStoryInputSubmit}>Submit</Button>
                      </div>
                    </div>
                  )}
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