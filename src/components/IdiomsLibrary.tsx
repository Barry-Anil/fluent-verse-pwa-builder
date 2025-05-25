
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Search, Volume2, Star, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IdiomsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

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
    // Here you would integrate with a TTS service
  };

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
                <Button size="sm" variant="outline" className="flex-1">
                  <Star className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" className="flex-1">
                  Practice
                </Button>
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
