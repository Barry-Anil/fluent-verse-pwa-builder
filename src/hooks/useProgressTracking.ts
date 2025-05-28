
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type LessonCategory = Database['public']['Enums']['lesson_category'];

export const useProgressTracking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Save quiz attempt
  const saveQuizAttempt = async (
    category: string,
    questionsTotal: number,
    questionsCorrect: number,
    timeTakenSeconds?: number
  ) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const scorePercentage = Math.round((questionsCorrect / questionsTotal) * 100);
      
      const { error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          category: category as LessonCategory,
          questions_total: questionsTotal,
          questions_correct: questionsCorrect,
          score_percentage: scorePercentage,
          time_taken_seconds: timeTakenSeconds
        });
      
      if (error) throw error;
      
      // Update lesson progress
      await updateLessonProgress(category, scorePercentage);
      
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      toast({
        title: "Error saving progress",
        description: "Failed to save quiz results",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Update lesson progress
  const updateLessonProgress = async (category: string, progressIncrease: number) => {
    if (!user) return;
    
    try {
      // Get current progress
      const { data: currentProgress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', category as LessonCategory)
        .single();
      
      if (currentProgress) {
        const newProgress = Math.min(100, currentProgress.overall_progress + Math.round(progressIncrease / 10));
        const newLessonsCompleted = currentProgress.lessons_completed + 1;
        
        await supabase
          .from('lesson_progress')
          .update({
            overall_progress: newProgress,
            lessons_completed: newLessonsCompleted,
            last_lesson_completed: `Quiz completed with ${progressIncrease}% score`,
            status: newProgress >= 100 ? 'completed' : 'in_progress',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('category', category as LessonCategory);
      }
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  // Save idiom
  const saveIdiom = async (idiom: any) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('saved_idioms')
        .insert({
          user_id: user.id,
          idiom_text: idiom.idiom,
          meaning: idiom.meaning,
          example: idiom.example,
          category: idiom.category,
          difficulty: idiom.difficulty as Database['public']['Enums']['difficulty_level'],
          origin: idiom.origin
        });
      
      if (error && error.code !== '23505') { // Ignore duplicate errors
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving idiom:', error);
      return false;
    }
  };

  // Remove saved idiom
  const removeSavedIdiom = async (idiomText: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('saved_idioms')
        .delete()
        .eq('user_id', user.id)
        .eq('idiom_text', idiomText);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing saved idiom:', error);
      return false;
    }
  };

  // Get saved idioms
  const getSavedIdioms = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('saved_idioms')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching saved idioms:', error);
      return [];
    }
  };

  // Save idiom practice session
  const saveIdiomPracticeSession = async (
    idiomsPracticed: number,
    idiomsCorrect: number
  ) => {
    if (!user) return;
    
    try {
      const scorePercentage = Math.round((idiomsCorrect / idiomsPracticed) * 100);
      
      const { error } = await supabase
        .from('idiom_practice_sessions')
        .insert({
          user_id: user.id,
          idioms_practiced: idiomsPracticed,
          idioms_correct: idiomsCorrect,
          score_percentage: scorePercentage
        });
      
      if (error) throw error;
      
      // Update idioms lesson progress
      await updateLessonProgress('idioms', scorePercentage);
      
    } catch (error) {
      console.error('Error saving idiom practice session:', error);
    }
  };

  // Save writing analysis
  const saveWritingAnalysis = async (
    textContent: string,
    wordCount: number,
    scores?: {
      grammarScore?: number;
      clarityScore?: number;
      toneScore?: number;
      readingLevel?: string;
      suggestionsCount?: number;
    }
  ) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('writing_analyses')
        .insert({
          user_id: user.id,
          text_content: textContent,
          word_count: wordCount,
          grammar_score: scores?.grammarScore,
          clarity_score: scores?.clarityScore,
          tone_score: scores?.toneScore,
          reading_level: scores?.readingLevel,
          suggestions_count: scores?.suggestionsCount || 0
        });
      
      if (error) throw error;
      
      // Update writing lesson progress
      const avgScore = scores ? 
        ((scores.grammarScore || 0) + (scores.clarityScore || 0) + (scores.toneScore || 0)) / 3 : 
        75;
      await updateLessonProgress('writing', avgScore);
      
    } catch (error) {
      console.error('Error saving writing analysis:', error);
    }
  };

  // Save daily prompt completion
  const saveDailyPromptCompletion = async (
    promptDate: string,
    promptTitle: string,
    promptType: string,
    userResponse: string,
    wordCount: number
  ) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('daily_prompt_completions')
        .upsert({
          user_id: user.id,
          prompt_date: promptDate,
          prompt_title: promptTitle,
          prompt_type: promptType,
          user_response: userResponse,
          word_count: wordCount
        });
      
      if (error) throw error;
      
    } catch (error) {
      console.error('Error saving daily prompt completion:', error);
    }
  };

  // Get user stats
  const getUserStats = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }
  };

  // Get lesson progress
  const getLessonProgress = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('category');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
      return [];
    }
  };

  return {
    loading,
    saveQuizAttempt,
    updateLessonProgress,
    saveIdiom,
    removeSavedIdiom,
    getSavedIdioms,
    saveIdiomPracticeSession,
    saveWritingAnalysis,
    saveDailyPromptCompletion,
    getUserStats,
    getLessonProgress
  };
};
