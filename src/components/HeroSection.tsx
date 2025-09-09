import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
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

        {/* Recruitment Form */}
        <Card className="max-w-2xl mx-auto p-8 bg-gradient-card border-border shadow-card">
          <div className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="job-description" className="text-foreground font-medium">
                Job Description
              </Label>
              <Textarea
                id="job-description"
                placeholder="Describe the job requirements, responsibilities, and qualifications..."
                rows={4}
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Voice</Label>
              <Select>
                <SelectTrigger className="bg-background/50 border-border text-foreground">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
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
    </section>
  );
};