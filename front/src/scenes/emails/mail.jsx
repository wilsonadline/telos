import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import './styles.css';
import Header from "../../components/Header";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
import HubSpot from 'hubspot';



const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
    attachment: null,
    isSent: false
  });
  const [senders, setSenders] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      attachment: file
    });
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setSelectAll(checked);
    const to = checked ? 'all' : '';
    setFormData({ ...formData, to });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialise le client HubSpot avec votre clé API
    const hubspotClient = new HubSpot({ apiKey: process.env.KEY });

    try {
      // Envoie l'e-mail
      const response = await hubspotClient.marketing.email.send({
        templateId: '99902834367',
        contactProperties: {
          to: formData.to,
          from: 'expediteur@example.com',
          subject: formData.subject,
          templateVariables: {
            message: formData.message
          },
          attachment: formData.attachment ? formData.attachment : undefined
        }
      });
      
      console.log(response);
      
      // Réinitialise le formulaire après l'envoi réussi
      setFormData({
        to: '',
        subject: '',
        message: '',
        attachment: null,
        isSent: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFormData({
      ...formData,
      attachment: file
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/senders');
        setSenders(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="MESSAGERIE" subtitle="Welcome to your messaging" />
        </Box>
      
        <div className="email-form" onDragOver={handleDragOver} onDrop={handleDrop}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="checkbox"
              id="selectAll"
              name="selectAll"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label htmlFor="selectAll">Sélectionner tous les destinataires</label>
          </div>
          <div className="form-group">
            <label htmlFor="to">À</label>
            <select
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Sélectionnez les destinataires...</option>
              {senders.map((sender) => (
                <option key={sender.id} value={sender.email}>
                  {sender.email}
                </option>
              ))}
              {/* Ajoutez d'autres options si nécessaire */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Objet:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="attachment" className="file-label">
              <AttachFileIcon /> Joindre un fichier
              {formData.attachment && formData.attachment.name && ( // Vérifiez si le fichier est sélectionné et affichez son nom s'il existe
                <span className="file-name">{formData.attachment.name}</span>
              )}
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              accept=".doc,.docx,.xls,.xlsx,.pdf,.png"
              onChange={handleFileChange}
              className="visually-hidden"
            />
          </div>
          <button type="submit" className="submit-button">Envoyer</button>
        </form>
        {formData.isSent && (
          <div className="success-animation">Le courrier a été envoyé avec succès !</div>
        )}
      </div>
    </Box>
  );
};

export default EmailForm;
