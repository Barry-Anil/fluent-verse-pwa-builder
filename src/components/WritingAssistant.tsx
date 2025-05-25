
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Lightbulb, Zap, Target, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WritingAssistant = () => {
  const [userText, setUserText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();

  const analyzeText = async () => {
    if (!userText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Write something for me to analyze!",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        grammarScore: 85,
        clarityScore: 78,
        toneScore: 90,
        suggestions: [
          {
            type: "grammar",
            issue: "Consider using 'have been' instead of 'has been' for plural subjects",
            suggestion: "The students have been working hard.",
            severity: "medium"
          },
          {
            type: "style",
            issue: "This sentence could be more concise",
            suggestion: "Try: 'The project succeeded' instead of 'The project was successful'",
            severity: "low"
          },
          {
            type: "vocabulary",
            issue: "Consider a more specific word",
            suggestion: "Use 'accomplished' instead of 'good' for stronger impact",
            severity: "medium"
          }
        ],
        wordCount: userText.split(' ').length,
        readingLevel: "Grade 8-9"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Target className="h-4 w-4" />;
      case 'low': return <Lightbulb className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            AI Writing Assistant
          </CardTitle>
          <CardDescription>
            Get instant feedback on grammar, style, clarity, and tone. Perfect your English writing skills!
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Writing</CardTitle>
            <CardDescription>
              Paste or type your text below for instant analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Start writing here... For example: 'The students has been working on they're project for several weeks and it looks really good.'"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {userText.split(' ').filter(word => word.length > 0).length} words
              </span>
              
              <Button 
                onClick={analyzeText} 
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Analyze Writing
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className={analysis ? 'opacity-100' : 'opacity-50'}>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              {analysis ? 'Here\'s how to improve your writing' : 'Results will appear here after analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <Tabs defaultValue="scores" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scores">Scores</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="scores" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{analysis.grammarScore}</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Grammar</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analysis.clarityScore}</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Clarity</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{analysis.toneScore}</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Tone</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Reading Level:</span>
                      <span className="font-medium">{analysis.readingLevel}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="suggestions" className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded ${getSeverityColor(suggestion.severity)}`}>
                          {getSeverityIcon(suggestion.severity)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.type}
                            </Badge>
                            <Badge className={`text-xs ${getSeverityColor(suggestion.severity)}`}>
                              {suggestion.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {suggestion.issue}
                          </p>
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">
                            💡 {suggestion.suggestion}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter some text and click "Analyze Writing" to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WritingAssistant;
