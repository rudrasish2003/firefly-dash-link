import { Card } from "@/components/ui/card";
import { 
  Zap, 
  MessageSquare, 
  Clock, 
  BarChart3, 
  Scale, 
  Users 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Intelligent Candidate Matching",
    description: "Our AI analyzes candidate profiles against job requirements, saving time and improving fit."
  },
  {
    icon: MessageSquare,
    title: "Automated Communication",
    description: "Streamline candidate outreach with personalized AI-powered messages."
  },
  {
    icon: Clock,
    title: "Efficiency & Speed",
    description: "Reduce time-to-hire by 60% with our AI-powered candidate sourcing and screening."
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Get actionable insights into your recruitment pipeline and performance metrics."
  },
  {
    icon: Scale,
    title: "Bias Reduction",
    description: "Leverage AI to minimize unconscious bias in the recruitment process."
  },
  {
    icon: Users,
    title: "Personalized Candidate Experience",
    description: "Deliver tailored experiences that enhance candidate satisfaction and engagement."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Choose Our <span className="gradient-text">Axel Tech?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-start space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};