import React, { useEffect, useState } from "react";
import useToken from "../../Hooks/useToken";
import useApiRequest from "../../Hooks/useApiRequest";
import { ErrorApiResponse, LoginApiResponse } from "../../Types/ApiResponses";
import { useNavigate } from "react-router";

const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const { doRequest: loginRequest } = useApiRequest<LoginApiResponse>();

    useEffect(() => {
        if (getToken()) {
            navigate('/');
        }
    }, []);


    const { setToken, getToken } = useToken();


    const handleConnection = async () => {
        setMessage('');

        try {
            const response = await loginRequest('post', '/login', {
                email,
                password
            });

            setToken(response.data.token);

            navigate('/');

        } catch (e) {
            const error = e as ErrorApiResponse;

            switch (error.response.status) {
                case 401:
                    setMessage("Identifiants invalides");
                    break;
                default:
                    setMessage("Une erreur est survenue");
                    break;
            }
        }
    }

    return <div>
        {message !== '' && <div className="message is-danger">
            <div className="message-body">
                {message}
            </div>
        </div>}
        <div>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        </div>
        <div>
            <button onClick={() => handleConnection()}>Se connecter</button>
        </div>
    </div>

}

export default Login;