import React, { Component } from 'react';

import Question from "../question.js";

class TextAreaQuestion extends Component {
  
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
        let component_name = this.props.component_name;
        return (
            showCondition ?
            <Question
                question_title={this.props.question_title}
            >
                <textarea
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                > 
                </textarea>
            </Question>
            :
            <div></div>
        );
    }
  }
  
  export default TextAreaQuestion;