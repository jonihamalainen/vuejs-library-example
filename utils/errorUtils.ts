export const nollaaError = () => {
    const errorMessageData = useErrorState();

    errorMessageData.errorData.value = null;

}