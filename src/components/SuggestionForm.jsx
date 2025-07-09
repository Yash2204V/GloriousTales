import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { suggestionsAPI } from '../utils/api';

const SuggestionForm = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    legendName: '',
    description: '',
    era: '',
    region: '',
    heroType: '',
    whyImportant: '',
    sources: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'legendName', 'description', 'era', 'region', 'heroType', 'whyImportant'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    if (formData.description.length < 50) {
      toast({
        title: "Description too short",
        description: "Please provide a description of at least 50 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await suggestionsAPI.submit(formData);

      if (data) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          legendName: '',
          description: '',
          era: '',
          region: '',
          heroType: '',
          whyImportant: '',
          sources: ''
        });
        toast({
          title: "Suggestion submitted!",
          description: "Thank you for your suggestion. We'll review it and get back to you.",
        });
      } else {
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800 ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Suggestion Submitted!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Thank you for suggesting a new legend. We'll review your submission and consider adding it to our collection.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            size="sm"
            className="text-green-600 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950/30"
          >
            Submit Another Suggestion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Suggest a Legend
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Know an inspiring Indian hero who should be featured? Let us know!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Legend's Name *
          </label>
          <Input
            type="text"
            value={formData.legendName}
            onChange={(e) => handleChange('legendName', e.target.value)}
            placeholder="Name of the person you're suggesting"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Tell us about this person's life, achievements, and why they're inspiring (minimum 50 characters)"
            rows={4}
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formData.description.length}/1000 characters (minimum 50)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Era *
            </label>
            <Input
              type="text"
              value={formData.era}
              onChange={(e) => handleChange('era', e.target.value)}
              placeholder="e.g., Ancient, Medieval, Modern"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Region *
            </label>
            <Input
              type="text"
              value={formData.region}
              onChange={(e) => handleChange('region', e.target.value)}
              placeholder="e.g., Maharashtra, Bengal, Punjab"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hero Type *
            </label>
            <Select value={formData.heroType} onValueChange={(value) => handleChange('heroType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warrior">Warrior</SelectItem>
                <SelectItem value="writer">Writer</SelectItem>
                <SelectItem value="rebel">Rebel</SelectItem>
                <SelectItem value="spiritual">Spiritual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Why is this person important? *
          </label>
          <Textarea
            value={formData.whyImportant}
            onChange={(e) => handleChange('whyImportant', e.target.value)}
            placeholder="Explain why this person's story should be told and what makes them inspiring"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sources (Optional)
          </label>
          <Textarea
            value={formData.sources}
            onChange={(e) => handleChange('sources', e.target.value)}
            placeholder="Books, articles, or other sources where we can learn more about this person"
            rows={2}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
        >
          {isLoading ? 'Submitting...' : 'Submit Suggestion'}
        </Button>
      </form>
    </div>
  );
};

export default SuggestionForm; 