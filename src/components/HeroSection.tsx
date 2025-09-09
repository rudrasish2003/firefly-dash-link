import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

import salesmanAvatar from "@/assets/salesman-avatar.png";
import recruiterAvatar from "@/assets/recruiter-avatar.png";
import candidateAvatar from "@/assets/candidate-avatar.png";
import managerAvatar from "@/assets/manager-avatar.png";
import consultantAvatar from "@/assets/consultant-avatar.png";

const personaAvatars = {
  salesman: salesmanAvatar,
  recruiter: recruiterAvatar,
  candidate: candidateAvatar,
  manager: managerAvatar,
  consultant: consultantAvatar,
};

export const HeroSection = () => {
  const [agentPersona, setAgentPersona] = useState<string>("recruiter");
  const [userPersona, setUserPersona] = useState<string>("candidate");

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">AI-Powered</span>{" "}
            <span className="text-foreground">Recruitment</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Intelligent AI solutions for precise candidate matching and streamlined recruitment processes.
          </p>
        </div>

        {/* Form with Avatars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Agent Avatar */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Agent Persona</h3>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-glow">
                <img 
                  src={personaAvatars[agentPersona as keyof typeof personaAvatars]} 
                  alt={`${agentPersona} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-8">
            <Card className="p-8 bg-gradient-card border-border shadow-card">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Agent Persona Selector */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">Agent Persona</Label>
                    <Select value={agentPersona} onValueChange={setAgentPersona}>
                      <SelectTrigger className="bg-card border-border text-foreground z-50">
                        <SelectValue placeholder="Select agent persona" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-[100]">
                        <SelectItem value="salesman">Salesman</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* User Persona Selector */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">User Persona</Label>
                    <Select value={userPersona} onValueChange={setUserPersona}>
                      <SelectTrigger className="bg-card border-border text-foreground z-50">
                        <SelectValue placeholder="Select user persona" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-[100]">
                        <SelectItem value="candidate">Candidate</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="salesman">Salesman</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

                {/* Agent Behavior */}
                <div className="space-y-2">
                  <Label htmlFor="agent-behavior" className="text-foreground font-medium">
                    Agent Behavior
                  </Label>
                  <Textarea
                    id="agent-behavior"
                    placeholder="Describe how the agent should behave, communication style, approach..."
                    rows={3}
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Agent Workflow */}
                <div className="space-y-2">
                  <Label htmlFor="agent-workflow" className="text-foreground font-medium">
                    Agent Workflow
                  </Label>
                  <Textarea
                    id="agent-workflow"
                    placeholder="Define the workflow steps, process sequence, and interaction flow..."
                    rows={3}
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Voice</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-border text-foreground">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-[100]">
                      <SelectItem value="voice1">Professional Voice</SelectItem>
                      <SelectItem value="voice2">Friendly Voice</SelectItem>
                      <SelectItem value="voice3">Authoritative Voice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 font-semibold">
                  Call Now
                </Button>
              </div>
            </Card>
          </div>

          {/* User Avatar */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">User Persona</h3>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-glow">
                <img 
                  src={personaAvatars[userPersona as keyof typeof personaAvatars]} 
                  alt={`${userPersona} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};