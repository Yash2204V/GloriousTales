import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { commentsAPI } from '../utils/api';

const CommentSection = ({ storyId, className = '' }) => {
  const [comments, setComments] = useState([]);
  const [commentStats, setCommentStats] = useState(null);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: '',
    rating: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
    fetchCommentStats();
  }, [storyId, sortBy]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const data = await commentsAPI.getForStory(storyId, { sort: sortBy });
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCommentStats = async () => {
    try {
      const data = await commentsAPI.getStats(storyId);
      setCommentStats(data);
    } catch (error) {
      console.error('Error fetching comment stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.email || !newComment.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (newComment.content.length < 10) {
      toast({
        title: "Comment too short",
        description: "Please write a comment of at least 10 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = await commentsAPI.submit({
        ...newComment,
        storyId
      });

      if (data) {
        setNewComment({
          name: '',
          email: '',
          content: '',
          rating: null
        });
        setShowForm(false);
        toast({
          title: "Comment submitted!",
          description: "Your comment will be reviewed before appearing.",
        });
        fetchComments();
        fetchCommentStats();
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
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId) => {
    try {
      await commentsAPI.like(commentId);
      // Update the comment's like count locally
      setComments(prev => prev.map(comment => 
        comment._id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Comment Stats */}
      {commentStats && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{commentStats.totalComments} comments</span>
            {commentStats.totalRatings > 0 && (
              <span className="flex items-center gap-1">
                {renderStars(Math.round(commentStats.averageRating))}
                <span>({commentStats.averageRating.toFixed(1)})</span>
              </span>
            )}
            <span>{commentStats.totalReplies} replies</span>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comments
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="rating">Highest Rated</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      {/* Comment Form */}
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
        >
          Write a Comment
        </Button>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <Input
                  type="text"
                  value={newComment.name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  value={newComment.email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating (Optional)
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewComment(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-6 h-6 ${star <= (newComment.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comment *
              </label>
              <Textarea
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your thoughts about this story..."
                rows={4}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Comment'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {comment.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                {comment.rating && (
                  <div className="flex items-center gap-1">
                    {renderStars(comment.rating)}
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {comment.content}
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => handleLike(comment._id)}
                  className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {comment.likes}
                </button>
                
                {comment.replies && comment.replies.length > 0 && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {comment.replies.length} replies
                  </span>
                )}
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {reply.name}
                          </h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(reply.createdAt)}
                          </p>
                        </div>
                        {reply.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(reply.rating)}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection; 