import { getAuth } from "firebase/auth";

export const signOut = () => {
    signOut(auth)
    .then(() => {
        })
    .catch((error) => {
        return error.message;
    });
}