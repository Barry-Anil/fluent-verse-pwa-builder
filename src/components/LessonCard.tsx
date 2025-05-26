
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LessonCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  lessons: number;
  color: string;
}

interface LessonCardProps {
  category: LessonCategory;
  onStart: () => void;
}

const LessonCard = ({ category, onStart }: LessonCardProps) => {
  const navigate = useNavigate();
  const IconComponent = category.icon;

  const handleContinueClick = () => {
    // Always navigate to quiz for any category
    navigate(`/quiz/${category.id}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-lg ${category.color} bg-opacity-10`}>
            <IconComponent className={`h-6 w-6 text-current`} style={{ color: category.color.replace('bg-', '').replace('-500', '') }} />
          </div>
          <Badge variant="secondary" className="text-xs">
            {category.lessons} lessons
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
          {category.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Progress</span>
            <span className="font-medium">{category.progress}%</span>
          </div>
          <Progress value={category.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>~30 min</span>
          </div>
          
          <Button 
            onClick={handleContinueClick}
            className="group-hover:shadow-lg transition-all duration-300"
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            {category.progress > 0 ? 'Continue' : 'Start'}
          </Button>
        </div>
        
        {category.progress > 0 && (
          <div className="flex items-center text-sm text-green-600 dark:text-green-400 pt-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Last completed: Grammar Basics</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonCard;
