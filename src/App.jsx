import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  createTheme, 
  ThemeProvider, 
  CssBaseline, 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Card, 
  CardContent, 
  Alert, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Divider,
  Chip,
  Grid,
  Avatar
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ShieldIcon from '@mui/icons-material/Shield';

// Professional AI theme
const satyaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0', // Professional blue
      dark: '#0D47A1',
      light: '#1976D2',
    },
    secondary: {
      main: '#C62828', // Alert red
      dark: '#B71C1C',
      light: '#D32F2F',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
    },
    warning: {
      main: '#F57C00',
    },
    error: {
      main: '#C62828',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#424242',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1565C0',
    },
    h5: {
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h6: {
      fontWeight: 600,
      color: '#424242',
    },
    body1: {
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #E0E0E0',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '12px 24px',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }
      }
    }
  }
});

// ***************************************************************
// 🔑 WARNING: YEH KEY PUBLIC HO JAAYEGI. DEMO KE BAAD DELETE KAR DEIN.
const API_KEY = "AIzaSyAs-xRYOC-LvVJw4Jdsp4ynalvLr77PxuU";
// ***************************************************************

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError("Please enter content to analyze for verification.");
      return;
    }
    if (API_KEY === "PASTE_YOUR_NEW_GEMINI_API_KEY_HERE") {
      setError("System configuration required. Please contact administrator.");
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const content_to_check = inputText;
      
      const prompt = `
        You are an advanced AI misinformation detection system. Analyze the following content with the highest standards of accuracy and provide a professional assessment.
        
        Content to analyze: "${content_to_check}"
        
        Provide a structured JSON output ONLY. Do not add any other text or markdown.
        The JSON format must be:
        {{
          "verdict": "Provide one of these exact options: VERIFIED AUTHENTIC, REQUIRES VERIFICATION, POTENTIALLY MISLEADING, HIGH RISK MISINFORMATION",
          "confidence_score": A score from 0 to 100 as an integer,
          "risk_indicators": ["First specific risk indicator found", "Second specific risk indicator found"],
          "analysis_summary": "A professional, detailed explanation of the assessment findings and methodology used.",
          "recommendation": "Professional recommendation for users regarding this content."
        }}
        `;
      
      const generationResult = await model.generateContent(prompt);
      const response = await generationResult.response;
      const jsonText = response.text().replace("```json", "").replace("```", "").trim();
      setResult(JSON.parse(jsonText));

    } catch (err) {
      console.error("System Error:", err);
      setError("System temporarily unavailable. Please try again or contact technical support.");
    } finally {
      setLoading(false);
    }
  };
  
  const getVerdictConfig = (verdict) => {
    if (verdict?.includes('VERIFIED AUTHENTIC')) {
      return { color: 'success', icon: <CheckCircleIcon />, severity: 'success' };
    }
    if (verdict?.includes('REQUIRES VERIFICATION')) {
      return { color: 'info', icon: <VerifiedIcon />, severity: 'info' };
    }
    if (verdict?.includes('POTENTIALLY MISLEADING')) {
      return { color: 'warning', icon: <WarningIcon />, severity: 'warning' };
    }
    if (verdict?.includes('HIGH RISK')) {
      return { color: 'error', icon: <ErrorIcon />, severity: 'error' };
    }
    return { color: 'default', icon: <SecurityIcon />, severity: 'info' };
  };

  const verdictConfig = result ? getVerdictConfig(result.verdict) : null;

  return (
    <ThemeProvider theme={satyaTheme}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar sx={{ py: 1 }}>
          <PsychologyIcon sx={{ mr: 2, fontSize: 28 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Satya AI
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Advanced Misinformation Detection & Content Verification Platform
            </Typography>
          </Box>
          <Chip 
            icon={<ShieldIcon />} 
            label="AI POWERED" 
            color="secondary" 
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="xl">
          {/* Notice */}
          <Alert 
            severity="info" 
            icon={<SecurityIcon />}
            sx={{ mb: 4, borderRadius: 2 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              <strong>ADVANCED AI SYSTEM:</strong> Satya AI uses cutting-edge artificial intelligence to detect misinformation and verify content authenticity. 
              All analyses are conducted using state-of-the-art machine learning algorithms.
            </Typography>
          </Alert>

          <Grid container spacing={4}>
            {/* Main Analysis Panel */}
            <Grid item xs={12} lg={8}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 3, minHeight: '70vh' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SecurityIcon sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Content Verification Analysis
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Submit content below for AI-powered verification and misinformation detection
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  variant="outlined"
                  label="Content for AI Verification"
                  placeholder="Paste news articles, social media posts, claims, or any content requiring verification..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={loading}
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SecurityIcon />}
                  sx={{ py: 2, fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  {loading ? 'ANALYZING CONTENT...' : 'START AI VERIFICATION'}
                </Button>
              </Paper>
            </Grid>

            {/* Information Panel */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ mb: 3, minHeight: '300px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PsychologyIcon sx={{ mr: 1 }} />
                    AI System Capabilities
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Satya AI employs advanced artificial intelligence to:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Detect misinformation patterns"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Verify source credibility"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Analyze manipulation techniques"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Cross-reference fact databases"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>IMPORTANT:</strong> This AI system is for informational purposes. 
                  Always cross-reference with multiple reliable sources.
                </Typography>
              </Alert>
            </Grid>
          </Grid>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mt: 4, borderRadius: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {error}
              </Typography>
            </Alert>
          )}

          {/* Results Display */}
          {result && (
            <Card sx={{ mt: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="div" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PsychologyIcon sx={{ mr: 2 }} />
                  AI Verification Report
                </Typography>
                
                {/* Verdict Banner */}
                <Alert 
                  severity={verdictConfig.severity} 
                  variant="filled" 
                  icon={verdictConfig.icon}
                  sx={{ mb: 4, borderRadius: 2, py: 2 }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      AI VERDICT: {result.verdict}
                    </Typography>
                    <Typography variant="body1">
                      Confidence Score: {result.confidence_score}/100
                    </Typography>
                  </Box>
                </Alert>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <FlagIcon sx={{ mr: 1, color: 'error.main' }} />
                      Risk Indicators Identified
                    </Typography>
                    <List>
                      {result.risk_indicators?.map((indicator, index) => (
                        <ListItem key={index} sx={{ pl: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <WarningIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={indicator}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <LightbulbIcon sx={{ mr: 1, color: 'primary.main' }} />
                      AI Recommendation
                    </Typography>
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      <Typography variant="body2">
                        <strong>SATYA AI RECOMMENDATION:</strong> {result.recommendation}
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2 }}>
                  Detailed Analysis Summary
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {result.analysis_summary}
                </Typography>

                {/* Footer */}
                <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <PsychologyIcon sx={{ mr: 1, fontSize: 16 }} />
                    This analysis was generated by Satya AI Advanced Verification System. 
                    Report ID: SAI-{Date.now().toString().slice(-8)} | Generated: {new Date().toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;