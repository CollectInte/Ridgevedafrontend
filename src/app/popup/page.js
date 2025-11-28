'use client';
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PopupForm = ({ onClose }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    requirements: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_POPUP_ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Form submitted successfully!');
        onClose(); // Close popup after successful submission
      } else {
        alert(result.error || 'Submission failed!');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      {/* Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1100,
        }}
        onClick={onClose}
      />

      {/* Popup Box */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          zIndex: 1200,
          borderRadius: 2,
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the form
      >
        {/* Close Button */}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Contact Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="fullName" label="Full Name" fullWidth margin="normal" value={form.fullName} onChange={handleChange} required />
          <TextField name="email" label="Email" fullWidth margin="normal" value={form.email} onChange={handleChange} required />
          <TextField name="mobile" label="Mobile Number" fullWidth margin="normal" value={form.mobile} onChange={handleChange} required />
          <TextField name="requirements" label="Requirements" multiline rows={3} fullWidth margin="normal" value={form.requirements} onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>

            
        </form>
       

      </Box>
    </>
  );
};

export default PopupForm;
