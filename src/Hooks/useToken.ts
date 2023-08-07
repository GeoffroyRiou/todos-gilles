

const useToken = () => {

    const setToken = (value: string): void => {
        window.sessionStorage.setItem('@tasks:token', value);
    }

    const getToken = (): string | null => {
        return window.sessionStorage.getItem('@tasks:token') || null;
    }


    return {
        setToken,
        getToken
    }
}

export default useToken;