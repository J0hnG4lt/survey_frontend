import React, { Component } from 'react';

import Question from "../question.js";

class RadioInputQuestion extends Component {
  
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(event){
        this.props.changeStateOfParent(
            this.props.component_name, event.target.value
        )
    }

    render() {
        let showCondition = this.props.showCondition ? this.props.showCondition() : true;
        let question_title = this.props.question_title;
        let component_name = this.props.component_name;
        let options = this.props.options;
        let option_buttons = options.map(
            function(name, index){
                let defaultCondition = (index === options.length-1);
                if (defaultCondition) {
                    return (
                        <label 
                            key={"label"+component_name+question_title+name.toString()+index.toString()}
                        >
                            
                            {name}
                            
                            <input 
                            name={component_name}
                            value={name}
                            defaultChecked={true}
                            type="radio"
                            key={component_name+question_title+name.toString()+index.toString()}
                            />
        
                        </label>
                        );
                }else {
                    return (
                        <label 
                            key={"label"+component_name+question_title+name.toString()+index.toString()}
                        >
                            
                            {name}
                            
                            <input 
                            name={component_name}
                            value={name}
                            type="radio"
                            key={component_name+question_title+name.toString()+index.toString()}
                            />
        
                        </label>
                        );
                }
                
                return (
                <label 
                    key={"label"+component_name+question_title+name.toString()+index.toString()}
                >
                    
                    {name}
                    
                    {defaultCondition} ?
                    <input 
                    name={component_name}
                    value={name}
                    defaultChecked={true}
                    type="radio"
                    key={component_name+question_title+name.toString()+index.toString()}
                    />
                    :
                    <input 
                    name={component_name}
                    value={name}
                    type="radio"
                    key={component_name+question_title+name.toString()+index.toString()}
                    />

                </label>
                );
            })
        return (
            showCondition ?
            <Question
            question_title={question_title}
            >
                <div
                    onChange={this.handleChange}
                >
                    {option_buttons}
                </div>
            </Question>
            :
            <div></div>
        )
    }
  }
  
  export default RadioInputQuestion;