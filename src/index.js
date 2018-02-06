import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import SearchBar from './components/search_bar'
import VideoDetail from './components/video_detail'
import VideoList from './components/video_list'
import YTSearch from 'youtube-api-search'

const API_KEY = 'AIzaSyCJXg09gk13bwqADVhcia0pSDPEqgxWJIM'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: [],
      selectedVideo: null
    }
    this.videoSearch('ленинград')
  }

  videoSearch (term) {
    YTSearch({key: API_KEY, term: term}, videos => this.setState({
      videos: videos,
      selectedVideo: videos[0]
    }))
  }

  render () {
    const videoSearch = _.debounce((term) => this.videoSearch(term), 300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList videos={this.state.videos}
                   onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'))
