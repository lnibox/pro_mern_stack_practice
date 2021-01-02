'use strict';

import IssueRow from './IssueRow.jsx';

export default class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue}></IssueRow>);
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Status</td>
                        <td>Owner</td>
                        <td>Created</td>
                        <td>Effort</td>
                        <td>Completion Date</td>
                        <td>Title</td>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
    }
}