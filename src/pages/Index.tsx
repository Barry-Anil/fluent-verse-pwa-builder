
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Edit, Target, Lightbulb, Award, Brain, Zap, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import WritingAssistant from "@/components/WritingAssistant";
import IdiomsLibrary from "@/components/IdiomsLibrary";
import DailyPrompts from "@/components/DailyPrompts";
import ProgressDashboard from "@/components/ProgressDashboard";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [userProgress, setUserProgress] = useState(35);
  const [streak, setStreak] = useState(7);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed'));
    }

    // Welcome message for authenticated users
    if (user) {
      toast({
        title: "Welcome back!",
        description: "Ready to continue your English learning journey?",
      });
    }
  }, [user, toast]);

  const lessonCategories = [
    {
      id: "grammar",
      title: "Grammar Fundamentals",
      description: "Master English grammar from basics to advanced",
      icon: BookOpen,
      progress: 45,
      lessons: 24,
      color: "bg-blue-500"
    },
    {
      id: "vocabulary",
      title: "Vocabulary Builder",
      description: "Expand your word power with interactive exercises",
      icon: Brain,
      progress: 60,
      lessons: 18,
      color: "bg-green-500"
    },
    {
      id: "writing",
      title: "Writing Skills",
      description: "Improve sentence structure and style",
      icon: Edit,
      progress: 30,
      lessons: 15,
      color: "bg-purple-500"
    },
    {
      id: "idioms",
      title: "Idioms & Expressions",
      description: "Learn common phrases and their meanings",
      icon: Lightbulb,
      progress: 25,
      lessons: 12,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Master English
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Interactive lessons, AI-powered writing assistance, and personalized learning paths to take you from beginner to fluent.
          </p>
          
          {/* Welcome message for authenticated users */}
          {user && (
            <div className="mb-6">
              <p className="text-lg text-gray-700 dark:text-gray-200">
                Welcome back! Ready to continue your journey?
              </p>
            </div>
          )}
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-8 w-8 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{userProgress}%</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Overall Progress</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-8 w-8 text-orange-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{streak}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Day Streak</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">12</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Achievements</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="lessons" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="writing" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Writing
            </TabsTrigger>
            <TabsTrigger value="idioms" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Idioms
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessonCategories.map((category) => (
                <LessonCard
                  key={category.id}
                  category={category}
                  onStart={() => {
                    toast({
                      title: "Lesson Started!",
                      description: `Beginning ${category.title} lessons.`,
                    });
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="writing">
            <WritingAssistant />
          </TabsContent>

          <TabsContent value="idioms">
            <IdiomsLibrary />
          </TabsContent>

          <TabsContent value="prompts">
            <DailyPrompts />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressDashboard userProgress={userProgress} streak={streak} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
