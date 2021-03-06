import React from 'react';
import { Link } from 'react-router';
export default class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>
          <Link to={`/issues/${issue.id}`}>{issue.id}</Link>
        </td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{new Date(issue.created).toDateString()}</td>
        <td>{issue.effort}</td>
        <td>
          {issue.completionDate
            ? new Date(issue.completionDate).toDateString()
            : ''}
        </td>
        <td>{issue.titile}</td>
      </tr>
    );
  }
}
