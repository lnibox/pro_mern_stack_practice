import React from 'react';
import { Link } from 'react-router';

export default class IssueEdit extends React.Component {
  render() {
    return (
      <div>
        <div>This is a placeholder for editing issue {this.props.params.id}.</div>
        <Link to="/issues">Back to issue list</Link>
      </div>
    )
  }
}

// IssueEdit.propTypes = {
//   params: React.PropsTypes.object.isRequired
// };