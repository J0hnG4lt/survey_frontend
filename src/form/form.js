import React, { Component } from 'react';

import NumericInputQuestion from "./question_components/types/numeric_input.js";
import TextInputQuestion from "./question_components/types/text_input.js";
import DropdownQuestion from "./question_components/types/dropdown.js";
import TextAreaQuestion from "./question_components/types/textarea.js";
import RadioInputQuestion from "./question_components/types/radio.js";

import * as countries_data from '../data/countries.json';
import * as universities_data from '../data/world_universities_and_domains.json';

function getAlphaTwoCode(countryName) {
    for(let country of countries_data.default) {
        if (country.name === countryName) {
            return country["alpha-2"];
        }
    }
    return null;
}

class RevalidabilidadForm extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeStateFromChild = this.changeStateFromChild.bind(this);
        this.filterUniversitiesByCountry = this.filterUniversitiesByCountry.bind(this);
        
        //This contains all the answers
        this.state = {
            "sample_input_1" : null,
            "sample_input_2" : null,
            "sample_input_3" : null,
            "sample_input_4" : null,
            "sample_input_5" : null,
            "sample_input_6" : null,
            "sample_input_7" : null
        };
    }
    
    /**
     * Handles the information of the form when the user submits it
     * @param {*} event Event triggered by the submit button
     */
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
    }

    /**
     * Updates the state of the form with an answer comming from one of its
     * child components
     * @param {string} key Name of the question to update 
     * @param {string|number|string[]|number[]} value New answer to the question
     */
    changeStateFromChild(key, value){
        this.setState(
            {[key] : value}
        );
    }

    /**
     * Filters universities by country
     * @param {Object} university Dictionary containing the name of a university and the
     *  alpha-two code of its country 
     * @param {number} index 
     * @returns {boolean} true if the university is located in the selected country
     */
    filterUniversitiesByCountry(university, index) {
        let countryName = this.state.sample_input_6;
        let alphaTwoCode = getAlphaTwoCode(countryName);
        let condition = (
            alphaTwoCode === null 
            ?
            true
            :
            alphaTwoCode.toLowerCase() === university.alpha_two_code.toLowerCase()
        );
        return condition;
    }

    render() {
        
        let component_name = this.props.component_name;
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Encuesta de Revalidabilidad</h1>
                
                <TextInputQuestion
                    question_title={"Sample Question 1"}
                    component_name={"sample_input_1"}
                    placeholder={"Introduce a sample answer"}
                    changeStateOfParent={this.changeStateFromChild}
                    showCondition={() => { 
                        return this.state.sample_input_2 < 10; 
                    }
                }
                >
                    
                </TextInputQuestion>

                <NumericInputQuestion
                    question_title={"Sample Question 2"}
                    component_name={"sample_input_2"}
                    placeholder={"Introduce a sample answer"}
                    changeStateOfParent={this.changeStateFromChild}
                > 

                </NumericInputQuestion>

                <DropdownQuestion
                    question_title={"Sample Question 3"}
                    component_name={"sample_input_3"}
                    placeholder={"Introduce a sample answer"}
                    options={[1,2,3]}
                    changeStateOfParent={this.changeStateFromChild}
                >

                </DropdownQuestion>

                <RadioInputQuestion
                    question_title={"Sample Question 4"}
                    component_name={"sample_input_4"}
                    options={[1,2,3,4,5,6,7,8]}
                    changeStateOfParent={this.changeStateFromChild}
                >

                </RadioInputQuestion>

                <TextAreaQuestion
                    question_title={"Sample Question 5"}
                    component_name={"sample_input_5"}
                    placeholder={"Introduce a sample answer"}
                    changeStateOfParent={this.changeStateFromChild}
                >
                    
                </TextAreaQuestion>
                
                <DropdownQuestion
                    question_title={"Select a Country"}
                    component_name={"sample_input_6"}
                    placeholder={"Introduce a sample answer"}
                    options={countries_data.default.map(
                        function(country, index) {
                            return country.name
                        }
                    )}
                    changeStateOfParent={this.changeStateFromChild}
                >

                </DropdownQuestion>
                
                <DropdownQuestion
                    question_title={"Select a Country"}
                    component_name={"sample_input_7"}
                    placeholder={"Introduce a sample answer"}
                    options={universities_data.default
                        .filter(
                            this.filterUniversitiesByCountry
                        )
                        .map(
                            function(university, index) {
                                return university.name+" ("+university.alpha_two_code+")"
                            }
                    )}
                    changeStateOfParent={this.changeStateFromChild}
                >

                </DropdownQuestion>

                <button type="submit">Send sample survey</button>

            </form>
        );
    }

  }
  
  export default RevalidabilidadForm;