import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  ArrowLeft,
  Mic,
  Volume2,
  Eye,
  MessageSquare
} from "lucide-react";

interface DocumentAnalysisProps {
  currentLanguage: string;
}

export default function DocumentAnalysis({ currentLanguage }: DocumentAnalysisProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("clauses");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const content = {
    en: {
      title: "Document Analysis Results",
      subtitle: "AI-powered analysis of your legal document",
      tabs: {
        clauses: "Clause Extraction",
        summary: "Simplified Summary", 
        comparison: "Template Comparison",
        voice: "Voice Assistant"
      },
      analysis: {
        riskLevel: "Risk Assessment",
        confidenceScore: "Confidence Score",
        downloadReport: "Download Report",
        backToUpload: "Upload Another Document"
      },
      clauses: {
        title: "Extracted Clauses",
        riskLevels: {
          safe: "Safe",
          moderate: "Moderate Risk",
          high: "High Risk"
        }
      },
      summary: {
        title: "Plain Language Summary",
        keyPoints: "Key Points"
      },
      comparison: {
        title: "Template Comparison",
        standard: "Standard Clause",
        document: "Your Document",
        deviations: "Deviations Found"
      },
      voice: {
        title: "Voice Assistant",
        description: "Click the microphone to ask questions about your document",
        startRecording: "Start Recording",
        stopRecording: "Stop Recording",
        playback: "Play Summary"
      }
    },
    hi: {
      title: "दस्तावेज़ विश्लेषण परिणाम",
      subtitle: "आपके कानूनी दस्तावेज़ का AI-संचालित विश्लेषण",
      tabs: {
        clauses: "खंड निष्कर्षण",
        summary: "सरलीकृत सारांश",
        comparison: "टेम्प्लेट तुलना",
        voice: "आवाज़ सहायक"
      },
      analysis: {
        riskLevel: "जोखिम मूल्यांकन",
        confidenceScore: "विश्वास स्कोर",
        downloadReport: "रिपोर्ट डाउनलोड करें",
        backToUpload: "अन्य दस्तावेज़ अपलोड करें"
      },
      clauses: {
        title: "निकाले गए खंड",
        riskLevels: {
          safe: "सुरक्षित",
          moderate: "मध्यम जोखिम",
          high: "उच्च जोखिम"
        }
      },
      summary: {
        title: "सादी भाषा में सारांश",
        keyPoints: "मुख्य बिंदु"
      },
      comparison: {
        title: "टेम्प्लेट तुलना",
        standard: "मानक खंड",
        document: "आपका दस्तावेज़",
        deviations: "पाए गए विचलन"
      },
      voice: {
        title: "आवाज़ सहायक",
        description: "अपने दस्तावेज़ के बारे में प्रश्न पूछने के लिए माइक्रोफोन पर क्लिक करें",
        startRecording: "रिकॉर्डिंग शुरू करें",
        stopRecording: "रिकॉर्डिंग बंद करें",
        playback: "सारांश चलाएं"
      }
    }
  };

  const t = content[currentLanguage as keyof typeof content];

  // Mock analysis data
  const analysisData = {
    riskLevel: 75,
    confidenceScore: 92,
    totalClauses: 8,
    safeClauses: 5,
    moderateClauses: 2,
    highRiskClauses: 1
  };

  const mockClauses = [
    {
      id: 1,
      text: "The employee agrees to work exclusively for the company during the term of employment.",
      type: "Non-compete Clause",
      risk: "safe",
      explanation: "Standard exclusivity clause commonly found in employment contracts."
    },
    {
      id: 2,
      text: "Company may terminate employment at any time without prior notice or cause.",
      type: "Termination Clause",
      risk: "high",
      explanation: "This clause gives the company unlimited termination rights which may be unfavorable to the employee."
    },
    {
      id: 3,
      text: "Employee shall receive salary payments on the last working day of each month.",
      type: "Compensation Clause", 
      risk: "safe",
      explanation: "Standard payment terms with clear schedule."
    },
    {
      id: 4,
      text: "All intellectual property created during employment belongs to the company.",
      type: "IP Assignment",
      risk: "moderate",
      explanation: "Broad IP assignment clause - ensure it's limited to work-related creations."
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "safe":
        return "bg-success text-success-foreground";
      case "moderate":
        return "bg-warning text-warning-foreground";
      case "high":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "safe":
        return <CheckCircle className="w-4 h-4" />;
      case "moderate":
        return <AlertTriangle className="w-4 h-4" />;
      case "high":
        return <Shield className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link to="/upload">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.analysis.backToUpload}
            </Button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Analysis Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="legal-card animate-scale-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {analysisData.riskLevel}%
                </div>
                <p className="text-sm text-muted-foreground">{t.analysis.riskLevel}</p>
                <Progress value={analysisData.riskLevel} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="legal-card animate-scale-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">
                  {analysisData.confidenceScore}%
                </div>
                <p className="text-sm text-muted-foreground">{t.analysis.confidenceScore}</p>
                <Progress value={analysisData.confidenceScore} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="legal-card animate-scale-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">
                  {analysisData.totalClauses}
                </div>
                <p className="text-sm text-muted-foreground">Total Clauses</p>
                <div className="flex justify-center space-x-1 mt-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="legal-card animate-scale-in">
            <CardContent className="pt-6 text-center">
              <Button className="legal-button-primary">
                <Download className="w-4 h-4 mr-2" />
                {t.analysis.downloadReport}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Card className="legal-card animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="clauses">{t.tabs.clauses}</TabsTrigger>
                <TabsTrigger value="summary">{t.tabs.summary}</TabsTrigger>
                <TabsTrigger value="comparison">{t.tabs.comparison}</TabsTrigger>
                <TabsTrigger value="voice">{t.tabs.voice}</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="clauses" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{t.clauses.title}</h3>
                  <div className="flex space-x-2">
                    <Badge className={getRiskColor("safe")}>{analysisData.safeClauses} Safe</Badge>
                    <Badge className={getRiskColor("moderate")}>{analysisData.moderateClauses} Moderate</Badge>
                    <Badge className={getRiskColor("high")}>{analysisData.highRiskClauses} High Risk</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockClauses.map((clause) => (
                    <Card key={clause.id} className="border-l-4 border-l-primary/20">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            {getRiskIcon(clause.risk)}
                            <Badge variant="outline">{clause.type}</Badge>
                            <Badge className={getRiskColor(clause.risk)}>
                              {t.clauses.riskLevels[clause.risk as keyof typeof t.clauses.riskLevels]}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        <blockquote className="text-sm italic border-l-2 border-muted pl-4 mb-3">
                          "{clause.text}"
                        </blockquote>
                        <p className="text-sm text-muted-foreground">{clause.explanation}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">{t.summary.title}</h3>
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <p className="text-sm leading-relaxed mb-4">
                      This employment contract establishes a standard employer-employee relationship with typical clauses for compensation, responsibilities, and termination. However, there are some areas of concern that require attention.
                    </p>
                    <h4 className="font-semibold mb-2">{t.summary.keyPoints}:</h4>
                    <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Standard salary and benefit structure</li>
                      <li>Broad intellectual property assignment clause</li>
                      <li>At-will termination clause that favors employer</li>
                      <li>Non-compete restrictions during employment</li>
                      <li>Clear job responsibilities and expectations</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">{t.comparison.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t.comparison.standard}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Standard termination clauses typically require notice periods and just cause for dismissal.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t.comparison.document}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Your document allows termination without notice or cause, which is less employee-friendly.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="voice" className="space-y-4">
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.voice.title}</h3>
                    <p className="text-muted-foreground">{t.voice.description}</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant={isVoiceActive ? "destructive" : "default"}
                      size="lg"
                      onClick={() => setIsVoiceActive(!isVoiceActive)}
                      className="flex items-center space-x-2"
                    >
                      <Mic className={`w-5 h-5 ${isVoiceActive ? "animate-pulse" : ""}`} />
                      <span>
                        {isVoiceActive ? t.voice.stopRecording : t.voice.startRecording}
                      </span>
                    </Button>
                    
                    <Button variant="outline" size="lg">
                      <Volume2 className="w-5 h-5 mr-2" />
                      {t.voice.playback}
                    </Button>
                  </div>

                  <Card className="text-left bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Voice Assistant</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage === "hi" 
                          ? "आप अपने दस्तावेज़ के बारे में प्रश्न पूछ सकते हैं। मैं खंडों की व्याख्या करने और जोखिमों को समझाने में मदद करूंगा।"
                          : "You can ask questions about your document. I'll help explain clauses and clarify any risks or concerns you may have."
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}