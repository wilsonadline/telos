import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextareaAutosize } from '@mui/base';
import { tokens } from "../../theme";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import "./styles.css"

const Post = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tweetText, setTweetText] = useState('');
  const [image, setImage] = useState(null);

  const [selectedIcons, setSelectedIcons] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const toggleIconSelection = (index) => {
    if (selectedIcons.includes(index)) {
      setSelectedIcons(selectedIcons.filter((item) => item !== index));
    } else {
      setSelectedIcons([...selectedIcons, index]);
    }
  };

  const handleSubmitWithVideo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', tweetText);
    if (image) {
      formData.append('image', image);
    }
    try {
      await axios.post('http://localhost:3001/sendTweet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Tweet sent successfully');
      setTweetText('');
      setImage(null);
    } catch (error) {
      console.error('Error sending tweet:', error.response.data.error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/sendTweet', { text: tweetText });
      console.log(response.data);
      if (response.data.success) {
        alert('Tweet envoyé avec succès !');
      } else {
        alert('Une erreur est survenue lors de l\'envoi du tweet : ' + response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      alert('Une erreur est survenue lors de l\'envoi du tweet. Veuillez réessayer.');
    }
  };
  

  return (
    <Box m="2rem" display={"flex"} justifyContent={"center"}>
      <div className="postBox">
        <form onSubmit={handleSubmit} className="postForm" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="postDetails">
              <TextareaAutosize 
                placeholder="Ecrivez votre post et/ou déposez un fichier"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                minRows={8} 
                style={{ 
                  backgroundColor: "white", width: "100%", fontSize: "1.5rem", padding: "1rem",
                  borderRadius: "10px",
                }} 
              >
              </TextareaAutosize>
              <Box 
                style={{ 
                  display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", 
                  width: "100%", marginTop: "10px", gap: "1rem",
                }}
              >
                  {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ 
                          margin: "2px 0 0 0",
                          borderRadius: "10px",
                          maxWidth: '125px', 
                          maxHeight: '125px',
                          backgroundColor: "#C7C7C7",
                        }} 
                      />
                  )}
                  <input
                      accept="image/jpeg, image/jpg, image/png"
                      id="icon-button-file"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                  />
                  <label htmlFor="icon-button-file">
                  <Button variant="contained" component="span">
                      <AddPhotoAlternateOutlinedIcon style={{ width: "30px", height: "30px",  }} />
                  </Button>
                  </label>
              </Box>
            </div>
            <Box display="flex" flexDirection={"row"} justifyContent="center" alignItems="center" gap="2rem">
                <img src="../../assets/Linkedin.svg.png" alt="upload" 
                  style={{ width: "5rem", height: "5rem", 
                    borderRadius: "20px", border: selectedIcons.includes(0) ? "2px solid white" : "none"
                  }}
                  onClick={() => toggleIconSelection(0)}
                />
                <img src="../../assets/xlogo.png" alt="upload" 
                  style={{ width: "5rem", height: "5rem", 
                  borderRadius: "20px", border: selectedIcons.includes(1) ? "2px solid white" : "none",
                  }}
                  onClick={() => toggleIconSelection(1)}
                />
                <img src="../../assets/instagram.png" alt="upload" 
                  style={{ width: "5rem", height: "5rem", borderRadius: "20px",
                    border: selectedIcons.includes(2) ? "2px solid white" : "none",
                  }}
                  onClick={() => toggleIconSelection(2)}
                />
                <img src="../../assets/facebook.png" alt="upload" 
                  style={{ width: "5rem", height: "5rem", 
                    borderRadius: "20px", border: selectedIcons.includes(3) ? "2px solid white" : "none",
                  }}
                  onClick={() => toggleIconSelection(3)}
                />
            </Box>
          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained" style={{ width: "10rem", color: "white", backgroundColor: "#14387F" }}>
              Envoyer
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
};

export default Post;
