import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Formsy from "formsy-react";

import { TextFieldFormsy } from "@application";
import authService from "app/service/AuthService";

function Register(props) {
  const formRef = useRef();
  const [loginProcessing, setLoginProcessing] = useState(false);
  const [error, setError] = useState(undefined);
  const [userCreated, setUserCreated] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (model) => {
    setLoginProcessing(true);
    authService
      .createAccount(model)
      .then((data) => {
        setUserCreated(true);
      })
      .catch((err) => {
        setError("Error while creating User");
        setLoginProcessing(false);
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url(/assets/images/bg/login_bg.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="bg-white pt-20 md:rounded-12 sm:mx-auto sm:w-full max-w-xs">
          <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-40 w-auto"
              src="/assets/images/icon/chatapp.png"
              alt="Workflow"
            />
            <h2 className="mt-6 mx-5 text-center text-xl leading-9 font-extrabold text-gray-900">
              {userCreated ? (
                <span>
                  Thank you
                  <br /> Your account is ready.
                </span>
              ) : (
                "Create Your Account"
              )}
            </h2>
          </div>

          {error && (
            <Alert severity="error">
              <div className="text-10">{error}</div>
            </Alert>
          )}

          {userCreated ? (
            <div className="py-20 px-4 text-center">
              <Link to="/public/login" className="text-12 text-green-600">
                Please Login
              </Link>
            </div>
          ) : (
            <div className="py-10 px-4 shadow-1 sm:rounded-lg sm:px-10">
              <Formsy
                onValidSubmit={handleSubmit}
                onValid={() => setFormValid(true)}
                onInvalid={() => setFormValid(false)}
                ref={formRef}
              >
                <div className="my-6">
                  <TextFieldFormsy
                    id="name"
                    type="text"
                    label="Name"
                    name="fullName"
                    required
                    onChange={() => setError(undefined)}
                    className="w-full"
                  />
                </div>

                <div className="my-6">
                  <TextFieldFormsy
                    id="email"
                    type="email"
                    label="Email ID"
                    name="emailId"
                    required
                    onChange={() => setError(undefined)}
                    className="w-full"
                  />
                </div>

                <div className="my-6">
                  <TextFieldFormsy
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    required
                    onChange={() => setError(undefined)}
                    className="w-full"
                  />
                </div>

                <div className="mt-16 md:mx-32">
                  <span className="block w-full rounded-md shadow-sm">
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={!formValid || loginProcessing}
                      className="w-full text-14 flex justify-center"
                    >
                      {loginProcessing ? (
                        <CircularProgress size={30} />
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </span>
                </div>
              </Formsy>

              <div className="mt-20">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-gray-500">
                      Or{" "}
                      <Link
                        to="/public/login"
                        className="text-14 text-green-600"
                      >
                        Sign In
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
