import React from 'react';
import {Button} from 'reactstrap';
import {
    Link
} from "react-router-dom";
import {connect} from 'react-redux';
import {loadCountries, saveAnswer} from "../store/actions/actions";
import {bindActionCreators} from "redux";
import {maxBy} from 'lodash';
import './main.scss'

class Main extends React.Component {
    state = {
        currentIndex: 0,
        currentAnswerId: null
    };

    componentDidMount() {
        this.props.loadCountries();
    }

    onNextClick = () => {
        if (this.props.countriesList.length > this.state.currentIndex) {
            this.setState({currentIndex: this.state.currentIndex + 1, currentAnswerId: null});
            const data = this.props.countriesList[this.state.currentIndex];
            const correctAnswer = maxBy(data, o => o.temp);
            const answer = {
                data: data,
                answerId: this.state.currentAnswerId,
                correctAnswerId: correctAnswer.id,
            };
            this.props.saveAnswer(answer)
        }
    };

    onAnswerClick = (e) => {
        if(this.state.currentAnswerId){
            return;
        }
        const value = e.target.value;
        this.setState({currentAnswerId: parseInt(value)});
    };

    getAnswerStatus = (currentCity, cities) => {
        if(this.state.currentAnswerId !== currentCity.id){
            return '';
        }
        const maxTemp = maxBy(cities.filter(c => c.id !== currentCity.id), o => o.temp);

        return  currentCity.temp >  maxTemp.temp ? 'bg-success': 'bg-danger';
    };


    toCelsius = (fahr) => {
        console.log(fahr);
        return Math.round((fahr - 32) * ( 5 / 9) )
    };

    formatTemp = (temp) => {
        return  temp+ ' '+this.props.tempType;
    };

    render() {
        const {countriesList, tempType} = this.props;
        const {currentAnswerId, currentIndex, currentAnswer = true} = this.state;
        const data = (countriesList && countriesList[currentIndex]) ? countriesList[currentIndex].map(item => {
            return {...item, temp: tempType === 'C' ? this.toCelsius(item.temp)  : Math.round(item.temp)}
        }) : null;

        return (
            <div className="main-page">
                <div className='container mt-4'>
                    <Link to={'/settings'}>
                        <Button color="secondary">Settings</Button>
                    </Link>
                    <h1>Which city is hotter?</h1>
                    <p>Score :</p>
                    <div className="questions-section container">
                        {data && <div className="row">
                            {data.map(city => {
                                return (
                                    <div className='box col-6'>
                                        <div className={`inner-box ${this.getAnswerStatus(city, data)}`}>
                                            <label htmlFor={city.id}>
                                                <input
                                                    disabled={currentAnswerId}
                                                    id={city.id}
                                                    onClick={this.onAnswerClick}
                                                    type="radio" name={"answer"}
                                                    checked={currentAnswerId === city.id}
                                                    value={city.id}/>
                                                <p>{city.name},{city.countryName}</p>
                                                {currentAnswerId && <p>{this.formatTemp(city.temp)}</p>}
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                    <Button onClick={this.onNextClick} color="secondary" disabled={!currentAnswerId}>Next Cities</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    countriesList: state.country.countriesList,
    tempType: state.country.tempType,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({loadCountries, saveAnswer}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);