import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import axios from "axios";
import VoiceChatbot from "@/components/VoiceChatbot";

// Avatars
import hrAiAvatar from "@/assets/hr-ai-avatar.png";
import hrHumanAvatar from "@/assets/hr-human-avatar.png";
import insuranceAiAvatar from "@/assets/insurance-ai-avatar.png";
import insuranceHumanAvatar from "@/assets/insurance-human-avatar.png";
import claimsAiAvatar from "@/assets/claims-ai-avatar.png";
import claimsHumanAvatar from "@/assets/claims-human-avatar.png";
import bankAiAvatar from "@/assets/bank-ai-avatar.png";
import bankHumanAvatar from "@/assets/bank-human-avatar.png";

// ================== Use Cases ==================
const useCases = {
  "hr-recruitment": {
    name: "HR-Recruitment",
    aiAvatar: hrAiAvatar,
    humanAvatar: hrHumanAvatar,
    robot: {
      name: "Alex HR Bot",
      age: "AI Assistant",
      expertise: "Talent Acquisition & Screening",
      skills: [
        "Screens candidates with accuracy",
        "Schedules interviews seamlessly end-to-end",
        "Analyzes resumes for role fit",
        "Provides detailed hiring insights",
      ],
    },
    human: {
      name: "Sarah Johnson",
      age: "28",
      gender:"F",
      expertise: "HR Operations & Recruitment",
      skills: [
        "Communicates effectively across teams",
        "Solves complex problems efficiently",
        "Collaborates within diverse environments",
        "Manages onboarding from start to end",
      ],
    },
  },
  "insurance-sales": {
    name: "Insurance Product Sales",
    aiAvatar: insuranceAiAvatar,
    humanAvatar: insuranceHumanAvatar,
    robot: {
      name: "InsureBot Pro",
      age: "AI Agent",
      expertise: "Insurance Sales & Advisory",
      skills: [
        "Explains insurance products clearly",
        "Assesses client risks accurately",
        "Matches policies to customer needs",
        "Guides customers through buying steps",
      ],
    },
    human: {
      name: "Mike Chen",
      age: "35",
      gender:"M",
      expertise: "Insurance Sales & Customer Advisory",
      skills: [
        "Builds long-term client relationships",
        "Provides sound financial planning",
        "Drives consistent sales growth",
        "Advises customers on best-fit plans",
      ],
    },
  },
  "insurance-claims": {
    name: "Insurance Claim Process",
    aiAvatar: claimsAiAvatar,
    humanAvatar: claimsHumanAvatar,
    robot: {
      name: "ClaimBot Assistant",
      age: "AI Support",
      expertise: "Claims Processing & Resolution",
      skills: [
        "Processes documents with high accuracy",
        "Validates claims within set timelines",
        "Resolves issues quickly and efficiently",
        "Provides clear customer claim updates",
      ],
    },
    human: {
      name: "Emma Davis",
      age: "32",
      gender:"F",
      expertise: "Claims Handling & Customer Support",
      skills: [
        "Demonstrates empathy in interactions",
        "Manages processes end-to-end smoothly",
        "Ensures compliance with claim policies",
        "Communicates updates clearly to clients",
      ],
    },
  },
  "bank-support": {
    name: "Bank Customer Care",
    aiAvatar: bankAiAvatar,
    humanAvatar: bankHumanAvatar,
    robot: {
      name: "BankBot Helper",
      age: "AI Support",
      expertise: "Banking & Customer Service",
      skills: [
        "Supports transactions in real time",
        "Guides users through account management",
        "Enforces strong security protocols",
        "Resolves customer issues efficiently",
      ],
    },
    human: {
      name: "James Wilson",
      age: "29",
      gender:"M",
      expertise: "Banking Operations & Customer Support",
      skills: [
        "Delivers outstanding customer service",
        "Resolves issues quickly under pressure",
        "Provides accurate banking information",
        "Assists clients with financial needs",
      ],
    },
  },
  "real-estate": {
    name: "Real Estate Enquiry",
    aiAvatar: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyOfNxyO1J_vEJOu7qAv2LiQRdF-rXaaUHYqrvidjnuQIyZxWA",
    humanAvatar: "https://t3.ftcdn.net/jpg/13/41/89/02/360_F_1341890295_Ed4pQXKuJmzZOLMk5EDCb5jjsuCEewCQ.jpg",
    robot: {
      name: "RealtorBot",
      age: "AI Assistant",
      expertise: "Property Matching & Customer Tours",
      skills: [
        "Recommends listings based on needs",
        "Provides accurate pricing guidance",
        "Schedules property tours effectively",
        "Matches clients with ideal homes",
      ],
    },
    human: {
      name: "Olivia Patel",
      age: "31",
      gender:"F",
      expertise: "Real Estate Advisory & Client Relations",
      skills: [
        "Understands local market deeply",
        "Negotiates deals with confidence",
        "Advises clients on property choices",
        "Builds long-term client trust",
      ],
    },
  },
};


