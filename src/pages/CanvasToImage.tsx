import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Grid,
  Tooltip,
  InputBase,
  Chip,
  Grow,
  Stack,
  Divider,
  CardMedia,
  CardActions,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import BrushIcon from "@mui/icons-material/Brush";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { Canvas } from "../components/canvas";
import { canvasToImage } from "../services/aiAssistantService";
import { generateImageFromCanvas } from "../services/aiCanvasToImageService";

const CanvasToImage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{
    url: string;
    prompt: string;
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const canvasRef = useRef<any>(null);

  const handleGenerateImage = async () => {
    setIsProcessing(true);
    setGeneratedImage(null);
    
    try {
      // Get reference to the canvas
      const stageRef = canvasRef.current?.stageRef;
      
      // Convert canvas to image
      const imageData = await canvasToImage(stageRef);
      
      if (!imageData) {
        setSnackbarMessage('Could not capture the canvas. Please try again.');
        setSnackbarOpen(true);
        setIsProcessing(false);
        return;
      }
      
      // Generate image based on canvas
      const result = await generateImageFromCanvas(imageData, input);
      
      if (result.success && result.imageUrl && result.generatedPrompt) {
        setGeneratedImage({
          url: result.imageUrl,
          prompt: result.generatedPrompt
        });
      } else {
        setSnackbarMessage(result.message || 'Failed to generate image');
        setSnackbarOpen(true);
      }
      
    } catch (error) {
      console.error("Error generating image:", error);
      setSnackbarMessage('Error generating image. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyPrompt = () => {
    if (!generatedImage) return;
    
    navigator.clipboard.writeText(generatedImage.prompt)
      .then(() => {
        setSnackbarMessage('Prompt copied to clipboard!');
        setSnackbarOpen(true);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setSnackbarMessage('Failed to copy to clipboard');
        setSnackbarOpen(true);
      });
  };

  const handleSaveImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage.url;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      height: '100vh', 
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Top Canvas Area */}
      <Box sx={{ 
        width: '70%',
        height: generatedImage ? '40%' : 'calc(100% - 80px)',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'visible',
        transition: 'height 0.3s ease'
      }}>
        <Canvas ref={canvasRef} />
      </Box>
      
      {/* Generated Image Display */}
      {generatedImage && (
        <Box sx={{ 
          width: '80%', 
          height: '50%',
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          overflow: 'auto'
        }}>
          <Card sx={{ 
            maxWidth: 800, 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <CardMedia
              component="img"
              height="400"
              image={generatedImage.url}
              alt="Generated image"
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generated Image
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {generatedImage.prompt}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
              <Button 
                startIcon={<ContentCopyIcon />}
                onClick={handleCopyPrompt}
              >
                Copy Prompt
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveImage}
              >
                Save Image
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
      
      {/* Input Area */}
      <Paper 
        elevation={3}
        sx={{ 
          position: 'fixed',
          bottom: 20,
          width: '50%',
          maxWidth: 600,
          p: 2,
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1200
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              size="small"
              placeholder="Describe the image you want (optional)..."
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isProcessing && handleGenerateImage()}
              disabled={isProcessing}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button 
              fullWidth
              variant="contained" 
              color="primary"
              startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <BrushIcon />}
              onClick={handleGenerateImage}
              disabled={isProcessing}
              sx={{ borderRadius: 2 }}
            >
              Generate Image
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CanvasToImage;