import React, { Component } from 'react';

import NumericInputQuestion from "./question_components/types/numeric_input.js";
import TextInputQuestion from "./question_components/types/text_input.js";
import DropdownQuestion from "./question_components/types/dropdown.js";
import TextAreaQuestion from "./question_components/types/textarea.js";
import RadioInputQuestion from "./question_components/types/radio.js";

import post_resource from "../api/post.js";

import * as countries_data from '../data/countries.json';
import * as universities_data from '../data/world_universities_and_domains.json';
import * as knowledge_areas from '../data/areas_de_conocimiento.json';
import * as courses_data from '../data/materias.json';
import * as materias_no_contempladas_options from '../data/materias_no_contempladas.json';

let materias_options = [];
if (materias_options.length === 0) {
    for (let pensum_ind = 0 ; pensum_ind < courses_data.default.length; pensum_ind++){
        let pensum = courses_data.default[pensum_ind];
        let year_onset = pensum.year_onset;
        let year_end = pensum.year_end;
        for (let carrier_year_ind = 0 ; carrier_year_ind < pensum.subjects ; carrier_year_ind++){
            let carrier_year_subjects = pensum.subjects[carrier_year_ind];
            let carrier_year = carrier_year_subjects.year;
            for (let subject_ind = 0 ; subject_ind < carrier_year_subjects.length ; subject_ind++){
                let course_name = carrier_year_subjects[subject_ind];
                materias_options.push(
                    course_name + " Pensum: "+year_onset+"-"+year_end+" Año: "+carrier_year
                );
            }
        }
    }
}


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

            "pf-1" : null,
            "pf-2" : null,
            "pf-3" : null,
            "pf-4" : null,
            "pf-5" : null,
            "pf-6" : null,

            "ppa-1" : null,
            "ppa-2" : null,
            "ppa-3" : null,
            "ppa-4" : null,
            "ppa-5" : null,
            "ppa-6" : null,
            "ppa-7" : null,
            "ppa-8" : null,
            "ppa-9" : null,
            "ppa-10" : null,
            "ppa-11" : null,
            "ppa-12" : null,
            "ppa-13" : null,
            "ppa-14" : null,
            "ppa-15" : null,

            "pc-1" : null,
            "pc-2" : null,
            "pc-3" : null,
            "pc-4" : null,
            "pc-5" : null,
            "pc-6" : null,
            "pc-7" : null,
            "pc-8" : null,
            "pc-9" : null,
            "pc-10" : null,
            "pc-11" : null,
            "pc-12" : null,
            "pc-13" : null,
            "pc-14" : null,
            "pc-15" : null,
            "pc-16" : null,
            "pc-17" : null,
            "pc-18" : null,
            "pc-19" : null,
            "pc-20" : null,
            "pc-21" : null,
            "pc-22" : null,
            "pc-23" : null,
            "pc-24" : null,
            "pc-25" : null,
            "pc-26" : null,
            "pc-27" : null,
            "pc-28" : null,
            "pc-29" : null,
            "pc-30" : null,
            "pc-31" : null,
            "pc-32" : null,
            "pc-33" : null,
            "pc-34" : null,
            "pc-35" : null,
            "pc-36" : null,
            "pc-37" : null,
            "pc-38" : null,
            "pc-39" : null,
            "pc-40" : null,
            "pc-41" : null,
            "pc-42" : null,
            "pc-43" : null,
            "pc-44" : null,
            "pc-45" : null,
            "pc-46" : null,

            "pa-1" : null,
            "pa-2" : null,
            "pa-3" : null,
            "pa-4" : null,
            "pa-5" : null,
            "pa-6" : null,

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
                        component_name={"pf-1"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pf-1"
                    />

                    <RadioInputQuestion
                        question_title={"¿Convalidó sus documentos académicos de la \
                            USB para poder cursar estudios de postgrado o desempeñarse \
                            profesionalmente fuera de Venezuela?, entendiendo \
                            convalidar como validar los estudios realizados en \
                            una institución de un determinado país en otra \
                            institución o país."}
                        component_name={"pf-2"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pf-2"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Está actualmente cursando estudios de \
                            postgrado o desempeñándose profesionalmente \
                            fuera de Venezuela?"}
                        component_name={"pf-3"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pf-3"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Qué actividad está realizando \
                            actualmente fuera de Venezuela?"}
                        component_name={"pf-4"}
                        options={[
                            "Estoy cursando estudios de postgrado", 
                            "Estoy trabajando", 
                            "Estoy cursando estudios de postgrado y trabajando"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pf-4"
                        showCondition={() => { 
                                return this.state["pf-3"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Previamente cursó estudios de \
                            postgrado o se desempeñó profesionalmente fuera de Venezuela?"}
                        component_name={"pf-5"}
                        options={createBinaryAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pf-5"
                        showCondition={() => { 
                                return this.state["pf-3"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Qué actividad realizó fuera de Venezuela?"}
                        component_name={"pf-6"}
                        options={[
                            "Cursé estudios de postgrado", 
                            "Trabajé", 
                            "Cursé estudios de postgrado y trabajé"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pf-6"
                        showCondition={() => { 
                                return this.state["pf-5"] === "Sí"; 
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
                        component_name={"ppa-1"}
                        placeholder={"Ingrese su carnet"}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-1"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    /> 

                    <NumericInputQuestion
                        question_title={"¿En qué año culminó el pregrado en la USB?"}
                        component_name={"ppa-2"}
                        min={1969}
                        max={2019}
                        placeholder={"Ingrese un año"}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-2"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    /> 

                    <RadioInputQuestion
                        question_title={"¿Cuál fue su índice académico \
                            al culminar sus estudios de pregrado en la USB?"}
                        component_name={"ppa-3"}
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
                        key="ppa-3"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Obtuvo mención al graduarse?"}
                        component_name={"ppa-4"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-4"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"Si la respuesta anterior fue afirmativa, \
                            indique la mención."}
                        component_name={"ppa-5"}
                        options={
                            [
                                "Cumlaude",  
                                "Sumacumlaude",  
                                "No Responde"
                            ]
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-5"
                        showCondition={() => { 
                                return ((this.state["pf-1"] === "Sí")
                                    && (this.state["ppa-4"] === "Sí")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Fue miembro de alguna agrupación estudiantil \
                            durante sus estudios de pregrado en la USB?"}
                        component_name={"ppa-6"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-6"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Inició estudios de postgrado en \
                            Venezuela antes de realizar la gestión de convalidación?"}
                        component_name={"ppa-7"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-7"
                        showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"Si la respuesta anterior fue afirmativa, \
                            indique en qué institución realizó estos estudios."}
                        component_name={"ppa-8"}
                        options={
                            [
                                "USB",
                                "Otra institución", 
                                "No Responde"
                            ]
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-8"
                        showCondition={() => { 
                                return this.state["ppa-7"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={"¿Finalizó estos estudios de postgrado \
                            en Venezuela antes de realizar la gestión \
                            de convalidación?"}
                        component_name={"ppa-9"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-9"
                        showCondition={() => { 
                                return this.state["ppa-7"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Inició estudios de postgrado en \
                            Venezuela antes de empezar el postgrado en \
                            la Universidad de destino? Entendiendo "Universidad de destino" \
                            como la institución académica del país del \
                            extranjero seleccionada por usted para cursar \
                            estudios de postgrado.'}
                        component_name={"ppa-10"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-10"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "Sí")
                                && (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                ) 
                                || 
                                ( 
                                (this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "No")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado")) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Finalizó estos estudios de postgrado \
                            en Venezuela antes de empezar el postgrado en \
                            la Universidad de destino?'}
                        component_name={"ppa-11"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-11"
                        showCondition={() => { 
                                return this.state["ppa-10"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Inició estudios de postgrado en Venezuela \
                            antes de desempeñarse profesionalmente en el país de \
                            destino? Entendiendo "País de destino" como el país del \
                            extranjero seleccionado por usted para desempeñarse \
                            profesionalmente.'}
                        component_name={"ppa-12"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-12"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "Sí")
                                && (this.state["pf-4"] === "Estoy trabajando")
                                ) 
                                || 
                                ( 
                                (this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "No")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Trabajé")) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Finalizó estos estudios de postgrado en \
                            Venezuela antes de desempeñarse profesionalmente en \
                            el país de destino?'}
                        component_name={"ppa-13"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-13"
                        showCondition={() => { 
                                return this.state["ppa-12"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Inició estudios de postgrado en \
                            Venezuela antes de desplazarse al país de \
                            destino? Entendiendo "País de destino" como \
                            el país del extranjero seleccionado por \
                            usted para cursar estudios de postgrado y \
                            desempeñarse profesionalmente.'}
                        component_name={"ppa-14"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-14"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "Sí")
                                && (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ) 
                                || 
                                ( 
                                (this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "No")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Finalizó estos estudios de postgrado en \
                            Venezuela antes de desplazarse al país de destino?'}
                        component_name={"ppa-15"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="ppa-15"
                            showCondition={() => { 
                                return this.state["ppa-12"] === "Sí"; 
                            }
                        }
                    />

                </div>

                <div className="equivalenceProcedures">

                    <DropdownQuestion
                        question_title={'¿En qué país realizó la gestión de \
                            convalidación? A este país se le denominará "País de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-1"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-1"
                        showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />  

                    <DropdownQuestion
                        question_title={'¿En qué país está cursando actualmente estudios \
                            de postgrado? A este país se le denominará "País de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-2"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-2"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "Sí")
                                && (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                ); 
                            }
                        }
                    />  

                    <DropdownQuestion
                        question_title={'¿En qué país se está desempeñando profesionalmente \
                            en la actualidad? A este país se le denominará "País de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-3"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-3"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "Sí")
                                && (this.state["pf-4"] === "Estoy trabajando")
                                ); 
                            }
                        }
                    />  

                    <DropdownQuestion
                        question_title={'¿En qué país está cursando estudios de postgrado \
                            y se está desempeñando profesionalmente en la actualidad? \
                            A este país se le denominará "País de destino" de ahora en adelante.'}
                        component_name={"pc-4"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-4"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "Sí")
                                && (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />  

                    <DropdownQuestion
                        question_title={'¿En qué país cursó estudios de postgrado? \
                            A este país se le denominará "País de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-5"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-5"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "No")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado")
                                ); 
                            }
                        }
                    /> 

                    <DropdownQuestion
                        question_title={'¿En qué país se desempeñó profesionalmente? \
                            A este país se le denominará "País de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-6"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-6"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "No")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Trabajé")
                                ); 
                            }
                        }
                    />   

                    <DropdownQuestion
                        question_title={'¿En qué país cursó estudios de postgrado y se \
                            desempeñó profesionalmente? A este país se le denominará "País de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-7"}
                        placeholder={"Ingrese un país"}
                        options={countries_data.default.map(
                            function(country, index) {
                                return country.name
                            }
                        )}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-7"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "No")
                                && (this.state["pf-3"] === "No")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ); 
                            }
                        }
                    /> 

                    <RadioInputQuestion
                        question_title={'¿Poseía la nacionalidad del país de destino?'}
                        component_name={"pc-8"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-8"
                        showCondition={() => { 
                                return this.state["pf-1"] === "Sí"; 
                            }
                        }
                    />

                    <NumericInputQuestion
                        question_title={'¿En qué año inició la gestión de convalidación \
                            de sus documentos académicos (título, pensum académico, \
                            programas de estudios, notas certificadas, constancia \
                            de carga horaria) de la USB?'}
                        component_name={"pc-9"}
                        min={1969}
                        max={2019}
                        placeholder={"Ingrese un año"}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-9"
                        showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    /> 

                    <RadioInputQuestion
                        question_title={'¿Cuál fue la duración aproximada de la gestión de \
                            convalidación de sus documentos académicos (título, \
                                pensum académico, programas de estudios, notas certificadas, \
                                constancia de carga horaria) de la USB?'}
                        component_name={"pc-10"}
                        options={[
                            "Menos de 3 meses",
                            "De 3 meses a 6 meses",
                            "De 6 meses a 1 año", 
                            "Más de 1 año",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-10"
                        showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal del título \
                            al iniciar la gestión de convalidación?'}
                        component_name={"pc-11"}
                        options={[
                            "Solo legalizado",
                            "Legalizado y apostillado",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-11"
                            showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal del pensum de \
                            estudios al iniciar la gestión de convalidación?'}
                        component_name={"pc-12"}
                        options={[
                            "Solo legalizado",
                            "Legalizado y apostillado",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-12"
                            showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal de los programas de \
                            estudios al iniciar la gestión de convalidación?'}
                        component_name={"pc-13"}
                        options={[
                            "Solo legalizados",
                            "Legalizados y apostillados",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-13"
                            showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal de las notas \
                            certificadas de pregrado al iniciar la gestión \
                            de convalidación?'}
                        component_name={"pc-14"}
                        options={[
                            "Solo legalizadas",
                            "Legalizadas y apostilladas",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-14"
                            showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal de la constancia de \
                            carga horaria de pregrado al iniciar la gestión de \
                            convalidación?'}
                        component_name={"pc-15"}
                        options={[
                            "Solo legalizada",
                            "Legalizada y apostillada",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-15"
                            showCondition={() => { 
                                return this.state["pf-2"] === "Sí"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal del título \
                            al desplazarse al país de destino?'}
                        component_name={"pc-16"}
                        options={[
                            "Solo legalizado",
                            "Legalizado y apostillado",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-16"
                        showCondition={() => { 
                                return this.state["pf-2"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal del pensum de \
                            estudios al desplazarse al país de destino?'}
                        component_name={"pc-17"}
                        options={[
                            "Solo legalizado",
                            "Legalizado y apostillado",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-17"
                        showCondition={() => { 
                                return this.state["pf-2"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal de los programas de \
                            estudios al desplazarse al país de destino?'}
                        component_name={"pc-18"}
                        options={[
                            "Solo legalizados",
                            "Legalizados y apostillados",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-18"
                        showCondition={() => { 
                                return this.state["pf-2"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal de las notas \
                            certificadas de pregrado al al desplazarse al país de destino?'}
                        component_name={"pc-19"}
                        options={[
                            "Solo legalizadas",
                            "Legalizadas y apostilladas",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-19"
                        showCondition={() => { 
                                return this.state["pf-2"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era el estado legal de la constancia de \
                            carga horaria de pregrado al desplazarse al país de destino?'}
                        component_name={"pc-20"}
                        options={[
                            "Solo legalizada",
                            "Legalizada y apostillada",
                            "Sin legalizar ni apostillar",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-20"
                        showCondition={() => { 
                                return this.state["pf-2"] === "No"; 
                            }
                        }
                    />

                    <DropdownQuestion
                        question_title={'¿En qué institución académica o Universidad está \
                            cursando actualmente estudios de postgrado? \
                            A esta institución se le denominará "Universidad de destino" \
                            de ahora en adelante.'}
                        component_name={"pc-21"}
                        placeholder={"Seleccionar Universidad..."}
                        options={universities_data.default
                            .map(
                                function(university, index) {
                                    return university.name+" ("+university.alpha_two_code+")"
                                }
                            )
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-21"
                        showCondition={() => { 
                                return ((this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                || (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                            ); 
                            }
                        }
                    />

                    <DropdownQuestion
                        question_title={'¿En qué institución académica o Universidad \
                            cursó estudios de postgrado? A esta institución se le \
                            denominará "Universidad de destino" de ahora en adelante. '}
                        component_name={"pc-22"}
                        placeholder={"Seleccionar Universidad..."}
                        options={universities_data.default
                            .map(
                                function(university, index) {
                                    return university.name+" ("+university.alpha_two_code+")"
                                }
                            )
                        }
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-22"
                        showCondition={() => { 
                                return ((this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado")
                                ) 
                                || 
                                ( 
                                (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")) ; 
                            }
                        }
                    />

                    <NumericInputQuestion
                        question_title={'¿En qué año inició estudios de postgrado \
                            en la Universidad de destino?'}
                        component_name={"pc-23"}
                        min={1969}
                        max={2019}
                        placeholder={"Seleccionar año..."}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-23"
                        showCondition={() => { 
                                return (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                || 
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Cursé estudios de postgrado")
                                ) 
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                )
                                ; 
                            }
                        }
                    /> 

                    <RadioInputQuestion
                        question_title={'¿Qué tipo de estudios de postgrado está cursando \
                            actualmente en la Universidad de destino?'}
                        component_name={"pc-24"}
                        options={[
                            "Maestría",
                            "Especialización",
                            "Doctorado",
                            "Diplomado",
                            "Otro",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-24"
                        showCondition={() => { 
                                return ((this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                || (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Qué tipo de estudios de postgrado \
                            cursó en la Universidad de destino?'}
                        component_name={"pc-25"}
                        options={[
                            "Maestría",
                            "Especialización",
                            "Doctorado",
                            "Diplomado",
                            "Otro",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-25"
                        showCondition={() => { 
                                return ((this.state["pf-6"] === "Cursé estudios de postgrado")
                                || (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ) ; 
                            }
                        }
                    />

                    <DropdownQuestion
                        question_title={'¿En qué área o campo del conocimiento se \
                            fundamenta su estudio de postgrado?'}
                        component_name={"pc-26"}
                        placeholder={"Seleccionar área..."}
                        options={knowledge_areas.default}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-26"
                        showCondition={() => { 
                                return ((this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                || (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ) ; 
                            }
                        }
                    />

                    <DropdownQuestion
                        question_title={'¿En qué área o campo del conocimiento se \
                            fundamentaba su estudio de postgrado?'}
                        component_name={"pc-27"}
                        placeholder={"Seleccionar área..."}
                        options={knowledge_areas.default}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-27"
                        showCondition={() => { 
                                return ((this.state["pf-6"] === "Cursé estudios de postgrado")
                                || (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿A qué institución del país de destino \
                            acudió usted para poder realizar la gestión de \
                            convalidación con fines académicos?'}
                        component_name={"pc-28"}
                        options={[
                            "Ministerio de Educación",
                            "Embajada",
                            "Universidad de destino académico",
                            "Otra",
                            "No Responder"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-28"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "Sí")
                                && (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                ) 
                                || 
                                ( 
                                (this.state["pf-2"] === "Sí")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado")) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿A qué institución del país de destino \
                            acudió usted para poder realizar la \
                            gestión de convalidación con fines \
                            profesionales?'}
                        component_name={"pc-29"}
                        options={[
                            "Ministerio de Educación",
                            "Embajada",
                            "Universidad de destino académico",
                            "Otra",
                            "No Responder"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-29"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "Sí")
                                && (this.state["pf-4"] === "Estoy trabajando")
                                ) 
                                || 
                                ( 
                                (this.state["pf-2"] === "Sí")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Trabajé")) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿A qué institución del país de destino \
                            acudió usted para poder realizar la gestión \
                            de convalidación con fines académicos o laborales?'}
                        component_name={"pc-30"}
                        options={[
                            "Ministerio de Educación",
                            "Embajada",
                            "Universidad de destino académico",
                            "Otra",
                            "No Responder"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-30"
                        showCondition={() => { 
                                return ((this.state["pf-2"] === "Sí")
                                && (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ) 
                                || 
                                ( 
                                (this.state["pf-2"] === "Sí")
                                && (this.state["pf-5"] === "Sí")
                                && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")) ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Poseía alguna carta de recomendación o algún \
                            contacto que le facilitara la inserción académica en \
                            la Universidad de destino?'}
                        component_name={"pc-31"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-31"
                        showCondition={() => { 
                                return (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                || 
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Cursé estudios de postgrado")
                                ) 
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                )
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Poseía alguna carta de recomendación o algún \
                            contacto que le facilitara la inserción laboral \
                            en el país de destino?'}
                        component_name={"pc-32"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-32"
                        showCondition={() => { 
                                return (this.state["pf-4"] === "Estoy trabajando")
                                || 
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Trabajé")
                                )
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                )
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Tuvo que realizar algún examen de admisión \
                            para cursar estudios de postgrado en la \
                            Universidad de destino?'}
                        component_name={"pc-33"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-33"
                        showCondition={() => { 
                                return (this.state["pf-4"] === "Estoy trabajando")
                                || 
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Trabajé")
                                ) 
                                ||
                                ( 
                                    (this.state["pf-5"] === "Sí")
                                    && (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                )
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál es su nivel de dominio \
                            del idioma del país de destino?'}
                        component_name={"pc-34"}
                        options={[
                            "Nativo",
                            "Avanzado",
                            "Intermedio",
                            "Básico",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-34"
                        showCondition={() => { 
                                return (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                || 
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era su nivel de dominio \
                            del idioma del país de destino?'}
                        component_name={"pc-35"}
                        options={[
                            "Nativo",
                            "Avanzado",
                            "Intermedio",
                            "Básico",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-35"
                        showCondition={() => { 
                                return (this.state["pf-6"] === "Cursé estudios de postgrado")
                                || 
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Le solicitaron algún certificado de \
                            suficiencia del idioma para poder cursar \
                            estudios de postgrado en su Universidad de destino?'}
                        component_name={"pc-36"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-36"
                        showCondition={() => { 
                                return (
                                    (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                || 
                                (
                                    (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                || 
                                (
                                    (this.state["pf-5"] === "Cursé estudios de postgrado")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                || 
                                (
                                    (this.state["pf-5"] === "Cursé estudios de postgrado y trabajé")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Le solicitaron algún certificado o \
                            evidencia de suficiencia del idioma para poder \
                            desempeñarse profesionalmente en su país de destino?'}
                        component_name={"pc-37"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-37"
                        showCondition={() => { 
                                return (
                                    (this.state["pf-4"] === "Estoy trabajando")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                || 
                                (
                                    (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                || 
                                (
                                    (this.state["pf-5"] === "Trabajé")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                || 
                                (
                                    (this.state["pf-5"] === "Cursé estudios de postgrado y trabajé")
                                    && (this.state["pc-35"] !== "Nativo")
                                )
                                ; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿La institución a la que usted acudió para \
                            la convalidación académica le homologó todas \
                            las materias del plan de estudios de \
                            Ingeniería Mecánica de la USB?'}
                        component_name={"pc-38"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-38"
                        showCondition={() => { 
                                return (
                                    (this.state["pf-2"] === "Sí")
                                    && (this.state["pc-4"] !== "Estoy cursando estudios de postgrado")
                                )
                                || 
                                (
                                    (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                    && (this.state["pf-2"] === "Sí")
                                )
                                || 
                                (
                                    (this.state["pf-5"] === "Cursé estudios de postgrado")
                                    && (this.state["pf-2"] === "Sí")
                                )
                                || 
                                (
                                    (this.state["pf-5"] === "Cursé estudios de postgrado y trabajé")
                                    && (this.state["pf-2"] === "Sí")
                                )
                                ; 
                            }
                        }
                    />

                    <DropdownQuestion
                        question_title={"Si su respuesta anterior fue negativa, \
                            indique cuáles materias NO le fueron convalidadas \
                            del plan de estudios de Ingeniería Mecánica de la USB."}
                        component_name={"pc-39"}
                        placeholder={"Seleccionar materia(s)..."}
                        options={materias_options}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-39"
                        showCondition={() => { 
                                return this.state["pc-38"] === "No"; 
                            }
                        }

                    />

                    <DropdownQuestion
                        question_title={'¿Cuáles materias NO contempladas en el \
                            plan de estudios de la carrera tuvo que cursar \
                            obligatoriamente para poder ingresar al postgrado de \
                            la Universidad de destino?'}
                        component_name={"pc-40"}
                        placeholder={"Seleccionar materia(s)..."}
                        options={materias_no_contempladas_options.default}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-40"
                        showCondition={() => { 
                                return this.state["pc-38"] === "No"; 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿En qué tipo de entidad trabaja actualmente?'}
                        component_name={"pc-41"}
                        options={[
                            "Universidad",
                            "Empresa Privada",
                            "ONG",
                            "Ente gubernamental",
                            "Instituto de investigación",
                            "Otro",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-41"
                        showCondition={() => { 
                                return (
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿En qué tipo de entidad del país de destino trabajaba?'}
                        component_name={"pc-42"}
                        options={[
                            "Universidad",
                            "Empresa Privada",
                            "ONG",
                            "Ente gubernamental",
                            "Instituto de investigación",
                            "Otro",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-42"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ); 
                            }
                        }
                    />

                    <NumericInputQuestion
                        question_title={'¿En qué año empezó a trabajar en dicha entidad?'}
                        component_name={"pc-43"}
                        min={1969}
                        max={2019}
                        placeholder={"Seleccionar año..."}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-43"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ||
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    /> 

                    <RadioInputQuestion
                        question_title={'¿Cuál es la intensidad de relación existente \
                            entre su profesión (Ingeniería Mecánica) y el área \
                            de trabajo en la que se desempeña profesionalmente \
                            en la actualidad?'}
                        component_name={"pc-44"}
                        options={[
                            "Totalmente relacionadas",
                            "Muy relacionadas",
                            "Algo relacionadas",
                            "Poco relacionadas",
                            "No existe ninguna relación",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-44"
                        showCondition={() => { 
                                return (
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Cuál era la intensidad de relación existente \
                            entre su profesión (Ingeniería Mecánica) \
                            y el área de trabajo en la que se desempeñaba \
                            profesionalmente en el país de destino?'}
                        component_name={"pc-45"}
                        options={[
                            "Totalmente relacionadas",
                            "Muy relacionadas",
                            "Algo relacionadas",
                            "Poco relacionadas",
                            "No existe ninguna relación",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-45"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Había sido contratado por la empresa \
                            del país de destino antes de desplazarse a éste?'}
                        component_name={"pc-46"}
                        options={createBinaryAnswerAndNoAnswer()}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pc-46"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ||
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />

                </div>

                <div className="personalValueQuestions">
                
                    <RadioInputQuestion
                        question_title={'¿Qué tanto lo han ayudado los conocimientos, \
                            competencias y experiencias adquiridas en la USB a \
                            desenvolverse con éxito en el postgrado de la Universidad de destino?'}
                        component_name={"pa-1"}
                        options={[
                            "Mucho",
                            "Lo suficiente",
                            "Poco",
                            "Nada",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pa-1"
                        showCondition={() => { 
                                return (
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Qué tanto lo ayudaron los conocimientos, \
                            competencias y experiencias adquiridas en la \
                            USB a desenvolverse con éxito en el postgrado \
                            de la Universidad de destino?'}
                        component_name={"pa-2"}
                        options={[
                            "Mucho",
                            "Lo suficiente",
                            "Poco",
                            "Nada",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pa-2"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Cursé estudios de postgrado")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Qué tanto lo ha ayudado tener el título de \
                            Ingeniero Mecánico de la USB a insertarse \
                            con éxito en el ámbito laboral del país de destino?'}
                        component_name={"pa-3"}
                        options={[
                            "Mucho",
                            "Lo suficiente",
                            "Poco",
                            "Nada",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pa-3"
                        showCondition={() => { 
                                return (
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Qué tanto lo ayudó tener el título de Ingeniero \
                            Mecánico de la USB a insertarse con éxito en el ámbito \
                            laboral del país de destino?'}
                        component_name={"pa-4"}
                        options={[
                            "Mucho",
                            "Lo suficiente",
                            "Poco",
                            "Nada",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pa-4"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Qué tanto lo han ayudado los conocimientos, competencias \
                            y experiencias adquiridas en la USB a insertarse y desempeñarse \
                            con éxito en el ámbito laboral del país de destino?'}
                        component_name={"pa-5"}
                        options={[
                            "Mucho",
                            "Lo suficiente",
                            "Poco",
                            "Nada",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pa-5"
                        showCondition={() => { 
                                return (
                                (this.state["pf-4"] === "Estoy trabajando")
                                ||
                                (this.state["pf-4"] === "Estoy cursando estudios de postgrado y trabajando")
                                ); 
                            }
                        }
                    />

                    <RadioInputQuestion
                        question_title={'¿Qué tanto lo ayudaron los conocimientos, competencias \
                            y experiencias adquiridas en la USB a insertarse y \
                            desempeñarse con éxito en el ámbito laboral del país de destino?'}
                        component_name={"pa-6"}
                        options={[
                            "Mucho",
                            "Lo suficiente",
                            "Poco",
                            "Nada",
                            "No Responde"
                        ]}
                        changeStateOfParent={this.changeStateFromChild}
                        key="pa-6"
                        showCondition={() => { 
                                return (
                                (this.state["pf-6"] === "Trabajé")
                                ||
                                (this.state["pf-6"] === "Cursé estudios de postgrado y trabajé")
                                ); 
                            }
                        }
                    />

                </div>
                
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