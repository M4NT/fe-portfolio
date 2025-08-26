import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "JavaScript", level: 95 },
        { name: "HTML5", level: 98 },
        { name: "CSS3", level: 95 }
      ]
    },
    {
      title: "Styling & UI",
      skills: [
        { name: "Tailwind CSS", level: 92 },
        { name: "Styled Components", level: 85 },
        { name: "SASS/SCSS", level: 88 },
        { name: "Material-UI", level: 80 },
        { name: "Framer Motion", level: 75 },
        { name: "CSS Grid/Flexbox", level: 95 }
      ]
    },
    {
      title: "Tools & Workflow",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Webpack", level: 75 },
        { name: "Vite", level: 85 },
        { name: "ESLint/Prettier", level: 88 },
        { name: "npm/yarn", level: 90 },
        { name: "VS Code", level: 95 }
      ]
    },
    {
      title: "Other Technologies",
      skills: [
        { name: "Node.js", level: 70 },
        { name: "GraphQL", level: 65 },
        { name: "REST APIs", level: 85 },
        { name: "Firebase", level: 75 },
        { name: "MongoDB", level: 60 },
        { name: "Testing (Jest)", level: 70 }
      ]
    }
  ];

  const certifications = [
    "React Developer Certification",
    "JavaScript Algorithms and Data Structures",
    "Responsive Web Design",
    "Frontend Development Libraries"
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold gradient-text mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="font-geist-mono text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-orbitron text-xl">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-geist-mono text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="font-geist-mono text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="font-orbitron text-2xl font-semibold mb-8">
            Certifications & Achievements
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="font-geist-mono text-sm py-2 px-4 bg-secondary/50 hover:bg-secondary/80 transition-colors"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;