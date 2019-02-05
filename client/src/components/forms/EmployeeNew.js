import React, {Component} from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeFormReview from './EmployeeFormReview';

class EmployeeNew extends Component{
  state = {showFormReview: false};
    renderContent(){
      if (this.state.showFormReview){
        return <EmployeeFormReview />;
      }
      return <EmployeeForm onEmployeeSubmit={() => this.setState ({showFormReview: true})}/>;
    };

    render(){
      return(
        <div>{this.renderContent()}</div>
      );
    };
  }

export default EmployeeNew;
