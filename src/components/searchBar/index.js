import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Burada arama işlemini başlatın, örneğin bir API çağrısı yapabilirsiniz.
    // Sonuçları setSearchResults ile güncelleyin.
    // Örnek olarak arama terimini loglayın
    console.log('Searching for:', searchTerm);
  };

  useEffect(() => {
    handleSearch(); // Arama terimi değiştiğinde aramayı otomatik olarak başlat
  }, [searchTerm]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
      navigate(`/${searchTerm}`);
    }
  };

  return (
    <TextField
      label="Search Something..."
      variant="outlined"
      fullWidth
      size="large"
      sx={{
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              edge="start"
              sx={{ padding: 0, marginRight: '8px', color: 'gray' }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchBar;
