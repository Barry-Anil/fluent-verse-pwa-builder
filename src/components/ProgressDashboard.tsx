
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Zap, Calendar, TrendingUp, Star } from "lucide-react";

interface ProgressDashboardProps {
  userProgress: number;
  streak: number;
}

const ProgressDashboard = ({ userProgress, streak }: ProgressDashboardProps) => {
  const achievements = [
    {
      title: "Grammar Master",
      description: "Complete 20 grammar exercises",
      progress: 18,
      total: 20,
      icon: Trophy,
      unlocked: false
    },
    {
      title: "Vocabulary Builder",
      description: "Learn 100 new words",
      progress: 73,
      total: 100,
      icon: Star,
      unlocked: false
    },
    {
      title: "Writing Streak",
      description: "Write for 7 consecutive days",
      progress: 7,
      total: 7,
      icon: Zap,
      unlocked: true
    },
    {
      title: "Idiom Expert",
      description: "Master 25 idioms",
      progress: 12,
      total: 25,
      icon: Target,
      unlocked: false
    }
  ];

  const weeklyActivity = [
    { day: "Mon", completed: 3, total: 5 },
    { day: "Tue", completed: 5, total: 5 },
    { day: "Wed", completed: 2, total: 5 },
    { day: "Thu", completed: 4, total: 5 },
    { day: "Fri", completed: 5, total: 5 },
    { day: "Sat", completed: 1, total: 5 },
    { day: "Sun", completed: 3, total: 5 }
  ];

  const skillLevels = [
    { skill: "Grammar", level: 85, nextLevel: 90 },
    { skill: "Vocabulary", level: 72, nextLevel: 80 },
    { skill: "Writing", level: 68, nextLevel: 75 },
    { skill: "Speaking", level: 45, nextLevel: 50 },
    { skill: "Listening", level: 78, nextLevel: 85 }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            Learning Progress Dashboard
          </CardTitle>
          <CardDescription>
            Track your English learning journey and celebrate your achievements!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userProgress}%</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Overall Progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{streak}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">247</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Words Learned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">42</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Lessons Complete</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Levels</CardTitle>
            <CardDescription>Your progress across different English skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillLevels.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-sm text-gray-500">
                    {skill.level}% / {skill.nextLevel}%
                  </span>
                </div>
                <Progress value={skill.level} className="h-2" />
                <p className="text-xs text-gray-500">
                  {skill.nextLevel - skill.level}% to next level
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your learning activity this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                  <div className="space-y-1">
                    {Array.from({ length: day.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-3 w-full rounded ${
                          i < day.completed
                            ? 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {day.completed}/{day.total}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your learning milestones and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              const progressPercentage = (achievement.progress / achievement.total) * 100;
              
              return (
                <Card key={index} className={`${achievement.unlocked ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{achievement.title}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-green-500 text-white">Unlocked!</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {achievement.description}
                        </p>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{achievement.progress} / {achievement.total}</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
