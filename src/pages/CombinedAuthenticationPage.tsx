import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginModal, selectSignupModal, selectCreateAccountModal, toggleCreateAccount, toggleLogin, toggleSignup } from "../redux/features/modal/modal";
import { selectToken, selectId } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { LoginModal, SignUpModal, CreateAccountModal } from "../components/authentication_modal";

export const CombinedAuthenticationPage = () => {
    const [signUpEmail, setSignUpEmail] = useState<string>("");

    // States for login / signup / create account modals
    const showLogin = useSelector(selectLoginModal);
    const showSignup = useSelector(selectSignupModal);
    const showCreateAccount = useSelector(selectCreateAccountModal);

    const userToken = useSelector(selectToken);
    const userId = useSelector(selectId);
    const dispatch = useDispatch();

    const hideAllModals = () => {
        dispatch(toggleLogin(false));
        dispatch(toggleSignup(false));
        dispatch(toggleCreateAccount(false));
    }

    const showSignUpModal = () => {
        dispatch(toggleLogin(false));
        dispatch(toggleSignup(true));
        dispatch(toggleCreateAccount(false));
    }

    const showLogInModal = () => {
        dispatch(toggleLogin(true));
        dispatch(toggleSignup(false));
        dispatch(toggleCreateAccount(false));
    }

    const authoriseCreateAccountModal = (email: string) => {
        setSignUpEmail(email);
        dispatch(toggleLogin(false));
        dispatch(toggleSignup(false));
        dispatch(toggleCreateAccount(true));
    }

    useEffect(() => {
        if (isLoggedIn(userToken, userId)) {
            hideAllModals();
        }
    }, [userId])

    return (
        <>
            { showLogin ? <LoginModal cancel={hideAllModals} showSignUpModal={showSignUpModal} /> : null }
            { showSignup ? <SignUpModal cancel={hideAllModals} showLogInModal={showLogInModal} authoriseCreateAccountModal={authoriseCreateAccountModal} /> : null }
            { showCreateAccount ? <CreateAccountModal cancel={hideAllModals} email={signUpEmail} showLogInModal={showLogInModal} /> : null }
        </>
    )
}

export default CombinedAuthenticationPage

