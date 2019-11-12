import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Axios from 'axios';
import { cities } from './services/cities';
import CurrentCity from './components/CurrentCity';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

type State = {
  currentCity: string,
  loadingCurretCity: boolean,
}

class App extends React.Component <any, State>{
  constructor(props: any){
    super(props);
    this.state = {
      currentCity: null,
      loadingCurretCity: true,
    }
  }
  componentDidMount(){
    Axios.get("http://ip-api.com/json")
    .then((response)=>{
      this.setState({
        currentCity: response.data.city,
        loadingCurretCity: false,
      })
    })
    .catch((error)=>{
      alert(error.data)
      this.setState({
        currentCity: '',
        loadingCurretCity: false,
      })
    })
  }
  render() {
      const city = this.state.currentCity;
      const loading = this.state.loadingCurretCity;
      return (
        <div>
          <h1> Select a city to see weather </h1>
          {loading ? 
            <CircularProgress />
            :
            <div>
              <Select value={this.state.currentCity}>
                <MenuItem value={this.state.currentCity}>{this.state.currentCity}</MenuItem>
                {cities.map((city) =>
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                )}
              </Select>
              <CurrentCity city={this.state.currentCity} />
            </div>
            
          }
          
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('weather-app')
  );