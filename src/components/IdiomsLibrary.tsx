import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lightbulb, Search, Volume2, Star, BookOpen, Play, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProgressTracking } from "@/hooks/useProgressTracking";

const IdiomsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedIdioms, setSavedIdioms] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [showPracticeResult, setShowPracticeResult] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [savedIdiomsData, setSavedIdiomsData] = useState<any[]>([]);
  const { toast } = useToast();
  const { 
    saveIdiom, 
    removeSavedIdiom, 
    getSavedIdioms, 
    saveIdiomPracticeSession,
    loading 
  } = useProgressTracking();

  const idioms = [
    {
      idiom: "Break the ice",
      meaning: "To start a conversation or make people feel more comfortable",
      example: "She told a joke to break the ice at the meeting.",
      category: "social",
      difficulty: "beginner",
      origin: "Dating back to the 16th century, referring to breaking through frozen waterways"
    },
    {
      idiom: "Spill the beans",
      meaning: "To reveal a secret or tell something you weren't supposed to",
      example: "Don't spill the beans about the surprise party!",
      category: "communication",
      difficulty: "beginner",
      origin: "From ancient Greece where people voted by placing beans in jars"
    },
    {
      idiom: "Bite the bullet",
      meaning: "To face a difficult situation with courage",
      example: "I need to bite the bullet and tell my boss about the mistake.",
      category: "courage",
      difficulty: "intermediate",
      origin: "From battlefield medicine when patients bit bullets during surgery"
    },
    {
      idiom: "Burn the midnight oil",
      meaning: "To work or study late into the night",
      example: "I've been burning the midnight oil to finish this project.",
      category: "work",
      difficulty: "intermediate",
      origin: "Before electric lighting, people used oil lamps to work at night"
    },
    {
      idiom: "Hit the nail on the head",
      meaning: "To be exactly right about something",
      example: "You hit the nail on the head with that analysis.",
      category: "accuracy",
      difficulty: "advanced",
      origin: "From carpentry - hitting a nail precisely on its head"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "social", name: "Social" },
    { id: "communication", name: "Communication" },
    { id: "courage", name: "Courage" },
    { id: "work", name: "Work" },
    { id: "accuracy", name: "Accuracy" }
  ];

  useEffect(() => {
    loadSavedIdioms();
  }, []);

  const loadSavedIdioms = async () => {
    const saved = await getSavedIdioms();
    setSavedIdioms(saved.map(item => item.idiom_text));
    setSavedIdiomsData(saved);
  };

  const filteredIdioms = idioms.filter(idiom => {
    const matchesSearch = idiom.idiom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idiom.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || idiom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const playPronunciation = (idiom) => {
    toast({
      title: "Playing pronunciation",
      description: `"${idiom}"`,
    });
  };

  const toggleSaveIdiom = async (idiom: any) => {
    if (savedIdioms.includes(idiom.idiom)) {
      const success = await removeSavedIdiom(idiom.idiom);
      if (success) {
        setSavedIdioms(savedIdioms.filter(saved => saved !== idiom.idiom));
        toast({
          title: "Idiom removed",
          description: `"${idiom.idiom}" removed from saved idioms`,
        });
        await loadSavedIdioms(); // Refresh the saved idioms data
      }
    } else {
      const success = await saveIdiom(idiom);
      if (success) {
        setSavedIdioms([...savedIdioms, idiom.idiom]);
        toast({
          title: "Idiom saved!",
          description: `"${idiom.idiom}" added to your collection`,
        });
        await loadSavedIdioms(); // Refresh the saved idioms data
      }
    }
  };

  const startPractice = () => {
    if (savedIdiomsData.length === 0) {
      toast({
        title: "No saved idioms",
        description: "Save some idioms first to practice them!",
        variant: "destructive",
      });
      return;
    }
    setPracticeMode(true);
    setCurrentPracticeIndex(0);
    setPracticeAnswer("");
    setShowPracticeResult(false);
    setPracticeScore(0);
  };

  const submitPracticeAnswer = () => {
    const currentIdiom = savedIdiomsData[currentPracticeIndex];
    const isCorrect = practiceAnswer.toLowerCase().trim() === currentIdiom.meaning.toLowerCase().trim();
    
    if (isCorrect) {
      setPracticeScore(practiceScore + 1);
      toast({
        title: "Correct!",
        description: "Great job! You got it right.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is: ${currentIdiom.meaning}`,
        variant: "destructive",
      });
    }
    
    setShowPracticeResult(true);
  };

  const nextPracticeQuestion = async () => {
    if (currentPracticeIndex < savedIdiomsData.length - 1) {
      setCurrentPracticeIndex(currentPracticeIndex + 1);
      setPracticeAnswer("");
      setShowPracticeResult(false);
    } else {
      // Practice session complete - save to database
      await saveIdiomPracticeSession(savedIdiomsData.length, practiceScore);
      
      const finalScore = Math.round((practiceScore / savedIdiomsData.length) * 100);
      toast({
        title: "Practice Complete!",
        description: `You scored ${practiceScore}/${savedIdiomsData.length} (${finalScore}%) - Progress saved!`,
      });
      setPracticeMode(false);
    }
  };

  if (practiceMode) {
    const currentIdiom = savedIdiomsData[currentPracticeIndex];
    
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="h-6 w-6 text-blue-600" />
                Practice Mode
              </div>
              <Button variant="outline" onClick={() => setPracticeMode(false)}>
                Exit Practice
              </Button>
            </CardTitle>
            <CardDescription>
              Question {currentPracticeIndex + 1} of {savedIdiomsData.length} | Score: {practiceScore}/{currentPracticeIndex + (showPracticeResult ? 1 : 0)}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-600 dark:text-blue-400">
              "{currentIdiom.idiom_text}"
            </CardTitle>
            <CardDescription className="text-center">
              What does this idiom mean?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg italic mb-4">"{currentIdiom.example}"</p>
            </div>
            
            {!showPracticeResult ? (
              <div className="space-y-4">
                <Input
                  placeholder="Enter the meaning of this idiom..."
                  value={practiceAnswer}
                  onChange={(e) => setPracticeAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && practiceAnswer.trim() && submitPracticeAnswer()}
                />
                <Button 
                  onClick={submitPracticeAnswer}
                  disabled={!practiceAnswer.trim()}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-medium mb-2">Correct Answer:</h4>
                  <p>{currentIdiom.meaning}</p>
                </div>
                <Button onClick={nextPracticeQuestion} className="w-full">
                  {currentPracticeIndex < savedIdiomsData.length - 1 ? 'Next Question' : 'Finish Practice'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-orange-600" />
            Idioms & Expressions Library
          </CardTitle>
          <CardDescription>
            Master English idioms with meanings, examples, and origins. Perfect for natural conversation!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practice Section */}
      {savedIdioms.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Practice Your Saved Idioms</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You have {savedIdioms.length} saved idiom{savedIdioms.length !== 1 ? 's' : ''} ready for practice
                </p>
              </div>
              <Button onClick={startPractice} className="flex items-center gap-2" disabled={loading}>
                <Play className="h-4 w-4" />
                Start Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search idioms or meanings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Idioms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIdioms.map((idiom, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-blue-600 dark:text-blue-400 group-hover:text-blue-700 transition-colors">
                    "{idiom.idiom}"
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getDifficultyColor(idiom.difficulty)}>
                      {idiom.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {idiom.category}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => playPronunciation(idiom.idiom)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Meaning:</h4>
                <p className="text-gray-600 dark:text-gray-300">{idiom.meaning}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Example:</h4>
                <p className="text-gray-600 dark:text-gray-300 italic">"{idiom.example}"</p>
              </div>
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Origin:
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{idiom.origin}</p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant={savedIdioms.includes(idiom.idiom) ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => toggleSaveIdiom(idiom)}
                  disabled={loading}
                >
                  <Star className={`h-4 w-4 mr-2 ${savedIdioms.includes(idiom.idiom) ? 'fill-current' : ''}`} />
                  {savedIdioms.includes(idiom.idiom) ? 'Saved' : 'Save'}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1">
                      Practice
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Quick Practice: "{idiom.idiom}"</DialogTitle>
                      <DialogDescription>
                        What does this idiom mean?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-center italic">"{idiom.example}"</p>
                      <Input placeholder="Enter the meaning..." />
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <X className="h-4 w-4 mr-2" />
                          Skip
                        </Button>
                        <Button className="flex-1">
                          <Check className="h-4 w-4 mr-2" />
                          Check Answer
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIdioms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">
              No idioms found matching your search. Try different keywords!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IdiomsLibrary;
