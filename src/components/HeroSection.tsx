import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

const useCases = {
  "hr-recruitment": {
    name: "HR-Recruitment",
    robot: {
      name: "Alex HR Bot",
      age: "AI Assistant",
      skills: ["Candidate Screening", "Interview Scheduling", "Resume Analysis"]
    },
    human: {
      name: "Sarah Johnson",
      age: "28",
      skills: ["Communication", "Problem Solving", "Team Collaboration"]
    }
  },
  "insurance-sales": {
    name: "Insurance Product Sales",
    robot: {
      name: "InsureBot Pro",
      age: "AI Agent",
      skills: ["Product Knowledge", "Risk Assessment", "Policy Matching"]
    },
    human: {
      name: "Mike Chen",
      age: "35",
      skills: ["Sales Experience", "Customer Relations", "Financial Planning"]
    }
  },
  "insurance-claims": {
    name: "Insurance Claim Process",
    robot: {
      name: "ClaimBot Assistant",
      age: "AI Support",
      skills: ["Document Processing", "Claim Validation", "Quick Resolution"]
    },
    human: {
      name: "Emma Davis",
      age: "32",
      skills: ["Attention to Detail", "Empathy", "Process Management"]
    }
  },
  "bank-support": {
    name: "Bank Customer Care",
    robot: {
      name: "BankBot Helper",
      age: "AI Support",
      skills: ["Account Management", "Transaction Support", "Security Protocols"]
    },
    human: {
      name: "James Wilson",
      age: "29",
      skills: ["Customer Service", "Banking Knowledge", "Problem Resolution"]
    }
  }
};

export const HeroSection = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<string>("hr-recruitment");

  const currentUseCase = useCases[selectedUseCase as keyof typeof useCases];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">AI-Powered</span>{" "}
            <span className="text-foreground">Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Intelligent AI solutions for seamless automation and enhanced user experiences across industries.
          </p>
        </div>

        {/* Form with Personas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Robot Persona */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI Agent</h3>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-glow bg-gradient-primary flex items-center justify-center mb-4">
                <Bot className="w-16 h-16 text-white" />
              </div>
              <div className="space-y-2 text-sm">
                <h4 className="font-semibold text-foreground">{currentUseCase.robot.name}</h4>
                <p className="text-muted-foreground">{currentUseCase.robot.age}</p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Primary Skills:</p>
                  {currentUseCase.robot.skills.map((skill, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {skill}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-8">
            <Card className="p-8 bg-gradient-card border-border shadow-card">
              <div className="space-y-6">
                {/* Use Case Selector */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Use Case</Label>
                  <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                    <SelectTrigger className="bg-card border-border text-foreground z-50">
                      <SelectValue placeholder="Select use case" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-[100]">
                      <SelectItem value="hr-recruitment">HR-Recruitment</SelectItem>
                      <SelectItem value="insurance-sales">Insurance Product Sales</SelectItem>
                      <SelectItem value="insurance-claims">Insurance Claim Process</SelectItem>
                      <SelectItem value="bank-support">Bank Customer Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Candidate Name */}
                  <div className="space-y-2">
                    <Label htmlFor="candidate-name" className="text-foreground font-medium">
                      Candidate Name
                    </Label>
                    <Input
                      id="candidate-name"
                      placeholder="Enter candidate name"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Candidate Number */}
                  <div className="space-y-2">
                    <Label htmlFor="candidate-number" className="text-foreground font-medium">
                      Candidate Number
                    </Label>
                    <Input
                      id="candidate-number"
                      placeholder="+1234567890"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the specific requirements, objectives, or context for this interaction..."
                    rows={4}
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 font-semibold">
                  Start AI Interaction
                </Button>
              </div>
            </Card>
          </div>

          {/* Human Persona */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Human User</h3>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-glow bg-gradient-secondary flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="space-y-2 text-sm">
                <h4 className="font-semibold text-foreground">{currentUseCase.human.name}</h4>
                <p className="text-muted-foreground">Age: {currentUseCase.human.age}</p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Primary Skills:</p>
                  {currentUseCase.human.skills.map((skill, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {skill}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};