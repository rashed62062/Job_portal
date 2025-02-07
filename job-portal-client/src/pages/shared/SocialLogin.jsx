import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { singInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        singInWithGoogle()

            .then(result => {
                navigate('/')

                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='m-4'>
              <div className="divider">OR</div>

            <button onClick={handleGoogleSignIn} className='btn btn-block bg-lime-100'>Google</button>
        </div>
    );
};

export default SocialLogin;