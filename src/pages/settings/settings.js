import React from 'react';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {changeTempType, saveAnswer} from "../../store/actions/actions";
import {connect} from "react-redux";
import './settings.scss'


class Settings extends React.Component {

    changeTempType = (e) => {
        const value = e.target.value;
        this.props.changeTempType(value)
    };

    toCelsius = (fahr) => {
        return Math.round((fahr - 32) * ( 5 / 9) )
    };

    render() {
        const {answers, tempType} = this.props;
        return (
            <div className='settings-page'>
                <div className="container mt-4">
                    <Link to={'/'}>
                        <Button color="secondary">Back</Button>
                    </Link>
                    <h1>Units</h1>
                    <div className='units'>
                        <div className="custom-control custom-radio">
                            <input id="cels" className="custom-control-input" onClick={this.changeTempType} type="radio" name="tempType" value="C" checked={tempType === 'C'}/>
                            <label className="custom-control-label" htmlFor="cels">
                                Celsius
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input id="fhar" className="custom-control-input" onClick={this.changeTempType} type="radio" name="tempType" value="F" checked={tempType === 'F'}/>
                            <label className="custom-control-label" htmlFor="fhar">
                                Fahrenheit
                            </label>
                        </div>
                    </div>
                    {answers.map(answer => {
                        return (
                            <div className="row mt-4">
                                {answer.data.map(city => {
                                    return (
                                        <div className='box col-6'>
                                            <div className={`inner-box ${answer.answerId === city.id ? (answer.correctAnswerId === city.id ? 'bg-success': 'bg-danger'): ''}`}>
                                                <p>{city.name},{city.countryName}</p>
                                                <p>{(tempType === 'C' ? this.toCelsius(city.temp): city.temp ) + ' '+tempType}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    answers: state.answer.answers,
    tempType: state.country.tempType,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({saveAnswer, changeTempType}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);