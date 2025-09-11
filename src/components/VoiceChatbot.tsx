import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  X,
  Send,
  Keyboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

const VoiceChatbot: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMode, setChatMode] = useState<"voice" | "text">("voice");
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: "user" | "bot"; timestamp: Date }>
  >([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [volume, setVolume] = useState<number[]>([75]);

  const vapiRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const vapi = new Vapi("090a9b90-b436-426e-adb9-52728fe938b5"); // replace with your key
    vapiRef.current = vapi;

    vapi.on("call-start", () => setIsConnected(true));
    vapi.on("call-end", () => {
      setIsConnected(false);
      setIsListening(false);
    });

    return () => {
      vapi.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      vapiRef.current?.stop();
      setIsListening(false);
    } else {
      vapiRef.current?.start("61bae410-de8d-4a83-b7f9-6fcb91f47395"); // replace with assistant id
      setIsListening(true);
    }
    if (!isConnected) setIsConnected(true);
  };

  const toggleMute = () => {
    vapiRef.current?.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const toggleExpanded = () => setIsExpanded((s) => !s);

  const sendTextMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: "user" as const,
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage("");

    try {
      const res = await fetch("http://localhost:3002/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });
      const data = await res.json();
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.assistant || "Sorry, I couldn’t generate a response.",
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages((p) => [...p, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 1).toString(),
          text: "⚠️ Error connecting to server. Please try again.",
          sender: "bot" as const,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <Card className="mb-4 w-80 h-96 bg-card border-voice-primary/20 shadow-card flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-voice-primary/20 bg-gradient-glow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-voice-primary animate-pulse-glow" />
                <span className="text-sm font-medium text-foreground">
                  VyomAi Assistant
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleExpanded}
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {/* URL input */}
            {chatMode === "voice" && !isConnected && (
              <div className="flex gap-2 mt-3">
                <Input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="h-8 text-sm flex-1"
                />
                <Button
                  onClick={async () => {
                    if (!websiteUrl.trim()) return;
                    setIsLoadingUrl(true);
                    try {
                      const res = await fetch(
                        "http://localhost:3002/load-website",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ url: websiteUrl }),
                        }
                      );
                      await res.json();
                      setIsConnected(true);
                    } catch (err) {
                      console.error("Website load error:", err);
                    } finally {
                      setIsLoadingUrl(false);
                    }
                  }}
                  disabled={isLoadingUrl}
                  className="h-8 text-sm"
                >
                  {isLoadingUrl ? "..." : "Submit"}
                </Button>
              </div>
            )}
            {/* Mode toggle + volume */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={chatMode === "voice" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setChatMode("voice")}
                  className="h-7 px-2 text-xs"
                >
                  <Mic className="h-3 w-3 mr-1" />
                  Voice
                </Button>

                <Button
                  variant={chatMode === "text" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setChatMode("text")}
                  className="h-7 px-2 text-xs"
                >
                  <Keyboard className="h-3 w-3 mr-1" />
                  Text
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-1 ml-4">
                <Volume2 className="h-3 w-3 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col min-h-0">
            {chatMode === "text" ? (
              <div className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        Start a conversation by typing a message below
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 ${
                              message.sender === "user"
                                ? "bg-voice-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                <div className="p-4 border-t border-voice-primary/20">
                  <div className="flex gap-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={sendTextMessage} disabled={!currentMessage.trim()} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto">
                {isConnected ? (
                  <>
                    {!isListening ? (
                      <div className="bg-muted p-3 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">
                          👋 Hi! I'm your AI voice assistant. Click the mic to talk.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex gap-2 mb-3">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-10 bg-voice-primary animate-voice-wave rounded-full"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-medium text-voice-primary">
                          Listening...
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  // empty body while waiting for the URL (header holds the input now)
                  <div className="h-full" />
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {chatMode === "voice" && (
            <div className="p-4 border-t border-voice-primary/20 bg-gradient-glow">
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="icon"
                  onClick={toggleListening}
                  className={`h-12 w-12 rounded-full ${isListening ? "animate-pulse-glow" : ""}`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Floating Voice Button */}
      <div className="relative">
        <Button
          variant="default"
          size="icon"
          onClick={isExpanded ? toggleListening : toggleExpanded}
          className={`h-14 w-14 rounded-full shadow-voice ${isListening ? "animate-pulse-glow" : "hover:scale-110"} transition-all duration-300`}
        >
          {isExpanded && isListening ? <MicOff className="h-6 w-6" /> : isExpanded ? <Mic className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>

        {isConnected && !isExpanded && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-voice-primary rounded-full animate-pulse-glow border-2 border-background" />
        )}
      </div>
    </div>
  );
};

export default VoiceChatbot;
