import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveQuizAttempt } = useProgressTracking();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Sample questions based on category
  const getQuestionsForCategory = (category: string) => {
    const questionSets: Record<string, Question[]> = {
      grammar: [
        {
          id: 1,
          question: "Which sentence is grammatically correct?",
          options: [
            "She don't like coffee",
            "She doesn't like coffee", 
            "She not like coffee",
            "She no like coffee"
          ],
          correctAnswer: 1,
          explanation: "Use 'doesn't' (does not) with third person singular subjects like 'she'."
        },
        {
          id: 2,
          question: "Choose the correct past tense form:",
          options: [
            "I goed to the store",
            "I went to the store",
            "I go to the store", 
            "I going to the store"
          ],
          correctAnswer: 1,
          explanation: "'Went' is the irregular past tense form of 'go'."
        },
        {
          id: 3,
          question: "Which is the correct use of articles?",
          options: [
            "I saw a elephant",
            "I saw an elephant",
            "I saw the elephant",
            "I saw elephant"
          ],
          correctAnswer: 1,
          explanation: "Use 'an' before words that start with a vowel sound."
        }
      ],
      vocabulary: [
        {
          id: 1,
          question: "What does 'abundant' mean?",
          options: [
            "Scarce",
            "Plentiful",
            "Expensive",
            "Difficult"
          ],
          correctAnswer: 1,
          explanation: "'Abundant' means existing in large quantities; plentiful."
        },
        {
          id: 2,
          question: "Choose the synonym for 'enormous':",
          options: [
            "Tiny",
            "Average",
            "Huge",
            "Narrow"
          ],
          correctAnswer: 2,
          explanation: "'Enormous' and 'huge' both mean extremely large."
        }
      ],
      writing: [
        {
          id: 1,
          question: "Which sentence has better flow?",
          options: [
            "The cat sat. The cat was on the mat. The cat was sleeping.",
            "The cat sat on the mat, sleeping peacefully.",
            "Cat on mat sleeping was.",
            "On the mat, cat sleeping, sat."
          ],
          correctAnswer: 1,
          explanation: "Combining related ideas into one sentence creates better flow and reduces repetition."
        }
      ],
      idioms: [
        {
          id: 1,
          question: "What does 'break the ice' mean?",
          options: [
            "To destroy something frozen",
            "To start a conversation",
            "To be very cold",
            "To make someone angry"
          ],
          correctAnswer: 1,
          explanation: "'Break the ice' means to initiate conversation or reduce tension in a social situation."
        }
      ]
    };
    
    return questionSets[category || 'grammar'] || questionSets.grammar;
  };

  const questions = getQuestionsForCategory(categoryId || 'grammar');
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = isCorrect;
    setAnsweredQuestions(newAnsweredQuestions);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed - save progress
      const endTime = Date.now();
      const timeTakenSeconds = Math.round((endTime - startTime) / 1000);
      
      await saveQuizAttempt(
        categoryId || 'grammar',
        questions.length,
        score,
        timeTakenSeconds
      );
      
      const finalScore = Math.round((score / questions.length) * 100);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}/${questions.length} (${finalScore}%) - Progress saved!`,
      });
      navigate('/?tab=lessons');
    }
  };

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      grammar: 'Grammar Fundamentals',
      vocabulary: 'Vocabulary Builder', 
      writing: 'Writing Skills',
      idioms: 'Idioms & Expressions'
    };
    return titles[category] || 'English Quiz';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/?tab=lessons')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{getCategoryTitle(categoryId || 'grammar')}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="mr-3 font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Result Display */}
          {showResult && (
            <Card className={`mb-6 ${selectedAnswer === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  )}
                  <span className="font-semibold text-lg">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {currentQuestion.explanation}
                </p>
                {selectedAnswer !== currentQuestion.correctAnswer && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The correct answer was: <strong>{String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}</strong>
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </div>
            
            {!showResult ? (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleContinue}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
