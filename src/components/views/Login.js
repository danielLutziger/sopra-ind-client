import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "../../helpers/formField";


const Login = props => {
    const history = useHistory();
    const [loginValues, setLoginValues] = useState({ username: "", password: "" });

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify(loginValues);
            const response = await api.post('/login', requestBody);

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

    const doRegistration = () => {
        history.push(`/registration`);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginValues((prevState) => ({
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
                        value={loginValues.username}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        value={loginValues.password}
                        onChange={handleChange}
                    />
                    <div className="login button-container">
                        <Button
                            className="login stacked-button-container-left"
                            width="100%"
                            onClick={() => doRegistration()}
                        >
                            Register now
                        </Button>
                        <Button
                            className="login stacked-button-container-right"
                            disabled={!loginValues.username || !loginValues.password}
                            width="100%"
                            onClick={() => doLogin()}
                        >
                            Login
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
export default Login;
