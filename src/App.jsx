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
  Divider
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ScienceIcon from '@mui/icons-material/Science';

// --- THEME DEFINITION ---
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E88E5', // A nice, modern blue
    },
    background: {
      default: '#F4F6F8', // A very light grey background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
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
      setError("Please enter some text to analyze.");
      return;
    }
    if (API_KEY === "PASTE_YOUR_NEW_GEMINI_API_KEY_HERE") {
      setError("Please paste your Gemini API Key in the App.jsx file.");
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // --- THIS IS THE FIXED LINE ---
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      // -----------------------------

      const content_to_check = inputText;
      
      const prompt = `
        You are "SatyaAI", a misinformation detection expert for an Indian audience.
        Analyze the following text: "${content_to_check}"
        Provide a structured JSON output ONLY. Do not add any other text or markdown.
        The JSON format must be:
        {{
          "verdict": "Provide one of these: High Risk, Potentially Misleading, Looks Credible",
          "trust_score": A score from 0 to 100 as an integer,
          "red_flags": ["A short bullet point of the first red flag", "A short bullet point of the second red flag"],
          "deeper_dive": "A one-paragraph explanation of why the content is suspicious.",
          "educational_tip": "A one-sentence actionable tip for the user."
        }}
        `;
      
      const generationResult = await model.generateContent(prompt);
      const response = await generationResult.response;
      const jsonText = response.text().replace("```json", "").replace("```", "").trim();
      setResult(JSON.parse(jsonText));

    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to get a response from the AI. Check the API Key and browser console.");
    } finally {
      setLoading(false);
    }
  };
  
  const getVerdictChipColor = (verdict) => {
    if (verdict?.includes('High Risk')) return 'error';
    if (verdict?.includes('Potentially Misleading')) return 'warning';
    if (verdict?.includes('Looks Credible')) return 'success';
    return 'default';
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <ScienceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SatyaAI
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e0e0e0' }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            AI-Powered Misinformation Detector
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Paste any message, news article, or link below. Our AI will analyze it for potential red flags and manipulative techniques.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            label="Content for Analysis"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2, py: 1.5, textTransform: 'none', fontSize: '1rem' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Content'}
          </Button>
        </Paper>

        {error && <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>{error}</Alert>}

        {result && (
          <Card sx={{ mt: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                Analysis Result
              </Typography>
              
              <Alert 
                severity={getVerdictChipColor(result.verdict)} 
                variant="filled" 
                sx={{ mb: 2, borderRadius: 2 }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  Verdict: {result.verdict} (Trust Score: {result.trust_score}/100)
                </Typography>
              </Alert>

              <Typography variant="h6" sx={{ mt: 3, fontWeight: 'bold' }}>🚩 Red Flags Identified</Typography>
              <List dense>
                {result.red_flags?.map((flag, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 32 }}><FlagIcon color="error" /></ListItemIcon>
                    <ListItemText primary={flag} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>💡 Deeper Dive</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{result.deeper_dive}</Typography>

              <Alert severity="info" icon={<LightbulbIcon />} sx={{ mt: 3, borderRadius: 2 }}>
                <strong>Educational Tip:</strong> {result.educational_tip}
              </Alert>
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;