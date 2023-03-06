import React, {useEffect, useState} from 'react';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import {api, handleError} from "../../helpers/api";
import {useHistory, useParams} from "react-router-dom";
import {Badge} from "react-bootstrap";
import {Button} from "../ui/Button";
import {Spinner} from "../ui/Spinner";
import ProfileEdit from "./ProfileEdit"


const Profile = () => {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(null);
    const history = useHistory();
    const {id} = useParams(); // parameters passed from the browser router :1, :2 .. the userid of the selection

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await api.get(`/users/${id}`, config);
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Get the returned users and update the state.
                setUser(response.data);
                setEdit(response.headers['edit-access']);

                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert(`Something went wrong during the login: \n${handleError(error)}`);
            }
        }

        fetchData();
    }, [id]);

    const submit = async (editValues) => {
        if (user.username !== editValues.username || (user.birthday !== editValues.birthday && editValues.birthday)) {
            try{
                const token = localStorage.getItem('token');
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await api.put(`/users/${id}`, editValues, config);
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Get the returned users and update the state.
                const current = {...user, ...editValues};
                setUser(current);

                localStorage.setItem('token', response.headers['access-token'])
                setEdit(response.headers['edit-access']);

                console.log('request to:', response.headers['access-token']);
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            }catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert(`Something went wrong during the login: \n${handleError(error)}`);
            }
        }
    }

    let content = <Spinner/>;
    if (user) {
        user.birthday = user.birthday ? user.birthday.split('T')[0] : user.birthday;
        user.creationDate = user.creationDate.split('T')[0];
        content = (
            <div className="game">
                <div className="profile container">
                    <div className="profile singleRow">
                        <div className="player username">{user.username}</div>
                        <Badge className="profile right"
                               bg={user.status === "OFFLINE" ? "danger" : "success"}>{user.status}</Badge>
                    </div>
                    <div className="profile singleRow">
                        <div className="profile birthday">Birthday</div>
                        <div className="profile right">{user.birthday || 'Not Available'}</div>
                    </div>
                    <div className="profile singleRow">
                        <div className="profile birthday">Registration date</div>
                        <div className="profile right">{user.creationDate}</div>
                    </div>
                </div>
                {edit === "true" && <ProfileEdit id={id} username={user.username} birthday={user.birthday} submit={submit}>Edit entries</ProfileEdit>}
                <Button
                    width="100%"
                    style={{marginTop: "1em"}}
                    onClick={() => history.goBack()}
                >
                    Back
                </Button>

            </div>
        );
    }

    return (
        <BaseContainer className="game container">
            {content}
        </BaseContainer>
    );
};

export default Profile;
