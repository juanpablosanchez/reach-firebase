import React, { Component } from 'react';

// import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
// import * as ROLES from '../../constants/roles';

const UserList = ({ users }: { users: any }) => (
    <ul>
        {users.map((user: any) => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

class AdminPage extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', (snapshot: any) => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <p>
                    Restricted area! Only users with the admin role are authorized.
                </p>
                {this.state.loading && <div>Loading ...</div>}

                <UserList users={this.state.users} />
            </div >
        );
    }
}

// const condition = (authUser: any) => true;
// authUser && !!authUser.roles[ROLES.ADMIN];

export default withFirebase(AdminPage);
// export default withAuthorization(condition)(AdminPage);