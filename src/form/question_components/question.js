import React, { Component } from 'react';

class Question extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question_group"> 

        <div className="question_title"> 
          <span> {this.props.question_title}  </span>
        </div>
        <div className="question_answer"> 
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default Question;