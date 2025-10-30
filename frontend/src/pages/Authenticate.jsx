import { useState } from 'react';
import { useContext } from 'react';
import Card from '../components/UI/Card.jsx';
import Input from '../components/UI/Input.jsx';
import Button from '../components/UI/Button.jsx';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../utils/validators.js';
import { useForm } from '../hooks/form-hook.js';
import { AuthContext } from '../context/auth-context.js';

const Authenticate = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
    console.log(formState.inputs);
  };
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          email: formState.inputs.email,
          password: formState.inputs.password,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password, at least 8 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};
export default Authenticate;
