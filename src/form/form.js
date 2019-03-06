import React, { Component } from 'react';

import NumericInputQuestion from "./question_components/types/numeric_input.js";
import TextInputQuestion from "./question_components/types/text_input.js";
import DropdownQuestion from "./question_components/types/dropdown.js";
import TextAreaQuestion from "./question_components/types/textarea.js";
import RadioInputQuestion from "./question_components/types/radio.js";

import post_resource from "../api/post.js";

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

function createBinaryAnswer() {
    return ["Sí", "No"]
}

function createBinaryAnswerAndNoAnswer() {
    return ["Sí", "No", "No Responde"]
}

function createValueAnswer() {
    return ["Mucho", "Poco", "Nada", "No Responde"]
}

function createSummary(title, summary) {
    return (
        <div className="summary">
            <h2>
                {title}
            </h2>
            <p>{summary}</p>
        </div>
    )
}

class RevalidabilidadForm extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeStateFromChild = this.changeStateFromChild.bind(this);
        this.filterUniversitiesByCountry = this.filterUniversitiesByCountry.bind(this);
        
        //This contains all the answers
        this.state = {
            "b-pc-1" : null,
            "b-pc-2" : null,
            "b-pc-3" : null,
            "b-pc-4" : null,
            "b-ppa-1" : null,
            "b-ppa-2" : null,
            "b-ppa-3" : null,
            "b-ppa-4" : null,
            "b-ppa-5" : null,
            "b-ppa-6" : null,
            "b-ppa-7" : null,
            "b-ppa-8" : null,
            "b-ppa-9" : null,
            "h-pc-13" : null,
            "h-pc-14" : null,
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
        
        let promise = post_resource(this.state);
        
        promise.then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log('parsed json', json);
        })
        .catch(function(ex){
            console.log('parsing failed', ex);
        });
    }

    /**
     * Updates the state of the form with an answer comming from one of its
     * child components
     * @param {string} key Name of the question to update 
     * @param {string|number|string[]|number[]} value New answer to the question
     */
    changeStateFromChild(key, value){
        console.log("Event: "+key+" "+value);
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
                
                

                <div className="filterQuestions">
                    
                    {createSummary(
                        "Preguntas Filtro",
                        ""
                    )}

                    <RadioInputQuestion
                        question_title={"¿Ha cursado estudios de postgrado o se ha \
                            desempeñado profesionalmente fuera de Venezuela?, \
                            entendiendo estudios de postgrado como cualquier \
                            ciclo de estudios realizado luego del pregrado, \
                            como maestrías, diplomados, doctorados, \
                            especializaciones, etc."}
                        component_name={"b-pc-1"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-pc-1"
                    />

                    <RadioInputQuestion
                        question_title={"¿Convalidó sus documentos académicos de la \
                            USB para poder cursar estudios de postgrado o desempeñarse \
                            profesionalmente fuera de Venezuela?, entendiendo \
                            convalidar como validar los estudios realizados en \
                            una institución de un determinado país en otra \
                            institución o país."}
                        component_name={"b-pc-2"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-pc-2"
                        showCondition={() => { 
                                return this.state["b-pc-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Está actualmente cursando estudios de \
                            postgrado o desempeñándose profesionalmente \
                            fuera de Venezuela?"}
                        component_name={"b-pc-3"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-pc-3"
                        showCondition={() => { 
                                return this.state["b-pc-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Qué actividad está realizando \
                            actualmente fuera de Venezuela?"}
                        component_name={"b-pc-4"}
                        options={[
                            "Estoy cursando estudios de postgrado", 
                            "Estoy trabajando", 
                            "Estoy cursando estudios de postgrado y trabajando"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-pc-4"
                        showCondition={() => { 
                                return this.state["b-pc-3"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Previamente cursó estudios de \
                            postgrado o se desempeñó profesionalmente fuera de Venezuela?"}
                        component_name={"h-pc-13"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="h-pc-13"
                        showCondition={() => { 
                                return this.state["b-pc-3"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Qué actividad realizó fuera de Venezuela?"}
                        component_name={"h-pc-14"}
                        options={[
                            "Cursé estudios de postgrado", 
                            "Trabajé", 
                            "Cursé estudios de postgrado y trabajé"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="h-pc-14"
                        showCondition={() => { 
                                return this.state["h-pc-13"] === "Sí"; 
                            }
                        }
                    />

                </div>

                <div className="academicProfileQuestions">
                    
                    {createSummary(
                        "Perfil Académico",
                        ""
                    )}

                    <TextInputQuestion
                        question_title={"¿Cuál es su número de Carnet USB? (Ejemplo: 10-10000)"}
                        component_name={"b-ppa-1"}
                        placeholder={"Ingrese su carnet"}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-1"
                    /> 

                    <NumericInputQuestion
                        question_title={"¿En qué año culminó el pregrado en la USB?"}
                        component_name={"b-ppa-2"}
                        min={1969}
                        max={2019}
                        placeholder={"Ingrese un año"}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-2"
                    /> 

                    <RadioInputQuestion
                        question_title={"¿Cuál fue su índice académico \
                            al culminar sus estudios de pregrado en la USB?"}
                        component_name={"b-ppa-3"}
                        options={
                            [
                                "Entre 3,0000 y 3,4999", 
                                "Entre 3,5000 y 3,9999", 
                                "Entre 4,0000 y 4,4999",
                                "Entre 4,8000 y 5,0000",
                                "No Responder"
                            ]
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-3"
                    />

                    <RadioInputQuestion
                        question_title={"¿Obtuvo mención al graduarse?"}
                        component_name={"b-ppa-4"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-4"
                    />

                    <RadioInputQuestion
                        question_title={"Si la respuesta anterior fue afirmativa, \
                            indique la mención."}
                        component_name={"b-ppa-5"}
                        options={
                            [
                                "Cumlaude",  
                                "Sumacumlaude",  
                                "No Responde"
                            ]
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-5"
                    />

                    <RadioInputQuestion
                        question_title={"¿Fue miembro de alguna agrupación estudiantil \
                            durante sus estudios de pregrado en la USB?"}
                        component_name={"b-ppa-6"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-6"
                    />

                    <RadioInputQuestion
                        question_title={"¿Inició estudios de postgrado en \
                            Venezuela antes de realizar la gestión de convalidación?"}
                        component_name={"b-ppa-7"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-7"
                    />

                    <RadioInputQuestion
                        question_title={"Si la respuesta anterior fue afirmativa, \
                            indique en qué institución realizó estos estudios."}
                        component_name={"b-ppa-8"}
                        options={
                            [
                                "USB",
                                "Otra institución", 
                                "No Responde"
                            ]
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-8"
                    />

                    <RadioInputQuestion
                        question_title={"¿Finalizó estos estudios de postgrado \
                            en Venezuela antes de realizar la gestión \
                            de convalidación?"}
                        component_name={"b-ppa-9"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="b-ppa-9"
                    />

                </div>

                <TextInputQuestion
                    question_title={"Sample Question 1"}
                    component_name={"sample_input_1"}
                    placeholder={"Introduce a sample answer"}
                    changeStateOfParent={this.changeStateFromChild}
                    showCondition={() => { 
                            return this.state.sample_input_2 < 10; 
                        }
                    }
                    key="Sample Question 1"
                >
                    
                </TextInputQuestion>

                <NumericInputQuestion
                    question_title={"Sample Question 2"}
                    component_name={"sample_input_2"}
                    placeholder={"Introduce a sample answer"}
                    changeStateOfParent={this.changeStateFromChild}
                    key="Sample Question 2"
                > 

                </NumericInputQuestion>

                <DropdownQuestion
                    question_title={"Sample Question 3"}
                    component_name={"sample_input_3"}
                    placeholder={"Introduce a sample answer"}
                    options={[1,2,3]}
                    changeStateOfParent={this.changeStateFromChild}
                    key="Sample Question 3"
                >

                </DropdownQuestion>

                <RadioInputQuestion
                    question_title={"Sample Question 4"}
                    component_name={"sample_input_4"}
                    options={[1,2,3,4,5,6,7,8]}
                    changeStateOfParent={this.changeStateFromChild}
                    key="Sample Question 4"
                >

                </RadioInputQuestion>

                <TextAreaQuestion
                    question_title={"Sample Question 5"}
                    component_name={"sample_input_5"}
                    placeholder={"Introduce a sample answer"}
                    changeStateOfParent={this.changeStateFromChild}
                    key="Sample Question 5"
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
                    key="Sample Question 6"
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
                    key="Sample Question 7"
                >

                </DropdownQuestion>
                
                <div
                    className="submit"
                >
                    <button type="submit">Enviar Respuesta</button>
                </div>
            </form>
        );
    }

  }
  
  export default RevalidabilidadForm;