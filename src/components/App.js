import React, { useState } from 'react';
import { connect } from 'react-redux';

import { 
  fetchMulti, 
  fetchMovies, 
  fetchTvShows, 
  cleanContent,
  fetchMovieDetails,
  fetchTvShowDetails,
  clearSelectedItem,
} from '../actions/index';

import SearchField from './SearchField';
import TabBarMenu from './TabBarMenu';
import MenuItemContent from './MenuItemContent';



const App = ({ 
  contentItems,
  totalPages,
  fetchMulti, 
  fetchMovies, 
  fetchTvShows, 
  cleanContent,
  fetchMovieDetails,
  fetchTvShowDetails,
  clearSelectedItem,
}) => {

  const [activeTab, setActiveTab] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const onSearchSubmit = (searchText) => {
    if (!searchText) {
      return;
    }

    if (contentItems.length) {
      cleanContent();
    }

    if (activeTab === 0) {
      fetchMulti(searchText);
    } else if (activeTab === 1) {
      fetchMovies(searchText);
    } else if (activeTab === 2) {
      fetchTvShows(searchText);
    }
  };

  const updateActiveTab = (tab) => {
    if (contentItems.length) {
      cleanContent();
      clearSelectedItem();
    }

    setActiveTab(tab);
  };

  const getItemDetails = (item) => {
    if (activeTab === 0) {
      if (item.media_type === 'movie') {
        fetchMovieDetails(item.id);
      } else if (item.media_type === 'tv') {
        fetchTvShowDetails(item.id);
      }
    } else if (activeTab === 1) {
      fetchMovieDetails(item.id);
    } else if (activeTab === 2) {
      fetchTvShowDetails(item.id);
    }
  };

  return ( 
    <div>
     <SearchField
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearchSubmit={onSearchSubmit}
      />
      { contentItems.length ? <TabBarMenu activeTab={activeTab} setActiveTab={updateActiveTab} /> : null }
      { activeTab === 0 &&
        <MenuItemContent
          fetchData={fetchMulti}
          items={contentItems}
          totalPages={totalPages}
          searchText={inputValue}
          fetchDetails={getItemDetails}
        /> 
      } 
      { activeTab === 1 &&
        <MenuItemContent
          fetchData={fetchMovies}
          items={contentItems}
          totalPages={totalPages}
          searchText={inputValue}
          fetchDetails={getItemDetails}
        /> 
      }
      { activeTab === 2 &&
        <MenuItemContent 
          fetchData={fetchTvShows}
          items={contentItems}
          totalPages={totalPages}
          searchText={inputValue}
          fetchDetails={getItemDetails}
        /> 
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contentItems, totalPages } = state.contentItems.data;
  return {
    contentItems,
    totalPages
  }
}

export default connect(
  mapStateToProps, 
  { 
    fetchMulti, 
    fetchMovies, 
    fetchTvShows, 
    cleanContent,
    fetchMovieDetails,
    fetchTvShowDetails,
    clearSelectedItem, 
  })(App);