export const HeroSection = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<string>(
    "hr-recruitment"
  );
  const [candidateName, setCandidateName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [candidateNumber, setCandidateNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const currentUseCase = useCases[selectedUseCase as keyof typeof useCases];

  // ================== Handle Call API ==================
  const handleStartInteraction = async () => {
    if (!candidateName || !candidateNumber) {
      alert("Please fill in company name, candidate name and number.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3002/api/call", {
        candidateName,
        phoneNumber: candidateNumber,
        jobDescription: description,
        useCase: currentUseCase.name,
      });

      setResponse(res.data);
      alert(`Call started! Call ID: ${res.data.callId}`);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Failed to start call. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

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
            Intelligent AI solutions for seamless automation and enhanced user
            experiences across industries.
            Intelligent AI solutions for seamless automation and enhanced user
            experiences across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* AI Persona */}
          <div className="lg:col-span-3">
            <Card className="p-6 text-center shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                VYOM Ai
              </h3>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-glow flex items-center justify-center">
                <img
                  src={currentUseCase.aiAvatar}
                  alt={`${currentUseCase.robot.name} avatar`}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Name + Age */}
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-foreground text-base">
                  {currentUseCase.robot.name}
                </h4>
                <p className="text-muted-foreground">{currentUseCase.robot.age}</p>
              </div>

              {/* CV Style Info */}
              <div className="mt-6 space-y-4 text-left">
                {/* Expertise Row */}
                <div>
                  <p className="font-bold text-sm text-muted-foreground mb-1">
                    Expertise
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {currentUseCase.robot.expertise}
                  </p>
                </div>

                {/* Skills Row */}
                <div>
                  <p className="font-bold text-sm text-muted-foreground mb-1">
                    Primary Skills
                  </p>
                  <ul className="space-y-1 pl-4">
                    {currentUseCase.robot.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-sm text-foreground list-disc"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Floating Chatbot */}
          <VoiceChatbot />

          {/* Main Form */}
          <div className="lg:col-span-6">
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
                      <SelectItem value="hr-recruitment">
                        HR-Recruitment
                      </SelectItem>
                      <SelectItem value="insurance-sales">
                        Insurance Product Sales
                      </SelectItem>
                      <SelectItem value="insurance-claims">
                        Insurance Claim Process
                      </SelectItem>
                      <SelectItem value="bank-support">
                        Bank Customer Care
                      </SelectItem>
                      <SelectItem value="real-estate">
                        Real Estate Enquiry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name (full width) */}
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="company-name"
                      className="text-foreground font-medium"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company-name"
                      value={CompanyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Candidate Name */}
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="candidate-name"
                      className="text-foreground font-medium"
                    >
                      Candidate Name
                    </Label>
                    <Input
                      id="candidate-name"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter candidate name"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Candidate Number */}
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="candidate-number"
                      className="text-foreground font-medium"
                    >
                      Candidate Number
                    </Label>
                    <Input
                      id="candidate-number"
                      value={candidateNumber}
                      onChange={(e) => setCandidateNumber(e.target.value)}
                      placeholder="+1234567890"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="job-description"
                      className="text-foreground font-medium"
                    >
                      Job Description
                    </Label>
                    <Textarea
                      id="job-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter job description"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Full-width button */}
                  <div className="md:col-span-2">
                    <Button
                      onClick={handleStartInteraction}
                      disabled={loading}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 font-semibold"
                    >
                      {loading ? "Starting Call..." : "Start AI Interaction"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Backend Response */}
              {response && (
                <div className="mt-6 p-4 bg-background border rounded-lg text-sm">
                  <p className="font-semibold">
                    Assistant ID: {response.assistantId}
                  </p>
                  <p className="font-semibold">Call ID: {response.callId}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Human Persona */}
          <div className="lg:col-span-3">
            <Card className="p-6 text-center shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Normal User
              </h3>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-glow flex items-center justify-center">
                <img
                  src={currentUseCase.humanAvatar}
                  alt={`${currentUseCase.human.name} avatar`}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Name + Age */}
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-foreground text-base">
                  {currentUseCase.human.name}
                </h4>
                <p className="text-muted-foreground">{currentUseCase.human.age}/{currentUseCase.human.gender}</p>
              </div>

              {/* CV Style Info */}
              <div className="mt-6 space-y-4 text-left">
                {/* Expertise Row */}
                <div>
                  <p className="font-bold text-sm text-muted-foreground mb-1">
                    Expertise
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {currentUseCase.human.expertise}
                  </p>
                </div>

                {/* Skills Row */}
                <div>
                  <p className="font-bold text-sm text-muted-foreground mb-1">
                    Primary Skills
                  </p>
                  <ul className="space-y-1 pl-4">
                    {currentUseCase.human.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-sm text-foreground list-disc"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section >
  );
};