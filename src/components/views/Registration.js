import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";


const Registration = props => {
    const history = useHistory();
    const [password, setPassword] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);

    const doRegistration = async () => {
        try {
            const requestBody = JSON.stringify({username, password, name, birthday});
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <FormField
                        label="Username"
                        type="text"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="Name"
                        type="name"
                        value={name}
                        onChange={un => setName(un)}
                    />
                    <FormField
                        label="Birthday"
                        type="date"
                        value={birthday}
                        onChange={un => setBirthday(un)}
                    />
                    <FormField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={n => setPassword(n)}
                    />
                    <div className="login button-container">
                        <Button
                            className="login stacked-button-container-left"
                            width="100%"
                            onClick={() => history.goBack()}
                        >
                            Back
                        </Button>
                        <Button
                            className="login stacked-button-container-right"
                            disabled={!username || !name || !password}
                            width="100%"
                            onClick={() => doRegistration()}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Registration;
