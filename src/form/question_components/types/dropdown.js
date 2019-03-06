import React, { Component } from 'react';

import Question from "../question.js";

class DropdownQuestion extends Component {
  
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event){
        this.props.changeStateOfParent(
            this.props.component_name, event.target.value
        )
    }

    render() {
        let showCondition = this.props.showCondition ? this.props.showCondition() : true;
        let component_name = this.props.component_name;
        let question_title = this.props.question_title;
        let options = this.props.options;
        let option_buttons = options.map(
            function(name, index){
                return (
                    <option 
                    name={component_name}
                    value={name}
                    key={component_name+question_title+name.toString()+index.toString()}
                    >
                    {name}
                    </option>
                );
            })
        return (
            showCondition ?
            <Question
            question_title={question_title}
            >
                <select
                    multiple={this.props.multiple}
                    key={component_name}
                    onChange={this.handleChange}
                >
                    {option_buttons}
                </select>
                
            </Question>
            :
            <div></div>
        )
    }
  }
  
  export default DropdownQuestion;