import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";
import {Alert} from "react-bootstrap";


const Registration = () => {
    const history = useHistory();
    const [registrationValues, setRegistrationValues] = useState({ username: "", password: "" });
    const [notification, setNotification] = useState(false);

    const doRegistration = async () => {
        try {
            const requestBody = JSON.stringify(registrationValues);
            const response = await api.post('/users', requestBody);

            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);
            console.log('requested data:', response);

            // Store the token into the local storage.
            localStorage.setItem('token', response.headers['access-token']);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "username" && /\s/.test(value)) {
            setNotification(true);
            return; // Do not update the state if the first name contains spaces
        } else {
            setNotification(false);
        }

        setRegistrationValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <FormField
                        label="Username"
                        type="text"
                        name="username"
                        value={registrationValues.username}
                        onChange={handleChange}
                    />
                    {notification && <Alert variant={"danger"}>Spaces in the username are not allowed!</Alert>}
                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        value={registrationValues.password}
                        onChange={handleChange}
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
                            disabled={!registrationValues.username || !registrationValues.password}
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
