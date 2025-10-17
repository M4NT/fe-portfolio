import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Goombo - Sistema de Gestão para Restaurantes",
      description: "Sistema completo para hamburguerias e bares com gestão de pedidos, cardápio digital e delivery integrado. Inclui System Design, Design UI/UX, MVP Frontend em React/TypeScript e aplicativo mobile.",
      image: "/images/projects/projeto-1.png",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Native", "Node.js"],
      liveUrl: "https://goombo.com.br",
      githubUrl: "#",
      featured: true,
      color: "#DC4F00"
    },
    {
      id: 2,
      title: "Canora Tropical - Landing Page de Alto Padrão",
      description: "Landing Page sofisticada para hospedagem premium em Palhoça-SC. Design elegante com sistema de reservas, galeria profissional e otimização SEO local para conversão máxima.",
      image: "/images/projects/projeto-2.png",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO"],
      liveUrl: "https://canoratropical.com.br",
      githubUrl: "#",
      featured: true,
      color: "#10b981"
    },
    {
      id: 3,
      title: "Agross do Brasil - Landing Page Agronegócio",
      description: "Design completo de landing page para empresa de equipamentos agrícolas. Layout institucional B2B com catálogo de produtos, blog técnico e integração com WhatsApp.",
      image: "/images/projects/projeto-3.png",
      technologies: ["UI/UX Design", "Figma", "Landing Page", "B2B Design"],
      liveUrl: "https://agrossdobrasil.com.br",
      githubUrl: "#",
      featured: false,
      color: "#22c55e"
    },
    {
      id: 4,
      title: "Protocolo Raiz - Landing Page de Conversão",
      description: "Design de landing page de alta conversão para venda de infoprodutos. WordPress personalizado com copywriting estratégico e funil de vendas otimizado.",
      image: "/images/projects/projeto-4.png",
      technologies: ["WordPress", "UI/UX Design", "Landing Page", "Conversion Design"],
      liveUrl: "https://protocoloraiz.com.br",
      githubUrl: "#",
      featured: false,
      color: "#f59e0b"
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="font-geist-mono text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div>
                  <h3 className="font-orbitron text-2xl font-semibold mb-4">
                    {project.title}
                  </h3>
                  {project.color && (
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white/20" 
                        style={{ backgroundColor: project.color }}
                      ></div>
                      <span className="font-geist-mono text-sm text-muted-foreground">
                        Projeto em Destaque
                      </span>
                    </div>
                  )}
                  <p className="font-geist-mono text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary"
                      className="font-geist-mono text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <Card className="overflow-hidden border-border bg-card/50 hover:bg-card/80 transition-colors duration-300">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="font-orbitron text-2xl font-semibold text-center mb-8">
            Other Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card 
                key={project.id} 
                className="bg-card/50 border-border hover:bg-card/80 transition-colors duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-orbitron text-lg">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-geist-mono text-sm text-muted-foreground">
                    {project.description.substring(0, 120)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary"
                        className="font-geist-mono text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="font-geist-mono text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;