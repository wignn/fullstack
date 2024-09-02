import { signOut } from 'next-auth/react';

const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/';
};

export default handleSignOut;
