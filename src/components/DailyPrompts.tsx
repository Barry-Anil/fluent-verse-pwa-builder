
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, RefreshCw, Save, Share, Calendar, Clock, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DailyPrompts = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [savedResponses, setSavedResponses] = useState([]);
  const { toast } = useToast();

  const prompts = [
    {
      id: 1,
      category: "Creative Writing",
      difficulty: "beginner",
      prompt: "Describe your perfect day from morning to night. What would you do, where would you go, and who would you spend it with?",
      wordTarget: 150,
      tips: ["Use descriptive adjectives", "Include your emotions", "Think about the five senses"],
      date: "2024-01-15"
    },
    {
      id: 2,
      category: "Storytelling",
      difficulty: "intermediate",
      prompt: "Write a story that begins with: 'The old bookstore had been closed for years, but today the door was wide open...'",
      wordTarget: 300,
      tips: ["Create suspense", "Develop interesting characters", "Use dialogue effectively"],
      date: "2024-01-15"
    },
    {
      id: 3,
      category: "Opinion",
      difficulty: "advanced",
      prompt: "Technology has changed how we communicate. Is this change positive or negative? Support your opinion with specific examples.",
      wordTarget: 400,
      tips: ["Present clear arguments", "Use specific examples", "Consider counterarguments"],
      date: "2024-01-15"
    },
    {
      id: 4,
      category: "Metaphor Practice",
      difficulty: "intermediate",
      prompt: "Life is like a journey. Write about a time when you felt like you were 'at a crossroads' or 'climbing a mountain.'",
      wordTarget: 250,
      tips: ["Extend the metaphor throughout", "Make connections between literal and figurative", "Use vivid imagery"],
      date: "2024-01-15"
    }
  ];

  const currentPromptData = prompts[currentPrompt];
  const wordCount = userResponse.split(' ').filter(word => word.length > 0).length;
  const progressPercentage = Math.min((wordCount / currentPromptData.wordTarget) * 100, 100);

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    setUserResponse("");
  };

  const saveResponse = () => {
    if (!userResponse.trim()) {
      toast({
        title: "Nothing to save",
        description: "Please write something before saving!",
        variant: "destructive"
      });
      return;
    }

    const newResponse = {
      id: Date.now(),
      promptId: currentPromptData.id,
      prompt: currentPromptData.prompt,
      response: userResponse,
      wordCount: wordCount,
      date: new Date().toISOString().split('T')[0],
      category: currentPromptData.category
    };

    setSavedResponses([newResponse, ...savedResponses]);
    toast({
      title: "Response saved!",
      description: `Your ${wordCount}-word response has been saved.`,
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-green-600" />
            Daily Writing Challenges
          </CardTitle>
          <CardDescription>
            Build your writing skills with daily prompts, creative exercises, and personalized feedback.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today's Challenge</TabsTrigger>
          <TabsTrigger value="history">My Writing History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Prompt Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{currentPromptData.category}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getDifficultyColor(currentPromptData.difficulty)}>
                      {currentPromptData.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {currentPromptData.wordTarget} words
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Today
                    </Badge>
                  </div>
                </div>
                
                <Button variant="outline" onClick={nextPrompt}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Prompt
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {currentPromptData.prompt}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Writing Tips:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {currentPromptData.tips.map((tip, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Writing Area */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Response</CardTitle>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {wordCount} / {currentPromptData.wordTarget} words
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Start writing your response here..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              
              <div className="flex gap-3">
                <Button onClick={saveResponse} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Response
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Get Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {savedResponses.length > 0 ? (
            <div className="space-y-4">
              {savedResponses.map((response) => (
                <Card key={response.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{response.category}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        {response.date}
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {response.prompt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {response.response.substring(0, 200)}
                        {response.response.length > 200 && "..."}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {response.wordCount} words
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Full Response
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  No saved responses yet. Complete today's challenge to start building your writing history!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyPrompts;
